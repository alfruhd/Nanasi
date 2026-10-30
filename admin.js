(function () {
  var FB_VER = "10.12.2", base = "https://www.gstatic.com/firebasejs/" + FB_VER + "/";
  var cfg = (window.NANASI_FIREBASE || {}).config || {};
  var $ = function (id) { return document.getElementById(id); };
  var defaults = JSON.parse(JSON.stringify(window.NANASI_MENU));
  var data, current = 0, auth, db, storage, dirty = false;

  if (!cfg.apiKey) { $("setupNotice").hidden = false; return; }

  function load(src) { return new Promise(function (r, j) { var s = document.createElement("script"); s.src = src; s.onload = r; s.onerror = j; document.head.appendChild(s); }); }
  ["firebase-app-compat.js", "firebase-auth-compat.js", "firebase-firestore-compat.js", "firebase-storage-compat.js"]
    .reduce(function (p, f) { return p.then(function () { return load(base + f); }); }, Promise.resolve())
    .then(init).catch(function (e) { $("setupNotice").hidden = false; console.error(e); });

  function init() {
    firebase.initializeApp(cfg);
    auth = firebase.auth(); db = firebase.firestore(); storage = firebase.storage();
    auth.onAuthStateChanged(function (u) {
      $("loginView").hidden = !!u; $("editorView").hidden = !u;
      if (u) { $("who").textContent = u.email; loadData(); }
    });
    $("loginView").addEventListener("submit", function (e) {
      e.preventDefault(); $("loginErr").textContent = "";
      auth.signInWithEmailAndPassword($("email").value, $("password").value)
        .catch(function () { $("loginErr").textContent = "Wrong email or password."; });
    });
    $("logoutBtn").onclick = function () { auth.signOut(); };
    $("saveBtn").onclick = save;
    $("resetBtn").onclick = function () {
      if (!confirm("Discard all admin edits and go back to the built-in menu?")) return;
      db.collection("menu").doc("main").delete().then(function () { data = JSON.parse(JSON.stringify(defaults)); current = 0; render(); status("Reset ✓"); }).catch(fail);
    };
    window.addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
  }

  function status(t) { $("status").textContent = t; }
  function fail(e) { status("Error: " + (e.code || e.message)); alert("Failed: " + (e.code === "permission-denied" ? "this account is not allowed to edit (check the rules' admin email)." : e.message)); }

  function loadData() {
    db.collection("menu").doc("main").get().then(function (s) {
      data = s.exists && s.data().json ? JSON.parse(s.data().json) : JSON.parse(JSON.stringify(defaults));
      current = 0; dirty = false; render();
    }).catch(fail);
  }

  function save() {
    status("Saving…");
    db.collection("menu").doc("main").set({ json: JSON.stringify(data), updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then(function () { dirty = false; status("Published ✓ " + new Date().toLocaleTimeString()); }).catch(fail);
  }

  function touch() { dirty = true; status("Unsaved changes"); }
  function slug(s) { return (s || "x").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x"; }
  function uid(p) { return p + "-" + Math.random().toString(36).slice(2, 7); }

  // Resize large images client-side, keep transparency (cutout dishes are PNG).
  function prepImage(file) {
    return new Promise(function (res, rej) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var m = 900, k = Math.min(1, m / Math.max(img.width, img.height));
        var c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(function (b) { URL.revokeObjectURL(url); b ? res(b) : rej(new Error("Image conversion failed")); }, "image/webp", 0.92);
      };
      img.onerror = function () { rej(new Error("Not a valid image")); };
      img.src = url;
    });
  }
  function upload(file, cb) {
    status("Uploading image…");
    prepImage(file).then(function (blob) {
      var ref = storage.ref("menu/" + Date.now() + "-" + slug(file.name.replace(/\.[^.]+$/, "")) + ".webp");
      return ref.put(blob, { contentType: "image/webp" }).then(function () { return ref.getDownloadURL(); });
    }).then(function (u) { cb(u); touch(); status("Image uploaded — remember to Save"); render(); }).catch(fail);
  }

  function el(tag, props, kids) {
    var e = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) { if (k === "text") e.textContent = props[k]; else if (k.indexOf("on") === 0) e[k] = props[k]; else e[k] = props[k]; });
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function field(label, obj, key, opts) {
    opts = opts || {};
    var inp = el(opts.area ? "textarea" : "input", { value: obj[key] == null ? "" : obj[key] });
    if (opts.number) inp.type = "number";
    inp.oninput = function () { obj[key] = opts.number ? Number(inp.value) : inp.value; touch(); if (opts.refresh) refreshNav(); };
    var w = el("div", {}, [el("label", { text: label }), inp]);
    return w;
  }
  function imgField(label, obj, key) {
    var file = el("input", { type: "file", accept: "image/*" });
    file.onchange = function () { if (file.files[0]) upload(file.files[0], function (u) { obj[key] = u; }); };
    var url = field(label + " URL", obj, key);
    var th = el("img", { className: "thumb", src: obj[key] || "", alt: "" });
    url.querySelector("input").addEventListener("input", function (e) { th.src = e.target.value; });
    return { thumb: th, file: file, url: url };
  }

  function refreshNav() {
    var nav = $("sectionList"); nav.innerHTML = "";
    data.sections.forEach(function (s, i) {
      nav.appendChild(el("button", { className: "sec-btn" + (i === current ? " active" : ""), text: s.title || "(untitled)", onclick: function () { current = i; render(); } }));
    });
    nav.appendChild(el("button", { className: "btn", text: "+ Add section", onclick: function () {
      data.sections.push({ id: uid("section"), title: "NEW SECTION", subtitle: "", priceHeader: "TSH", accent: "green", items: [] });
      current = data.sections.length - 1; touch(); render();
    } }));
  }

  function move(arr, i, d) { var j = i + d; if (j < 0 || j >= arr.length) return; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; touch(); render(); }

  function render() {
    if (!data) return;
    refreshNav();
    var s = data.sections[current], ed = $("sectionEditor"); ed.innerHTML = "";
    if (!s) return;

    var banner = imgField("Section banner image", s, "bannerImage");
    var head = el("div", { className: "panel" }, [
      el("h2", { text: "Section" }),
      el("div", { className: "row2" }, [field("Title", s, "title", { refresh: true }), field("Script / sub-title", s, "scriptTitle")]),
      field("Description", s, "subtitle", { area: true }),
      el("div", { className: "row2" }, [field("Item column header", s, "itemHeader"), field("Price header", s, "priceHeader")]),
      el("div", { className: "item", style: "margin-top:12px" }, [
        el("div", { className: "thumb-wrap" }, [banner.thumb, banner.file]), banner.url
      ]),
      el("div", { className: "item-actions" }, [
        el("button", { className: "btn sm", text: "↑ Move section up", onclick: function () { move(data.sections, current, -1); current = Math.max(0, current - 1); render(); } }),
        el("button", { className: "btn sm", text: "↓ Move section down", onclick: function () { move(data.sections, current, 1); current = Math.min(data.sections.length - 1, current + 1); render(); } }),
        el("button", { className: "btn sm danger", text: "Delete section", onclick: function () {
          if (!confirm('Delete section "' + s.title + '" and all its items?')) return;
          data.sections.splice(current, 1); current = Math.max(0, current - 1); touch(); render();
        } })
      ])
    ]);
    ed.appendChild(head);

    var items = el("div", { className: "items" });
    (s.items || []).forEach(function (it, i) {
      var im = imgField("Image", it, "image");
      items.appendChild(el("div", { className: "item" }, [
        el("div", { className: "thumb-wrap" }, [im.thumb, im.file]),
        el("div", {}, [
          el("div", { className: "row2" }, [field("Name", it, "name"), field("Price", it, "price", { number: true })]),
          field("Description", it, "subtitle", { area: true }),
          im.url,
          el("div", { className: "item-actions" }, [
            el("button", { className: "btn sm", text: "↑", onclick: function () { move(s.items, i, -1); } }),
            el("button", { className: "btn sm", text: "↓", onclick: function () { move(s.items, i, 1); } }),
            el("button", { className: "btn sm danger", text: "Delete item", onclick: function () { if (confirm('Delete "' + it.name + '"?')) { s.items.splice(i, 1); touch(); render(); } } })
          ])
        ])
      ]));
    });
    var wrap = el("div", { className: "panel" }, [el("h2", { text: "Items (" + (s.items || []).length + ")" }), items,
      el("div", { className: "item-actions", style: "margin-top:12px" }, [el("button", { className: "btn primary", text: "+ Add item", onclick: function () {
        s.items = s.items || []; s.items.push({ id: uid("item"), name: "New item", price: 0, subtitle: "", image: "" }); touch(); render();
      } })])]);
    ed.appendChild(wrap);
  }
})();

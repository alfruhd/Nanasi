// Loads the admin-edited menu from Firestore (if configured) before app.js runs.
// Falls back to the static menu-data.js on any failure so the site never breaks.
(function () {
  var FB_VER = "10.12.2";
  var cfg = (window.NANASI_FIREBASE || {}).config || {};

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  function startApp() { loadScript("app.js"); }

  if (!cfg.apiKey) return startApp();

  var base = "https://www.gstatic.com/firebasejs/" + FB_VER + "/";
  var timeout = new Promise(function (_, rej) { setTimeout(function () { rej(new Error("timeout")); }, 4000); });
  var work = loadScript(base + "firebase-app-compat.js")
    .then(function () { return loadScript(base + "firebase-firestore-compat.js"); })
    .then(function () {
      if (!firebase.apps.length) firebase.initializeApp(cfg);
      return firebase.firestore().collection("menu").doc("main").get();
    })
    .then(function (snap) {
      if (snap.exists && snap.data().json) {
        var d = JSON.parse(snap.data().json);
        if (d && d.sections && d.sections.length) window.NANASI_MENU = d;
      }
    });

  Promise.race([work, timeout]).catch(function (e) { console.warn("Using default menu:", e.message); }).then(startApp);
})();

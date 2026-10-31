// ==========================================================================
// NANASI CAFE — BITE . SIP . SMILE
// Dynamic Multi-Archetype Layout Renderer (Using Official Nanasi Colors)
// Cycles through the exact design layouts of your 8 reference attachments:
//   - Archetype A: CheckCheck Alternating Rounded Pill Stage + Scalloped Badges
//   - Archetype B: Burger City Slanted Headers + S-Curve Line + Dotted Leaders
//   - Archetype C: Gourmet Boss Left Vertical Ribbon Strip + Cream Pill Banners
//   - Archetype D: Sub Floors Yin-Yang Curved Split Canvas + Matte Ceramic Bowls
// ==========================================================================

(function () {
  const data = window.NANASI_MENU;
  if (!data) return;

  let activeSectionId = "all";
  let searchQuery = "";
  let isProgrammaticScroll = false;
  let scrollLockTimer = null;

  const jimboGridEl = document.getElementById("jimboGrid");
  const categoryNavEl = document.getElementById("categoryNav");
  const menuContainerEl = document.getElementById("menuContainer");
  const searchInputEl = document.getElementById("searchInput");
  const searchClearEl = document.getElementById("searchClear");
  const dishModalEl = document.getElementById("dishModal");
  const qrModalEl = document.getElementById("qrModal");

  function formatPrice(n) {
    return Number(n).toLocaleString("en-US");
  }

  // 1. Render Attachment 6 Style 6-Tile Concentric Ripple Bowl Grid (Jimbo Style in Nanasi Colors)
  function renderJimboGrid() {
    if (!jimboGridEl || !data.spotlights) return;
    const tileVariants = [
      "nanasi-green-tile",
      "nanasi-gold-tile",
      "nanasi-brown-tile",
      "nanasi-gold-tile",
      "nanasi-cream-tile",
      "nanasi-green-tile"
    ];

    jimboGridEl.innerHTML = data.spotlights
      .map((sp, i) => {
        const variant = tileVariants[i % tileVariants.length];
        return `
          <div class="jimbo-tile ${variant}" data-spot-sec="${sp.secId}" data-spot-item="${sp.id}">
            <div class="jimbo-title">${sp.title}</div>
            <div class="jimbo-bowl-wrap">
              <img class="jimbo-bowl-img" src="${sp.image}" alt="${sp.title}" loading="lazy" />
            </div>
            <span class="jimbo-price">TSH ${formatPrice(sp.price)}</span>
          </div>
        `;
      })
      .join("");

    jimboGridEl.querySelectorAll(".jimbo-tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        const secId = tile.getAttribute("data-spot-sec");
        const itemId = tile.getAttribute("data-spot-item");
        const sec = data.sections.find((s) => s.id === secId);
        const item = sec ? sec.items.find((i) => i.id === itemId) : null;
        if (item && sec) openDishModal(item, sec);
      });
    });
  }

  // 2. Render Sticky Category Navigation
  function renderCategoryNav() {
    if (!categoryNavEl) return;
    let html = `<button class="nav-cat-pill ${activeSectionId === "all" ? "active" : ""}" data-sec="all">ALL MENU</button>`;
    data.sections.forEach((sec) => {
      html += `<button class="nav-cat-pill ${activeSectionId === sec.id ? "active" : ""}" data-sec="${sec.id}">${sec.title}</button>`;
    });
    categoryNavEl.innerHTML = html;

    categoryNavEl.querySelectorAll(".nav-cat-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const secId = btn.getAttribute("data-sec");
        activeSectionId = secId;
        updateNavHighlight();

        isProgrammaticScroll = true;
        clearTimeout(scrollLockTimer);
        scrollLockTimer = setTimeout(() => {
          isProgrammaticScroll = false;
        }, 800);

        if (secId === "all") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = document.getElementById(`sec-${secId}`);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  function updateNavHighlight() {
    if (!categoryNavEl) return;
    categoryNavEl.querySelectorAll(".nav-cat-pill").forEach((btn) => {
      const isMatch = btn.getAttribute("data-sec") === activeSectionId;
      btn.classList.toggle("active", isMatch);
      if (isMatch) {
        // Horizontally scroll the sticky category container directly without affecting page window scroll
        const container = categoryNavEl;
        const targetLeft = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
        container.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    });
  }

  // 3. Render Dynamic Multi-Archetype Sections
  function renderDynamicSections() {
    const q = searchQuery.trim().toLowerCase();
    let html = "";

    data.sections.forEach((sec, idx) => {
      const items = sec.items.filter((item) => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
          sec.title.toLowerCase().includes(q)
        );
      });

      if (items.length === 0) return;

      // Special Dedicated Showcase for BITES: Exact Match to Reference Attachment Layout & Style
      if (sec.id === "bites") {
        html += renderArchetypeBitesShowcase(sec, items);
        return;
      }

      // Special Dedicated Showcase for SOUP: Single Row with Slow-Motion Spinning Bowls & Details Below
      if (sec.id === "soup") {
        html += renderArchetypeSoupShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for NANASI SPECIAL: Exact Match to Reference Poster (media_1793318509969_6335f730.jpg)
      if (sec.id === "nanasi-special-breakfast") {
        html += renderArchetypeNanasiSpecialShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for PLATTERS: Exact Match to Reference Card Attachment (media_1793341304968_cff66dcb.jpg)
      if (sec.id === "platters") {
        html += renderArchetypePlattersShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for CHIPS AND MEATS: 3-3-2 Centered Layout with Inspiration Structure (media_1793343444926_8ebf82fb.jpg)
      if (sec.id === "chips-and-meats") {
        html += renderArchetypeChipsAndMeatsShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for SALAD: Exact Match to Reference Layout & Style (media_1793344894096_15545fd1.jpg)
      if (sec.id === "salad") {
        html += renderArchetypeSaladShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for STANDALONE SIDES AND PORTION: Exact Match to Reference Attachment (media_1793345304508_b8f60422.jpg)
      if (sec.id === "standalone-sides") {
        html += renderArchetypeStandaloneSidesShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for PIZZA LARGE: Exact Match to Reference Poster (media_1793347247890_58b0c4cc.jpg) & Doodles (media_1793347454906_0d0fd356.jpg)
      if (sec.id === "pizza-large") {
        html += renderArchetypePizzaShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for PASTA: Exact Match to Reference Attachment (media_1793348696859_b21e6a41.jpg)
      if (sec.id === "pasta") {
        html += renderArchetypePastaShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for NANASI DESSERTS: Exact Match to Reference Attachments (4 per row, Green Plate-Overlapping Card Style & Pasta Title Structure)
      if (sec.id === "desserts") {
        html += renderArchetypeDessertsShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for TEA & BOTANICALS: Exact Match to Reference Attachment (media_1793349986897_abd4e97c.jpg) - Jimbo Concentric Ripple Grid with Pasta Heading Style
      if (sec.id === "tea-botanicals") {
        html += renderArchetypeTeaBotanicalsShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for CAFÉ COFFEE: Exact Match to Reference Attachment (media_1793350772012_8552aae9.jpg) - 2-2-1 Centered Layout with Salad Orange Price Badges
      if (sec.id === "cafe-coffee") {
        html += renderArchetypeCafeCoffeeShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for NANASI SPECIAL (COLD DRINKS): Standalone Sides & Portion Card Design, 3 Left + 3 Right, Cafe Coffee Heading Typography
      if (sec.id === "nanasi-cold-special") {
        html += renderArchetypeColdDrinksShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for FRESH JUICE: Style & Everything Like Pizza Large Section (User Request)
      if (sec.id === "fresh-juice") {
        html += renderArchetypeFreshJuiceShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for MILKSHAKE: Exact Match to User Request & Reference Attachments
      // Style like SALAD (clean 3-tier header, isolated dynamic splashes, overlapping orange circular badges, ingredients, accent line)
      // Horizontal order (3 columns x 2 rows responsive grid), Category Title in vintage gothic/blackletter font (Pirata One / Almendra)
      if (sec.id === "milkshake") {
        html += renderArchetypeMilkshakeShowcase(sec, items);
        return;
      }

      // Dedicated Showcase for SMOOTHIE: Realistic Tropical Sand Stage Showcase (User Request)
      if (sec.id === "smoothie") {
        html += renderArchetypeSmoothieShowcase(sec, items);
        return;
      }

      // Cycle dynamically across the signature poster archetypes for other sections
      const mode = (idx - 2) % 4;
      if (mode === 0) {
        html += renderArchetypeCheckCheck(sec, items, idx);
      } else if (mode === 1) {
        html += renderArchetypeBurgerCity(sec, items, idx);
      } else if (mode === 2) {
        html += renderArchetypeGourmetBoss(sec, items);
      } else {
        html += renderArchetypeYinYang(sec, items);
      }
    });

    if (!html) {
      html = `
        <div class="archetype-burgercity" style="text-align: center; padding: 48px 20px;">
          <h3 style="font-family: var(--font-display); font-size: 2.2rem; color: var(--nanasi-gold-bright); margin-bottom: 8px;">
            NO ITEMS FOUND
          </h3>
          <p style="margin-bottom: 18px;">No dishes matched "${searchQuery}".</p>
          <button type="button" id="resetSearchBtn" class="btn-nanasi gold">SHOW FULL MENU</button>
        </div>
      `;
    }

    menuContainerEl.innerHTML = html;

    const resetBtn = document.getElementById("resetSearchBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        searchQuery = "";
        searchInputEl.value = "";
        searchClearEl.classList.remove("visible");
        renderDynamicSections();
      });
    }

    // Bind clicks on all dish items across all archetypes
    menuContainerEl.querySelectorAll("[data-item-id]").forEach((el) => {
      el.addEventListener("click", () => {
        const secId = el.getAttribute("data-sec-id");
        const itemId = el.getAttribute("data-item-id");
        const sec = data.sections.find((s) => s.id === secId);
        const item = sec ? sec.items.find((i) => i.id === itemId) : null;
        if (item && sec) openDishModal(item, sec);
      });
    });

    // Bind clicks on section showcase plates
    menuContainerEl.querySelectorAll("[data-showcase-sec]").forEach((plate) => {
      plate.addEventListener("click", () => {
        const secId = plate.getAttribute("data-showcase-sec");
        const sec = data.sections.find((s) => s.id === secId);
        if (sec && sec.items.length > 0) openDishModal(sec.items[0], sec);
      });
    });

    observeScrollAnimations();
  }

  // DEDICATED SHOWCASE: Bites Section Styled Precisely After User Reference Attachment
  function renderArchetypeBitesShowcase(sec, items) {
    return `
      <section class="bites-showcase-section" id="sec-${sec.id}">
        <div class="bites-section-header">
          <h2 class="bites-main-title">${sec.title}</h2>
          <div class="bites-script-title">Fresh Bakery &amp; Morning Bites</div>
          <p class="bites-subtitle">${sec.subtitle || "Freshly baked East African bites, golden pastries & savory grills"}</p>
        </div>

        <div class="bites-cards-grid">
          ${items
            .map((item, idx) => {
              const titles = item.displayTitle || [item.name, ""];
              const toneIdx = idx % 4;
              const descriptors = item.descriptors || (item.subtitle ? [item.subtitle] : []);
              return `
                <div class="bites-card card-tone-${toneIdx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Organic Wave Layer Divided Across Card (Matching Reference Wave Flow) -->
                  <div class="bites-card-wave-layer" aria-hidden="true">
                    <svg viewBox="0 0 500 240" preserveAspectRatio="none" class="bites-wave-svg">
                      <path d="M 0,210 C 130,235 220,185 290,135 C 360,85 430,95 500,75 L 500,240 L 0,240 Z" fill="rgba(0, 0, 0, 0.35)" />
                      <path d="M 90,240 C 200,230 270,165 350,135 C 415,110 460,120 500,105 L 500,240 L 90,240 Z" fill="rgba(0, 0, 0, 0.22)" />
                    </svg>
                  </div>

                  <!-- Left Ceramic Dish Plate (Partially Cropped & Overflowing on Left Rim with Realistic Shadows) -->
                  <div class="bites-plate-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="bites-dish-img" loading="lazy" />
                  </div>

                  <!-- Right Info Section: Stacked Bold Uppercase Title, Flavor Descriptors, Bold Price -->
                  <div class="bites-info-wrapper">
                    <div class="bites-dish-heading">
                      <span class="bites-title-line-1">${titles[0]}</span>
                      ${titles[1] ? `<span class="bites-title-line-2">${titles[1]}</span>` : ""}
                    </div>

                    <div class="bites-descriptors-list">
                      ${descriptors.map((d) => `<span class="bites-desc-item">${d}</span>`).join("")}
                    </div>

                    <div class="bites-price-badge">
                      <span class="bites-price-currency">${sec.priceHeader || "TSH"}</span>
                      <span class="bites-price-num">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Café Coffee Section
  // Matching 3-Tier Typography Structure (Bebas Neue Title + #FF9E2C Cursive Script + Plus Jakarta Sans Subtitle)
  // Layout: 3 on top, 2 at bottom centered, Salad Orange Price Badges & Descriptions Below
  function renderArchetypeCafeCoffeeShowcase(sec, items) {
    return `
      <section class="coffee-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (3-Tier Typography matching Nanasi Desserts & Pasta format) -->
        <div class="coffee-section-header">
          <h2 class="coffee-main-title">${sec.title || "NANASI CAFÉ COFFEE"}</h2>
          <div class="coffee-script-title">Authentic Handcrafted Brews</div>
          <p class="coffee-subtitle">${sec.subtitle || "Barista-crafted espresso drinks from roasted Tanzanian beans"}</p>
        </div>

        <!-- 3-on-top, 2-at-bottom Centered Card Grid -->
        <div class="coffee-cards-grid">
          ${items
            .map((item, idx) => {
              const isRow1 = idx < 3;
              const rowClass = isRow1 ? "coffee-card-row1" : "coffee-card-row2";
              const priceText = formatPrice(item.price);
              return `
                <article class="coffee-card ${rowClass} coffee-card-${idx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Stage with Coffee Cup & Overlapping Circular Orange Price Badge -->
                  <div class="coffee-cup-stage">
                    <img src="${item.image}" alt="${item.name}" class="coffee-cup-img" loading="lazy" />
                    <!-- Overlapping Circular Price Badge matching SALAD / Nanasi Special -->
                    <div class="special-orange-price-badge coffee-orange-badge">
                      <span class="badge-curr">${sec.priceHeader || "TSH"}</span>
                      <span class="badge-val">${priceText}</span>
                    </div>
                  </div>

                  <!-- Details Directly Below Item: Bold Title & Full Description -->
                  <div class="coffee-card-details">
                    <h3 class="coffee-item-title">${item.name}</h3>
                    <p class="coffee-item-desc">${item.subtitle || ""}</p>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Soup Section (Reference Style: Static Overlapping Plate, Subtly Marbled Patterned Box, Centered Copy & Price)
  function renderArchetypeSoupShowcase(sec, items) {
    return `
      <section class="soup-showcase-section" id="sec-${sec.id}">
        <div class="soup-section-header">
          <h2 class="soup-main-title">${sec.title}</h2>
          <div class="soup-script-title">Traditional &amp; Slow-Simmered</div>
          <p class="soup-subtitle">${sec.subtitle || "Slow-simmered traditional broths served steaming hot"}</p>
        </div>

        <div class="soup-cards-grid">
          ${items
            .map((item, idx) => {
              const toneIdx = idx % 3;
              return `
                <div class="soup-card card-tone-${toneIdx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Subtle Light Organic Marbled Pattern Layer Inside Box (From Reference) -->
                  <div class="soup-card-pattern" aria-hidden="true"></div>

                  <!-- Plate Stage (Overlapping Top of the Card, Static - Zero Motion) -->
                  <div class="soup-plate-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="soup-static-plate" loading="lazy" />
                  </div>

                  <!-- Card Body Below Plate: Centered Uppercase Title, Description & Price -->
                  <div class="soup-card-body">
                    <h3 class="soup-dish-title">${item.name}</h3>
                    <p class="soup-dish-desc">${item.subtitle || ""}</p>
                    <div class="soup-price-row">
                      <span class="soup-currency">${sec.priceHeader || "TSH"}</span>
                      <span class="soup-amount">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Nanasi Special (Exact Reference Poster Layout: Seamless Dark Canvas, Nested Zigzag Dishes, No Leaves)
  function renderArchetypeNanasiSpecialShowcase(sec, items) {
    return `
      <section class="nanasi-special-showcase" id="sec-${sec.id}">
        <!-- Header: Centered Cutlery Badge, Giant Bold Headline, Cursive Script 'Special Price' -->
        <div class="special-poster-header">
          <div class="special-badge-circle" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D110E">
              <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
            </svg>
          </div>
          <h2 class="special-poster-title">${sec.title}</h2>
          <div class="special-script-title">Special Price</div>
          <p class="special-poster-subtitle">${sec.subtitle || "Complete hearty breakfast platters served with hot tea"}</p>
        </div>

        <!-- 3 Dishes Positioned Closely Clustered & Staggered (Matching Attachment Layout) -->
        <div class="special-dishes-stream">
          ${items
            .map((item, idx) => {
              const isFlipped = idx % 2 === 1; // Row 0: Left, Row 1: Right, Row 2: Left
              const titles = item.displayTitle || [item.name, ""];
              const layoutClass = isFlipped ? "layout-plate-right" : "layout-plate-left";

              const plateHtml = `
                <div class="special-plate-col">
                  <div class="special-plate-stage">
                    <img src="${item.image}" alt="${item.name}" class="special-dish-plate" loading="lazy" />
                    <!-- Overlapping Orange Circular Price Badge -->
                    <div class="special-orange-price-badge">
                      <span class="badge-curr">${sec.priceHeader || "TSH"}</span>
                      <span class="badge-val">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;

              const infoHtml = `
                <div class="special-info-col">
                  <h3 class="special-dish-heading">
                    <span class="special-title-main">${titles[0]}</span>
                    ${titles[1] ? `<span class="special-title-sub">${titles[1]}</span>` : ""}
                  </h3>
                  <p class="special-dish-ingredients">${item.subtitle || ""}</p>
                  <div class="special-accent-line" aria-hidden="true"></div>
                </div>
              `;

              return `
                <article class="special-dish-row ${layoutClass}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  ${isFlipped ? infoHtml + plateHtml : plateHtml + infoHtml}
                </article>
              `;
            })
            .join("")}
        </div>

        <!-- Poster Footer: Golden Call To Action (Exact to Attachment) -->
        <div class="special-poster-footer">
          <a href="#sec-${sec.id}" class="special-poster-order-btn" data-showcase-sec="${sec.id}">
            ORDER NOW
          </a>
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Platters Section (Styled Exactly After Attachment: Radiant Forest Green Cards with Marbled Swirl Watermark, Overlapping Ceramic Dish, Centered White Copy & Bold Price)
  function renderArchetypePlattersShowcase(sec, items) {
    return `
      <section class="platters-showcase-section" id="sec-${sec.id}">
        <div class="platters-section-header">
          <h2 class="platters-main-title">${sec.title}</h2>
          <div class="platters-script-title">Generous Sharing &amp; Combos</div>
          <p class="platters-subtitle">${sec.subtitle || "Generous sharing & combo platters for friends and family"}</p>
        </div>

        <div class="platters-cards-grid">
          ${items
            .map((item, idx) => {
              const toneIdx = idx % 2;
              return `
                <div class="platter-card card-tone-${toneIdx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Subtle Light Organic Marbled Pattern Layer Inside Box (From Attachment) -->
                  <div class="platter-card-pattern" aria-hidden="true"></div>

                  <!-- Plate Stage (Overlapping Top of the Card, Static - Zero Motion) -->
                  <div class="platter-plate-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="platter-static-plate" loading="lazy" />
                  </div>

                  <!-- Card Body Below Plate: Centered Uppercase Title, Description & Price -->
                  <div class="platter-card-body">
                    <h3 class="platter-dish-title">${item.name}</h3>
                    <p class="platter-dish-desc">${item.subtitle || ""}</p>
                    <div class="platter-price-row">
                      <span class="platter-currency">${sec.priceHeader || "TSH"}</span>
                      <span class="platter-amount">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // Dedicated Showcase for CHIPS AND MEATS: Inspiration Layout (Title, Price, Description + Circular Dish)
  // Structured strictly as 3 on Row 1, 3 on Row 2, 2 on Row 3 (Centered)
  function renderArchetypeChipsAndMeatsShowcase(sec, items) {
    return `
      <section class="chips-meats-showcase-section" id="sec-${sec.id}">
        <div class="chips-meats-section-header">
          <h2 class="chips-meats-main-title">${sec.title}</h2>
          <div class="chips-meats-script-title">Crispy &amp; Sizzling Specialties</div>
          <p class="chips-meats-subtitle">${sec.subtitle || "Crispy golden chips, flame-grilled meats, fresh fish & signature Changamoto"}</p>
        </div>

        <div class="chips-meats-grid">
          ${items
            .map((item) => {
              return `
                <div class="chips-meats-card" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Subtle Light Organic Marbled Pattern Layer (From Reference Attachment) -->
                  <div class="chips-meats-card-pattern" aria-hidden="true"></div>

                  <!-- Left: Dish Details (Title, Full Description, and Price Below) -->
                  <div class="chips-meats-info">
                    <h3 class="chips-meats-dish-title">${item.name}</h3>
                    <p class="chips-meats-desc">${item.subtitle || ""}</p>
                    <div class="chips-meats-price">
                      <span class="chips-meats-currency">${sec.priceHeader || "TSH"}</span>
                      <span class="chips-meats-amount">${formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <!-- Right: Circular Dish Photography -->
                  <div class="chips-meats-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="chips-meats-plate" loading="lazy" />
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Salad Section (Clean Dark Emerald Canvas, Alternating Zigzag Dishes & Nanasi Special Style Circular Price Badges)
  function renderArchetypeSaladShowcase(sec, items) {
    return `
      <section class="salad-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Clean Nanasi Cafe Typography, No Logo Above Title) -->
        <div class="salad-section-header">
          <h2 class="salad-main-title">${sec.title}</h2>
          <div class="salad-script-title">Fresh Bowls &amp; Nachos</div>
          <p class="salad-subtitle">${sec.subtitle || "Fresh garden bowls, grilled proteins & loaded nachos"}</p>
        </div>

        <!-- 4 Alternating Zigzag Dishes Stream -->
        <div class="salad-dishes-stream">
          ${items
            .map((item, idx) => {
              const isPlateRight = idx % 2 === 0; // Row 0 & 2: Text Left, Dish Right | Row 1 & 3: Dish Left, Text Right
              const layoutClass = isPlateRight ? "layout-plate-right" : "layout-plate-left";

              const textHtml = `
                <div class="salad-info-col">
                  <h3 class="salad-dish-title">${item.name}</h3>
                  <p class="salad-dish-ingredients">${item.subtitle || ""}</p>
                  <div class="special-accent-line" aria-hidden="true"></div>
                </div>
              `;

              const plateHtml = `
                <div class="salad-plate-col">
                  <div class="salad-plate-stage">
                    <img src="${item.image}" alt="${item.name}" class="salad-dish-plate" loading="lazy" />
                    <!-- Overlapping Circular Price Badge in NANASI SPECIAL style -->
                    <div class="special-orange-price-badge">
                      <span class="badge-curr">${sec.priceHeader || "TSH"}</span>
                      <span class="badge-val">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;

              return `
                <article class="salad-dish-row ${layoutClass}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  ${isPlateRight ? textHtml + plateHtml : plateHtml + textHtml}
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Standalone Sides & Portion (Exact Match to User Reference Attachment: 2x2 Ceramic Bowls on Textured Paper, Top-Right Illustrated Stamp, Bottom Title, Subtitle, Price & Iconic Red Seal)
  function renderArchetypeStandaloneSidesShowcase(sec, items) {
    return `
      <section class="standalone-showcase-section" id="sec-${sec.id}">
        <!-- Section Header Matching Chips & Meat / Bites / Platters Style -->
        <div class="standalone-section-header">
          <h2 class="standalone-main-title">${sec.title}</h2>
          <div class="standalone-script-title">Authentic Ceramic Bowl Collection</div>
          <p class="standalone-subtitle">${sec.subtitle || "Extra portions, spicy masala chips & creamy mash"}</p>
        </div>

        <!-- Stream of dishes matching Swahili Breakfast Attachment: Food on Left, Details on Right for ALL -->
        <div class="standalone-dishes-stream">
          ${items
            .map((item) => {
              return `
                <article class="standalone-dish-row" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Left: Ceramic Plate Stage with Overlapping Vibrant Orange Price Badge -->
                  <div class="standalone-plate-col">
                    <div class="standalone-plate-stage">
                      <img src="${item.image}" alt="${item.name}" class="standalone-dish-plate" loading="lazy" />
                      <div class="standalone-orange-price-badge">
                        <span class="standalone-badge-currency">${sec.priceHeader || "TSH"}</span>
                        <span class="standalone-badge-amount">${formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Dish Details (Title, Description & Sleek Accent Divider) -->
                  <div class="standalone-info-col">
                    <h3 class="standalone-dish-heading">${item.name}</h3>
                    <p class="standalone-dish-desc">${item.subtitle || ""}</p>
                    <div class="standalone-accent-line"></div>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Pizza Section (Exact Match to User Reference Poster: Endless Horizontal Forest Green Doodle Canvas, 5 Equal Columns with Left-Aligned Half-View Pizzas, Top Right Oval Badges, Left-Aligned Titles & Descriptions)
  function renderArchetypePizzaShowcase(sec, items) {
    return `
      <section class="pizza-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Display Title, Dancing Script Tag matching Ceramic Bowl style, Subtitle) -->
        <div class="pizza-section-header">
          <h2 class="pizza-main-title">${sec.title}</h2>
          <div class="pizza-script-title">Artisan Stone-Baked Pizzas</div>
          <p class="pizza-subtitle">${sec.subtitle || "Oven-baked large pizzas with stretchy mozzarella & bold toppings"}</p>
        </div>

        <!-- Endless Horizontal Strip Dissected into 5 Equal Columns (Exact to Attachment) -->
        <div class="pizza-endless-grid">
          ${items
            .map((item) => {
              const priceText = item.price >= 1000 ? (item.price / 1000) + "K" : formatPrice(item.price);
              return `
                <div class="pizza-col-panel" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Top Half-View Pizza Stage with Corner Oval Price Badge (Exact to Attachment) -->
                  <div class="pizza-half-stage">
                    <img src="${item.image}" alt="${item.name}" class="pizza-half-dish" loading="lazy" />
                    <div class="pizza-price-oval">
                      <span class="pizza-price-cur">${sec.priceHeader || "TSH"}</span>
                      <span class="pizza-price-num">${priceText}</span>
                    </div>
                  </div>

                  <!-- Details Below Aligned to Left Exactly Like Attachment -->
                  <div class="pizza-col-info">
                    <h3 class="pizza-dish-title">${item.name}</h3>
                    <p class="pizza-dish-desc">${item.subtitle || ""}</p>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Pasta Section (Exact Reference Attachment Style: Description Left, Plate Right, Seamless Dark Canvas & Orange Price Badge)
  function renderArchetypePastaShowcase(sec, items) {
    const item = items[0] || {
      id: "shire-pasta",
      name: "Shire Pasta",
      price: 15000,
      subtitle: "Spaghetti, bell pepper, meats (beef/chicken)",
      image: "assets/dishes/pasta_shire_clean.png"
    };

    return `
      <section class="pasta-showcase-section" id="sec-${sec.id}">
        <!-- Section Header -->
        <div class="pasta-section-header">
          <h2 class="pasta-main-title">${sec.title}</h2>
          <div class="pasta-script-title">Authentic Sautéed Pasta</div>
          <p class="pasta-subtitle">${sec.subtitle || "Rich, savory stir-fried spaghetti with tender meats"}</p>
        </div>

        <!-- Pasta Showcase Row: Descriptions on Left, Food on Right (Per User Instruction) -->
        <div class="pasta-dish-container">
          <article class="pasta-dish-row" data-item-id="${item.id}" data-sec-id="${sec.id}">
            <!-- Left Column: Descriptions -->
            <div class="pasta-info-col">
              <h3 class="pasta-dish-title">${item.name}</h3>
              <p class="pasta-dish-desc">${item.subtitle || "Spaghetti, bell pepper, meats (beef/chicken)"}</p>
              <div class="special-accent-line" aria-hidden="true"></div>
            </div>

            <!-- Right Column: Plate with Overlapping Circular Price Badge -->
            <div class="pasta-plate-col">
              <div class="pasta-plate-stage">
                <img src="${item.image}" alt="${item.name}" class="pasta-dish-plate" loading="lazy" />
                <!-- Overlapping Orange Circular Price Badge -->
                <div class="special-orange-price-badge">
                  <span class="badge-curr">${sec.priceHeader || "TSH"}</span>
                  <span class="badge-val">${formatPrice(item.price)}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Nanasi Desserts Section
  // Title structure matching PASTA (Bold Uppercase Main Title + Cursive Script Accent + Subtitle)
  // Cards styled matching Attachment (Deep Emerald Green Box with Marbled Swirls, Overlapping Ceramic Dish, Centered White Copy & Bold Price)
  // Layout: 4 Cards Per Row
  function renderArchetypeDessertsShowcase(sec, items) {
    return `
      <section class="desserts-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Matching PASTA 3-Tier Title Structure) -->
        <div class="desserts-section-header">
          <h2 class="desserts-main-title">${sec.title}</h2>
          <div class="desserts-script-title">Authentic Handcrafted Desserts</div>
          <p class="desserts-subtitle">${sec.subtitle || "Freshly baked cakes per slice, mousse cakes & sweet waffles"}</p>
        </div>

        <!-- 4-per-row Card Grid (Matching Attachment Card Design) -->
        <div class="desserts-cards-grid">
          ${items
            .map((item, idx) => {
              const toneIdx = idx % 2;
              return `
                <div class="dessert-card card-tone-${toneIdx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Subtle Light Organic Marbled Pattern Layer Inside Box (From Attachment) -->
                  <div class="dessert-card-pattern" aria-hidden="true"></div>

                  <!-- Plate Stage (Overlapping Top of the Card, Static - Zero Motion) -->
                  <div class="dessert-plate-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="dessert-plate-img" loading="lazy" />
                  </div>

                  <!-- Card Body Below Plate: Centered Uppercase Title, Description & Bold Price -->
                  <div class="dessert-card-body">
                    <h3 class="dessert-dish-title">${item.name}</h3>
                    <p class="dessert-dish-desc">${item.subtitle || ""}</p>
                    <div class="dessert-price-row">
                      <span class="dessert-currency">${sec.priceHeader || "TSH"}</span>
                      <span class="dessert-amount">${formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Tea & Botanicals Section
  // Matching PASTA 3-Tier Headings Style (Bebas Neue Main Title + #FF9E2C Cursive Accent + Plus Jakarta Sans Subtitle)
  // Seamless Canvas: Elements rendered cleanly without colored background boxes (Per User Instruction)
  function renderArchetypeTeaBotanicalsShowcase(sec, items) {
    // Helper to format stacked title in clean Bebas Neue uppercase lines
    function splitTitleJimbo(name) {
      const parts = name.trim().split(" ");
      if (parts.length <= 1) return [name.toUpperCase(), ""];
      if (parts.length === 2) return [parts[0].toUpperCase(), parts[1].toUpperCase()];
      if (name.toLowerCase().includes("dawa")) {
        return ["GINGER LEMON", "DAWA TEA"];
      }
      if (parts.length === 3) return [`${parts[0]} ${parts[1]}`.toUpperCase(), parts[2].toUpperCase()];
      return [parts.slice(0, 2).join(" ").toUpperCase(), parts.slice(2).join(" ").toUpperCase()];
    }

    return `
      <section class="tea-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Exact PASTA Style Match) -->
        <div class="pasta-section-header">
          <h2 class="pasta-main-title">${sec.title}</h2>
          <div class="pasta-script-title">Authentic Herbal & Spiced Teas</div>
          <p class="pasta-subtitle">${sec.subtitle || "Warming black teas, spiced dawa & soothing herbal infusions"}</p>
        </div>

        <!-- 3-Column Grid without Colored Boxes (Seamless Dark Canvas) -->
        <div class="tea-jimbo-grid">
          ${items
            .map((item) => {
              const [line1, line2] = splitTitleJimbo(item.name);
              const priceText = formatPrice(item.price);

              return `
                <article class="tea-jimbo-card" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Stacked Bold Typography on Top -->
                  <div class="tea-jimbo-header">
                    <h3 class="tea-jimbo-title">
                      <span class="tea-title-line">${line1}</span>
                      ${line2 ? `<span class="tea-title-line">${line2}</span>` : ""}
                    </h3>
                    <p class="tea-jimbo-desc">${item.subtitle || ""}</p>
                  </div>

                  <!-- Centered Teacup Dish Presentation -->
                  <div class="tea-jimbo-stage">
                    <img src="${item.image}" alt="${item.name}" class="tea-dish-cup" loading="lazy" />
                    <!-- Nanasi Special Circular Orange Price Badge -->
                    <div class="tea-price-badge">
                      <span class="tea-price-cur">${sec.priceHeader || "TSH"}</span>
                      <span class="tea-price-num">${priceText}</span>
                    </div>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Nanasi Special (Cold Drinks)
  // Exact Match to Reference Attachment (media_1793354409463_f17136eb.jpg - Fresh Bakery & Morning Bites Card Style):
  // Emerald Green Gradient Card with Fluid Wave SVG, Precision Glass on Left, Right-Aligned Typography & Yellow TSH Price Badge.
  // Layout: 3 on the Left, 3 on the Right (2 Columns of 3 Cards).
  // Heading: Café Coffee Typography Structure.
  function renderArchetypeColdDrinksShowcase(sec, items) {
    const leftItems = items.slice(0, 3);
    const rightItems = items.slice(3, 6);

    const renderDrinkCard = (item, idx) => {
      const titles = item.displayTitle || [item.name, ""];
      const toneIdx = idx % 4;
      const descriptors = item.descriptors || (item.subtitle ? [item.subtitle] : []);
      const priceText = formatPrice(item.price);

      return `
        <div class="bites-card cold-drink-bites-card card-tone-${toneIdx}" data-item-id="${item.id}" data-sec-id="${sec.id}">
          <!-- Organic Wave Layer Divided Across Card (Matching Reference Wave Flow) -->
          <div class="bites-card-wave-layer" aria-hidden="true">
            <svg viewBox="0 0 500 240" preserveAspectRatio="none" class="bites-wave-svg">
              <path d="M 0,210 C 130,235 220,185 290,135 C 360,85 430,95 500,75 L 500,240 L 0,240 Z" fill="rgba(0, 0, 0, 0.35)" />
              <path d="M 90,240 C 200,230 270,165 350,135 C 415,110 460,120 500,105 L 500,240 L 90,240 Z" fill="rgba(0, 0, 0, 0.22)" />
            </svg>
          </div>

          <!-- Left Dish/Glass Stage: Precision Cutout Tall Glass Standing Proudly on Left -->
          <div class="cold-drink-glass-wrapper">
            <img src="${item.image}" alt="${item.name}" class="cold-drink-glass-img" loading="lazy" />
          </div>

          <!-- Right Content Stage (Right-Aligned per Reference Attachment) -->
          <div class="bites-info-wrapper">
            <h3 class="bites-dish-heading">
              <span class="bites-title-line-1">${titles[0]}</span>
              ${titles[1] ? `<span class="bites-title-line-2">${titles[1]}</span>` : ""}
            </h3>

            <div class="bites-descriptors-list">
              ${descriptors.map((d) => `<span class="bites-desc-item">${d}</span>`).join("")}
            </div>

            <!-- Price Badge: Bold Yellow 'TSH' with Bold White Amount -->
            <div class="bites-price-badge">
              <span class="bites-price-currency">${sec.priceHeader || "TSH"}</span>
              <span class="bites-price-num">${priceText}</span>
            </div>
          </div>
        </div>
      `;
    };

    return `
      <section class="cold-drinks-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Exact Match to Nanasi Café Coffee Typography) -->
        <div class="cold-drinks-section-header">
          <h2 class="cold-drinks-main-title">${sec.title}</h2>
          <div class="cold-drinks-script-title">Authentic Handcrafted Brews</div>
          <p class="cold-drinks-subtitle">${sec.subtitle || "Barista-crafted espresso drinks from roasted Tanzanian beans"}</p>
        </div>

        <!-- 3 on Top and 3 on the Bottom (3-Column x 2-Row Grid) -->
        <div class="cold-drinks-stream-grid">
          ${items.slice(0, 6).map((item, idx) => renderDrinkCard(item, idx)).join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Fresh Juice Section
  // Section Header (Display Title + Dancing Script Tag in #FF9E2C + Subtitle),
  // Horizontal Endless Strip Columns, Clean Cups without top badge,
  // Left-Aligned Typography with Full Price Labeled Directly Below Description (e.g. TSH 5,000)
  function renderArchetypeFreshJuiceShowcase(sec, items) {
    return `
      <section class="pizza-showcase-section juice-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Exact Pizza Large Header Match) -->
        <div class="pizza-section-header">
          <h2 class="pizza-main-title">${sec.title}</h2>
          <div class="pizza-script-title">100% Pure Pressed Tropical Juices</div>
          <p class="pizza-subtitle">${sec.subtitle || "Chilled whole fruit juices, tropical blends & thirst-quenching refreshments"}</p>
        </div>

        <!-- Horizontal Endless Strip Dissected into Columns -->
        <div class="pizza-endless-grid juice-endless-grid">
          ${items
            .map((item) => {
              const fullPrice = formatPrice(item.price);
              return `
                <div class="pizza-col-panel juice-col-panel" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Top Stage with Dish Photography (Pristine transparent cups) -->
                  <div class="juice-dish-stage">
                    <img src="${item.image}" alt="${item.name}" class="juice-dish-cup" loading="lazy" />
                  </div>

                  <!-- Details Below Aligned to Left with Full Price Labeled Below Description -->
                  <div class="pizza-col-info juice-col-info">
                    <h3 class="pizza-dish-title juice-dish-title">${item.name}</h3>
                    <p class="pizza-dish-desc juice-dish-desc">${item.subtitle || ""}</p>
                    <div class="juice-dish-price">
                      <span class="juice-price-cur">${sec.priceHeader || "TSH"}</span>
                      <span class="juice-price-val">${fullPrice}</span>
                    </div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Milkshake Section
  // Exact Match to User Request & Reference Attachments:
  // 1. Header: Style like section SALAD (Bebas Neue Display Title + Dancing Script Tag in #FF9E2C + Subtitle)
  // 2. Horizontal Order Grid: 3 columns x 2 rows
  // 3. Category Title Font: Ornate vintage Gothic/Fraktur style (Pirata One / Almendra) matching user reference screenshot
  // 4. Circular Orange Price Badge in SALAD / Nanasi Special style (TSH 10,000) overlapping the shake
  // 5. Clean descriptions & accent line below
  function renderArchetypeMilkshakeShowcase(sec, items) {
    return `
      <section class="milkshake-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Exact Match to Salad Style) -->
        <div class="milkshake-section-header">
          <h2 class="milkshake-main-title">${sec.title}</h2>
          <div class="milkshake-script-title">${sec.scriptTitle || "Fresh Handcrafted Shakes"}</div>
          <p class="milkshake-subtitle">${sec.subtitle || "Thick, indulgent ice cream shakes crowned with whipped cream & rich toppings"}</p>
        </div>

        <!-- 3x2 Horizontal Order Grid -->
        <div class="milkshake-cards-grid">
          ${items
            .map((item, idx) => {
              const priceText = formatPrice(item.price);
              const colorStyle = item.color ? `style="--shake-theme: ${item.color};"` : "";
              return `
                <article class="milkshake-card milkshake-card-${idx}" ${colorStyle} data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <!-- Category Title in Vintage Gothic/Fraktur Font Arched Matching Reference Attachment -->
                  <div class="milkshake-arch-title-wrap">
                    <svg class="milkshake-arch-svg" viewBox="0 0 260 55" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                      <defs>
                        <path id="shake-arch-${idx}" d="M 15,48 Q 130,6 245,48" fill="transparent" />
                      </defs>
                      <text class="milkshake-arch-text" text-anchor="middle">
                        <textPath href="#shake-arch-${idx}" startOffset="50%">${item.name}</textPath>
                      </text>
                    </svg>
                    <h3 class="milkshake-category-sr-title sr-only">${item.name}</h3>
                  </div>

                  <!-- Dynamic Milkshake Stage with Overlapping Circular Orange Price Badge -->
                  <div class="milkshake-stage">
                    <img src="${item.image}" alt="${item.name}" class="milkshake-img" loading="lazy" />
                    <!-- Overlapping Circular Price Badge matching SALAD / Nanasi Special -->
                    <div class="special-orange-price-badge milkshake-orange-badge">
                      <span class="badge-curr">${sec.priceHeader || "TSH"}</span>
                      <span class="badge-val">${priceText}</span>
                    </div>
                  </div>

                  <!-- Details Directly Below: Description & Gold Accent Line -->
                  <div class="milkshake-card-details">
                    <p class="milkshake-item-desc">${item.subtitle || ""}</p>
                    <div class="milkshake-accent-line" aria-hidden="true"></div>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  // DEDICATED SHOWCASE: Pure Smoothies Showcase (User Reference Attachment)
  function renderArchetypeSmoothieShowcase(sec, items) {
    return `
      <section class="pizza-showcase-section smoothie-showcase-section" id="sec-${sec.id}">
        <!-- Section Header (Exact Fresh Juice & Pizza Large Header Match) -->
        <div class="pizza-section-header">
          <h2 class="pizza-main-title">${sec.title}</h2>
          <div class="pizza-script-title">${sec.scriptTitle || "100% Pure Pressed Tropical Juices"}</div>
          <p class="pizza-subtitle">${sec.subtitle || "100% pure pressed tropical fruit juices"}</p>
        </div>

        <!-- Clean Smoothie Cups Showcase Stage -->
        <div class="smoothie-showcase-stage">
          <div class="smoothie-cups-cluster-wrap">
            <img src="assets/dishes/smoothie_cups_showcase.png" alt="Nanasi Smoothies" class="smoothie-cluster-img" />

            <!-- 4 Interactive Columns with Gold Price Badges & Hitareas Over Cups -->
            <div class="smoothie-cups-grid">
              ${items
                .map((item, idx) => {
                  const priceText = item.price >= 1000 ? item.price / 1000 + "K" : formatPrice(item.price);
                  return `
                    <div class="smoothie-cup-col smoothie-cup-col-${idx + 1}" data-item-id="${item.id}" data-sec-id="${sec.id}" title="${item.name} • ${formatPrice(item.price)}">
                      <!-- Gold Price Oval Badge -->
                      <div class="pizza-price-oval smoothie-price-badge">
                        <span class="pizza-price-cur">${sec.priceHeader || "TZS"}</span>
                        <span class="pizza-price-num">${priceText}</span>
                      </div>
                      <!-- Hit Area Covering Cup -->
                      <div class="smoothie-hitarea"></div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>

          <!-- Clean 4-Column Labels Below the Cups -->
          <div class="smoothie-labels-grid">
            ${items
              .map((item) => {
                return `
                  <div class="smoothie-label-card" data-item-id="${item.id}" data-sec-id="${sec.id}">
                    <h3 class="smoothie-label-title">${item.name}</h3>
                    <p class="smoothie-label-desc">${item.subtitle || ""}</p>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  // ARCHETYPE A: Attachment 7 (CheckCheck) — Alternating Rounded Pill Stage + Scalloped Price Badges
  function renderArchetypeCheckCheck(sec, items, idx) {
    const isReverse = idx % 8 === 4;
    const plateHtml = `<img class="cc-plate-circle" src="${sec.bannerImage}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />`;
    const bodyHtml = `
      <div>
        <div class="cc-title-row">
          <h2 class="cc-heading">${sec.title}</h2>
          <span class="cc-order-pill">ORDER NOW • ${sec.priceHeader || "TSH"}</span>
        </div>
        <p style="font-size: 0.84rem; opacity: 0.82; margin-bottom: 14px;">${sec.subtitle || ""}</p>
        <div class="cc-items-grid">
          ${items
            .map(
              (item) => `
            <div class="cc-item-card" data-item-id="${item.id}" data-sec-id="${sec.id}">
              <div class="cc-item-left">
                <img class="cc-mini-thumb" src="${item.image}" alt="${item.name}" loading="lazy" />
                <div>
                  <div class="cc-item-name">${item.name}</div>
                  ${item.subtitle ? `<div class="cc-item-sub">${item.subtitle}</div>` : ""}
                </div>
              </div>
              <div class="scallop-price-badge">
                <small>${sec.priceHeader || "TSH"}</small>
                <span>${formatPrice(item.price)}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    return `
      <section class="dyn-section archetype-checkcheck ${isReverse ? "reverse" : ""} reveal-on-scroll" id="sec-${sec.id}" data-section-id="${sec.id}">
        <div class="cc-stage-card">
          ${isReverse ? bodyHtml + plateHtml : plateHtml + bodyHtml}
        </div>
      </section>
    `;
  }

  // ARCHETYPE B: Attachment 2 (Burger City) — Curved S-Path Line + Slanted Header + Dotted Leaders
  function renderArchetypeBurgerCity(sec, items, idx) {
    const leftPlate = idx % 8 === 5;
    const showcaseImg = items[items.length - 1] ? items[items.length - 1].image : sec.bannerImage;
    const listCol = `
      <div>
        <div class="bc-header-wrap">
          <h2 class="bc-slanted-title">${sec.title}</h2>
          <p class="bc-sub">${sec.subtitle || ""} (${sec.itemHeader || "ITEM"} • ${sec.priceHeader || "TSH"})</p>
        </div>
        <ul class="bc-leader-list">
          ${items
            .map(
              (item) => `
            <li class="bc-leader-row" data-item-id="${item.id}" data-sec-id="${sec.id}">
              <img class="bc-thumb" src="${item.image}" alt="${item.name}" loading="lazy" />
              <div class="bc-row-main">
                <div class="bc-name-dots">
                  <span class="bc-item-name">${item.name}</span>
                  <span class="bc-dots"></span>
                  <span class="bc-item-price">${formatPrice(item.price)}</span>
                </div>
                ${item.subtitle ? `<div class="bc-item-desc">${item.subtitle}</div>` : ""}
              </div>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;

    const plateCol = `
      <div class="bc-floating-showcase">
        <img class="bc-showcase-plate" src="${sec.bannerImage}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />
        ${
          items.length > 3
            ? `<img class="bc-showcase-plate" style="width:140px;height:140px;margin-top:-24px;border-color:var(--nanasi-cream);" src="${showcaseImg}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />`
            : ""
        }
      </div>
    `;

    return `
      <section class="dyn-section archetype-burgercity ${leftPlate ? "left-plate" : ""} reveal-on-scroll" id="sec-${sec.id}" data-section-id="${sec.id}">
        <svg class="bc-scurve-svg" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M 80 40 Q 420 -20, 400 200 T 720 360" fill="none" stroke="#C89B3C" stroke-width="3" stroke-dasharray="8 8" />
          <circle cx="80" cy="40" r="7" fill="#C89B3C" />
          <circle cx="720" cy="360" r="7" fill="#C89B3C" />
        </svg>
        <div class="bc-content-grid">
          ${leftPlate ? plateCol + listCol : listCol + plateCol}
        </div>
      </section>
    `;
  }

  // ARCHETYPE C: Attachment 5 (Gourmet Boss) — Left Vertical Ribbon Strip + Stacked Plates + Cream Pill Banner
  function renderArchetypeGourmetBoss(sec, items) {
    const secondImg = items[1] ? items[1].image : sec.bannerImage;
    const thirdImg = items[2] ? items[2].image : sec.bannerImage;

    return `
      <section class="dyn-section archetype-gourmetboss reveal-on-scroll" id="sec-${sec.id}" data-section-id="${sec.id}">
        <div class="gb-grid">
          <div class="gb-vertical-ribbon">
            <img class="gb-ribbon-plate" src="${sec.bannerImage}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />
            ${
              items.length > 2
                ? `<img class="gb-ribbon-plate" src="${secondImg}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />`
                : ""
            }
            ${
              items.length > 5
                ? `<img class="gb-ribbon-plate" src="${thirdImg}" alt="${sec.title}" data-showcase-sec="${sec.id}" loading="lazy" />`
                : ""
            }
          </div>

          <div class="gb-menu-column">
            <h2 class="gb-white-pill-banner">${sec.title}</h2>
            <p class="gb-subtitle">${sec.subtitle || ""} — All prices in ${sec.priceHeader || "TSH"}</p>
            <ul class="gb-rows">
              ${items
                .map(
                  (item) => `
                <li class="gb-row" data-item-id="${item.id}" data-sec-id="${sec.id}">
                  <img class="gb-row-thumb" src="${item.image}" alt="${item.name}" loading="lazy" />
                  <div class="gb-row-info">
                    <div class="gb-row-top">
                      <span class="gb-row-name">${item.name}</span>
                      <span class="gb-row-line"></span>
                      <span class="gb-row-price">${sec.priceHeader || "TSH"} ${formatPrice(item.price)}</span>
                    </div>
                    ${item.subtitle ? `<div class="gb-row-sub">${item.subtitle}</div>` : ""}
                  </div>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  // ARCHETYPE D: Attachment 3 (Sub Floors) — Yin-Yang Curved Split Canvas + Matte Ceramic Bowls
  function renderArchetypeYinYang(sec, items) {
    return `
      <section class="dyn-section archetype-yinyang reveal-on-scroll" id="sec-${sec.id}" data-section-id="${sec.id}">
        <div class="yy-inner">
          <div class="yy-header">
            <h2 class="yy-title-box">${sec.title}</h2>
            <span class="yy-badge">${sec.itemHeader || "ITEM"} • ${sec.priceHeader || "TSH"}</span>
          </div>
          <div class="yy-bowls-grid">
            ${items
              .map(
                (item) => `
              <article class="yy-bowl-card" data-item-id="${item.id}" data-sec-id="${sec.id}">
                <div class="yy-ceramic-bowl">
                  <img src="${item.image}" alt="${item.name}" loading="lazy" />
                </div>
                <div class="yy-card-info">
                  <div class="yy-card-name">${item.name}</div>
                  ${item.subtitle ? `<div class="yy-card-sub">${item.subtitle}</div>` : `<div class="yy-card-sub">${sec.title}</div>`}
                  <span class="yy-card-price">${sec.priceHeader || "TSH"} ${formatPrice(item.price)}</span>
                </div>
              </article>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  // Scroll Reveal Observer
  // DYNAMIC SCROLL TRANSITIONS: Spinning Dishes, Shaking Drinks & Pizzas Sliding in From Left with Slow Smooth Spin
  // Trigger entrance transition for a specific section ONLY when it is visibly on screen
  function triggerSectionEntrance(sec) {
    if (!sec || sec.classList.contains("is-revealed")) return;
    sec.classList.add("is-revealed", "is-visible");

    // Also mark cards and drink/dish containers within this specific section
    sec.querySelectorAll(
      ".pizza-col-panel, .bites-card, .soup-card, .special-plate-col, " +
      ".platter-card, .chips-meats-card, .salad-plate-col, .standalone-plate-col, " +
      ".pasta-plate-col, .dessert-card, .jimbo-card, .coffee-card, " +
      ".cold-drink-bites-card, .tea-jimbo-card, .juice-col-panel, " +
      ".milkshake-card, .smoothie-cups-cluster-wrap, .smoothie-cup-col"
    ).forEach((child) => {
      child.classList.add("is-revealed", "is-visible");
    });

    // Allow full duration for slow-motion 2.4s spin + staggered delays to complete
    setTimeout(() => {
      sec.classList.add("anim-settled");
    }, 4400);
  }

  // Precise Scroll-Triggered Entrance Transitions per Section (Starts ONLY when sections are visible)
  function observeScrollAnimations() {
    const sections = document.querySelectorAll(
      "section[id^='sec-'], .jimbo-hero-section, .dyn-section"
    );

    const foodContentSelector =
      ".bites-cards-grid, .soup-cards-grid, .platters-cards-grid, " +
      ".pizza-endless-grid, .cold-drinks-stream-grid, .chips-meats-grid, " +
      ".salad-dish-row, .salad-plate-stage, .standalone-dish-row, .standalone-plate-stage, " +
      ".pasta-dish-container, .desserts-cards-grid, .tea-jimbo-grid, " +
      ".coffee-cards-grid, .milkshake-cards-grid, .smoothie-showcase-stage, " +
      ".smoothie-cups-grid, .cc-items-grid, .bc-content-grid, .gb-grid, .yy-bowls-grid";

    // 1. IntersectionObserver configured to trigger ONLY when content is genuinely visible in viewport
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerSectionEntrance(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      sections.forEach((sec) => observer.observe(sec));
    }

    // 2. Viewport visibility checker (Triggers ONLY when section dishes are visibly in view)
    function checkVisibleSections() {
      const windowHeight = window.innerHeight;
      sections.forEach((sec) => {
        if (!sec.classList.contains("is-revealed")) {
          const content = sec.querySelector(foodContentSelector);
          const target = content || sec;
          const rect = target.getBoundingClientRect();
          // Only start when the food dishes/items are visibly inside the viewport
          if (rect.top <= windowHeight - 100 && rect.bottom >= 80) {
            triggerSectionEntrance(sec);
          }
        }
      });
    }

    // Check visible sections on initial load
    checkVisibleSections();

    // Listen on scroll to fire transitions dynamically as each section becomes visible
    window.addEventListener("scroll", checkVisibleSections, { passive: true });
  }

  // Open Dish Modal
  function openDishModal(item, sec) {
    document.getElementById("modalDishImg").src = item.image;
    document.getElementById("modalDishImg").alt = item.name;
    document.getElementById("modalDishCat").textContent = `${sec.title} • NANASI CAFE`;
    document.getElementById("modalDishName").textContent = item.name;
    document.getElementById("modalDishPrice").textContent = `${sec.priceHeader || "TSH"} ${formatPrice(item.price)}`;
    document.getElementById("modalDishDesc").textContent =
      item.subtitle || sec.subtitle || "Freshly prepared at Nanasi Cafe.";

    const msg = encodeURIComponent(
      `Hello NANASI CAFE! 👋\nI would like to order / enquire about:\n• *${item.name}* — ${sec.priceHeader || "TSH"} ${formatPrice(item.price)}`
    );
    document.getElementById("modalOrderBtn").href = `https://wa.me/${data.restaurant.whatsappNumber}?text=${msg}`;

    dishModalEl.classList.add("open");
  }

  // Shareable menu URL (clean: no #hash, works for http/https; fallback for local files)
  function getShareUrl() {
    const { protocol, origin, pathname, search } = window.location;
    if (protocol === "http:" || protocol === "https:") {
      return origin + pathname + search;
    }
    return "https://nanasicafe.co.tz/menu";
  }

  // Build QR locally (works offline & prints reliably); falls back to web API if library missing
  function buildQrSrc(url) {
    if (typeof qrcode === "function") {
      try {
        const qr = qrcode(0, "M");
        qr.addData(url);
        qr.make();
        const svg = qr
          .createSvgTag({ cellSize: 10, margin: 2, scalable: true })
          .replace(/fill="black"/g, 'fill="#0F3D2E"')
          .replace(/fill="white"/g, 'fill="#FFFFFF"');
        return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      } catch (err) {
        console.warn("Local QR generation failed, using fallback", err);
      }
    }
    return `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=8&color=0F3D2E&bgcolor=FFFFFF&data=${encodeURIComponent(url)}`;
  }

  // Open QR Modal
  function openQrModal() {
    const liveUrl = getShareUrl();
    const qrImg = document.getElementById("qrImage");
    qrImg.src = buildQrSrc(liveUrl);
    document.getElementById("qrUrlText").textContent = liveUrl.replace(/^https?:\/\//, "");
    qrModalEl.classList.add("open");
  }

  // Scroll Spy (Smooth, Throttled & Glitch-Free)
  function setupScrollSpy() {
    let scrollTicking = false;
    const topbar = document.getElementById("siteTopbar");
    const track = document.getElementById("categoryNavTrack");
    const navLinks = document.querySelectorAll(".cat-nav-link");

    const sectionIds = [
      "hero",
      "sec-bites",
      "sec-soup",
      "sec-nanasi-special-breakfast",
      "sec-platters",
      "sec-chips-and-meats",
      "sec-salad",
      "sec-standalone-sides",
      "sec-pizza-large",
      "sec-pasta",
      "sec-desserts",
      "sec-tea-botanicals",
      "sec-cafe-coffee",
      "sec-nanasi-cold-special",
      "sec-fresh-juice",
      "sec-milkshake",
      "sec-smoothie"
    ];

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            // 1. Translucent near-transparent effect on scroll
            if (topbar) {
              topbar.classList.toggle("is-scrolled", window.scrollY > 20);
            }

            if (isProgrammaticScroll) {
              scrollTicking = false;
              return;
            }

            // 2. Determine active section
            const scrollPos = window.scrollY + 120;
            let currentSecId = "hero";

            for (let i = 0; i < sectionIds.length; i++) {
              const el = document.getElementById(sectionIds[i]);
              if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                  currentSecId = sectionIds[i];
                  break;
                } else if (scrollPos >= top) {
                  currentSecId = sectionIds[i];
                }
              }
            }

            // 3. Map to one of the 5 main topbar categories
            const secToMainCatMap = {
              "hero": "hero",
              "sec-bites": "sec-nanasi-special-breakfast",
              "sec-soup": "sec-nanasi-special-breakfast",
              "sec-nanasi-special-breakfast": "sec-nanasi-special-breakfast",
              "sec-platters": "sec-nanasi-special-breakfast",
              "sec-chips-and-meats": "sec-chips-and-meats",
              "sec-salad": "sec-chips-and-meats",
              "sec-standalone-sides": "sec-chips-and-meats",
              "sec-pizza-large": "sec-pizza-large",
              "sec-pasta": "sec-chips-and-meats",
              "sec-desserts": "sec-chips-and-meats",
              "sec-tea-botanicals": "sec-fresh-juice",
              "sec-cafe-coffee": "sec-fresh-juice",
              "sec-nanasi-cold-special": "sec-fresh-juice",
              "sec-fresh-juice": "sec-fresh-juice",
              "sec-milkshake": "sec-fresh-juice",
              "sec-smoothie": "sec-fresh-juice"
            };

            const mappedActiveCat = secToMainCatMap[currentSecId] || "hero";

            // Highlight corresponding category link in top bar
            navLinks.forEach((link) => {
              const target = link.getAttribute("data-section");
              const isMatch = target === mappedActiveCat;
              link.classList.toggle("active", isMatch);
            });

            scrollTicking = false;
          });
          scrollTicking = true;
        }
      },
      { passive: true }
    );
  }

  // ==========================================================================
  // TRANSLUCENT TOPBAR & CATEGORY NAVIGATION TRACK
  // ==========================================================================
  function setupTopbarNavigation() {
    const track = document.getElementById("categoryNavTrack");
    const catAllBtn = document.getElementById("catAllBtn");
    const catDropdown = document.getElementById("catDropdown");

    // Horizontal mouse-wheel scroll on track
    if (track) {
      track.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
          e.preventDefault();
          track.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }

    // Toggle All (16) Dropdown
    if (catAllBtn && catDropdown) {
      catAllBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = catDropdown.classList.toggle("open");
        catAllBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!catDropdown.contains(e.target) && e.target !== catAllBtn && !catAllBtn.contains(e.target)) {
          catDropdown.classList.remove("open");
          catAllBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Smooth scroll and auto-close dropdown on link click
    document.querySelectorAll(".cat-nav-link, .cat-drop-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const targetId = href.substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            e.preventDefault();
            if (catDropdown) {
              catDropdown.classList.remove("open");
              if (catAllBtn) catAllBtn.setAttribute("aria-expanded", "false");
            }

            isProgrammaticScroll = true;
            clearTimeout(scrollLockTimer);
            scrollLockTimer = setTimeout(() => {
              isProgrammaticScroll = false;
            }, 850);

            // Set active class
            document.querySelectorAll(".cat-nav-link").forEach((l) => {
              const matches = l.getAttribute("href") === href;
              l.classList.toggle("active", matches);
              if (matches && track) {
                const targetLeft = l.offsetLeft - track.clientWidth / 2 + l.offsetWidth / 2;
                track.scrollTo({ left: targetLeft, behavior: "smooth" });
              }
            });

            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  // Events
  if (searchInputEl) {
    searchInputEl.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (searchClearEl) searchClearEl.classList.toggle("visible", searchQuery.length > 0);
      renderDynamicSections();
    });
  }

  if (searchClearEl) {
    searchClearEl.addEventListener("click", () => {
      searchQuery = "";
      if (searchInputEl) searchInputEl.value = "";
      searchClearEl.classList.remove("visible");
      renderDynamicSections();
    });
  }

  document.querySelectorAll(".open-qr-btn").forEach((btn) => {
    btn.addEventListener("click", openQrModal);
  });

  // ==========================================================================
  // HERO SPECIALS SWITCHER: Seamless Interactive Plate & Typography Cycling
  // Cycles across the 3 Nanasi Specials (Swahili Breakfast, English Breakfast, Healthy Breakfast)
  // on clicking the hero plate or indicator dots, with smooth cross-fade, angle settling & description morph
  // ==========================================================================
  const HERO_SPECIALS = [
    {
      id: "swahili-breakfast",
      name: "Swahili Breakfast",
      scriptTag: "Chef's Special",
      headlineWhite: "SWAHILI FEAST",
      headlineAccent: "& BREAKFAST",
      subtitle: "Authentic East African morning indulgence — hand-rolled chapati triangles, creamy coconut maharage, savory grilled sausages, and fresh tropical pineapple, mango & watermelon.",
      priceFormatted: "TSH 12,000",
      image: "assets/dishes/swahili_breakfast_black_plate.png",
      rotation: 52, // precisely matches attachment media_1793364225851_fbd1ccbf.jpg
      scale: 1.0,
      orderUrl: "https://wa.me/255700000000?text=Hello%20NANASI%20CAFE!%20I%20would%20like%20to%20order%20the%20Swahili%20Breakfast%20(TSH%2012,000)."
    },
    {
      id: "english-breakfast",
      name: "English Breakfast",
      scriptTag: "Chef's Special",
      headlineWhite: "ENGLISH FEAST",
      headlineAccent: "& BREAKFAST",
      subtitle: "Classic British morning feast — golden toasted artisan bread, rich sautéed mushrooms, grilled Russian sausages, farm-fresh eggs, savory baked beans & juicy tomatoes.",
      priceFormatted: "TSH 18,000",
      image: "assets/dishes/special_english_breakfast.png",
      rotation: 0,
      scale: 1.015,
      orderUrl: "https://wa.me/255700000000?text=Hello%20NANASI%20CAFE!%20I%20would%20like%20to%20order%20the%20English%20Breakfast%20(TSH%2018,000)."
    },
    {
      id: "healthy-breakfast",
      name: "Healthy Breakfast",
      scriptTag: "Chef's Special",
      headlineWhite: "HEALTHY FEAST",
      headlineAccent: "& BREAKFAST",
      subtitle: "Nourishing wellness morning platter — delicate poached farm eggs, tender sautéed garden greens, golden kachori, fresh okra, and refreshing sliced seasonal tropical fruits.",
      priceFormatted: "TSH 15,000",
      image: "assets/dishes/special_healthy_breakfast.png",
      rotation: 0,
      scale: 1.015,
      orderUrl: "https://wa.me/255700000000?text=Hello%20NANASI%20CAFE!%20I%20would%20like%20to%20order%20the%20Healthy%20Breakfast%20(TSH%2015,000)."
    }
  ];

  function setupHeroSpecialsSwitcher() {
    const plateWrapper = document.getElementById("heroPlateWrapper");
    const plateImgA = document.getElementById("heroPlateImgA");
    const plateImgB = document.getElementById("heroPlateImgB");
    const headlineWhite = document.getElementById("heroHeadlineWhite");
    const headlineAccent = document.getElementById("heroHeadlineAccent");
    const subtitle = document.getElementById("heroSubtitle");
    const orderBtn = document.getElementById("heroOrderBtn");
    const textAnims = document.querySelectorAll(".hero-text-anim");

    if (!plateWrapper || !plateImgA) return;

    // Preload all 3 images in browser cache for instant lag-free switching
    HERO_SPECIALS.forEach((spec) => {
      const preloadImg = new Image();
      preloadImg.src = spec.image;
    });

    let heroIndex = 0;
    let isHeroSwitching = false;
    let isLayerAActive = true;

    function switchHeroSpecial(nextIndex) {
      if (isHeroSwitching) return;
      isHeroSwitching = true;

      heroIndex = (nextIndex + HERO_SPECIALS.length) % HERO_SPECIALS.length;
      const data = HERO_SPECIALS[heroIndex];

      const activeLayer = isLayerAActive ? plateImgA : plateImgB;
      const incomingLayer = isLayerAActive ? plateImgB : plateImgA;

      // 1. FIRST: Plate transition starts immediately on click
      if (incomingLayer && activeLayer) {
        incomingLayer.src = data.image;
        incomingLayer.alt = data.name;
        requestAnimationFrame(() => {
          incomingLayer.classList.add("active");
          activeLayer.classList.remove("active");
          isLayerAActive = !isLayerAActive;
        });
      }

      // 2. THEN FOLLOWED BY THE WORDS: Words start fading out shortly after the plate begins
      setTimeout(() => {
        textAnims.forEach((el) => el.classList.add("is-fading-out"));
      }, 180);

      // 3. Swap word contents & smoothly bloom them back in
      setTimeout(() => {
        if (headlineWhite) headlineWhite.textContent = data.headlineWhite;
        if (headlineAccent) headlineAccent.textContent = data.headlineAccent;
        if (subtitle) subtitle.textContent = data.subtitle;
        if (orderBtn) orderBtn.href = data.orderUrl;
        plateWrapper.title = `Viewing ${data.name} (Click to switch to next special)`;

        requestAnimationFrame(() => {
          textAnims.forEach((el) => el.classList.remove("is-fading-out"));
        });
      }, 500);

      // 4. Settle & unlock
      setTimeout(() => {
        isHeroSwitching = false;
      }, 880);
    }

    plateWrapper.addEventListener("click", () => {
      switchHeroSpecial(heroIndex + 1);
    });

    plateWrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchHeroSpecial(heroIndex + 1);
      }
    });
  }

  function copyTextFallback(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  document.getElementById("copyLinkBtn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const label = btn.querySelector(".btn-label") || btn;
    const url = getShareUrl();

    const showState = (text, bg) => {
      if (!btn.dataset.origLabel) btn.dataset.origLabel = label.textContent;
      label.textContent = text;
      btn.style.background = bg;
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(() => {
        label.textContent = btn.dataset.origLabel;
        btn.style.background = "";
      }, 1800);
    };

    const done = (ok) => (ok ? showState("COPIED!", "#18634B") : showState("PRESS CTRL+C", "#8a5a12"));

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => done(true), () => done(copyTextFallback(url)));
    } else {
      done(copyTextFallback(url));
    }
  });

  // Print: only the QR card is printed (see @media print in styles.css)
  const printQrBtn = document.getElementById("printQrBtn");
  if (printQrBtn) {
    printQrBtn.addEventListener("click", () => {
      const img = document.getElementById("qrImage");
      const go = () => {
        document.body.classList.add("printing-qr");
        window.print();
      };
      if (img && !img.complete) {
        img.addEventListener("load", go, { once: true });
        img.addEventListener("error", go, { once: true });
      } else {
        go();
      }
    });
    window.addEventListener("afterprint", () => document.body.classList.remove("printing-qr"));
  }

  document.querySelectorAll(".modal-close, .modal-backdrop").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target === el || el.classList.contains("modal-close")) {
        dishModalEl.classList.remove("open");
        qrModalEl.classList.remove("open");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dishModalEl.classList.remove("open");
      qrModalEl.classList.remove("open");
    }
  });

  // Init
  setupHeroSpecialsSwitcher();
  renderJimboGrid();
  renderCategoryNav();
  renderDynamicSections();
  setupScrollSpy();
  setupTopbarNavigation();

  if (window.location.hash === "#qr-modal" || window.location.hash === "#qr") {
    setTimeout(openQrModal, 150);
  }
})();

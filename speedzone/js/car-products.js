/* ============================================================
   SPEED ZONE – car-products.js
   Car product data, rendering, filtering & modal for car.html
   ============================================================ */
(function () {
  'use strict';

  /* ── WhatsApp Number — update this ── */
  const WHATSAPP_NUMBER = '919999999999';

  const CATEGORY_LABELS = {
    'wheels':   'Alloy Wheels',
    'tinting':  'Window Tinting',
    'wrap':     'Wraps & Paint',
    'body':     'Body Kits',
    'lighting': 'LED & Lighting',
    'interior': 'Interior',
  };

  const CATEGORY_ICONS = {
    'wheels':   'fas fa-circle-half-stroke',
    'tinting':  'fas fa-window-maximize',
    'wrap':     'fas fa-paint-roller',
    'body':     'fas fa-car-side',
    'lighting': 'fas fa-lightbulb',
    'interior': 'fas fa-couch',
  };

  /* ── CAR PRODUCTS CATALOGUE ── */
  const CAR_PRODUCTS = [
    /* ALLOY WHEELS */
    {
      id: 101, name: 'Sport Alloy Wheels 14"',
      category: 'wheels', price: '₹14,000', tag: 'Popular',
      desc: 'Set of 4 sporty 14-inch alloy wheels with professional fitting and wheel balancing included.',
      details: 'Spoke design: 5-spoke. Finish: Glossy black with silver accents. Includes: Fitting, balancing, valve stems. Fits: Maruti Alto, Hyundai Eon, Tata Nano.',
    },
    {
      id: 102, name: 'Premium Alloy Wheels 15"',
      category: 'wheels', price: '₹18,000', tag: 'Hot',
      desc: 'Premium 15-inch alloys in multiple spoke designs. Enhances performance and transforms your car\'s look.',
      details: 'Designs: 7-spoke, 10-spoke, mesh. Finishes: Gun metal, black, silver. Fits: Swift, i20, Polo, Nexon, Altroz.',
    },
    {
      id: 103, name: 'Wide Body Alloys 16"',
      category: 'wheels', price: '₹24,000', tag: 'Premium',
      desc: '16-inch wide alloy wheels for aggressive stance. Perfect for SUVs and hatchbacks that want to stand out.',
      details: 'Low-profile tyre compatible. Fits: Creta, Brezza, Thar, Seltos, XUV300. Professional fitment included.',
    },
    {
      id: 104, name: 'SUV Alloy Wheels 17"',
      category: 'wheels', price: '₹32,000', tag: 'Premium',
      desc: 'Massive 17-inch alloy set for full-size SUVs. Bold design with optional matte black finish.',
      details: 'Fits: Fortuner, Scorpio, Innova, Endeavour. Weight: ~9 kg per wheel. Full fitment and alignment included.',
    },
    /* WINDOW TINTING */
    {
      id: 105, name: 'Full Window Tint — 3M',
      category: 'tinting', price: '₹5,000', tag: 'Popular',
      desc: '3M Crystalline window film. Blocks 99% UV and reduces interior heat by up to 60%. 5-year warranty.',
      details: 'VLT options: 20% (dark), 35% (medium), 50% (light). Covers: Rear windshield + 4 door windows. Warranty: 5 years.',
    },
    {
      id: 106, name: 'SunTek Carbon Film Tint',
      category: 'tinting', price: '₹7,500', tag: 'Premium',
      desc: 'SunTek Carbon series. Superior heat rejection with a stylish carbon look. Scratch-resistant coating.',
      details: 'Heat rejection: 70%+. Glare reduction: 77%. 7-year manufacturer warranty. Full car coverage.',
    },
    {
      id: 107, name: 'Windshield Solar Film',
      category: 'tinting', price: '₹2,500', tag: 'New',
      desc: 'Front windshield UV-blocking solar film. Legal VLT (70%+), greatly reduces dashboard heat and glare.',
      details: 'VLT: 70%. UV rejection: 99%. Reduces heat by 40%. No legal issues. Fits all cars.',
    },
    /* WRAPS */
    {
      id: 108, name: 'Full Car Vinyl Wrap',
      category: 'wrap', price: '₹25,000', tag: 'Hot',
      desc: 'Complete car makeover with premium cast vinyl wrap. Matte, gloss, satin or chrome finish. Protects paint.',
      details: 'Film brand: 3M/Avery Dennison. Lifespan: 5–7 years. Design consultation included. Any color available.',
    },
    {
      id: 109, name: 'Partial Wrap / Accent',
      category: 'wrap', price: '₹8,000', tag: 'Popular',
      desc: 'Hood, roof, bonnet or door panel wrap. Dual-tone effect or racing stripes. Great for a custom look.',
      details: 'Area: bonnet, roof, pillars, side stripes, mirror caps. Any finish available. Removable without damage.',
    },
    {
      id: 110, name: 'Matte Black Wrap',
      category: 'wrap', price: '₹20,000', tag: 'Custom',
      desc: 'Full car matte black vinyl wrap — the most popular colour transform. Stealthy, premium look.',
      details: 'Film: 3M 1080 series matte black. Scratch resistant. Full car including mirrors and handles.',
    },
    /* BODY KITS */
    {
      id: 111, name: 'Front Lip Splitter',
      category: 'body', price: '₹3,500', tag: 'Popular',
      desc: 'Universal front bumper lip splitter in ABS plastic. Sporty aggressive look, easy bolt-on fitment.',
      details: 'Material: ABS plastic. Finish: Unpainted (ready to paint) or glossy black. Universal + model-specific options.',
    },
    {
      id: 112, name: 'Rear Trunk Spoiler',
      category: 'body', price: '₹4,500', tag: 'Hot',
      desc: 'Aggressive ABS trunk spoiler with optional LED brake light strip. Custom-match to your car colour.',
      details: 'Material: ABS + fibreglass reinforced. Mount: Double tape + bolt. Paintable finish. LED optional: ₹800 extra.',
    },
    {
      id: 113, name: 'Side Skirts Set',
      category: 'body', price: '₹6,000', tag: 'Custom',
      desc: 'Full set of side skirts for a lowered, sporty silhouette. Model-specific fit for most popular cars.',
      details: 'Pair (left + right). Material: ABS plastic. Available for: Swift, i20, Verna, City, Nexon, Seltos.',
    },
    {
      id: 114, name: 'Full Body Kit',
      category: 'body', price: '₹18,000', tag: 'Premium',
      desc: 'Complete body kit: front lip + side skirts + rear diffuser. Total transformation, sportier stance.',
      details: 'Includes: front lip, 2 side skirts, rear diffuser. Fitting available in-store. Model-specific availability.',
    },
    /* LED & LIGHTING */
    {
      id: 115, name: 'RGB Underglow Kit',
      category: 'lighting', price: '₹2,200', tag: 'Hot',
      desc: 'Multi-colour RGB LED underbody kit with Bluetooth app + music sync mode. IP68 waterproof strips.',
      details: 'Includes: 4 × 90cm strips + controller. App: Android & iOS. 16 million colours. 12V plug-in.',
    },
    {
      id: 116, name: 'Interior Mood Lighting',
      category: 'lighting', price: '₹1,400', tag: 'New',
      desc: 'Multi-zone LED interior kit for footwells, dashboard and roof liner. 16 colours with remote control.',
      details: 'Includes: 4 strips + remote + 12V adapter. Easy peel-and-stick install. No permanent wiring needed.',
    },
    {
      id: 117, name: 'Car LED Headlight Kit',
      category: 'lighting', price: '₹3,500', tag: 'Popular',
      desc: '6000K ultra-white LED headlight conversion. 3× brighter than stock halogen. Plug and play.',
      details: 'Compatible sockets: H4, H7, H11, 9005, 9006. Includes: 2 bulbs + heat sinks. Lifespan: 50,000 hrs.',
    },
    {
      id: 118, name: 'DRL Sequential Strip',
      category: 'lighting', price: '₹1,800', tag: 'Popular',
      desc: 'Sequential flowing DRL strip for front bumper. Waterproof, relay-controlled, eye-catching look.',
      details: 'Length: 60cm × 2. IP67 rated. Sequential amber turn signal function. 12V with relay & switch.',
    },
    /* INTERIOR */
    {
      id: 119, name: 'Premium Seat Cover Set',
      category: 'interior', price: '₹4,500', tag: 'Popular',
      desc: 'Full car PU leather seat cover set with contrast stitching. Custom fit for most popular car models.',
      details: 'Covers: 5 seats (front + rear). Colors: Black/Red, Black/Blue, All Black, Beige. Airbag compatible.',
    },
    {
      id: 120, name: 'Sports Steering Wrap',
      category: 'interior', price: '₹1,800', tag: 'Hot',
      desc: 'Micro-perforated leather steering wheel wrap. Better grip, sportier feel. Professional fitting included.',
      details: 'Material: Perforated PU leather. Stitch colors: Red, Blue, White, Orange. Fitting: in-store service.',
    },
    {
      id: 121, name: '7D Floor Mats',
      category: 'interior', price: '₹2,800', tag: 'New',
      desc: 'Custom-fit 7D all-weather floor mats with anti-slip backing. Full coverage for front and rear.',
      details: 'Material: TPE rubber. Fully waterproof. Easy to clean. Model-specific fit. Color: Black.',
    },
    {
      id: 122, name: 'Dashboard Camera (Dash Cam)',
      category: 'interior', price: '₹3,200', tag: 'Popular',
      desc: '4K front + 1080p rear dual dash camera. Night vision, loop recording, G-sensor, parking mode.',
      details: 'Resolution: 4K front / 1080p rear. Storage: MicroSD up to 128GB. Wi-Fi app enabled. 24/7 parking guard.',
    },
    {
      id: 123, name: 'Parking Sensor Kit',
      category: 'interior', price: '₹2,000', tag: 'Service',
      desc: '4-sensor reverse parking system with audible beep and visual distance display. Professional fitment.',
      details: 'Sensors: 4 rear sensors (or 8 front+rear). Display: LED + buzzer. Waterproof. Fitting included.',
    },
  ];

  /* ── WhatsApp URL builder ── */
  function waURL(p) {
    const msg = encodeURIComponent(
      `Hi Speed Zone Performance! 👋\nI'm interested in: *${p.name}*\nPrice: ${p.price}\nPlease confirm availability.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  /* ── Tag class ── */
  function tagClass(tag) {
    const m = { Popular:'tag-popular',New:'tag-new',Budget:'tag-budget',Hot:'tag-hot',Safety:'tag-safety',Gear:'tag-gear',Premium:'tag-premium',Service:'tag-service',Custom:'tag-custom' };
    return m[tag] || 'tag-popular';
  }

  /* ── Render card ── */
  function renderCard(p, delay) {
    const icon     = CATEGORY_ICONS[p.category] || 'fas fa-box';
    const catLabel = CATEGORY_LABELS[p.category] || p.category;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = p.category;
    card.dataset.id = p.id;
    card.style.animationDelay = `${delay * 0.07}s`;

    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" class="pc-real-img" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\\'${icon} pc-image-icon\\'></i>'"/>`
      : `<i class="${icon} pc-image-icon"></i>`;

    card.innerHTML = `
      <div class="pc-image">
        ${imgHTML}
        <span class="pc-tag ${tagClass(p.tag)}">${p.tag}</span>
      </div>
      <div class="pc-body">
        <p class="pc-category">${catLabel}</p>
        <h3 class="pc-name">${p.name}</h3>
        <p class="pc-desc">${p.desc}</p>
        <div class="pc-footer">
          <span class="pc-price">${p.price}</span>
          <div style="display:flex;gap:8px;">
            <a href="${waURL(p)}" target="_blank" class="pc-buy" onclick="event.stopPropagation()">
              <i class="fab fa-whatsapp"></i> Buy Now
            </a>
            <button class="pc-more" data-id="${p.id}" title="More details">
              <i class="fas fa-expand-alt"></i>
            </button>
          </div>
        </div>
      </div>`;
    return card;
  }

  /* ── Debounce ── */
  function debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  /* ── Render all with optional search ── */
  function renderAll(filter, query) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let list = filter === 'all' ? CAR_PRODUCTS : CAR_PRODUCTS.filter(p => p.category === filter);

    if (query) {
      const term = query.toLowerCase();
      list = list.filter(p =>
        [p.name, p.desc, p.details, CATEGORY_LABELS[p.category], p.tag]
          .some(v => v && v.toLowerCase().includes(term))
      );
    }

    grid.innerHTML = '';

    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">No products found. Try a different keyword or clear the search.</div>`;
      return;
    }

    list.forEach((p, i) => grid.appendChild(renderCard(p, i)));
    grid.querySelectorAll('.pc-more').forEach(btn => btn.addEventListener('click', () => openModal(+btn.dataset.id)));
  }

  /* ── Filters ── */
  function initFilters() {
    let activeFilter = 'all';
    let activeSearch = '';

    /* Filter buttons */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter || 'all';
        renderAll(activeFilter, activeSearch);
      });
    });

    /* Search bar */
    const searchInput = document.getElementById('carSearch');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => {
        activeSearch = searchInput.value.trim();
        renderAll(activeFilter, activeSearch);
      }, 250));
    }
  }

  /* ── Modal ── */
  function openModal(id) {
    const p = CAR_PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const overlay  = document.getElementById('productModal');
    const body     = document.getElementById('modalBody');
    const icon     = CATEGORY_ICONS[p.category] || 'fas fa-box';
    const catLabel = CATEGORY_LABELS[p.category] || p.category;

    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" class="modal-real-img"/>`
      : `<i class="${icon}"></i>`;

    body.innerHTML = `
      <div class="modal-img">${imgHTML}</div>
      <p class="modal-category">${catLabel}</p>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-desc">${p.desc}</p>
      ${p.details ? `<p class="modal-desc" style="font-size:0.82rem;border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:0;">${p.details}</p>` : ''}
      <div class="modal-price">${p.price}</div>
      <div class="modal-actions">
        <a href="${waURL(p)}" target="_blank" class="btn btn-primary"><i class="fab fa-whatsapp"></i> Buy on WhatsApp</a>
        <button class="btn btn-outline" id="modalCloseBtn"><i class="fas fa-times"></i> Close</button>
      </div>`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  }

  function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function initModal() {
    const overlay = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {
    renderAll('all', '');
    initFilters();
    initModal();
  });

})();

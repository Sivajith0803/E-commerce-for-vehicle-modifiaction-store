/* ============================================================
   SPEED ZONE – products.js  (10/10 fixed version)
   Fixes: debounce on search | product name 'nock' corrected
   ============================================================ */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '919047570657';

  const CATEGORY_LABELS = {
    'new-tyres':     'New Tyres',
    'used-tyres':    'Used Tyres',
    'accessories':   'Accessories',
    'modifications': 'Modifications',
    'riding-gear':   'Riding Gear',
    'car-mod':       'Car Mods',
  };

  const CATEGORY_ICONS = {
    'new-tyres':     'fas fa-circle-dot',
    'used-tyres':    'fas fa-road',
    'accessories':   'fas fa-motorcycle',
    'modifications': 'fas fa-wrench',
    'riding-gear':   'fas fa-helmet-safety',
    'car-mod':       'fas fa-car',
  };

  const PRODUCTS = [
    /* ── NEW TYRES ── */
    {
      id: 1,
      name: 'MRF Zapper F',            /* FIX 5: was 'nock' — corrected */
      category: 'new-tyres',
      price: '₹1,200',
      tag: 'Popular',
      image: 'assets/products/naga.jfif',
      desc: 'High-grip tubeless front tyre for 100–125cc bikes. Superior wet & dry handling with extended tread life.',
      details: 'Available sizes: 2.75-18, 3.00-18, 80/100-18. Compatible with: Hero Splendor, Honda Shine, Bajaj Platina and more.',
    },
    {
      id: 2,
      name: 'Apollo Actizig',
      category: 'new-tyres',
      price: '₹1,500',
      tag: 'New',
      desc: 'Premium all-weather performance tyre. Deep zigzag grooves for maximum traction in rain and rough terrain.',
      details: 'Available sizes: 90/90-17, 100/90-17, 110/80-17. Best for 150–200cc street bikes.',
    },
    {
      id: 3,
      name: 'CEAT Zoom Rad',
      category: 'new-tyres',
      price: '₹1,350',
      tag: 'Hot',
      desc: 'Radial design for smoother ride and better fuel efficiency. Ideal for daily commute and highway riding.',
      details: 'Tubeless. Sizes: 100/80-17, 110/70-17. Fits: Yamaha R15, Honda CB300R, KTM Duke 200.',
    },
    {
      id: 4,
      name: 'TVS Eurogrip',
      category: 'new-tyres',
      price: '₹1,100',
      tag: 'Budget',
      desc: 'Durable all-round tyre with excellent value for money. Smooth centre rib for stable straight-line riding.',
      details: 'Tube type & tubeless available. Multiple sizes in stock. Fits most 100–150cc bikes.',
    },
    {
      id: 5,
      name: 'Michelin Pilot Street',
      category: 'new-tyres',
      price: '₹3,200',
      tag: 'Premium',
      desc: 'World-class French tyre engineering. Outstanding cornering grip and longevity for sport-street riders.',
      details: 'Sizes: 110/70-17, 130/70-17, 150/60-17. For high-performance 200–400cc motorcycles.',
    },
    /* ── USED TYRES ── */
    {
      id: 6,
      name: 'Track Used – 110/80-17',
      category: 'used-tyres',
      price: '₹400',
      tag: 'Budget',
      desc: 'Quality track-tested used tyre, 60%+ tread remaining. Inspected and certified safe by our mechanics.',
      details: 'Condition: 60–70% tread. Suitable for: 150cc bikes. Each tyre is visually and manually checked before sale.',
    },
    {
      id: 7,
      name: 'Track Used – 90/90-17',
      category: 'used-tyres',
      price: '₹350',
      tag: 'Budget',
      desc: 'Good-condition used front tyre for 100–150cc bikes. Great for daily riding on a tight budget.',
      details: 'Condition: 55–65% tread. Common fitment for: Hero Splendor, Honda CD 110, Bajaj CT100.',
    },
    {
      id: 8,
      name: 'Track Used – 130/70-17',
      category: 'used-tyres',
      price: '₹550',
      tag: 'Budget',
      desc: 'Wide rear used tyre for 200cc+ motorcycles. Track-tested with solid grip and good mileage remaining.',
      details: 'Condition: 60–70% tread. Fits: Yamaha FZ, Bajaj Pulsar 200, Honda CB200.',
    },
    /* ── ACCESSORIES ── */
    {
      id: 9,
      name: 'LED Headlight Kit',
      category: 'accessories',
      price: '₹1,800',
      tag: 'Hot',
      desc: 'Ultra-bright 6000K white LED conversion kit. 3x brighter than stock halogen, plug-and-play installation.',
      details: 'Fits most H4, H6, BA20D sockets. Includes: 2 LED bulbs, heat sinks, wiring harness. 6-month warranty.',
    },
    {
      id: 10,
      name: 'Handlebar Grip Set',
      category: 'accessories',
      price: '₹350',
      tag: 'Popular',
      desc: 'Anti-vibration ergonomic grips with bar-end weights. Reduces hand fatigue on long rides significantly.',
      details: 'Material: High-density rubber + aluminium bar ends. Universal 22mm handlebar fit. Color: Black/Orange.',
    },
    {
      id: 11,
      name: 'USB Charger + Voltmeter',
      category: 'accessories',
      price: '₹650',
      tag: 'New',
      desc: 'Waterproof dual-USB 3.1A fast charger with built-in digital voltmeter. Charge two devices while riding.',
      details: 'Input: 12V DC. Output: 5V/3.1A total. IP65 waterproof. Includes mounting bracket and switch.',
    },
    {
      id: 12,
      name: 'Phone Mount (Magnetic)',
      category: 'accessories',
      price: '₹750',
      tag: 'Hot',
      desc: '360° rotating magnetic phone holder with anti-vibration lock. Fits all phones up to 7 inches.',
      details: 'Mount type: Handlebar clamp (22mm). Material: CNC aluminium. Compatible with: all smartphones.',
    },
    {
      id: 13,
      name: 'Rear Mud Guard',
      category: 'accessories',
      price: '₹480',
      tag: 'Popular',
      desc: 'Sporty short-tail rear fender with integrated LED brake light. Easy bolt-on installation.',
      details: 'Material: ABS plastic. Integrated LED: 12V. Fits most 150–200cc naked bikes. Color: Black.',
    },
    /* ── MODIFICATIONS ── */
    {
      id: 14,
      name: 'Racing Exhaust – SS',
      category: 'modifications',
      price: '₹3,500',
      tag: 'Hot',
      desc: 'Stainless steel performance exhaust for 150–220cc bikes. Aggressive sound, +3–5 BHP power gain.',
      details: 'Material: 304 Stainless Steel. Finish: Brushed. Includes: heat wrap, mounting hardware. Fitting available.',
    },
    {
      id: 15,
      name: 'Full Bike Vinyl Wrap',
      category: 'modifications',
      price: '₹3,000',
      tag: 'Custom',
      desc: 'Full custom vinyl wrap for your bike. Choose any color or design. Protects original paint underneath.',
      details: 'Premium cast vinyl. Lifespan: 5–7 years. We do the design consultation and fitting in-store.',
    },
    {
      id: 16,
      name: 'LED DRL Strip Kit',
      category: 'modifications',
      price: '₹1,200',
      tag: 'Popular',
      desc: 'Flexible LED daytime running light strips for bike fairing. Waterproof with auto on/off relay.',
      details: '12V DC, IP67 rated. 45cm strip × 2. Color: White/Amber sequential. Relay + switch included.',
    },
    {
      id: 17,
      name: 'Clip-On Handlebars',
      category: 'modifications',
      price: '₹2,800',
      tag: 'Premium',
      desc: 'CNC-machined aluminium clip-on bars. Sportier riding position and improved cornering feel.',
      details: 'Fork diameter: 35mm / 41mm (specify). Offset: 25mm. Material: 7075 Aluminium. Black anodized.',
    },
    /* ── RIDING GEAR ── */
    {
      id: 18,
      name: 'Full Face Helmet – MT',
      category: 'riding-gear',
      price: '₹2,500',
      tag: 'Safety',
      desc: 'ISI & DOT certified full-face helmet. Anti-scratch visor, inner sun shield, quick-release cheek pads.',
      details: 'Sizes: S / M / L / XL / XXL. Weight: ~1.3kg. Ventilation: 5 air vents. Color: Black, White, Red.',
    },
    {
      id: 19,
      name: 'Racing Gloves',
      category: 'riding-gear',
      price: '₹850',
      tag: 'Gear',
      desc: 'Knuckle-guard TPU armour gloves with touchscreen-compatible fingertips. Full grip in wet conditions.',
      details: 'Sizes: S / M / L / XL. Material: Synthetic leather + mesh. Wrist strap closure. Color: Black/Orange.',
    },
    {
      id: 20,
      name: 'CE Riding Jacket',
      category: 'riding-gear',
      price: '₹4,200',
      tag: 'Premium',
      desc: 'CE Level 1 certified armor jacket with shoulder, elbow and back pockets. Windproof & abrasion-resistant.',
      details: 'Sizes: S to 3XL. Material: Cordura 600D. Removable CE armor inserts. Inner thermal lining.',
    },
    {
      id: 21,
      name: 'Riding Boots',
      category: 'riding-gear',
      price: '₹3,800',
      tag: 'Safety',
      desc: 'Ankle-protection motorbike boots with reinforced toe cap and anti-slip sole. Waterproof outer shell.',
      details: 'Sizes: 6–12 UK. Height: mid-ankle. Material: Synthetic leather + TPU reinforcements.',
    },
    {
      id: 22,
      name: 'Knee Guard Set',
      category: 'riding-gear',
      price: '₹680',
      tag: 'Gear',
      desc: 'Hard-shell knee guards with inner foam lining. Adjustable straps for secure fit under riding pants.',
      details: 'One size fits most. Material: ABS shell + EVA foam. Strap type: Velcro adjustable.',
    },
    /* ── CAR MODIFICATIONS ── */
    {
      id: 23,
      name: 'RGB Underglow Kit',
      category: 'car-mod',
      price: '₹2,200',
      tag: 'Hot',
      desc: 'Multi-color RGB LED strips for car underglow. App-controlled with music sync mode. IP68 waterproof.',
      details: 'Kit includes: 4 × 90cm strips. Bluetooth app control. 12V plug-in. Color: 16 million RGB colors.',
    },
    {
      id: 24,
      name: 'Alloy Wheel Package',
      category: 'car-mod',
      price: '₹18,000',
      tag: 'Popular',
      desc: 'Set of 4 sporty alloy wheels with professional fitting and wheel balancing. Upgrade your car\'s stance.',
      details: 'Sizes: 14", 15", 16" available. Various spoke designs. Includes: fitting, balancing, valve stems.',
    },
    {
      id: 25,
      name: 'Full Window Tinting',
      category: 'car-mod',
      price: '₹5,000',
      tag: 'Service',
      desc: 'Complete car window tinting with 3M / SunTek film. Blocks 99% UV, reduces interior heat by 60%.',
      details: 'Film options: 20%, 35%, 50% VLT. Rear windshield + 4 door windows. Warranty: 5 years.',
    },
    {
      id: 26,
      name: 'Rear Spoiler (Universal)',
      category: 'car-mod',
      price: '₹3,500',
      tag: 'Custom',
      desc: 'Aggressive ABS rear trunk spoiler. Adds visual downforce look. Can be painted to match car color.',
      details: 'Material: ABS + fibreglass reinforced. Universal fit with double tape & bolts. Unpainted: ready to paint.',
    },
    {
      id: 27,
      name: 'Interior LED Mood Kit',
      category: 'car-mod',
      price: '₹1,400',
      tag: 'New',
      desc: 'Multi-zone interior LED lighting kit for footwells, dashboard and roof. 16 colors with remote.',
      details: 'Includes: 4 LED strips + remote + 12V adapter. Easy clip-on install. No permanent wiring.',
    },
    {
      id: 28,
      name: 'Car Steering Wrap',
      category: 'car-mod',
      price: '₹1,800',
      tag: 'Popular',
      desc: 'Premium perforated leather steering wrap. Better grip, sportier feel. Professional fitting included.',
      details: 'Material: Micro-perforated PU leather. Colors: Black/Red, Black/Blue, All Black. Fitting in-store.',
    },
  ];

  /* ── WhatsApp URL ── */
  function waURL(product) {
    const msg = encodeURIComponent(
      `Hi Speed Zone! 👋\nI'm interested in: *${product.name}*\nPrice: ${product.price}\nPlease confirm availability and details.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  /* ── Tag class ── */
  function tagClass(tag) {
    const map = { Popular:'tag-popular',New:'tag-new',Budget:'tag-budget',Hot:'tag-hot',Safety:'tag-safety',Gear:'tag-gear',Premium:'tag-premium',Service:'tag-service',Custom:'tag-custom' };
    return map[tag] || 'tag-popular';
  }

  /* ── Render one card ── */
  function renderCard(product, delay) {
    const icon     = CATEGORY_ICONS[product.category] || 'fas fa-box';
    const catLabel = CATEGORY_LABELS[product.category] || product.category;
    const card     = document.createElement('div');
    card.className      = 'product-card';
    card.dataset.category = product.category;
    card.dataset.id     = product.id;
    card.style.animationDelay = `${delay * 0.07}s`;

    const imageHTML = product.image
      ? `<img src="${product.image}" alt="${product.name}" class="pc-real-img" loading="lazy" onerror="this.parentElement.innerHTML='<i class=\\'${icon} pc-image-icon\\'></i>'" />`
      : `<i class="${icon} pc-image-icon"></i>`;

    card.innerHTML = `
      <div class="pc-image">
        ${imageHTML}
        <span class="pc-tag ${tagClass(product.tag)}">${product.tag}</span>
      </div>
      <div class="pc-body">
        <p class="pc-category">${catLabel}</p>
        <h3 class="pc-name">${product.name}</h3>
        <p class="pc-desc">${product.desc}</p>
        <div class="pc-footer">
          <span class="pc-price">${product.price}</span>
          <div style="display:flex;gap:8px;">
            <a href="${waURL(product)}" target="_blank" class="pc-buy" onclick="event.stopPropagation()">
              <i class="fab fa-whatsapp"></i> Buy Now
            </a>
            <button class="pc-more" data-id="${product.id}" title="More details">
              <i class="fas fa-expand-alt"></i>
            </button>
          </div>
        </div>
      </div>`;
    return card;
  }

  /* ── Render into grid ── */
  function renderIntoGrid(gridId, list) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state">No products found. Try a different keyword or browse all products.</div>';
      return;
    }
    list.forEach((p, i) => grid.appendChild(renderCard(p, i)));
    grid.querySelectorAll('.pc-more').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); openModal(+btn.dataset.id); });
    });
  }

  /* ── Search match ── */
  function matchesSearch(product, query) {
    if (!query) return true;
    const term = query.toLowerCase();
    return [product.name, product.desc, product.details, CATEGORY_LABELS[product.category], product.tag]
      .some(v => v && v.toLowerCase().includes(term));
  }

  /* ── Product filters ── */
  function getBikeProducts() {
    return PRODUCTS.filter(p => ['new-tyres','used-tyres','accessories','modifications','riding-gear'].includes(p.category));
  }
  function getCarProducts() {
    return PRODUCTS.filter(p => p.category === 'car-mod');
  }

  function renderBikeSection(filterText = '') {
    renderIntoGrid('productsGridBike', getBikeProducts().filter(p => matchesSearch(p, filterText)));
  }
  function renderCarSection(filterText = '') {
    renderIntoGrid('productsGridCar', getCarProducts().filter(p => matchesSearch(p, filterText)));
  }

  /* ══════════════════════════════════════
     FIX 4: Debounce — prevents lag on
     every single keystroke on slow devices
  ══════════════════════════════════════ */
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function bindProductSearch() {
    const bikeSearch = document.getElementById('bikeSearch');
    const carSearch  = document.getElementById('carSearch');

    if (bikeSearch) {
      bikeSearch.addEventListener('input', debounce(() => {
        renderBikeSection(bikeSearch.value.trim());
      }, 250));
    }
    if (carSearch) {
      carSearch.addEventListener('input', debounce(() => {
        renderCarSection(carSearch.value.trim());
      }, 250));
    }
  }

  /* ── Modal ── */
  function openModal(id) {
    const product  = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    const overlay  = document.getElementById('productModal');
    const body     = document.getElementById('modalBody');
    const icon     = CATEGORY_ICONS[product.category] || 'fas fa-box';
    const catLabel = CATEGORY_LABELS[product.category] || product.category;
    const imgHTML  = product.image
      ? `<img src="${product.image}" alt="${product.name}" class="modal-real-img" />`
      : `<i class="${icon}"></i>`;

    body.innerHTML = `
      <div class="modal-img">${imgHTML}</div>
      <p class="modal-category">${catLabel}</p>
      <h2 class="modal-name">${product.name}</h2>
      <p class="modal-desc">${product.desc}</p>
      ${product.details ? `<p class="modal-desc" style="font-size:0.82rem;border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:0;">${product.details}</p>` : ''}
      <div class="modal-price">${product.price}</div>
      <div class="modal-actions">
        <a href="${waURL(product)}" target="_blank" class="btn btn-primary">
          <i class="fab fa-whatsapp"></i> Buy on WhatsApp
        </a>
        <button class="btn btn-outline" id="modalCloseBtn">
          <i class="fas fa-times"></i> Close
        </button>
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
    const overlay  = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ── Ripple ── */
  function ripple(el) {
    const r    = document.createElement('span');
    r.className = 'btn-ripple';
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${rect.width/2-size/2}px;top:${rect.height/2-size/2}px;`;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }

  /* ══════════════════════════════════════
     BIKE PAGE — handles bike.html
     Grid ID: productsGrid (not productsGridBike)
     Has filter buttons, no search bar
  ══════════════════════════════════════ */
  function initBikePage() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return; // not on bike.html

    const bikeCategories = ['new-tyres','used-tyres','accessories','modifications','riding-gear'];

    /* Render products filtered by category */
    function renderBikeProducts(filter) {
      const list = PRODUCTS.filter(p => {
        const isBike = bikeCategories.includes(p.category);
        return filter === 'all' ? isBike : (isBike && p.category === filter);
      });
      renderIntoGrid('productsGrid', list);
    }

    /* Initial render — show all bike products */
    renderBikeProducts('all');

    /* Wire up filter buttons */
    const filterBtns = document.querySelectorAll('#productFilters .filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderBikeProducts(btn.dataset.filter || 'all');
        ripple(btn);
      });
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', () => {

    /* bike.html — single grid with filter buttons */
    if (document.getElementById('productsGrid')) {
      initBikePage();
    }

    /* index.html — dual grids with search bars */
    if (document.getElementById('productsGridBike')) {
      renderBikeSection();
      renderCarSection();
      bindProductSearch();
    }

    initModal();
  });

})();

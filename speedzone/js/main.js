/* ============================================================
   SPEED ZONE – main.js
   Navigation | Preloader | Custom Cursor | Scroll Reveal
   Stats Counter | 3D Tilt | Hero Counter | Misc Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════
     1. PRELOADER
     Fix: handle readyState already 'complete',
     use CSS-driven bar + JS as backup
  ══════════════════════════════════════ */
  function initPreloader() {
    const loader = document.getElementById('preloader');
    const fill   = document.getElementById('preloaderFill');
    if (!loader) return;

    let progress  = 0;
    let dismissed = false;

    /* Animate the progress bar at a steady pace */
    const interval = setInterval(() => {
      /* Speed up early, slow down near 90 to wait for load */
      const step = progress < 60 ? (Math.random() * 10 + 6)
                 : progress < 85 ? (Math.random() * 4  + 2)
                 :                 (Math.random() * 1  + 0.3);
      progress += step;
      if (progress > 92) progress = 92; /* hold at 92 until dismiss */
      if (fill) fill.style.width = progress + '%';
    }, 80);

    /* Dismiss function — runs once */
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearInterval(interval);
      if (fill) fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(startHeroCounter, 500);
      }, 600);
    }

    /* Case 1: page already fully loaded (common with local files) */
    if (document.readyState === 'complete') {
      setTimeout(dismiss, 1200); /* show the animation for at least 1.2s */
      return;
    }

    /* Case 2: wait for window load event */
    window.addEventListener('load', () => {
      setTimeout(dismiss, 400);
    });

    /* Case 3: absolute hard fallback after 5s no matter what */
    setTimeout(dismiss, 5000);
  }

  /* ══════════════════════════════════════
     2. CUSTOM CURSOR
  ══════════════════════════════════════ */
  function initCursor() {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let rx = 0, ry = 0;       // ring position (lerped)
    let mx = 0, my = 0;       // actual mouse position
    let rafId;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    // Lag ring behind cursor for smooth feel
    function lerpRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(lerpRing);
    }
    lerpRing();

    // Expand ring on hover-able elements
    const hoverEls = document.querySelectorAll(
      'a, button, .service-card, .product-card, .wu-card, .stat-card, .filter-btn'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '56px';
        ring.style.height = '56px';
        ring.style.borderColor = 'var(--fire)';
        dot.style.transform = 'translate(-50%, -50%) scale(2)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(255,68,0,0.5)';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  /* ══════════════════════════════════════
     3. NAVBAR
  ══════════════════════════════════════ */
  function initNavbar() {
    const navbar  = document.getElementById('navbar');
    const burger  = document.getElementById('navBurger');
    const navList = document.getElementById('navLinks');
    const links   = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Scroll → add .scrolled class
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      updateActiveLink();
    }, { passive: true });

    // Burger toggle
    if (burger && navList) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navList.classList.toggle('open');
      });
      // Close on link click
      navList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          burger.classList.remove('open');
          navList.classList.remove('open');
        });
      });
      // Close on outside click
      document.addEventListener('click', e => {
        if (!navbar.contains(e.target)) {
          burger.classList.remove('open');
          navList.classList.remove('open');
        }
      });
    }

    // Active link on scroll
    function updateActiveLink() {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      links.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ══════════════════════════════════════
     4. HERO COUNTER (tyres sold)
  ══════════════════════════════════════ */
  function startHeroCounter() {
    const el     = document.getElementById('heroCounter');
    if (!el) return;
    const target = 28788;
    const dur    = 2200;
    const step   = 16;
    const inc    = Math.ceil(target / (dur / step));
    let  current = 0;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString('en-IN');
    }, step);
  }

  /* ══════════════════════════════════════
     5. STATS COUNTERS (scroll-triggered)
  ══════════════════════════════════════ */
  function initStatsCounters() {
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    let   counted  = false;

    const run = () => {
      if (counted) return;
      const section = document.querySelector('.stats-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        counted = true;
        statNums.forEach(el => {
          const target = +el.dataset.target;
          const dur    = 1800;
          const step   = 16;
          const inc    = Math.ceil(target / (dur / step));
          let   cur    = 0;

          const t = setInterval(() => {
            cur += inc;
            if (cur >= target) { cur = target; clearInterval(t); }
            el.textContent = cur.toLocaleString('en-IN');
          }, step);
        });
      }
    };

    window.addEventListener('scroll', run, { passive: true });
    run(); // check immediately in case already in view
  }

  /* ══════════════════════════════════════
     6. SCROLL REVEAL
  ══════════════════════════════════════ */
  function initScrollReveal() {
    // Apply .reveal class to section children
    const toReveal = document.querySelectorAll(
      '.service-card, .stat-card, .wu-card, .ci-card, ' +
      '.emi-content > *, .section-header'
    );
    toReveal.forEach((el, i) => {
      if (!el.classList.contains('reveal') &&
          !el.classList.contains('reveal-left') &&
          !el.classList.contains('reveal-right')) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 6) * 0.08 + 's';
      }
    });

    const reveals = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    function check() {
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('revealed');
        }
      });
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ══════════════════════════════════════
     7. 3D TILT on service/product cards
  ══════════════════════════════════════ */
  function initTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2);
        const dy    = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -10;
        const tiltY = dx *  10;

        card.style.transform =
          `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        card.style.boxShadow =
          `${-tiltY * 2}px ${tiltX * 2}px 40px rgba(255,68,0,0.2)`;

        // Move the inner glow toward mouse
        const glow = card.querySelector('.sc-glow');
        if (glow) {
          glow.style.transform = `translate(${dx * 20}px, ${dy * 20}px) scale(1.3)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        const glow = card.querySelector('.sc-glow');
        if (glow) glow.style.transform = '';
      });
    });
  }

  /* ══════════════════════════════════════
     8. BUTTON RIPPLE EFFECT
  ══════════════════════════════════════ */
  function initRipple() {
    document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
      btn.addEventListener('click', e => {
        const r    = document.createElement('span');
        r.className = 'btn-ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x    = e.clientX - rect.left - size / 2;
        const y    = e.clientY - rect.top  - size / 2;
        r.style.cssText =
          `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 700);
      });
    });
  }

  /* ══════════════════════════════════════
     9. MARQUEE PAUSE ON HOVER
  ══════════════════════════════════════ */
  function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }

  /* ══════════════════════════════════════
     10. SPARK EFFECT on product card hover
  ══════════════════════════════════════ */
  function initProductSparks() {
    document.addEventListener('mouseenter', e => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      for (let i = 0; i < 5; i++) {
        spawnSpark(card, e);
      }
    }, true);
  }

  function spawnSpark(card, e) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const angle = Math.random() * 360;
    const dist  = 30 + Math.random() * 40;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist;
    const rect  = card.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    spark.style.cssText =
      `left:${x}px;top:${y}px;--dx:${dx}px;--dy:${dy}px;` +
      `background:hsl(${20 + Math.random() * 40},100%,60%);`;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }

  /* ══════════════════════════════════════
     11. ACTIVE SECTION HIGHLIGHT (navbar underline)
  ══════════════════════════════════════ */
  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => {
            l.classList.toggle(
              'active',
              l.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  /* ══════════════════════════════════════
     12. BACK TO TOP on scroll
  ══════════════════════════════════════ */
  function initBackToTop() {
    // Pressing logo scrolls to top
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ══════════════════════════════════════
     13. PARALLAX on hero grid
  ══════════════════════════════════════ */
  function initParallax() {
    const grid = document.querySelector('.hero-bg-grid');
    if (!grid) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.3;
      grid.style.transform = `translateY(${y}px)`;
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     14. DYNAMIC YEAR in footer
  ══════════════════════════════════════ */
  function setYear() {
    const el = document.querySelector('.footer-bottom p');
    if (el) {
      el.innerHTML = el.innerHTML.replace('2024', new Date().getFullYear());
    }
  }

  /* ══════════════════════════════════════
     INIT – Preloader fires IMMEDIATELY
     Everything else waits for DOM ready
  ══════════════════════════════════════ */

  /* Run preloader right away — don't wait for DOMContentLoaded */
  initPreloader();

  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initStatsCounters();
    initScrollReveal();
    initTilt();
    initRipple();
    initMarquee();
    initProductSparks();
    initSectionObserver();
    initBackToTop();
    initParallax();
    setYear();
  });

})();

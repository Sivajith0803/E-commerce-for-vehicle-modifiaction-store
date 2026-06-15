/* ============================================================
   SPEED ZONE – gateway.js
   Cursor | Panel expand | Dual canvas particles | Keyboard nav
   ============================================================ */
(function () {
  'use strict';

  /* ── Custom cursor ── */
  const dot  = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  });

  function lerpRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(lerpRing);
  }
  lerpRing();

  /* ── Panel hover expand (JS fallback for :has() ── */
  const gateway   = document.getElementById('gateway');
  const panelBike = document.getElementById('panelBike');
  const panelCar  = document.getElementById('panelCar');

  if (panelBike && panelCar && gateway) {
    panelBike.addEventListener('mouseenter', () => {
      gateway.classList.add('hover-bike');
      gateway.classList.remove('hover-car');
      document.body.classList.add('on-bike');
      document.body.classList.remove('on-car');
    });
    panelCar.addEventListener('mouseenter', () => {
      gateway.classList.add('hover-car');
      gateway.classList.remove('hover-bike');
      document.body.classList.add('on-car');
      document.body.classList.remove('on-bike');
    });
    gateway.addEventListener('mouseleave', () => {
      gateway.classList.remove('hover-bike', 'hover-car');
      document.body.classList.remove('on-bike', 'on-car');
    });
  }

  /* ── Keyboard navigation ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft'  || e.key === '1') window.location.href = 'bike.html';
    if (e.key === 'ArrowRight' || e.key === '2') window.location.href = 'car.html';
  });

  /* ── Dual canvas particle systems ── */
  function createParticleSystem(canvasId, color1, color2, upward) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], rafId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function mkParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const colors = [color1, color2, 'rgba(255,255,255,'];
      const col = colors[Math.floor(Math.random() * colors.length)];
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   Math.cos(angle) * speed,
        vy:   Math.sin(angle) * speed - (upward ? 0.2 : -0.2),
        size: 0.8 + Math.random() * 2.5,
        life: 0,
        maxLife: 150 + Math.random() * 250,
        col,
        tw:   Math.random() * Math.PI * 2,
        ts:   0.03 + Math.random() * 0.04,
      };
    }

    function init() {
      particles = [];
      for (let i = 0; i < 80; i++) {
        const p = mkParticle();
        p.life = Math.random() * p.maxLife;
        particles.push(p);
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.life += 1;
        p.tw   += p.ts;
        const r = p.life / p.maxLife;
        const a = r < 0.15 ? r / 0.15 : r > 0.75 ? (1 - (r - 0.75) / 0.25) : 1;
        const ta = a * (0.5 + 0.5 * Math.sin(p.tw));
        // glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0,   p.col + (ta * 0.7) + ')');
        g.addColorStop(1,   p.col + '0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.fillStyle = p.col + ta + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.vx *= 0.999; p.vy *= 0.999;
        p.x  += p.vx;  p.y  += p.vy;
        if (p.life >= p.maxLife || p.x < -5 || p.x > W+5 || p.y < -5 || p.y > H+5) {
          particles[i] = mkParticle();
        }
      });
      rafId = requestAnimationFrame(tick);
    }

    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { resize(); init(); }, 200);
    });

    resize(); init(); tick();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else tick();
    });
  }

  /* Orange sparks for bike panel */
  createParticleSystem('canvasBike', 'rgba(255,68,0,', 'rgba(255,180,0,', true);
  /* Cyan sparks for car panel */
  createParticleSystem('canvasCar',  'rgba(0,229,255,', 'rgba(100,100,255,', false);

  /* ── Touch swipe on mobile ── */
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      window.location.href = dx > 0 ? 'bike.html' : 'car.html';
    }
  });

})();

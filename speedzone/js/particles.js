/* ============================================================
   SPEED ZONE – particles.js
   Canvas-based spark / ember particle system for hero section
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let W        = 0;
  let H        = 0;
  let particles = [];
  let animId   = null;

  /* ── Config ── */
  const CFG = {
    count:       120,
    minSize:     1,
    maxSize:     3.5,
    minSpeed:    0.15,
    maxSpeed:    0.55,
    minLife:     120,
    maxLife:     320,
    colors: [
      'rgba(255,68,0,',      // fire orange
      'rgba(255,120,0,',     // bright orange
      'rgba(255,215,0,',     // gold
      'rgba(255,255,255,',   // white spark
      'rgba(0,229,255,',     // cyan accent
    ],
    connectionDist: 110,
    connectionOpacity: 0.06,
    mouseInfluence: 140,
    mouseForce: 0.5,
  };

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ── Particle constructor ── */
  function createParticle(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = CFG.minSpeed + Math.random() * (CFG.maxSpeed - CFG.minSpeed);
    const color = CFG.colors[Math.floor(Math.random() * CFG.colors.length)];

    return {
      x:      x !== undefined ? x : Math.random() * W,
      y:      y !== undefined ? y : Math.random() * H,
      vx:     Math.cos(angle) * speed,
      vy:     Math.sin(angle) * speed - 0.15,   // slight upward drift (embers rise)
      size:   CFG.minSize + Math.random() * (CFG.maxSize - CFG.minSize),
      life:   0,
      maxLife: CFG.minLife + Math.random() * (CFG.maxLife - CFG.minLife),
      color,
      twinkle: Math.random() * Math.PI * 2,     // phase offset for twinkle
      twinkleSpeed: 0.03 + Math.random() * 0.05,
    };
  }

  /* ── Init pool ── */
  function initParticles() {
    particles = [];
    for (let i = 0; i < CFG.count; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;        // stagger initial ages
      particles.push(p);
    }
  }

  /* ── Mouse state ── */
  const mouse = { x: -9999, y: -9999 };

  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  /* ── Draw helpers ── */
  function drawGlow(p, alpha) {
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
    grad.addColorStop(0,   p.color + (alpha * 0.9) + ')');
    grad.addColorStop(0.4, p.color + (alpha * 0.4) + ')');
    grad.addColorStop(1,   p.color + '0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCore(p, alpha) {
    ctx.fillStyle = p.color + alpha + ')';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ── Main loop ── */
  function tick() {
    ctx.clearRect(0, 0, W, H);

    /* Draw connections between nearby particles */
    ctx.save();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CFG.connectionDist) {
          const alpha = (1 - dist / CFG.connectionDist) * CFG.connectionOpacity;
          ctx.strokeStyle = 'rgba(255,68,0,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    /* Update & draw each particle */
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.life++;
      p.twinkle += p.twinkleSpeed;

      /* Life ratio: 0→1→0 (fade in, sustain, fade out) */
      const ratio   = p.life / p.maxLife;
      const alpha   = ratio < 0.15
        ? (ratio / 0.15)
        : ratio > 0.75
          ? (1 - (ratio - 0.75) / 0.25)
          : 1;
      const twinkled = alpha * (0.6 + 0.4 * Math.sin(p.twinkle));

      /* Mouse repulsion */
      const mdx  = p.x - mouse.x;
      const mdy  = p.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < CFG.mouseInfluence && mdist > 0) {
        const force = (1 - mdist / CFG.mouseInfluence) * CFG.mouseForce;
        p.vx += (mdx / mdist) * force * 0.08;
        p.vy += (mdy / mdist) * force * 0.08;
      }

      /* Apply velocity with slight drag */
      p.vx *= 0.998;
      p.vy *= 0.998;
      p.x  += p.vx;
      p.y  += p.vy;

      /* Draw */
      drawGlow(p, twinkled * 0.3);
      drawCore(p, twinkled);

      /* Respawn when dead or out of bounds */
      if (p.life >= p.maxLife || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
        particles[i] = createParticle();
      }
    }

    animId = requestAnimationFrame(tick);
  }

  /* ── Burst on click ── */
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const cx   = e.clientX - rect.left;
    const cy   = e.clientY - rect.top;
    for (let i = 0; i < 18; i++) {
      const p = createParticle(cx, cy);
      p.size  *= 1.5;
      p.vx    *= 3;
      p.vy    *= 3;
      p.maxLife = 60 + Math.random() * 80;
      particles.push(p);
    }
    // Remove excess
    while (particles.length > CFG.count + 50) {
      particles.shift();
    }
  });

  /* ── Resize handler ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initParticles();
    }, 200);
  });

  /* ── Boot ── */
  resize();
  initParticles();
  tick();

  /* ── Pause when tab hidden ── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      tick();
    }
  });

})();

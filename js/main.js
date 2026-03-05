'use strict';

// helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// particle background
(function initParticles() {
  const canvas = $('#particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: -1000, y: -1000 };
  const COUNT = 90;
  const MAX_DIST = 140;
  const MOUSE_RADIUS = 120;
  const PRIMARY = 'rgba(0, 212, 255,';

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r  = Math.random() * 1.8 + 0.8;
  }

  Particle.prototype.update = function () {
    // Mouse repulsion
    const dx = this.x - mouse.x, dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
      this.vx += (dx / dist) * force * 0.6;
      this.vy += (dy / dist) * force * 0.6;
    }

    // Damping
    this.vx *= 0.985;
    this.vy *= 0.985;

    // Clamp speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 1.8) { this.vx *= 1.8 / speed; this.vy *= 1.8 / speed; }

    this.x += this.vx;
    this.y += this.vy;

    // Bounce walls
    if (this.x < 0)  { this.x = 0;  this.vx =  Math.abs(this.vx); }
    if (this.x > W)  { this.x = W;  this.vx = -Math.abs(this.vx); }
    if (this.y < 0)  { this.y = 0;  this.vy =  Math.abs(this.vy); }
    if (this.y > H)  { this.y = H;  this.vy = -Math.abs(this.vy); }
  };

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = dx * dx + dy * dy;
        if (d < MAX_DIST * MAX_DIST) {
          const alpha = (1 - Math.sqrt(d) / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = PRIMARY + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function drawParticles() {
    particles.forEach(p => {
      // Glow
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grd.addColorStop(0, PRIMARY + '0.5)');
      grd.addColorStop(1, PRIMARY + '0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = PRIMARY + '0.85)';
      ctx.fill();
    });
  }

  let raf;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => p.update());
    drawConnections();
    drawParticles();
    raf = requestAnimationFrame(loop);
  }

  // Events
  window.addEventListener('resize', () => { resize(); });
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  init();
  loop();
})();


// typing effect
(function initTyping() {
  const el = $('#role-text');
  if (!el) return;

  const roles = [
    'Mechatronics Designer',
    'CAD & Simulation Engineer',
    'Robotics Enthusiast',
    'Controls & Embedded Systems',
    'Problem Solver',
  ];

  let ri = 0, ci = 0, deleting = false, wait = 0;

  function tick() {
    const current = roles[ri];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }
    el.textContent = current.substring(0, ci);

    let delay = deleting ? 45 : 85;

    if (!deleting && ci === current.length) {
      delay = 2000;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1200);
})();


// navbar scroll + mobile toggle
(function initNav() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click (mobile)
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
})();


// scroll reveal
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => io.observe(item));
})();


// animated counters
(function initCounters() {
  const nums = $$('.stat-num');
  if (!nums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseFloat(el.dataset.target);
      const isInt   = 'integer' in el.dataset;
      const duration = 1800;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out: 1 - (1-t)^3
        const eased    = 1 - Math.pow(1 - progress, 3);
        const value    = target * eased;
        el.textContent = isInt ? Math.round(value).toLocaleString() : value.toFixed(1);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  nums.forEach(n => io.observe(n));
})();


// custom cursor
(function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  // Only show on non-touch devices
  if ('ontouchstart' in window) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  // Smooth ring follow
  (function loop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  // Hover effect on interactive elements
  const hoverEls = $$('a, button, .skill-card, .project-card, .media-item, .contact-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();


// back to top
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// lightbox
(function initLightbox() {
  // Build lightbox DOM
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `<button id="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
    <div id="lightbox-content"></div>`;
  document.body.appendChild(lb);

  const lbContent = lb.querySelector('#lightbox-content');
  const lbClose   = lb.querySelector('#lightbox-close');

  function open(item) {
    const img   = item.querySelector('img');
    const video = item.querySelector('video');
    lbContent.innerHTML = '';

    if (img) {
      const clone = img.cloneNode(true);
      lbContent.appendChild(clone);
    } else if (video) {
      const clone = video.cloneNode(true);
      clone.controls = true;
      clone.autoplay = true;
      lbContent.appendChild(clone);
    } else {
      return; // placeholder — nothing to show
    }

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    // Pause any video
    const video = lbContent.querySelector('video');
    if (video) video.pause();
    lbContent.innerHTML = '';
  }

  // Attach to media items (images/videos only, not placeholders)
  document.addEventListener('click', e => {
    const item = e.target.closest('.media-item');
    if (item && !item.querySelector('.media-placeholder')) {
      open(item);
    }
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


// highlight active nav link on scroll
(function initActiveNav() {
  const sections = $$('section[id]');
  const links    = $$('.nav-link');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = links.find(l => l.getAttribute('href') === '#' + entry.target.id);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();


// gear parallax on mouse move
(function initGearParallax() {
  const gear1 = $('.gear-1');
  const gear2 = $('.gear-2');
  const gear3 = $('.gear-3');
  if (!gear1) return;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    if (gear1) gear1.style.transform = `rotate(${performance.now() / 80}deg) translate(${dx * 8}px, ${dy * 8}px)`;
    if (gear2) gear2.style.transform = `rotate(${-performance.now() / 40}deg) translate(${dx * 15}px, ${dy * 5}px)`;
    if (gear3) gear3.style.transform = `rotate(${performance.now() / 55}deg) translate(${dx * 5}px, ${dy * 12}px)`;
  }, { passive: true });
})();

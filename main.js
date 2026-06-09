/* main.js — minimal vanilla JS for nav + scroll-reveal + chart animation */

/* Scroll reveal */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));

  /* Fallback: if nothing revealed after 800ms (e.g. iframe sandbox), reveal all */
  setTimeout(() => {
    if (!document.querySelector('.reveal.in')) {
      els.forEach(el => el.classList.add('in'));
    }
  }, 800);
})();

/* Hero chart — draw line once in view */
(function () {
  const line = document.querySelector('.chart-line');
  if (!line) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    line.classList.add('drawn');
    return;
  }
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      line.classList.add('drawn');
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(line.closest('svg') || line);
})();

/* Nav — mobile burger */
(function () {
  const burger = document.getElementById('nav-burger');
  const menu   = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });
})();

/* Nav — Portfolio dropdown (click to toggle) */
(function () {
  const btn  = document.getElementById('port-drop-btn');
  const drop = document.getElementById('port-dropdown');
  if (!btn || !drop) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = drop.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', () => {
    drop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  });

  drop.addEventListener('click', e => e.stopPropagation());
})();

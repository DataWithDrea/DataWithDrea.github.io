// ===== Theme toggle + nav + smooth scroll + active nav + reveal + magnet =====
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const nav = document.getElementById('nav');
  const btn = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');
  const upd = document.getElementById('updated');

  // Footer dates
  if (year) year.textContent = new Date().getFullYear();
  if (upd){
    const d = new Date(document.lastModified);
    upd.textContent = d.toLocaleDateString(undefined, {year:'numeric', month:'short'});
  }

  // Theme (dark/light)
  const getSystemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const stored = localStorage.getItem('theme');
  const initial = stored || getSystemTheme();
  root.setAttribute('data-theme', initial);
  if (toggle) toggle.textContent = initial === 'dark' ? '🌙' : '☀️';

  function setTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (toggle) toggle.textContent = t === 'dark' ? '🌙' : '☀️';
  }
  if (toggle){
    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || getSystemTheme();
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Mobile nav
  if (btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        if (nav) nav.classList.remove('open');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        history.replaceState(null, '', '#' + id);
      }
    });
  });

  // ===== Active nav link on scroll =====
  const sections = ['about','current','tracks','projects','journey','stats','contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];

  if ('IntersectionObserver' in window && sections.length && links.length){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting) return;
        const id = e.target.id;
        links.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+id));
      });
    },{ rootMargin:'-45% 0px -45% 0px', threshold:0 });
    sections.forEach(s=>io.observe(s));
  }

  // ===== Reveal on scroll (sections, cards, stats) =====
  const revealEls = [
    ...document.querySelectorAll('.section'),
    ...document.querySelectorAll('.card'),
    ...document.querySelectorAll('.stats-wrap')
  ];
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window){
    const ioReveal = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('in');
          ioReveal.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    revealEls.forEach(el => ioReveal.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ===== Button "magnet" micro-interaction =====
  const magBtns = document.querySelectorAll('.btn');
  magBtns.forEach(b => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top  - r.height/2;
      b.style.transform = `translate(${x*0.05}px, ${y*0.05}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
})();  // keep this IIFE wrapper

// ===== Fancy cursor (desktop only) =====
(function(){
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
  const dot = document.getElementById('cursor-dot'); if (!dot) return;

  let x = innerWidth/2, y = innerHeight/2, tx = x, ty = y;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  (function loop(){
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  })();

  const hoverables = 'a, button, .btn';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) document.documentElement.classList.add('link-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) document.documentElement.classList.remove('link-hover');
  });
})();

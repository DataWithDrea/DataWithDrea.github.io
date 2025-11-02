// ===== Theme toggle + nav =====
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const nav = document.getElementById('nav');
  const btn = document.querySelector('.nav-toggle');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

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

  if (btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

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
})();

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

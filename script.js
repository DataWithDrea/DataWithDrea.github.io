// Theme toggle + smooth nav + persistence
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

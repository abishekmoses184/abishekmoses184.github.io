(() => {
  const body = document.body;
  const themeButton = document.getElementById('themeToggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const readTheme = () => {
    try { return localStorage.getItem('abishek-theme'); }
    catch { return null; }
  };
  const saveTheme = theme => {
    try { localStorage.setItem('abishek-theme', theme); }
    catch { /* Theme switching still works when storage is unavailable. */ }
  };

  if (readTheme() === 'light') body.classList.add('light-theme');

  const paintThemeButton = () => {
    if (!themeButton) return;
    const light = body.classList.contains('light-theme');
    themeButton.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (light ? '☾' : '☼') + '</span>';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.setAttribute('aria-pressed', String(light));
    themeButton.title = light ? 'Switch to dark theme' : 'Switch to light theme';
    if (themeColor) themeColor.setAttribute('content', light ? '#f3f1ec' : '#090a0d');
  };

  paintThemeButton();
  themeButton?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    saveTheme(body.classList.contains('light-theme') ? 'light' : 'dark');
    paintThemeButton();
  });

  const menuButton = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  }));

  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.work-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
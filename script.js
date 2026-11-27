(() => {
  const body = document.body;
  const themeButton = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('abishek-theme');
  if (savedTheme === 'light') body.classList.add('light-theme');
  const paintThemeButton = () => {
    if (!themeButton) return;
    const light = body.classList.contains('light-theme');
    themeButton.innerHTML = '<span class="theme-icon" aria-hidden="true">' + (light ? '☾' : '☼') + '</span>';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.title = light ? 'Switch to dark theme' : 'Switch to light theme';
  };
  paintThemeButton();
  themeButton?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('abishek-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
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
  }, {threshold: 0.12}) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
document.addEventListener('DOMContentLoaded', () => {
  const bulb = document.getElementById('bulb');
  const themeToggle = document.getElementById('theme-toggle');

  let theme = sessionStorage.getItem('theme') || 'light';
  applyTheme(theme);

  const header = document.querySelector('.header');
  if (header) header.style.display = 'none';

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      sessionStorage.setItem('theme', theme);
      applyTheme(theme);
    });
  }

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);

    const isDark = theme === 'dark';
    const filterStyle = isDark ? 'invert()' : 'none';

    document.getElementById('door').style.filter = filterStyle;
    document.getElementById('mewo').style.filter = filterStyle;
    bulb.style.filter = isDark
      ? 'drop-shadow(0px 0px 100px var(--dark))'
      : 'invert() drop-shadow(0px 0px 10px var(--dark))';

    const whitespace = document.getElementById('whitespace');
    whitespace.classList.toggle('dark', isDark);
  }
});

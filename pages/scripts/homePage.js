document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const backgroundLayer = document.getElementById('background-layer');
  const body = document.body;
  const theme = localStorage.getItem('theme') || 'light';
  const isDark = theme === 'dark';
  const currentFilter = isDark ? 'invert()' : '';

  function applyTheme() {
    body.setAttribute('data-theme', theme);
    if (backgroundLayer) {
      backgroundLayer.style.filter = isDark
        ? `${currentFilter} brightness(75%)`
        : currentFilter;
    }
  }

  applyTheme();

  if (header && backgroundLayer) {
    header.addEventListener('mouseover', () => {
      backgroundLayer.style.filter = isDark
        ? `${currentFilter} brightness(75%)`
        : currentFilter;
    });

    header.addEventListener('mouseout', () => {
      backgroundLayer.style.filter = isDark
        ? `${currentFilter} brightness(75%)`
        : currentFilter;
    });
  }
  // Fade in effect
  const elementsToFadeIn = document.querySelectorAll('.fade-in-element');

  const observerOptions = {
    root: null, // null significa que o viewport do navegador é a área de observação
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToFadeIn.forEach(element => {
    observer.observe(element);
  });
});
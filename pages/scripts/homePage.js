document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  const backgroundLayer = document.getElementById('background-layer');
  const body = document.body;

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.setAttribute('data-theme', theme);
    if (backgroundLayer) {
      backgroundLayer.style.filter = isDark ? 'invert() brightness(75%)' : '';
    }
  }

  const theme = sessionStorage.getItem('theme') || 'light';

  applyTheme(theme);

  const galleryImages = document.querySelectorAll('.gallery-image');
  const modal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalDescription = document.getElementById('modalDescription');
  const modalLink = document.getElementById('modalLink');

  if (modal && galleryImages.length > 0) {
    const showModal = (description, link) => {
      modalDescription.textContent = description;
      modalLink.href = link;
      modal.classList.add('visible');
    };

    const hideModal = () => {
      modal.classList.remove('visible');
    };

    galleryImages.forEach(image => {
      image.addEventListener('click', () => {
        const description = image.dataset.description;
        const link = image.dataset.link;
        showModal(description, link);
      });
    });

    closeModalBtn.addEventListener('click', hideModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        hideModal();
      }
    });
  }


  // Efeito Fade-in

  const elementsToFadeIn = document.querySelectorAll('.fade-in-element');

  if (elementsToFadeIn.length > 0) {
    const observerOptions = {
      root: null, 
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
  }
});
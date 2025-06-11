'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // --- TEMA ESCURO/CLARO ---
  const body = document.body;
  const backgroundLayer = document.getElementById('background-layer');
  const savedTheme = sessionStorage.getItem('theme') || 'light';

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (backgroundLayer) {
      const isDark = theme === 'dark';
      backgroundLayer.style.filter = isDark ? 'invert() brightness(75%)' : '';
    }
  }
  applyTheme(savedTheme);

  // --- GALERIA E MODAL ---
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('imageModal');
  
  if (gallery && modal) {
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const okButton = document.getElementById('modalOkButton');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Mapeia os dados de todas as imagens da galeria de uma só vez
    const galleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));
    const galleryData = galleryImages.map(img => ({
      src: img.src,
      description: img.dataset.description,
    }));
    
    let currentIndex = 0;

    const updateModal = () => {
      if (galleryData.length === 0) return;
      const current = galleryData[currentIndex];
      modalImage.src = current.src;
      modalDescription.textContent = current.description;
    };

    const showModal = (index) => {
      currentIndex = index;
      updateModal();
      modal.showModal(); // API nativa para mostrar o dialog
    };

    const hideModal = () => {
      modal.close(); // API nativa para fechar o dialog
    };

    // Navegação com os botões
    prevBtn.addEventListener('click', () => {
      // Lógica corrigida para loop contínuo
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      updateModal();
    });

    nextBtn.addEventListener('click', () => {
      // Lógica corrigida para loop contínuo
      currentIndex = (currentIndex + 1) % galleryData.length;
      updateModal();
    });
    
    // Fechar o modal
    closeModalBtn.addEventListener('click', hideModal);
    okButton.addEventListener('click', hideModal);
    modal.addEventListener('click', (event) => {
      // Fecha se o clique for no backdrop (fora do conteúdo)
      if (event.target === modal) {
        hideModal();
      }
    });
    
    // Acessibilidade: Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (modal.open) { // Verifica se o modal está aberto
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') hideModal();
        }
    });

    // Delegação de eventos para a galeria
    gallery.addEventListener('click', (event) => {
      const clickedImage = event.target.closest('.gallery-image');
      if (clickedImage) {
        const index = galleryImages.indexOf(clickedImage);
        if (index > -1) {
          showModal(index);
        }
      }
    });
  }

  // --- EFEITO FADE-IN ---
  const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
  if (elementsToFadeIn.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elementsToFadeIn.forEach(element => observer.observe(element));
  }
});
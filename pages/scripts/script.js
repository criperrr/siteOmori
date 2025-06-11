document.addEventListener('DOMContentLoaded', () => {

  // --- Seletores de Elementos ---
  const themeToggle = document.getElementById('theme-toggle');
  const bulbImg = document.getElementById('bulb-img');
  const body = document.body;
  
  const mewoImg = document.getElementById('mewo-img');
  const mewoAudio = document.getElementById('mewo-audio');
  
  const doorLink = document.getElementById('door-link');
  const doorModal = document.getElementById('door-modal');
  const cancelDoorBtn = document.getElementById('cancel-door-btn');

  const sketchbookBtn = document.getElementById('sketchbook-btn');
  const galleryModal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const closeGalleryBtn = document.getElementById('close-gallery-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  // --- Dados da Galeria ---
  const galleryImagePaths = [
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Cover.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_1-2.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_3-4.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_5-6.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_7-8.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_9-10.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_11-12.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_13-14.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_15-16.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Pages_17-18.webp",
    "/media/image/elements/sketchbook/Whitespace_Sketchbook_Back_Cover.webp"
  ];
  let currentImageIndex = 0;

  // --- Lógica de Troca de Tema ---
  let currentTheme = sessionStorage.getItem('theme') || 'light';
  
  const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    bulbImg.style.filter = theme === 'dark'
      ? 'drop-shadow(0px 0px 100px var(--dark))'
      : 'invert(1)';
    
  };
  
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    sessionStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  });
  
  // --- Interação com Mewo ---
  const playMewoSound = () => {
    if (mewoAudio) {
      mewoAudio.pause();
      mewoAudio.currentTime = 0.24; // quase no momento q o mewo fala meow
      mewoAudio.play();
    }
  };
  
  mewoImg.addEventListener('click', playMewoSound);

  doorLink.addEventListener('click', (event) => {
    event.preventDefault(); 
    if (doorModal && typeof doorModal.showModal === 'function') {
      doorModal.showModal();
    }
  });
  
  cancelDoorBtn.addEventListener('click', () => {
    if (doorModal && typeof doorModal.close === 'function') {
      doorModal.close();
    }
  });

  // --- Lógica da Galeria do Sketchbook ---
  const updateGalleryImage = () => {
    modalImage.src = galleryImagePaths[currentImageIndex];
  };

  const showGalleryModal = (index) => {
    currentImageIndex = index;
    updateGalleryImage();
    if (galleryModal && typeof galleryModal.showModal === 'function') {
      galleryModal.showModal();
    }
  };

  const hideGalleryModal = () => {
    if (galleryModal && typeof galleryModal.close === 'function') {
      galleryModal.close();
    }
  };

  sketchbookBtn.addEventListener('click', () => {
    showGalleryModal(0);
  });

  closeGalleryBtn.addEventListener('click', hideGalleryModal);
  
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImagePaths.length) % galleryImagePaths.length;
    updateGalleryImage();
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImagePaths.length;
    updateGalleryImage();
  });
  
  galleryModal.addEventListener('click', (event) => {
    if (event.target === galleryModal) {
      hideGalleryModal();
    }
  });

});
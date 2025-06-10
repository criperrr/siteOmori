document.addEventListener('DOMContentLoaded', () => {
  // Temas escuro/claro (coleta e salva no )
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
    const filterDesaturate = isDark ? 'saturate(0)' : 'none';
    
    document.getElementById('door').style.filter = filterStyle;
    document.getElementById('tissue-box').style.filter = filterStyle;
    document.getElementById('laptop').style.filter = filterStyle;
    document.getElementById('mewo').style.filter = filterStyle;
    document.getElementById('scketchbook')
    bulb.style.filter = isDark
      ? 'drop-shadow(0px 0px 100px var(--dark))'
      : 'invert() drop-shadow(0px 0px 10px var(--dark))';
    const whitespace = document.getElementById('whitespace');
    whitespace.classList.toggle('dark', isDark);
  }
  // Modais
const sketchbookBtn = document.getElementById('scketchbook');
  const galleryImages = document.querySelectorAll('.gallery-image');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModalBtn = document.getElementById('closeModal');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  let galleryData = [];

  // Verifica se existe o modal e as imagens para a galeria
  if (modal && galleryImages.length > 0) {
    // Carrega os dados das imagens para o array galleryData
    galleryData = Array.from(galleryImages).map(img => ({
        src: img.src,
        description: img.dataset.description,
    }));

    const updateModal = () => {
        if (galleryData.length === 0) return;
        const current = galleryData[currentIndex];
        modalImage.src = current.src;
    };  

    const showModal = (index) => {
        currentIndex = index;
        updateModal();
        modal.classList.add('visible'); // Usa a classe CSS para exibir
        // Em vez de .showModal(), usamos a classe para ter a transição
        if (typeof modal.showModal === "function") {
            modal.showModal(); 
        }
    };

    const hideModal = () => {
        modal.classList.remove('visible');
        if (typeof modal.close === "function") {
            modal.close();
        }
    };

    // **GATILHO PRINCIPAL**: Abrir o modal ao clicar no SKETCHBOOK
    if (sketchbookBtn) {
        sketchbookBtn.addEventListener('click', () => {
            showModal(0); // Abre o modal começando pela primeira imagem (índice 0)
        });
    }

    // Eventos para fechar o modal e navegar
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) hideModal();
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateModal();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateModal();
        });
    }
  }

});
function playMewo() {
  const elem = document.getElementById("mewoMeow"); 
  if (elem) {
    elem.pause(); 
    elem.currentTime = 0.2495; // quase exatamente qnd o mewo fala meow
    elem.play();
  }
}
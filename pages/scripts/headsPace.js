document.addEventListener('DOMContentLoaded', () => {

  // Tema escuro/claro

  const header = document.getElementById('header');
  const backgroundLayer = document.getElementById('background-layer');
  const body = document.body;

  // Carrega o tema salvo ou usa 'light' como padrão
  const theme = sessionStorage.getItem('theme') || 'light';
  const isDark = theme === 'dark';

  // Função para aplicar o tema visualmente
  function applyTheme() {
    body.setAttribute('data-theme', theme);
    if (backgroundLayer) {
      // Aplica um filtro de brilho na imagem de fundo se o tema for escuro
      backgroundLayer.style.filter = isDark ? 'invert() brightness(75%)' : '';
    }
  }

  applyTheme(); // Aplica o tema assim que a página carrega

  // Adiciona os eventos de mouseover/mouseout no header, se ele existir
  if (header && backgroundLayer) {
    const filterStyle = isDark ? 'invert() brightness(75%)' : '';
    header.addEventListener('mouseover', () => {
      backgroundLayer.style.filter = filterStyle;
    });
    header.addEventListener('mouseout', () => {
      backgroundLayer.style.filter = filterStyle;
    });
  }

  // Script para galeria de fotos.

    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    let galleryData = []; // Fotos

    if (modal && galleryImages.length > 0) { // Carrega as informações da foto quando tudo estiver carregado corretamente.
        galleryData = Array.from(galleryImages).map(img => ({
            src: img.src,
            description: img.dataset.description,
        }));

        const updateModal = () => { // Função genérica pra atualizar a imagem
            const current = galleryData[currentIndex];
            modalImage.src = current.src;
            modalDescription.textContent = current.description;
            modalLink.onclick = () => hideModal();
        };

        const showModal = (index) => { // Função pra iniciar o modal, dps chama o update generalizado.
            currentIndex = index;
            updateModal(index);
            modal.classList.add('visible');
        };

        const hideModal = () => {
            modal.classList.remove('visible'); // Fecha o modal
        };

        galleryImages.forEach((image, index) => { // Pra cada elemento da classe, ele envia o index pro show modal
            image.addEventListener('click', () => {
                showModal(index);
            });
        });

        closeModalBtn.addEventListener('click', hideModal); // Fecha o modal
        modalLink.addEventListener('click', hideModal); // Fecha o modal

        modal.addEventListener('click', (event) => { // Fecha o modal
            if (event.target === modal) hideModal();
        });

        prevBtn.addEventListener('click', () => { // Anterior
            currentIndex = currentIndex === 0? currentIndex: (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateModal();
        });

        nextBtn.addEventListener('click', () => { // Próximo
            console.log(`Antes: Current index: ${currentIndex}\n  galleryData.length: ${galleryData.length}`);
            currentIndex = currentIndex === galleryData.length-1? currentIndex: (currentIndex + 1) % galleryData.length;
            console.log(`Antes: Current index: ${currentIndex}\n  galleryData.length: ${galleryData.length}`);
            updateModal();
        });
    }


  // Efeito Fade-in

  const elementsToFadeIn = document.querySelectorAll('.fade-in-element');

  if (elementsToFadeIn.length > 0) {
    const observerOptions = {
      root: null, // A área de observação é o viewport do navegador
      rootMargin: '0px',
      threshold: 0.1 // O gatilho é ativado quando 10% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Quando o elemento entra na tela
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Adiciona a classe que ativa a animação
          observer.unobserve(entry.target); // Para de observar o elemento para economizar recursos
        }
      });
    }, observerOptions);

    // Inicia a observação para cada elemento
    elementsToFadeIn.forEach(element => {
      observer.observe(element);
    });
  }
});



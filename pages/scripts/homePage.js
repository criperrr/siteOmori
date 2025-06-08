document.addEventListener('DOMContentLoaded', () => {

  // Tema escuro/claro

  const header = document.getElementById('header');
  const backgroundLayer = document.getElementById('background-layer');
  const body = document.body;

  // Carrega o tema salvo ou usa 'light' como padrão
  const theme = localStorage.getItem('theme') || 'light';
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


  // Modais

  const galleryImages = document.querySelectorAll('.gallery-image');
  const modal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalDescription = document.getElementById('modalDescription');
  const modalLink = document.getElementById('modalLink');

  // Verifica se os elementos do modal existem na página antes de adicionar os eventos
  if (modal && galleryImages.length > 0) {
    // Função para mostrar o modal com as informações corretas
    const showModal = (description, link) => {
      modalDescription.textContent = description; // Define a descrição
      modalLink.href = link; // Define o link do botão
      modal.classList.add('visible'); // Torna o modal visível
    };

    // Função para esconder o modal
    const hideModal = () => {
      modal.classList.remove('visible');
    };

    // Adiciona um evento de clique para cada imagem da galeria
    galleryImages.forEach(image => {
      image.addEventListener('click', () => {
        // Pega as informações dos atributos 'data-*' da imagem clicada
        const description = image.dataset.description;
        const link = image.dataset.link;
        showModal(description, link);
      });
    });

    // Adiciona evento de clique para o botão de fechar
    closeModalBtn.addEventListener('click', hideModal);

    // Adiciona evento de clique para o fundo do modal (overlay)
    modal.addEventListener('click', (event) => {
      // Se o alvo do clique for o próprio fundo (e não a caixa de conteúdo), o modal fecha
      if (event.target === modal) {
        hideModal();
      }
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
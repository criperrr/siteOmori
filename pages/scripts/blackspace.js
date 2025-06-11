document.addEventListener('DOMContentLoaded', () => {

    // Lógica do tema é simplificada, pois a página de Blackspace é sempre escura.
    // O atributo data-theme="dark" já foi colocado diretamente no <body> do HTML.
    const backgroundLayer = document.getElementById('background-layer');
    if (backgroundLayer) {
        backgroundLayer.style.filter = 'invert() brightness(75%)';
    }

    // --- Script da Galeria ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const creatureNameElement = document.getElementById('creatureName'); // Adicionado
    const modalDescription = document.getElementById('modalDescription');
    const okButton = document.getElementById('modalLink');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (modal && galleryItems.length > 0) {
        let currentIndex = 0;
        
        // Mapeia os dados das imagens e legendas uma única vez para otimização
        const galleryData = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption');
            return {
                src: img.src,
                alt: img.alt,
                description: img.dataset.description,
                name: caption.textContent.trim() // Salva o nome da criatura
            };
        });

        const updateModal = () => {
            const currentItem = galleryData[currentIndex];
            modalImage.src = currentItem.src;
            modalImage.alt = currentItem.alt;
            creatureNameElement.textContent = currentItem.name; // Atualizado: Define o nome da criatura
            modalDescription.textContent = currentItem.description || '';
        };

        const showModal = (index) => {
            currentIndex = index;
            updateModal();
            modal.showModal(); // Usa o método showModal() para <dialog>
            modal.classList.add('visible');
        };

        const hideModal = () => {
            modal.classList.remove('visible');
            // Adiciona um pequeno delay para a animação de opacidade terminar antes de fechar
            setTimeout(() => {
                modal.close(); // Usa o método close() para <dialog>
            }, 300);
        };

        // Adiciona evento de clique para cada item da galeria
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => showModal(index));
        });

        // Eventos para fechar o modal
        closeModalBtn.addEventListener('click', hideModal);
        okButton.addEventListener('click', hideModal);
        modal.addEventListener('click', (event) => {
            // Fecha o modal se o clique for no backdrop (fora do conteúdo)
            if (event.target === modal) {
                hideModal();
            }
        });

        // --- LÓGICA DE NAVEGAÇÃO OTIMIZADA ---
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão feche o modal
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateModal();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão feche o modal
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateModal();
        });

        // Navegação com as setas do teclado
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('visible')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                } else if (e.key === 'Escape') {
                    hideModal();
                }
            }
        });
    }
    const goBack = document.getElementById('text-goBack');
const backModal = document.getElementById('backModal');
const closeBackModalBtn = document.getElementById('closeBackModal');
const confirmBackBtn = document.getElementById('confirmBackButton');

// Função para ABRIR o modal de confirmação
goBack.addEventListener('click', (e) => {
    e.preventDefault(); // Impede que o link 'a' tente navegar para algum lugar
    backModal.showModal();
    backModal.classList.add('visible');
});

// Função para FECHAR o modal de confirmação
function hideBackModal() {
    backModal.classList.remove('visible');
    // Adiciona um pequeno delay para a animação de opacidade terminar antes de fechar
    setTimeout(() => {
        backModal.close();
    }, 300);
}

    // Evento para o botão de fechar (o 'X')
    closeBackModalBtn.addEventListener('click', hideBackModal);

    // Evento para fechar clicando no fundo (backdrop)
    backModal.addEventListener('click', (event) => {
        if (event.target === backModal) {
            hideBackModal();
        }
    });

    // Evento para o botão de AÇÃO: "Sim."
    confirmBackBtn.addEventListener('click', () => {
        // Redireciona o usuário para a página principal
        window.location.href = "../../pages/html/homePage.html";
    });

    // --- Efeito Fade-in ---
    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
    if (elementsToFadeIn.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToFadeIn.forEach(element => {
            observer.observe(element);
        });
    }
});
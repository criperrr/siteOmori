document.addEventListener('DOMContentLoaded', () => {

    const backgroundLayer = document.getElementById('background-layer');
    if (backgroundLayer) {
        backgroundLayer.style.filter = 'invert() brightness(75%)';
    }

    // --- Script da Galeria ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const creatureNameElement = document.getElementById('creatureName');
    const modalDescription = document.getElementById('modalDescription');
    const okButton = document.getElementById('modalLink');
    const closeModalBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (modal && galleryItems.length > 0) {
        let currentIndex = 0;
        
        const galleryData = Array.from(galleryItems).map(item => {
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption');
            return {
                src: img.src,
                alt: img.alt,
                description: img.dataset.description,
                name: caption.textContent.trim()
            };
        });

        const updateModal = () => {
            const currentItem = galleryData[currentIndex];
            modalImage.src = currentItem.src;
            modalImage.alt = currentItem.alt;
            creatureNameElement.textContent = currentItem.name; 
            modalDescription.textContent = currentItem.description || '';
        };

        const showModal = (index) => {
            currentIndex = index;
            updateModal();
            modal.showModal(); 
            modal.classList.add('visible');
        };

        const hideModal = () => {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.close(); 
            }, 300);
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => showModal(index));
        });

        closeModalBtn.addEventListener('click', hideModal);
        okButton.addEventListener('click', hideModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });

        // --- LÓGICA DE NAVEGAÇÃO  ---
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            updateModal();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateModal();
        });

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
    e.preventDefault(); 
    backModal.showModal();
    backModal.classList.add('visible');
});

function hideBackModal() {
    backModal.classList.remove('visible');
    setTimeout(() => {
        backModal.close();
    }, 300);
}

    closeBackModalBtn.addEventListener('click', hideBackModal);

    backModal.addEventListener('click', (event) => {
        if (event.target === backModal) {
            hideBackModal();
        }
    });

    confirmBackBtn.addEventListener('click', () => {
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
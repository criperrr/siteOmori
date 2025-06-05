document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const backgroundLayer = document.getElementById('background-layer');
    let theme = localStorage.getItem('theme') || 'light';
    let isDark = (theme === 'dark');
    let currentFilter = (isDark)? 'invert()' : '';

    function applyTheme() {
        const body = document.body;
        body.setAttribute('data-theme', theme);
        if (backgroundLayer) {
            backgroundLayer.style.filter = (!isDark)? currentFilter: `${currentFilter} brightness(75%)`;
            console.log(`isDark: ${isDark}\n theme: ${theme}\n backgroundLayer.style.filter = ${backgroundLayer.style.filter}`);
        }
        
    }
    applyTheme();

    if (header && backgroundLayer) {
        header.addEventListener('mouseover', () => {
            backgroundLayer.style.filter = (isDark)? `${currentFilter} brightness(75%) `: `${currentFilter} `;
            console.log(`currentFilter = ${ backgroundLayer.style.filter}`);
        });

        header.addEventListener('mouseout', () => {
            backgroundLayer.style.filter = (isDark)? `${currentFilter} brightness(75%)`: `${currentFilter}`;
            console.log(`currentFilter = ${ backgroundLayer.style.filter}`);
        });
    }
    
});
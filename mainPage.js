document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme') || 'light';
    console.log('Current theme:', theme);
    document.body.setAttribute('data-theme', theme);
});
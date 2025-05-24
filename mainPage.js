let originalFilterStyle = '';

document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);
    const isDark = (theme === 'dark');
    originalFilterStyle = isDark ? 'invert()' : '';
    document.getElementById('back').style.filter = originalFilterStyle;
});

document.getElementById('header').addEventListener('mouseover', () => {
    document.getElementById('back').style.filter =
        originalFilterStyle ? originalFilterStyle + ' blur(3px)' : 'blur(3px)';
});
document.getElementById('header').addEventListener('mouseout', () => {
    let theme = localStorage.getItem('theme') || 'light';
    const isDark = (theme === 'dark');
    originalFilterStyle = isDark ? 'invert()' : '';
    document.getElementById('back').style.filter = originalFilterStyle;
});

let theme = '';
const theme_local = window.sessionStorage.getItem('theme');
window.addEventListener('DOMContentLoaded', function() {
    const bulb = document.getElementById('bulb');
    const header = document.getElementById('header');
    const debug_text = document.getElementById('debug');
    theme = theme_local;
    debug_text.innerHTML = theme;
    applyTheme(theme);

    if (header) {
        header.style.display = 'none';
    }
    if (bulb) {
        bulb.addEventListener('click', () => {
            theme = (theme === 'dark' ? 'light' : 'dark');
            window.sessionStorage.setItem("theme", theme);

            applyTheme(theme);
        });
    }
});

function applyTheme(theme){
    const whitespace = document.getElementById('whitespace');
    const mewo = document.getElementById('mewo');
        const debug_text = document.getElementById('debug');
    if(theme === "dark"){
        document.body.setAttribute('data-theme', theme);
        if (bulb) bulb.style.filter = "none";
        if (whitespace) whitespace.classList.add("dark");
        if (mewo) mewo.style.filter = 'invert()';
    } else if(theme === "light"){

        document.body.setAttribute('data-theme', theme);
        if (bulb) bulb.style.filter = "invert()";
        if (whitespace) whitespace.classList.remove("dark");
        if (mewo) mewo.style.filter = 'none';
    }
    debug_text.innerHTML = theme;
}

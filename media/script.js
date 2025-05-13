let theme = '';
const theme_local = window.sessionStorage.getItem('theme');
window.addEventListener('DOMContentLoaded', function() {
    const bulb = document.getElementById('bulb');
    const header = document.getElementById('header');
    theme = theme_local;
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
    const door = document.getElementById('door');
    const whitespace = document.getElementById('whitespace');
    const mewo = document.getElementById('mewo');
    if(theme === "dark"){
        document.body.setAttribute('data-theme', theme);
        if (bulb) bulb.style.filter = "drop-shadow(0px 0px 100px var(--dark))";
        if (whitespace) whitespace.classList.add("dark");
        if (mewo) mewo.style.filter = 'invert()';
        if (door) door.style.filter = 'invert()';
    } else if(theme === "light"){

        document.body.setAttribute('data-theme', theme);
        if (bulb) bulb.style.filter = "invert() drop-shadow(0px 0px 10px var(--dark))";
        if (whitespace) whitespace.classList.remove("dark");
        if (mewo) mewo.style.filter = 'none';
        if (door) door.style.filter = 'none';
    }
}

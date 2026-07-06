document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const fullMenu = document.getElementById('fullMenu');
    const navCloseBtn = document.getElementById('navCloseBtn');
    if (!menuBtn || !fullMenu) return;

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuBtn.classList.toggle('open');
            fullMenu.classList.toggle('open');
        });
    }

    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            fullMenu.classList.remove('open');
        });
    }

    fullMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.parentElement.classList.contains('has-dropdown')) return;
            
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            menuBtn.classList.remove('open');
            fullMenu.classList.remove('open');
        });
    });
});
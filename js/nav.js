document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const fullMenu = document.getElementById('fullMenu');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const featuresDropdown = document.getElementById('featuresDropdown');
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
            if (featuresDropdown) {
                featuresDropdown.classList.remove('open');
            }
        });
    }
    if (featuresDropdown) {
        const trigger = featuresDropdown.querySelector('a');
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            featuresDropdown.classList.toggle('open');
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
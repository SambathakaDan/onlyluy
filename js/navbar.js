document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('global-hamburger');
    var fullscreenNav = document.getElementById('fullscreen-nav');
    var hero = document.getElementById('hero');

    function updateHamburgerVisibility() {
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.scrollY > heroBottom - window.innerHeight * 0.5) {
            hamburger.classList.add('visible');
        } else {
            hamburger.classList.remove('visible');
            hamburger.classList.remove('open');
            fullscreenNav.classList.remove('open');
        }
    }

    window.addEventListener('scroll', updateHamburgerVisibility);
    updateHamburgerVisibility();

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');
        fullscreenNav.classList.toggle('open');
    });
});
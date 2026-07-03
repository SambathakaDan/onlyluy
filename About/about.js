const hamburger = document.getElementById('global-hamburger');
const fullscreenNav = document.getElementById('fullscreen-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    fullscreenNav.classList.toggle('open');
});
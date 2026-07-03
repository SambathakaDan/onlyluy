function openModal() {
    document.getElementById('auth-modal').showModal();
}

function switchTab(tab) {
    document.getElementById('form-signin').classList.toggle('hidden', tab !== 'signin');
    document.getElementById('form-signup').classList.toggle('hidden', tab !== 'signup');
    document.getElementById('tab-signin').classList.toggle('active', tab === 'signin');
    document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}

function setBilling(type) {
    document.getElementById('btnmonth').classList.toggle('active', type === 'monthly');
    document.getElementById('btnyear').classList.toggle('active', type === 'yearly');
    document.getElementById('pro-price').textContent = type === 'yearly' ? '6$/Month(25% off)' : '8$/Month';
}

const hamburger = document.getElementById('global-hamburger');
const fullscreenNav = document.getElementById('fullscreen-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    fullscreenNav.classList.toggle('open');
});
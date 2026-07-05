document.addEventListener('DOMContentLoaded', () => {
    const copyElement = document.querySelector('.footer-copy');
    if (copyElement) {
        const currentYear = new Date().getFullYear();
        copyElement.textContent = copyElement.textContent.replace('2026', currentYear);
    }
});
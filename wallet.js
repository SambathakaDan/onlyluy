window.addEventListener('load', () => {
    const rainContainer = document.getElementById('rain-container');
    const currencySymbols = ['$', '€', '៛', '¥', '£'];
    
    for (let i = 0; i < 40; i++) {
        const drop = document.createElement('div');
        drop.classList.add('money-drop');
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        drop.style.animationDuration = (Math.random() * 4 + 3) + 's';
        drop.style.animationDelay = Math.random() * 5 + 's';
        drop.textContent = currencySymbols[Math.floor(Math.random() * currencySymbols.length)];
        rainContainer.appendChild(drop);
    }
});
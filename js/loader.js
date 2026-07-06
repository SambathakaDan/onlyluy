window.addEventListener('load', () => {
    const loadingCurtain = document.getElementById('loading-curtain');
    const loaderFill = document.getElementById('loader-fill');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderStatus = document.getElementById('loader-status');
    const walletModel = document.getElementById('wallet-3d-model');

    if (!loadingCurtain) return;

    document.body.style.overflow = 'hidden';

    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loaderFill.style.width = progress + '%';
        loaderPercent.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(loadInterval);
            loaderStatus.textContent = 'DONE';
            setTimeout(() => {
                loadingCurtain.classList.add('loaded');
                document.body.style.overflow = 'auto';
                if (walletModel) {
                    walletModel.classList.add('loaded');
                }
            }, 600);
        }
    }, 200);
});
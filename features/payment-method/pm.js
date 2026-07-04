document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Cards Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.ftg-card').forEach(el => observer.observe(el));

    const sliceSequence = document.getElementById('ftg-slice');
    if (sliceSequence) {
        window.addEventListener('scroll', () => {
            const rect = sliceSequence.getBoundingClientRect();
            const scrollableHeight = sliceSequence.offsetHeight - window.innerHeight;
            const scrollTop = -rect.top;

            // FIX: If you scroll above the section, force reset everything
            if (scrollTop < 0) {
                sliceSequence.classList.remove('card-in');
                sliceSequence.classList.remove('sliced');
                return;
            }

            // If you are inside the section
            if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
                let progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                
                if (progress > 0.05) {
                    sliceSequence.classList.add('card-in');
                } else {
                    sliceSequence.classList.remove('card-in');
                }
                
                if (progress > 0.60) {
                    sliceSequence.classList.add('sliced');
                } else {
                    sliceSequence.classList.remove('sliced');
                }
            }
        });
    }
    // 3. Falling Assets Interactive Game Sandbox
    const gameArea = document.getElementById('ftg-game-area');
    if (gameArea) {
        const wallet = document.getElementById('ftg-wallet');
        const scoreDisplay = document.getElementById('ftg-score');
        const pauseBtn = document.getElementById('ftg-pause');
        const resetBtn = document.getElementById('ftg-reset');
        let score = 0;
        let isPaused = false;
        let moneyElements = [];

        // Wallet tracking positions (adjusted to pointer center alignment)
        gameArea.addEventListener('mousemove', (e) => {
            const rect = gameArea.getBoundingClientRect();
            let relativeX = e.clientX - rect.left;
            // Prevent wallet from exiting visual bounds
            if (relativeX < 0) relativeX = 0;
            if (relativeX > gameArea.offsetWidth) relativeX = gameArea.offsetWidth;
            wallet.style.left = relativeX + 'px';
        });

        gameArea.addEventListener('touchmove', (e) => {
            if (e.touches.length === 0) return;
            const rect = gameArea.getBoundingClientRect();
            let relativeX = e.touches[0].clientX - rect.left;
            if (relativeX < 0) relativeX = 0;
            if (relativeX > gameArea.offsetWidth) relativeX = gameArea.offsetWidth;
            wallet.style.left = relativeX + 'px';
        });

        // Spawn alternative crypto and fiat markers to match UI themes
        function spawnMoney() {
            if (isPaused) return;
            const assets = ['$', '₿', 'Ξ', '₮'];
            const money = document.createElement('div');
            money.className = 'ftg-money';
            money.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
            money.style.top = '-40px';
            money.textContent = assets[Math.floor(Math.random() * assets.length)];
            gameArea.appendChild(money);
            moneyElements.push(money);
        }

        // Dedicated frame loop capturing bounding colliders accurately
        function gameLoop() {
            if (!isPaused) {
                const walletRect = wallet.getBoundingClientRect();
                
                // Backwards array navigation protects index evaluation loops against instant splicing arrays
                for (let i = moneyElements.length - 1; i >= 0; i--) {
                    const money = moneyElements[i];
                    let top = parseFloat(money.style.top);
                    top += 3;
                    money.style.top = top + 'px';

                    const moneyRect = money.getBoundingClientRect();
                    
                    // Collision check calculation using bounding viewports
                    if (
                        moneyRect.bottom >= walletRect.top &&
                        moneyRect.top <= walletRect.bottom &&
                        moneyRect.right >= walletRect.left &&
                        moneyRect.left <= walletRect.right
                    ) {
                        score++;
                        scoreDisplay.textContent = score;
                        money.remove();
                        moneyElements.splice(i, 1);
                    } else if (top > gameArea.offsetHeight) {
                        money.remove();
                        moneyElements.splice(i, 1);
                    }
                }
            }
            requestAnimationFrame(gameLoop);
        }
        
        setInterval(spawnMoney, 800);
        gameLoop();

        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
        });

        resetBtn.addEventListener('click', () => {
            score = 0;
            scoreDisplay.textContent = score;
            moneyElements.forEach(m => m.remove());
            moneyElements = [];
        });
    }
    
    // 4. MCP Dashboard URL Clipboard Integrations
    const copyBtn = document.getElementById('ftg-copy');
    const mcpUrl = document.getElementById('ftg-mcp-link');
    if (copyBtn && mcpUrl) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(mcpUrl.textContent).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = 'Copy URL'; }, 2000);
            }).catch(err => {
                console.error('Failed to copy link selection: ', err);
            });
        });
    }
});
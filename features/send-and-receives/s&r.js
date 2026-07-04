document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('ftg-map');
    if (mapContainer) {
        const hubs = [
            { x: 25, y: 38 }, { x: 47, y: 30 }, { x: 82, y: 40 }, { x: 30, y: 65 }, { x: 80, y: 70 }
        ];
        hubs.forEach(hub => {
            const node = document.createElement('div');
            node.className = 'ftg-map-node';
            node.style.left = hub.x + '%';
            node.style.top = hub.y + '%';
            mapContainer.appendChild(node);
        });
        function createZap() {
            const startHub = hubs[Math.floor(Math.random() * hubs.length)];
            let endHub = hubs[Math.floor(Math.random() * hubs.length)];
            while (endHub === startHub) endHub = hubs[Math.floor(Math.random() * hubs.length)];
            const particle = document.createElement('div');
            particle.className = 'ftg-zap';
            particle.style.left = startHub.x + '%';
            particle.style.top = startHub.y + '%';
            mapContainer.appendChild(particle);
            particle.animate([
                { left: startHub.x + '%', top: startHub.y + '%' },
                { left: endHub.x + '%', top: endHub.y + '%' }
            ], { duration: 800, easing: 'ease-in-out' });
            setTimeout(() => particle.remove(), 800);
        }
        setInterval(createZap, 600);
    }

    const chatBubbles = document.querySelectorAll('.ftg-chat-bubble');
    const chatWrapper = document.querySelector('.ftg-chat-wrapper');
    if (chatWrapper && chatBubbles.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = chatWrapper.getBoundingClientRect();
            const scrollableHeight = chatWrapper.offsetHeight - window.innerHeight;
            const scrollTop = -rect.top;
            if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
                let progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                if (progress > 0.1) chatBubbles[0].classList.add('visible'); else chatBubbles[0].classList.remove('visible');
                if (progress > 0.3) chatBubbles[1].classList.add('visible'); else chatBubbles[1].classList.remove('visible');
                if (progress > 0.5) chatBubbles[2].classList.add('visible'); else chatBubbles[2].classList.remove('visible');
                if (progress > 0.7) chatBubbles[3].classList.add('visible'); else chatBubbles[3].classList.remove('visible');
            }
        });
    }
});
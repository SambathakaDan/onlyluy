// Marquee — starts the scrolling ticker only after full page load
window.onload = () => {
    document.querySelector('.marquee-anim-track').classList.add('ready');
};


document.addEventListener('DOMContentLoaded', () => {

    // Element references
    const backgroundLayers   = document.querySelectorAll('.background-layer');
    const scrollSections     = document.querySelectorAll('[data-bg]');
    const heroBgText         = document.getElementById('hero-bg-text');
    const roadmapWrapper     = document.getElementById('roadmap-wrapper');
    const roadmapSteps       = document.querySelectorAll('.roadmap-step');
    const progressFill       = document.getElementById('progress-fill');
    const testimonialsWrapper = document.getElementById('testimonials-wrapper');
    const testimonialsTrack   = document.getElementById('testimonials-track');

    const currencyTabs    = document.querySelectorAll('.currency-tabbing');
    const balanceDisplay  = document.getElementById('balance-display');
    const networkName     = document.getElementById('morph-network');
    const networkSpeed    = document.getElementById('morph-speed');
    const logLine1        = document.getElementById('log-line-1');
    const logLine2        = document.getElementById('log-line-2');


    // Testimonials — set scroll-jacked wrapper height
    const setTestimonialsHeight = () => {
        if (!testimonialsTrack || !testimonialsWrapper) return;
        const cardCount = testimonialsTrack.children.length;
        testimonialsWrapper.style.height = `${window.innerHeight * cardCount}px`;
    };

    setTimeout(setTestimonialsHeight, 500);
    window.addEventListener('resize', setTestimonialsHeight);


    // Background switching — crossfades layer based on scroll section
    const updateBackground = () => {
        const scrollMidPoint = window.scrollY + window.innerHeight / 2;
        let activeIndex = 0;

        scrollSections.forEach((sec) => {
            if (sec.offsetTop <= scrollMidPoint && sec.offsetTop + sec.offsetHeight > scrollMidPoint) {
                activeIndex = parseInt(sec.dataset.bg);
            }
        });

        backgroundLayers.forEach((layer, index) => {
            if (index === activeIndex) layer.classList.add('active');
            else layer.classList.remove('active');
        });
    };


    // Roadmap — scrollytelling progress bar + step states
    let lastCheckpointStep = -1;

    const updateRoadmap = () => {
        if (!roadmapWrapper) return;
        const rect = roadmapWrapper.getBoundingClientRect();
        const scrollableHeight = roadmapWrapper.offsetHeight - window.innerHeight;
        const scrollTop = -rect.top;

        if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
            let progress = scrollTop / scrollableHeight;
            if (progressFill) progressFill.style.height = `${progress * 100}%`;

            let activeStepIndex = Math.floor(progress * roadmapSteps.length);
            if (activeStepIndex < 0) activeStepIndex = 0;
            if (activeStepIndex >= roadmapSteps.length) activeStepIndex = roadmapSteps.length - 1;

            // iOS Safari has no Vibration API — navigator.vibrate is undefined there,
            // so this guard makes it a harmless no-op on iPhone instead of an error.
            if (activeStepIndex !== lastCheckpointStep) {
                lastCheckpointStep = activeStepIndex;
                if (navigator.vibrate) navigator.vibrate(40);
            }

            roadmapSteps.forEach((step, index) => {
                if (index === activeStepIndex) {
                    step.classList.remove('exit');
                    step.classList.add('active');
                } else if (index < activeStepIndex) {
                    step.classList.remove('active');
                    step.classList.add('exit');
                } else {
                    step.classList.remove('active');
                    step.classList.remove('exit');
                }
            });
        }
    };


    // Master scroll handler — runs all scroll-driven effects
    const handleScroll = () => {
        updateBackground();

        // Hero text parallax + zoom
        const scrollProgress = window.scrollY / window.innerHeight;
        if (heroBgText) {
            heroBgText.style.transform =
                `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px)) scale(${1 + scrollProgress * 0.5})`;
        }

        // Testimonials horizontal carousel driven by vertical scroll
        if (testimonialsWrapper && testimonialsTrack) {
            const rect = testimonialsWrapper.getBoundingClientRect();
            const scrollableHeight = testimonialsWrapper.offsetHeight - window.innerHeight;
            const scrollTop = -rect.top;

            if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
                const cards = testimonialsTrack.children;
                const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                const activeIndex = Math.min(cards.length - 1, Math.round(progress * (cards.length - 1)));
                const targetCard = cards[activeIndex];

                const trackWidth = testimonialsTrack.scrollWidth;
                const trackStaticLeft = (window.innerWidth - trackWidth) / 2;
                const desiredLeft = window.innerWidth * 0.1;
                testimonialsTrack.style.transform =
                    `translateX(${desiredLeft - trackStaticLeft - targetCard.offsetLeft}px)`;
            }
        }

        updateRoadmap();
    };

    // Throttle scroll handling to once per animation frame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    // Wallet / currency tab switcher — demo balance data per currency
    const currencyData = {
        usd: { symbol: '$', bal: '1450.00', net: 'OnlyLuy-Direct (US-East)', spd: '0.02s' },
        khr: { symbol: '៛', bal: '5,900,000', net: 'OnlyLuy-Asia (Phnom Penh)', spd: '0.03s' },
        eur: { symbol: '€', bal: '1350.50', net: 'OnlyLuy-EU (Frankfurt)', spd: '0.01s' }
    };

    currencyTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            currencyTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const currencyKey = tab.dataset.currency;
            const data = currencyData[currencyKey];

            if (data) {
                if (balanceDisplay) balanceDisplay.textContent = `${data.symbol}${data.bal}`;
                if (networkName) networkName.textContent = data.net;
                if (networkSpeed) networkSpeed.textContent = `${data.spd} Settlement`;
                if (logLine1) logLine1.textContent = `>> route_switch: ${currencyKey.toUpperCase()}_PIPELINE_ACTIVE`;
                if (logLine2) logLine2.textContent = `> conversion_rate: 1:${(Math.random() * 4000 + 100).toFixed(2)}`;
            }
        });
    });


    // Init — set initial heights + run once on load
    if (roadmapWrapper && roadmapSteps.length > 0) {
        roadmapWrapper.style.height = `${roadmapSteps.length * 300}vh`;
    }

    handleScroll();
});
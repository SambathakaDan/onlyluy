window.addEventListener('load', () => {
    const loadingCurtain = document.getElementById('loading-curtain');
    const loaderFill = document.getElementById('loader-fill');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderStatus = document.getElementById('loader-status');
    const walletModel = document.getElementById('wallet-3d-model');

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

    document.body.style.overflow = 'hidden';

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.closest('.fullscreen-nav')) {
                hamburger.classList.remove('open');
                fullscreenNav.classList.remove('open');
            }
        });
    });



    const backgroundLayers = document.querySelectorAll('.background-layer');
    const scrollSections = document.querySelectorAll('[data-bg]');
    const heroBgText = document.getElementById('hero-bg-text');
    const roadmapWrapper = document.getElementById('roadmap-wrapper');
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    const progressFill = document.getElementById('progress-fill');
    const testimonialsWrapper = document.getElementById('testimonials-wrapper');
    const testimonialsTrack = document.getElementById('testimonials-track');
    const hamburger = document.getElementById('global-hamburger');
    const fullscreenNav = document.getElementById('fullscreen-nav');

    const setTestimonialsHeight = () => {
        if (!testimonialsTrack || !testimonialsWrapper) return;
        const trackWidth = testimonialsTrack.scrollWidth;
        const extraScroll = Math.max(0, trackWidth - window.innerWidth);
        testimonialsWrapper.style.height = `${window.innerHeight + extraScroll}px`;
    };
    
    setTimeout(setTestimonialsHeight, 500);
    window.addEventListener('resize', setTestimonialsHeight);

    let audioCtx = null;
    const playClickSound = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.value = 800;
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    };

    const triggerCheckpointFeedback = () => {
        playClickSound();
        if (navigator.vibrate) navigator.vibrate(40);
    };


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
    let lastCheckpointStep = -1;

    const handleScroll = () => {
        updateBackground();

        const scrollProgress = window.scrollY / window.innerHeight;
        if (heroBgText) {
            heroBgText.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px)) scale(${1 + scrollProgress * 0.5})`;
        }


        if (testimonialsWrapper && testimonialsTrack) {
            const rect = testimonialsWrapper.getBoundingClientRect();
            const scrollableHeight = testimonialsWrapper.offsetHeight - window.innerHeight;
            const scrollTop = -rect.top;

            if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
                let progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
                const maxX = testimonialsTrack.scrollWidth - window.innerWidth; 
                if (maxX > 0) {
                    testimonialsTrack.style.transform = `translateX(${-progress * maxX}px)`;
                }
            }
        }

        updateRoadmap();
    };

    window.addEventListener('scroll', handleScroll);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        fullscreenNav.classList.toggle('open');
    });

    const currencyTabs = document.querySelectorAll('.currency-tabbing');
    const balanceDisplay = document.getElementById('balance-display');
    const networkName = document.getElementById('morph-network');
    const networkSpeed = document.getElementById('morph-speed');
    const logLine1 = document.getElementById('log-line-1');
    const logLine2 = document.getElementById('log-line-2');

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
            balanceDisplay.textContent = `${data.symbol}${data.bal}`;
            networkName.textContent = data.net;
            networkSpeed.textContent = `${data.spd} Settlement`;
            logLine1.textContent = `>> route_switch: ${currencyKey.toUpperCase()}_PIPELINE_ACTIVE`;
            logLine2.textContent = `> conversion_rate: 1:${(Math.random() * 4000 + 100).toFixed(2)}`;
        });
    });

    roadmapWrapper.style.height = `${roadmapSteps.length * 300}vh`;

    const updateRoadmap = () => {
        const rect = roadmapWrapper.getBoundingClientRect();
        const scrollableHeight = roadmapWrapper.offsetHeight - window.innerHeight;
        const scrollTop = -rect.top;

        if (scrollTop >= 0 && scrollTop <= scrollableHeight) {
            let progress = scrollTop / scrollableHeight; 
            progressFill.style.height = `${progress * 100}%`;
            
            let activeStepIndex = Math.floor(progress * roadmapSteps.length);
            if (activeStepIndex < 0) activeStepIndex = 0;
            if (activeStepIndex >= roadmapSteps.length) activeStepIndex = roadmapSteps.length - 1;

            if (activeStepIndex !== lastCheckpointStep) {
                lastCheckpointStep = activeStepIndex;
                triggerCheckpointFeedback();
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

    handleScroll(); 
});
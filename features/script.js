function openModal() {
    document.getElementById('auth-modal').showModal();
}

function switchTab(tab) {
    document.getElementById('form-signin').classList.toggle('hidden', tab !== 'signin');
    document.getElementById('form-signup').classList.toggle('hidden', tab !== 'signup');
    document.getElementById('tab-signin').classList.toggle('active', tab === 'signin');
    document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}

// Monthly / Yearly toggle
(function initPricingToggle() {
    const monthlybutton = document.getElementById("btnmonth");
    const yearlybutton  = document.getElementById("btnyear");
    const prodollar     = document.getElementById("-25%off");

    if (!monthlybutton || !yearlybutton || !prodollar) return;

    monthlybutton.addEventListener('click', () => {
        prodollar.textContent = "8$/Month";
        monthlybutton.classList.add("active");
        yearlybutton.classList.remove("active");
    });

    yearlybutton.addEventListener('click', () => {
        prodollar.textContent = "6$/Month (25% off)";
        monthlybutton.classList.remove("active");
        yearlybutton.classList.add("active");
    });
})();

// Hero scroll animation
(function initHeroScroll() {
    const section   = document.getElementById('introduction');
    const title     = document.getElementById('hero-title');
    const imageWrap = document.getElementById('hero-image-wrap');
    const qr        = document.getElementById('hero-qr');

    if (!section || !title || !imageWrap || !qr) return;

    let ticking = false;

    function applyProgress(progress) {
        const titleOpacity = Math.max(0, 1 - progress * 2);
        const titleY       = -progress * 60;
        title.style.opacity   = titleOpacity;
        title.style.transform = `translateY(${titleY}px)`;
        const scale = 1 + progress * 0.85;
        imageWrap.style.transform = `scale(${scale})`;
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const sectionTop  = section.getBoundingClientRect().top + window.scrollY;
            const scrollRoom  = section.offsetHeight - window.innerHeight;
            const scrolled    = window.scrollY - sectionTop;
            const rawProgress = scrollRoom > 0 ? scrolled / scrollRoom : 0;
            const progress    = Math.max(0, Math.min(1, rawProgress));
            applyProgress(progress);
            ticking = false;
        });
    }

    applyProgress(0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
})();

// Timeline scroll animations
(function initTimelineAnimations() {
    const rows = document.querySelectorAll('.timeline-row');
    if (!rows.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        threshold: [0.2],
        rootMargin: '0px 0px -10% 0px',
    });

    rows.forEach((row) => observer.observe(row));
})();
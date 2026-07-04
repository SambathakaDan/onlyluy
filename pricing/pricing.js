document.addEventListener('DOMContentLoaded', () => {
    // --- PRICING TOGGLE LOGIC ---
    const toggle = document.getElementById('priceToggle');
    const prices = document.querySelectorAll('.price-tag');
    const proBilling = document.getElementById('proBilling');
    const bizBilling = document.getElementById('bizBilling');
    let isYearly = false;

    if (toggle) {
        toggle.addEventListener('click', () => {
            isYearly = !isYearly;
            toggle.classList.toggle('active');

            prices.forEach(p => {
                p.style.opacity = '0';
                setTimeout(() => {
                    if (isYearly) {
                        p.textContent = p.dataset.y;
                    } else {
                        p.textContent = p.dataset.m;
                    }
                    p.style.opacity = '1';
                }, 150);
            });

            if (isYearly) {
                proBilling.textContent = '14-Day Free Trial';
                bizBilling.textContent = 'billed annually';
            } else {
                proBilling.textContent = '14-Day Free Trial';
                bizBilling.textContent = 'per month';
            }
        });
    }

    // --- SCROLL ANIMATION LOGIC ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.plan-card').forEach(el => observer.observe(el));

    // --- MODAL POPUP LOGIC ---
    const modalOverlay = document.getElementById('authModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const triggerBtns = document.querySelectorAll('.modal-trigger');

    if (triggerBtns.length > 0 && modalOverlay) {
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Change modal title based on which button was clicked
                if (btn.classList.contains('ftg-footer-btn')) {
                    modalTitle.textContent = 'CREATE FREE ACCOUNT';
                } else if (btn.textContent === 'Contact Sales') {
                    modalTitle.textContent = 'CONTACT SALES';
                } else {
                    modalTitle.textContent = 'START YOUR JOURNEY';
                }
                
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        });
    }

    if (modalCloseBtn && modalOverlay) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
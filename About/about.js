document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.goal-card, .team-card, .stat-item').forEach(el => observer.observe(el));

    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 2000;
        const stepTime = 16;
        const steps = duration / stepTime;
        const inc = target / steps;
        
        const timer = setInterval(() => {
            count += inc;
            if (count >= target) {
                el.textContent = prefix + target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                el.textContent = prefix + Math.floor(count).toLocaleString() + suffix;
            }
        }, stepTime);
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
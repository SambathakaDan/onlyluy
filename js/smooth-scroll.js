window.targetScroll = window.scrollY;
window.currentScroll = window.scrollY;
window.isAnimating = false;
const ease = 0.1;

let maxScroll = document.body.scrollHeight - window.innerHeight;

const resizeObserver = new ResizeObserver(() => {
    maxScroll = document.body.scrollHeight - window.innerHeight;
});
resizeObserver.observe(document.body);

if (window.matchMedia("(min-width: 769px)").matches) {
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        let delta = e.deltaY;
        if (Math.abs(delta) > 120) delta = Math.sign(delta) * 120;
        window.targetScroll += delta;
        window.targetScroll = Math.max(0, Math.min(window.targetScroll, maxScroll));
        if (!window.isAnimating) {
            window.isAnimating = true;
            requestAnimationFrame(animateScroll);
        }
    }, { passive: false });
}

function animateScroll() {
    window.currentScroll += (window.targetScroll - window.currentScroll) * ease;
    if (Math.abs(window.targetScroll - window.currentScroll) < 0.5) {
        window.currentScroll = window.targetScroll;
        window.isAnimating = false;
    }
    window.scrollTo(0, window.currentScroll);
    if (window.isAnimating) {
        requestAnimationFrame(animateScroll);
    }
}
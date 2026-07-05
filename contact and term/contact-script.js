const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 40;
const accentColors = ['', '', '', 'accent-yellow', 'accent-blue', 'accent-orange'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const dot = document.createElement('div');
  const accent = accentColors[Math.floor(Math.random() * accentColors.length)];
  dot.classList.add('particle');
  if (accent) dot.classList.add(accent);

  // ---- SIZE: change this range to make coins bigger/smaller ----
  const size = 20 + Math.random() * 30; // 12px–26px coin size

  // ---- SPEED: change these ranges to make float/twinkle faster/slower ----
  const duration = 6 + Math.random() * 8;       // float duration (up-down drift)
  const twinkleDuration = 2 + Math.random() * 3; // twinkle/pulse speed
  const delay = Math.random() * 1;              // stagger start times

  dot.innerHTML = `<img src="asset/coin.png" alt="Particle" style="width:${size}px; height:${size}px;">`;

  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${duration}s, ${twinkleDuration}s`;
  dot.style.animationDelay = `${delay}s, ${delay}s`;

  particlesContainer.appendChild(dot);
}





// script.js — animated marquee for the header strip
(function () {
  const track = document.getElementById('stripTrack');
  if (!track) return;
 
  // Duplicate content once so the loop is seamless
  track.innerHTML += track.innerHTML;
 
  const speed = 40; // pixels per second — tweak to taste
  let position = 0;
  let lastTime = null;
 
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  function step(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
 
    position -= speed * delta;
    const resetPoint = -(track.scrollWidth / 2);
    if (position <= resetPoint) position = 0;
    track.style.transform = `translateX(${position}px)`;
 
    requestAnimationFrame(step);
  }
 
  if (!prefersReducedMotion) {
    requestAnimationFrame(step);
  }
})();


window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*10, 1
  );

  // header: #F5F0E8 (off-white) → #111111 (black)
  const r = Math.round(245 + (17  - 245) * progress);
  const g = Math.round(240 + (17  - 240) * progress);
  const b = Math.round(232 + (17  - 232) * progress);

  document.querySelector('.contact-header').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
 }); 
window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*8, 1
  );
  // strip: #111111 (black) → #FFD600 (yellow)
  const sr = Math.round(17 + (255 - 17) * progress);
  const sg = Math.round(17 + (214 - 17) * progress);
  const sb = Math.round(17 + (0   - 17) * progress);

  document.querySelector('.header-strip').style.backgroundColor = `rgb(${sr}, ${sg}, ${sb})`;
 }); 
window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*2, 1
  );
  // body: #111111 → #ffffff (black to white)
  const br = Math.round(17 + (255 - 17) * progress);
  const bg = Math.round(17 + (255 - 17) * progress);
  const bb = Math.round(17 + (255 - 17) * progress);
  document.querySelector('.contact-body').style.backgroundColor = `rgb(${br}, ${bg}, ${bb})`;
});
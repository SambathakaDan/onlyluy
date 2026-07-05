const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 25;
const accentColors = ['', '', '', 'accent-yellow', 'accent-blue', 'accent-orange'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const dot = document.createElement('div');
  const accent = accentColors[Math.floor(Math.random() * accentColors.length)];
  dot.classList.add('particle');
  if (accent) dot.classList.add(accent);
  dot.textContent = '$';

  const size = 20 + Math.random() * 25; // 12px–26px font size
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * 10;
  const twinkleDuration = 2 + Math.random() * 3;

  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.fontSize = `${size}px`;
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


//raining coin
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 40;
const accentColors = ['', '', '', 'accent-yellow', 'accent-blue', 'accent-orange'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const dot = document.createElement('div');
  const accent = accentColors[Math.floor(Math.random() * accentColors.length)];
  dot.classList.add('particle');
  if (accent) dot.classList.add(accent);
  const size = 20 + Math.random() * 30;
  const duration = 6 + Math.random() * 8;       
  const twinkleDuration = 2 + Math.random() * 3; 
  const delay = Math.random() * 1;              

  dot.innerHTML = `<img src="asset/coin.png" alt="Particle" style="width:${size}px; height:${size}px;">`;

  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${duration}s, ${twinkleDuration}s`;
  dot.style.animationDelay = `${delay}s, ${delay}s`;

  particlesContainer.appendChild(dot);
}

//strip animation
(function () {
  const track = document.getElementById('stripTrack');
  if (!track) return;
 
  track.innerHTML += track.innerHTML;
 
  const speed = 40; 
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


//scroll color change
//header part
window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*10, 1
  );


  const r = Math.round(245 + (17  - 245) * progress);
  const g = Math.round(240 + (17  - 240) * progress);
  const b = Math.round(232 + (17  - 232) * progress);

  document.querySelector('.contact-header').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
 }); 
//strip part
window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*8, 1
  );

  const sr = Math.round(17 + (255 - 17) * progress);
  const sg = Math.round(17 + (214 - 17) * progress);
  const sb = Math.round(17 + (0   - 17) * progress);

  document.querySelector('.header-strip').style.backgroundColor = `rgb(${sr}, ${sg}, ${sb})`;
 });
//body part
window.addEventListener('scroll', () => {
  const progress = Math.min(
    window.scrollY / (document.body.scrollHeight - window.innerHeight)*2, 1
  );

  const br = Math.round(17 + (255 - 17) * progress);
  const bg = Math.round(17 + (255 - 17) * progress);
  const bb = Math.round(17 + (255 - 17) * progress);
  document.querySelector('.contact-body').style.backgroundColor = `rgb(${br}, ${bg}, ${bb})`;
});
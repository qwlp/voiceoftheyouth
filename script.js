const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
const dialog = document.querySelector('#video-dialog');
const video = dialog.querySelector('video');
const heroVideo = document.querySelector('#hero-video');
const pauseButton = document.querySelector('#hero-pause');
function syncVideoButton() {
  pauseButton.textContent = heroVideo.paused ? '▶' : 'Ⅱ';
  pauseButton.setAttribute('aria-label', heroVideo.paused ? 'Play background video' : 'Pause background video');
}
heroVideo.addEventListener('play', syncVideoButton);
heroVideo.addEventListener('pause', syncVideoButton);
pauseButton.addEventListener('click', () => {
  if (heroVideo.paused) heroVideo.play().catch(() => {});
  else heroVideo.pause();
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (reducedMotion.matches) { heroVideo.autoplay = false; heroVideo.pause(); }
reducedMotion.addEventListener('change', event => { if (event.matches) heroVideo.pause(); });
let resumeHero = false;
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  resumeHero = !heroVideo.paused;
  heroVideo.pause();
  dialog.showModal();
  document.body.classList.add('modal-open');
  video.play().catch(() => {});
}));
document.querySelector('#close-video').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  video.pause();
  document.body.classList.remove('modal-open');
  if (resumeHero && !reducedMotion.matches) heroVideo.play().catch(() => {});
});
document.querySelector('#year').textContent = new Date().getFullYear();

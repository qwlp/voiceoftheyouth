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
const heroVideo = document.querySelector('#hero-video');
if (heroVideo) {
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function setMotionPreference() {
  if (reducedMotion.matches) {
    heroVideo.autoplay = false;
    heroVideo.pause();
  } else {
    heroVideo.play().catch(() => {});
  }
}
setMotionPreference();
reducedMotion.addEventListener('change', setMotionPreference);
heroVideo.loop = true;
}
document.querySelector('#year').textContent = new Date().getFullYear();

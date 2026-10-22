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
const navGroups = [...document.querySelectorAll('.nav-group')];
const currentPage = location.pathname.split('/').pop() || 'index.html';
navigation.querySelectorAll('a[href]').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  link.addEventListener('click', () => navGroups.forEach(group => { group.open = false; }));
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) {
    navGroups.forEach(group => { group.open = false; });
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openGroup = navGroups.find(group => group.open);
  navGroups.forEach(group => { group.open = false; });
  if (openGroup) openGroup.querySelector('summary').focus();
  else if (navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  }
});

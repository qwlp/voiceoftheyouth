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
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  dialog.showModal();
  document.body.classList.add('modal-open');
  video.play().catch(() => {});
}));
document.querySelector('#close-video').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { video.pause(); document.body.classList.remove('modal-open'); });
document.querySelector('#year').textContent = new Date().getFullYear();

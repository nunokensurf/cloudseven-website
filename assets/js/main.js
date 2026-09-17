/* Mobile navigation */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#global-nav');

function closeMenu(returnFocus = false) {
  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
  if (returnFocus && wasOpen) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu(true);
});
window.matchMedia('(min-width: 851px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.querySelector('#year').textContent = new Date().getFullYear();

/* Motion is optional. Manual photo controls work with reduced motion too. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDots = [...document.querySelectorAll('.hero-dot')];
const heroMotion = document.querySelector('#hero-motion');
const galleryMotion = document.querySelector('#gallery-motion');
let activeSlide = 0;
let heroPaused = reducedMotion.matches;
let galleryPaused = reducedMotion.matches;

function updateMotionButton(button, paused, name) {
  button.textContent = paused ? '自動再生' : '一時停止';
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', `${name}の自動${paused ? '再生を開始' : '再生を停止'}`);
}
function showSlide(index) {
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
  heroDots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === activeSlide)));
}
heroDots.forEach(dot => dot.addEventListener('click', () => {
  showSlide(Number(dot.dataset.slide));
  heroPaused = true;
  updateMotionButton(heroMotion, heroPaused, 'メイン写真');
}));
heroMotion.addEventListener('click', () => {
  heroPaused = !heroPaused;
  updateMotionButton(heroMotion, heroPaused, 'メイン写真');
});
window.setInterval(() => {
  if (!heroPaused && !document.hidden) showSlide(activeSlide + 1);
}, 6000);

/* Photo journal: touch, keyboard, previous / next and optional auto advance. */
const galleryTrack = document.querySelector('#gallery-track');
const galleryItems = [...galleryTrack.querySelectorAll('.gallery-item')];
let galleryHovered = false;
let galleryFocused = false;
let galleryVisible = false;
let galleryTouchUntil = 0;

function moveGallery(direction) {
  const gap = parseFloat(getComputedStyle(galleryTrack).gap) || 0;
  const step = galleryItems[0].getBoundingClientRect().width + gap;
  const max = galleryTrack.scrollWidth - galleryTrack.clientWidth;
  let next = galleryTrack.scrollLeft + direction * step;
  if (direction > 0 && galleryTrack.scrollLeft >= max - 2) next = 0;
  if (direction < 0 && galleryTrack.scrollLeft <= 2) next = max;
  galleryTrack.scrollTo({ left: Math.max(0, Math.min(next, max)), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
document.querySelectorAll('.gallery-control').forEach(button => {
  button.addEventListener('click', () => {
    galleryPaused = true;
    updateMotionButton(galleryMotion, galleryPaused, 'ギャラリー');
    moveGallery(button.dataset.direction === 'next' ? 1 : -1);
  });
});
galleryMotion.addEventListener('click', () => {
  galleryPaused = !galleryPaused;
  updateMotionButton(galleryMotion, galleryPaused, 'ギャラリー');
});
galleryTrack.addEventListener('pointerenter', () => { galleryHovered = true; });
galleryTrack.addEventListener('pointerleave', () => { galleryHovered = false; });
galleryTrack.addEventListener('focusin', () => { galleryFocused = true; });
galleryTrack.addEventListener('focusout', () => { galleryFocused = false; });
galleryTrack.addEventListener('touchstart', () => { galleryTouchUntil = Infinity; }, { passive: true });
['touchend', 'touchcancel'].forEach(type => galleryTrack.addEventListener(type, () => {
  galleryTouchUntil = Date.now() + 4500;
}, { passive: true }));
new IntersectionObserver(entries => {
  galleryVisible = entries[0].isIntersecting;
}, { threshold: .35 }).observe(galleryTrack);
window.setInterval(() => {
  if (!galleryPaused && !galleryHovered && !galleryFocused && galleryVisible && !document.hidden && Date.now() > galleryTouchUntil) moveGallery(1);
}, 4500);

function syncMotionPreferences() {
  if (reducedMotion.matches) {
    heroPaused = true;
    galleryPaused = true;
  }
  updateMotionButton(heroMotion, heroPaused, 'メイン写真');
  updateMotionButton(galleryMotion, galleryPaused, 'ギャラリー');
}
reducedMotion.addEventListener('change', syncMotionPreferences);
syncMotionPreferences();

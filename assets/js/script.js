const letters = document.querySelectorAll('.fade-letter');
const mensWearContainer = document.getElementById('mens-wear-container');
const collectionBtn = document.getElementById('collection-btn');
const scrollIndicator = document.getElementById('scroll-indicator');
const maxScroll = window.innerHeight;
let scrollY = 0;

window.addEventListener('wheel', e => {
  e.preventDefault();

  scrollY += e.deltaY;
  scrollY = Math.max(0, Math.min(scrollY, maxScroll));
  updateOpacity(scrollY);

  // Indicador de hacer scroll
  if (scrollY === 0) {
    scrollIndicator.classList.remove('hidden');
  } else {
    scrollIndicator.classList.add('hidden');
  }

  if (scrollY >= maxScroll) {
    mensWearContainer.classList.remove('hidden');
    collectionBtn.classList.remove('hidden');
    collectionBtn.classList.add('visible');
  } else {
    mensWearContainer.classList.add('hidden');
    collectionBtn.classList.remove('visible');
    collectionBtn.classList.add('hidden');
  }
}, { passive: false });

function updateOpacity(scrollPos) {
  const progress = Math.min(scrollPos / maxScroll, 1);
  const lettersCount = letters.length;

  letters.forEach((letter, index) => {
    const start = index / lettersCount;
    const end = (index + 1) / lettersCount;
    let opacity = 0;

    if (progress >= end) opacity = 1;
    else if (progress > start) opacity = (progress - start) * lettersCount;

    letter.style.opacity = opacity;
  });
}
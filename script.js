const letters = document.querySelectorAll('.fade-letter');
const maxScroll = window.innerHeight;
let scrollY = 0;
let isAnimating = false;

window.addEventListener('wheel', e => {
  e.preventDefault();

  // Actualizar scrollY según la rueda (deltaY)
  scrollY += e.deltaY;
  scrollY = Math.max(0, Math.min(scrollY, maxScroll)); 
  updateOpacity(scrollY);
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
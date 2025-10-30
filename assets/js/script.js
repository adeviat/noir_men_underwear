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

// Menu toggle 
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    mainNav.setAttribute('aria-hidden', 'true');
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
 
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.setAttribute('aria-hidden', isExpanded);

        menuToggle.setAttribute(
            'aria-label', 
            isExpanded ? 'Abrir menú de navegación' : 'Cerrar menú de navegación'
        );
    });

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
                menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            menuToggle.focus();
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 767) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.removeAttribute('aria-hidden');
            } else {
                if (menuToggle.getAttribute('aria-expanded') !== 'true') {
                    mainNav.setAttribute('aria-hidden', 'true');
                }
            }
        }, 250);
    });
}
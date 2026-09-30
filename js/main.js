/* ─── LE MEL HOUSE — main.js ─── */

/* ── Lenis Smooth Scroll ── */
let lenis;
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

/* ── Header Scroll Effect ── */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Active Nav Link ── */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-nav__close');
  if (!hamburger || !mobileNav) return;

  const toggle = open => {
    hamburger.classList.toggle('open', open);
    mobileNav.classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
  };

  hamburger.addEventListener('click', () => toggle(!mobileNav.classList.contains('active')));
  closeBtn?.addEventListener('click', () => toggle(false));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
}

/* ── Le Fil d'Or (GSAP + ScrollTrigger) ── */
function initFilDor() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  document.querySelectorAll('.fil-dor').forEach(el => {
    gsap.to(el.querySelectorAll('.fil-dor__line'), {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reset',
        onEnter: () => el.classList.add('animated'),
      }
    });
  });
}

/* ── GSAP Reveal Animations ── */
function initReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const createReveal = (selector, x = 0, y = 24) => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x, y },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reset',
          }
        }
      );
    });
  };

  createReveal('.reveal',       0,   24);
  createReveal('.reveal-left', -30,  0);
  createReveal('.reveal-right', 30,  0);

  /* Stagger cards */
  document.querySelectorAll('.products-grid, .categories-grid, .features-grid, .steps-list').forEach(grid => {
    const children = Array.from(grid.children);
    gsap.fromTo(children,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: grid,
          start: 'top 90%',
          toggleActions: 'play none none reset',
        }
      }
    );
  });
}

/* ── Hero Parallax (optional) ── */
function initHeroParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const heroBg = document.querySelector('.hero__bg-pattern');
  if (!heroBg) return;
  gsap.to(heroBg, {
    y: '25%',
    ease: 'none',
    scrollTrigger: { trigger: '.hero', scrub: true, start: 'top top', end: 'bottom top' }
  });
}

/* ── Gallery Filter (boutique.html) ── */
function updateBoutiqueInquiry(category) {
  const inquiryText = document.getElementById('boutique-inquiry-text');
  if (!inquiryText) return;

  const url = typeof getCategoryWhatsAppLink === 'function'
    ? getCategoryWhatsAppLink(category)
    : 'https://wa.me/2290151833207';

  inquiryText.innerHTML = `Si vous voulez d'autres produits ou des modèles similaires de cette catégorie, vous pouvez demander plus de détails <a href="${url}" class="category-inquiry-box__link" id="boutique-inquiry-link" target="_blank" rel="noopener noreferrer">ici</a>.`;
}

function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.product-card[data-category]');
  if (!filterBtns.length) return;

  const applyFilter = (cat, triggerBtn) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    if (triggerBtn) triggerBtn.classList.add('active');

    let visibleCount = 0;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.category === cat;
      card.style.display = match ? '' : 'none';
      if (match) {
        visibleCount++;
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      }
    });

    const noResults = document.getElementById('no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    updateBoutiqueInquiry(cat);
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter, btn);
    });
  });

  // Handle URL query parameter ?cat=...
  const urlParams = new URLSearchParams(window.location.search);
  const catQuery  = urlParams.get('cat');
  if (catQuery) {
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${catQuery}"]`);
    if (targetBtn) {
      applyFilter(catQuery, targetBtn);
    }
  }
}


/* ── Size selector (product detail) ── */
function initSizeSelector() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.product-detail__sizes')?.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initHeader();
  initActiveNav();
  initMobileMenu();

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initFilDor();
    initReveal();
    initHeroParallax();
  }

  initProductFilter();
  initSizeSelector();
});

/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // =========================
// INSTRUMENTOS SECTION
// Plays/pauses an audio file when a circular button is clicked.
// Only one sound plays at a time; clicking the active button pauses it.
// =========================

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.instrumentos__play');
  var audioMap = new Map(); // button -> Audio instance
  var currentlyPlaying = null;

  function resetButton(btn) {
    btn.classList.remove('is-playing');
  }

  buttons.forEach(function (button) {
    var src = button.getAttribute('data-audio');
    var audio = new Audio(src);
    audioMap.set(button, audio);

    audio.addEventListener('ended', function () {
      resetButton(button);
      currentlyPlaying = null;
    });

    button.addEventListener('click', function () {
      // If this button's audio is already playing, pause it.
      if (button.classList.contains('is-playing')) {
        audio.pause();
        audio.currentTime = 0;
        resetButton(button);
        currentlyPlaying = null;
        return;
      }

      // Stop whatever else is playing first.
      if (currentlyPlaying && currentlyPlaying !== button) {
        var otherAudio = audioMap.get(currentlyPlaying);
        otherAudio.pause();
        otherAudio.currentTime = 0;
        resetButton(currentlyPlaying);
      }

      audio.currentTime = 0;
      audio.play().catch(function (err) {
        console.warn('No se pudo reproducir el audio:', err);
      });

      button.classList.add('is-playing');
      currentlyPlaying = button;
    });
  });
});

// =========================
// PROCESO SECTION
// Carousel controlled by arrow buttons and dot navigation.
// =========================

document.addEventListener('DOMContentLoaded', function () {
  var slidesContainer = document.getElementById('procesoSlides');
  if (!slidesContainer) return;

  var slides = slidesContainer.querySelectorAll('.proceso__slide');
  var dots = document.querySelectorAll('.proceso__dot');
  var prevBtn = document.querySelector('.proceso__arrow--prev');
  var nextBtn = document.querySelector('.proceso__arrow--next');

  var total = slides.length;
  var currentIndex = 0;

  function goToSlide(index) {
    // Loop around in both directions.
    currentIndex = (index + total) % total;

    var offsetPercent = (currentIndex * 100) / total;
    slidesContainer.style.transform = 'translateX(-' + offsetPercent + '%)';

    dots.forEach(function (dot, i) {
      var isActive = i === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    goToSlide(currentIndex + 1);
  });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
    });
  });

  // Optional: basic swipe support for touch devices.
  var startX = 0;
  var isSwiping = false;

  slidesContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  slidesContainer.addEventListener('touchend', function (e) {
    if (!isSwiping) return;
    var endX = e.changedTouches[0].clientX;
    var diff = startX - endX;

    if (Math.abs(diff) > 40) {
      diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    }
    isSwiping = false;
  });

  // Initialize.
  goToSlide(0);
});

// =========================
// CURSOS SECTION
// Carousel where the active (centered) card scales up while sliding into place.
// Navigation is clamped at the first/last course (no infinite loop).
// =========================

document.addEventListener('DOMContentLoaded', function () {
  var viewport = document.getElementById('cursosViewport');
  var track = document.getElementById('cursosTrack');
  var prevBtn = document.getElementById('cursosPrev');
  var nextBtn = document.getElementById('cursosNext');

  if (!viewport || !track) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll('.cursos-card'));
  var total = cards.length;

  // Start on the second course, matching the design (1 prev, 1 next visible).
  var activeIndex = Math.min(1, total - 1);

  function update() {
    var activeCard = cards[activeIndex];
    var viewportWidth = viewport.clientWidth;
    var cardWidth = activeCard.offsetWidth; // unaffected by transform: scale()
    var offset = activeCard.offsetLeft - (viewportWidth - cardWidth) / 2;

    track.style.transform = 'translateX(-' + offset + 'px)';

    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i === activeIndex);
    });

    prevBtn.disabled = activeIndex === 0;
    nextBtn.disabled = activeIndex === total - 1;
  }

  prevBtn.addEventListener('click', function () {
    if (activeIndex > 0) {
      activeIndex -= 1;
      update();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (activeIndex < total - 1) {
      activeIndex += 1;
      update();
    }
  });

  // Recalculate on resize, since card widths change with breakpoints.
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(update, 150);
  });

  update();
});


})();
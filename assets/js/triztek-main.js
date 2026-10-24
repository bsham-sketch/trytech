/**
 * Triztek Enterprise Website Interactive Engine
 * Controls navigation drawer, hero slide transitions, modal popups, and smooth interactions
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderAndMobileNav();
    initHeroSlider();
    initEnquireModal();
  });

  /* -------------------------------------------------------------------------
     Header & Mobile Navigation Drawer
     ------------------------------------------------------------------------- */
  function initHeaderAndMobileNav() {
    const mobileToggle = document.getElementById('tzMobileToggle');
    const mobileDrawer = document.getElementById('tzMobileDrawer');
    const mobileBackdrop = document.getElementById('tzMobileBackdrop');
    const mobileClose = document.getElementById('tzMobileClose');

    function openMobileMenu() {
      if (mobileDrawer) mobileDrawer.classList.add('open');
      if (mobileBackdrop) mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', openMobileMenu);
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileMenu);
    }
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Mobile submenu accordions
    const accordionToggles = document.querySelectorAll('.tz-mobile-submenu-toggle');
    accordionToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = toggle.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        if (submenu) {
          const isOpen = submenu.classList.contains('open');
          // Close other open submenus
          document.querySelectorAll('.tz-mobile-submenu.open').forEach(function (sm) {
            if (sm !== submenu) sm.classList.remove('open');
          });
          if (isOpen) {
            submenu.classList.remove('open');
            toggle.querySelector('i')?.classList.replace('fa-angle-up', 'fa-angle-down');
          } else {
            submenu.classList.add('open');
            toggle.querySelector('i')?.classList.replace('fa-angle-down', 'fa-angle-up');
          }
        }
      });
    });

    // Sticky header shadow on scroll
    const header = document.querySelector('.tz-main-header');
    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          header.style.boxShadow = '0 10px 30px rgba(7, 14, 27, 0.4)';
        } else {
          header.style.boxShadow = '0 4px 20px rgba(7, 14, 27, 0.25)';
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
     Hero Interactive Split-Slider (Preserving all 4 original messages & images)
     ------------------------------------------------------------------------- */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.tz-hero-slide-item');
    const dots = document.querySelectorAll('.tz-hero-dot');
    const heroImg = document.getElementById('tzHeroMainImage');
    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let timer = null;

    const heroImages = [
      'assets/images/staff-meeting.jpg',
      'assets/images/home_banners2.jpg',
      'assets/images/home_banner1.jpg',
      'assets/images/home_banners3.jpg'
    ];

    function showSlide(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === index);
      });
      if (heroImg && heroImages[index]) {
        // Adjust for subfolder if needed
        const isSubfolder = window.location.pathname.includes('/') &&
                            !window.location.pathname.endsWith('/index.html') &&
                            window.location.pathname.split('/').filter(Boolean).length > 1;
        const prefix = isSubfolder ? '../' : '';
        heroImg.style.opacity = '0.7';
        setTimeout(function () {
          heroImg.src = prefix + heroImages[index];
          heroImg.style.opacity = '1';
        }, 150);
      }
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(timer);
        showSlide(i);
        startAutoSlide();
      });
    });

    function startAutoSlide() {
      timer = setInterval(nextSlide, 7000);
    }

    startAutoSlide();
  }

  /* -------------------------------------------------------------------------
     Enquire Now Modal Popup
     ------------------------------------------------------------------------- */
  function initEnquireModal() {
    const modalBackdrop = document.getElementById('tzEnquireModal');
    const modalClose = document.getElementById('tzModalClose');
    if (!modalBackdrop) return;

    function openModal(e) {
      if (e) e.preventDefault();
      modalBackdrop.classList.add('open');
      modalBackdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      setTimeout(function () {
        modalBackdrop.style.display = 'none';
      }, 250);
      document.body.style.overflow = '';
    }

    // Attach to any button/link that triggers enquire modal
    const triggers = document.querySelectorAll(
      '.tz-open-enquire, a[href*="popup:open"], a[href="#elementor-action:action=popup:open"]'
    );
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', openModal);
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', function (e) {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }
})();

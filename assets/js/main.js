document.addEventListener('DOMContentLoaded', function() {
  // Section reveal animation (unchanged)
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    const revealObserver = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    sections.forEach(section => {
      revealObserver.observe(section);
    });
  } else {
    sections.forEach(section => section.classList.add('revealed'));
  }

  // Logo show/hide animation based on Hero section visibility
  const siteLogo = document.getElementById('siteLogo');
  const heroSection = document.querySelector('.hero-image-section');
  if (siteLogo && heroSection && 'IntersectionObserver' in window) {
    let lastVisible = false;
    const logoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && lastVisible !== false) {
            siteLogo.classList.remove('visible');
            lastVisible = false;
          }
          else if (!entry.isIntersecting && lastVisible !== true) {
            siteLogo.classList.add('visible');
            lastVisible = true;
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );
    logoObserver.observe(heroSection);
  } else if (siteLogo) {
    siteLogo.classList.add('visible');
  }

  // Hamburger menu logic for new layout
  const hamburger = document.querySelector('.hamburger');
  const navMenuMobile = document.querySelector('.nav-menu-mobile');
  if (hamburger && navMenuMobile) {
    // Toggle nav menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenuMobile.classList.toggle('open');
    });

    // Close when a link is clicked
    navMenuMobile.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav-item')) {
        hamburger.classList.remove('active');
        navMenuMobile.classList.remove('open');
      }
    });

    // Click outside to close
    document.addEventListener('click', function(e) {
      if (
        navMenuMobile.classList.contains('open') &&
        !navMenuMobile.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('active');
        navMenuMobile.classList.remove('open');
      }
    });

    // Responsive fix: close menu on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 800) {
        navMenuMobile.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }
});

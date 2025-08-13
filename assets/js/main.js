// Section reveal animations using IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
  // Section reveal animation (unchanged)
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    const revealObserver = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Only animate once
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
          // If the hero section is in view, hide the logo
          if (entry.isIntersecting && lastVisible !== false) {
            siteLogo.classList.remove('visible');
            lastVisible = false;
          } 
          // If the hero section is NOT in view, show the logo
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
    // Fallback: always show logo
    siteLogo.classList.add('visible');
  }
});

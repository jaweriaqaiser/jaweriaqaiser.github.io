// Section reveal animations using IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
  // Section reveal animation
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

  // Logo show/hide animation based on About section visibility
  const siteLogo = document.getElementById('siteLogo');
  const aboutSection = document.getElementById('about');
  if (siteLogo && aboutSection && 'IntersectionObserver' in window) {
    let lastVisible = false;
    const logoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Only trigger on section entry/exit, not while scrolling within
          if (entry.isIntersecting && !lastVisible) {
            siteLogo.classList.add('visible');
            lastVisible = true;
          } else if (!entry.isIntersecting && lastVisible) {
            siteLogo.classList.remove('visible');
            lastVisible = false;
          }
        });
      },
      {
        root: null,
        threshold: 0.3
      }
    );
    logoObserver.observe(aboutSection);
  } else if (siteLogo) {
    // Fallback: always show logo
    siteLogo.classList.add('visible');
  }
});

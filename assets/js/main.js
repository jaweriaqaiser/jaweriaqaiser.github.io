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

  // ==== Skills Progress Bar Animation ====
  const skillLevels = document.querySelectorAll('.skill-level');
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.skill) {
          entry.target.style.width = entry.target.dataset.skill + '%';
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.3 });

    skillLevels.forEach(bar => {
      bar.style.width = '0'; // Ensure starting state
      skillObserver.observe(bar);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    skillLevels.forEach(bar => {
      bar.style.width = bar.dataset.skill + '%';
    });
  }

  // === Research Questions Card Scroll-In Animation ===
  const rqCards = document.querySelectorAll('.rq-card');
  if ('IntersectionObserver' in window) {
    const rqObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    rqCards.forEach(card => rqObserver.observe(card));
  } else {
    rqCards.forEach(card => card.classList.add('visible'));
  }

  // === Character Video Cross-fade with Preloaded Random Videos (No Glitch) ===
  const videoFadeContainer = document.querySelector('.video-fade-container');
  const neutralVideo = document.getElementById('neutralVideo');
  const randomVideos = [];
  for (let i = 1; i <= 10; i++) {
    const vid = document.getElementById('random' + i);
    if (vid) randomVideos.push(vid);
  }
  let lastRandom = null;

  function fadeIn(el) {
    el.classList.add('visible');
  }
  function fadeOut(el) {
    el.classList.remove('visible');
  }
  function pauseRandoms() {
    randomVideos.forEach(v => { v.pause(); v.currentTime = 0; fadeOut(v); });
  }

  if (videoFadeContainer && neutralVideo && randomVideos.length === 10) {
    // Ensure only neutral is visible at start
    fadeIn(neutralVideo);
    pauseRandoms();
    neutralVideo.loop = true;
    neutralVideo.muted = true;
    neutralVideo.play();

    // On hover: pick and fade in a random video
    videoFadeContainer.addEventListener('mouseenter', () => {
      if (lastRandom !== null) return; // Already showing a random
      const idx = Math.floor(Math.random() * randomVideos.length);
      const rand = randomVideos[idx];
      lastRandom = rand;
      fadeOut(neutralVideo);
      fadeIn(rand);
      rand.currentTime = 0;
      rand.muted = true;
      rand.play().catch(e => {
        // Some browsers may block play if not user initiated
        console.warn('Random video play failed:', e);
      });
    });

    // On random video end: fade back to neutral, pause random
    randomVideos.forEach(rand => {
      rand.addEventListener('ended', () => {
        fadeIn(neutralVideo);
        fadeOut(rand);
        rand.pause();
        lastRandom = null;
      });
    });

    // On mouseleave: fade back to neutral and pause random
    videoFadeContainer.addEventListener('mouseleave', () => {
      if (lastRandom) {
        fadeIn(neutralVideo);
        fadeOut(lastRandom);
        lastRandom.pause();
        lastRandom.currentTime = 0;
        lastRandom = null;
      }
    });
  } else {
    // Debug: which part is missing?
    if (!videoFadeContainer) console.error('video-fade-container not found');
    if (!neutralVideo) console.error('neutralVideo not found');
    if (randomVideos.length !== 10) console.error('Some random videos missing, found:', randomVideos.length);
  }
});

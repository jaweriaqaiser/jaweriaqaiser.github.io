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

  // === Character Video Cross-fade with Improved Seamless Logic ===
  const videoFadeContainer = document.querySelector('.video-fade-container');
  const videoA = document.getElementById('videoA');
  const videoB = document.getElementById('videoB');
  const neutralSrc = 'assets/images/neutral.mp4';
  const videos = [
    'assets/images/video1.mp4',
    'assets/images/video2.mp4',
    'assets/images/video3.mp4',
    'assets/images/video4.mp4',
    'assets/images/video5.mp4',
    'assets/images/video6.mp4',
    'assets/images/video7.mp4',
    'assets/images/video8.mp4',
    'assets/images/video9.mp4',
    'assets/images/video10.mp4'
  ];
  let currentVideo = videoA;
  let nextVideo = videoB;
  let isPlayingSpecial = false;

  // JS preload (hidden video elements)
  videos.forEach(src => {
    const pre = document.createElement('video');
    pre.src = src;
    pre.preload = 'auto';
    pre.style.display = 'none';
    document.body.appendChild(pre);
  });

  function showNeutral() {
    currentVideo.src = neutralSrc;
    currentVideo.loop = true;
    currentVideo.classList.add('visible');
    nextVideo.classList.remove('visible');
    currentVideo.muted = true;
    currentVideo.play();
    isPlayingSpecial = false;
  }

  // Initial load: show neutral 
  if (videoA && videoB && videoFadeContainer) {
    showNeutral();

    // Cross-fade function, fade only after nextVideo is playing
    function crossFadeTo(src, isLoop) {
      nextVideo.src = src;
      nextVideo.loop = isLoop;
      nextVideo.currentTime = 0;
      nextVideo.muted = true;

      // Only fade in after the video is visually playing
      const onPlaying = function () {
        nextVideo.removeEventListener('playing', onPlaying);
        nextVideo.classList.add('visible');
        currentVideo.classList.remove('visible');
        setTimeout(() => {
          let temp = currentVideo;
          currentVideo = nextVideo;
          nextVideo = temp;
        }, 500); // match your CSS fade duration
      };

      nextVideo.addEventListener('playing', onPlaying);

      nextVideo.load();
      nextVideo.play();
    }

    // Hover: cross-fade to random video
    videoFadeContainer.addEventListener('mouseenter', () => {
      if (!isPlayingSpecial) {
        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];
        crossFadeTo(randomVideo, false);
        isPlayingSpecial = true;
      }
    });

    // Ended: cross-fade back to neutral
    [videoA, videoB].forEach(video => {
      video.addEventListener('ended', () => {
        if (!video.loop) {
          crossFadeTo(neutralSrc, true);
          isPlayingSpecial = false;
        }
      });
    });
  }
});

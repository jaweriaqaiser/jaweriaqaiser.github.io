document.addEventListener('DOMContentLoaded', function() {
  // ...your existing code for section reveal, logo, hamburger, skills, etc...

  // === Character Video Cross-fade with True Preload, No Glitch ===
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
    // Initial: show only neutral video
    fadeIn(neutralVideo);
    pauseRandoms();
    neutralVideo.loop = true;
    neutralVideo.muted = true;
    neutralVideo.play();

    // On hover: pick a random video, fade out neutral, fade in random & play
    videoFadeContainer.addEventListener('mouseenter', () => {
      if (lastRandom !== null) return; // Already playing a random
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

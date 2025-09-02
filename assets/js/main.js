// Character Video Hover Logic with Seamless Transition and Preload

document.addEventListener('DOMContentLoaded', function() {
  const videoElement = document.getElementById('characterVideo');
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
  let isPlayingSpecial = false;

  // Preload random videos (hidden)
  videos.forEach(src => {
    const preload = document.createElement('video');
    preload.src = src;
    preload.preload = 'auto';
    preload.style.display = 'none';
    document.body.appendChild(preload);
  });

  // Ensure neutral video is looping and set as default
  videoElement.loop = true;
  videoElement.src = neutralSrc;

  videoElement.addEventListener('mouseenter', () => {
    if (!isPlayingSpecial) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];
      videoElement.loop = false;

      // Seamlessly transition: wait for canplay before starting special video
      const onCanPlay = () => {
        videoElement.play();
        videoElement.removeEventListener('canplay', onCanPlay);
        isPlayingSpecial = true;
      };

      videoElement.addEventListener('canplay', onCanPlay);
      videoElement.src = randomVideo;
      // Don't call play() until canplay!
    }
  });

  videoElement.addEventListener('ended', () => {
    videoElement.loop = true;
    videoElement.src = neutralSrc;
    videoElement.play();
    isPlayingSpecial = false;
  });
});

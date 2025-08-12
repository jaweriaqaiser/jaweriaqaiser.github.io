// Section reveal animations using IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const observer = new window.IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.18,
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Optional: dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('darkmode');
    });
  }
});

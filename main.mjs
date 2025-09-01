import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

async function renderAllPages(pdfDoc) {
  pagesContainer.innerHTML = '';
  const cssWidth = pagesContainer.clientWidth || 270; // CSS size to display PDF
  const dpr = window.devicePixelRatio || 1;

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);

    // Find the scale for the CSS width, then render at scale*dpr for sharpness
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = cssWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale: scale * dpr });

    // Set canvas actual pixel size
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Set canvas display size (CSS pixels)
    canvas.style.width = `${viewport.width / dpr}px`;
    canvas.style.height = `${viewport.height / dpr}px`;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 16px auto';

    const ctx = canvas.getContext('2d');
    // No setTransform needed if you use scale*dpr in viewport!

    await page.render({ canvasContext: ctx, viewport }).promise;
    pagesContainer.appendChild(canvas);
  }
}

pdfjsLib.getDocument(url).promise.then(renderAllPages);

// Smooth scroll effect
function smoothScrollTo(element, target, duration = 2000) {
  const start = element.scrollTop;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollTop = start + change * progress;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

const overlay = document.querySelector('.pdfjs-link-overlay');
overlay.addEventListener('mouseenter', () => {
  const target = pagesContainer.scrollHeight - pagesContainer.clientHeight;
  smoothScrollTo(pagesContainer, target, 2000);
});
overlay.addEventListener('mouseleave', () => {
  smoothScrollTo(pagesContainer, 0, 2000);
});

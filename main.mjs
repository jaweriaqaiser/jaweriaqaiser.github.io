import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

async function renderAllPages(pdfDoc) {
  pagesContainer.innerHTML = '';
  const containerWidth = pagesContainer.clientWidth;

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    // 1. Calculate scale to fit the container width
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    // 2. Handle high-DPI screens
    const dpr = window.devicePixelRatio || 1;

    const canvas = document.createElement('canvas');
    // Set the actual canvas size (in pixels)
    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    // Set the display size (CSS pixels)
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    const ctx = canvas.getContext('2d');
    // Scale for high-DPI
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 3. Render PDF page into canvas
    await page.render({ canvasContext: ctx, viewport }).promise;

    pagesContainer.appendChild(canvas);
  }
}

pdfjsLib.getDocument(url).promise.then(renderAllPages);

// Smooth scrolling logic (unchanged)
function smoothScrollTo(element, target, duration = 2000) {
  const start = element.scrollTop;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollTop = start + change * progress; // Linear easing
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

const overlay = document.querySelector('.pdfjs-link-overlay');
const pagesContainer = document.getElementById('pdfjs-pages');

overlay.addEventListener('mouseenter', () => {
  const target = pagesContainer.scrollHeight - pagesContainer.clientHeight;
  smoothScrollTo(pagesContainer, target, 2000); // Slower, linear scroll
});
overlay.addEventListener('mouseleave', () => {
  smoothScrollTo(pagesContainer, 0, 2000);
});

import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

let pdfDoc = null;
let scale = 1;

async function renderAllPages(pdfDoc) {
  pagesContainer.innerHTML = '';
  const containerWidth = pagesContainer.clientWidth;

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    // Calculate scale to fit container width
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 16px auto';

    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    pagesContainer.appendChild(canvas);
  }
}

// Smooth scroll helper
function smoothScrollTo(element, target, duration = 3000) {
  const start = element.scrollTop;
  const change = target - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease in-out cubic
    const ease = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    element.scrollTop = start + change * ease;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

pdfjsLib.getDocument(url).promise.then(async function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  await renderAllPages(pdfDoc);
});

// Handle smooth scroll on hover
const overlay = document.querySelector('.pdfjs-link-overlay');

overlay.addEventListener('mouseenter', () => {
  const target = pagesContainer.scrollHeight - pagesContainer.clientHeight;
  smoothScrollTo(pagesContainer, target, 1200); // 1.2 seconds
});

overlay.addEventListener('mouseleave', () => {
  smoothScrollTo(pagesContainer, 0, 1200);
});

import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

// Render all pages as sharp canvases
async function renderAllPages(pdfDoc) {
  pagesContainer.innerHTML = '';
  const containerWidth = pagesContainer.clientWidth || 360; // fallback if 0

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);

    // Calculate scale to fit to container width
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    // High-DPI (Retina) fix
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 16px auto';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    await page.render({ canvasContext: ctx, viewport }).promise;
    pagesContainer.appendChild(canvas);
  }
}

pdfjsLib.getDocument(url).promise.then(renderAllPages);

function smoothScrollTo(element, target, duration = 4000) {
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
  smoothScrollTo(pagesContainer, target, 2000); // 2 seconds
});
overlay.addEventListener('mouseleave', () => {
  smoothScrollTo(pagesContainer, 0, 2000);
});

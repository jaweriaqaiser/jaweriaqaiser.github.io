import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

async function renderAllPages(pdfDoc) {
  pagesContainer.innerHTML = '';
  const containerWidth = pagesContainer.clientWidth || 270;
  const dpr = window.devicePixelRatio || 1;

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);

    // Calculate display and render scale for sharpness
    const unscaledViewport = page.getViewport({ scale: 1 });
    const displayScale = containerWidth / unscaledViewport.width;
    const renderScale = displayScale * dpr;
    const viewport = page.getViewport({ scale: renderScale });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${viewport.width / dpr}px`;
    canvas.style.height = `${viewport.height / dpr}px`;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto 16px auto';

    const ctx = canvas.getContext('2d');
    // Do NOT call ctx.setTransform

    await page.render({ canvasContext: ctx, viewport }).promise;
    pagesContainer.appendChild(canvas);
  }
}

pdfjsLib.getDocument(url).promise.then(renderAllPages);

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

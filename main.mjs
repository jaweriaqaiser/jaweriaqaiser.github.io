import * as pdfjsLib from './pdfjs/pdf.mjs';
import { SVGGraphics } from './pdfjs/pdf.worker.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const pagesContainer = document.getElementById('pdfjs-pages');

async function renderAllPagesAsSVG(pdfDoc) {
  pagesContainer.innerHTML = '';
  const containerWidth = pagesContainer.clientWidth || 270;

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / unscaledViewport.width;
    const viewport = page.getViewport({ scale });

    // SVGGraphics is not exported from the main PDF.js build by default.
    // To use it, make sure your pdf.worker.mjs is a full build from pdfjs-dist!
    const opList = await page.getOperatorList();
    const svgGfx = new pdfjsLib.SVGGraphics(page.commonObjs, page.objs);
    const svg = await svgGfx.getSVG(opList, viewport);

    // Convert SVGElement to data URL for <img>
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const svgDataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));

    const img = document.createElement('img');
    img.src = svgDataUri;
    img.className = 'pdf-svg-img';

    pagesContainer.appendChild(img);
  }
}

pdfjsLib.getDocument(url).promise.then(renderAllPagesAsSVG);

// Smooth scroll as before
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

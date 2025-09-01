import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const url = 'cv.pdf';
const canvas = document.getElementById('pdfjs-canvas');
const ctx = canvas.getContext('2d');

let pdfDoc = null;
let numPages = 1;
let scale = 1;

function renderPage(pageNum) {
  pdfDoc.getPage(pageNum).then(function(page) {
    var viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: ctx, viewport: viewport });
  });
}

pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  numPages = pdfDoc.numPages;
  renderPage(1);
});

const overlay = document.querySelector('.pdfjs-link-overlay');
if (overlay) {
  overlay.addEventListener('mouseenter', () => {
    if (pdfDoc && numPages > 1) renderPage(numPages);
  });
  overlay.addEventListener('mouseleave', () => {
    if (pdfDoc) renderPage(1);
  });
}

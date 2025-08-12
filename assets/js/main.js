/**
 * assets/js/main.js
 * -----------------
 * Handles:
 *   - Content loading for CV, publications, and portfolio
 *   - Build-up scroll-trigger rail (desktop)
 *   - Filters/search for publications & art
 *   - Lightbox for portfolio images
 *   - Dark mode toggle
 *   - Accessibility, reduced motion, and email obfuscation
 * All major functions are commented. See README for editing tips.
 */

/* ==== INIT ==== */
document.addEventListener('DOMContentLoaded', function () {
  const data = window.siteContent;
  renderBio(data.bio);
  renderCV(data.cv);
  renderPublications(data.publications);
  renderPortfolio(data.portfolio);
  setupScrollBuildUp(['cv', 'publications', 'portfolio']);
  setupFilters(data.publications, data.portfolio);
  setupLightbox();
  setupDarkToggle();
  obfuscateEmail(data.bio.email);
});

/* ==== JavaScript for Scroll-triggered Animation for heading (Jaweria Qaiser) ==== */
document.addEventListener('DOMContentLoaded', function () {
  setupFloatingSiteTitle();
  // ...your other init code
});

function setupFloatingSiteTitle() {
  const siteTitle = document.getElementById('floatingSiteTitle');
  const header = document.querySelector('.site-header') || document.getElementById('header');
  if (!siteTitle || !header) return;

  // How far to scroll before title reaches header (in px)
  const scrollDistance = header.offsetTop - 16;

  function updateTitlePosition() {
    const scrollY = window.scrollY || window.pageYOffset;
    // 0 (at bottom) --> scrollDistance (at header)
    let progress = Math.min(scrollY / scrollDistance, 1);

    // Interpolate Y position: from bottom:8vh up to header
    // Let's move from "bottom:8vh" to "top: header.offsetTop"
    // We'll use translateY for smoothness: 0px to -(window.innerHeight - header.offsetTop - 8vh)
    const startY = 0;
    const endY = -1 * (window.innerHeight - header.offsetTop - window.innerHeight * 0.08);
    // Compute current Y
    const currentY = startY + (endY - startY) * progress;

    siteTitle.style.transform = `translateX(-50%) translateY(${currentY}px)`;
    // Fade out near the top
    siteTitle.style.opacity = (progress < 0.95) ? 1 : 0;
  }

  updateTitlePosition();
  window.addEventListener('scroll', updateTitlePosition, { passive: true });
  window.addEventListener('resize', updateTitlePosition);
}

/* ==== BIO ==== */
function renderBio(bio) {
  // Fill in main bio and contact links.
  document.querySelectorAll('.bio-summary').forEach(e => e.textContent = bio.short);
  document.querySelectorAll('.bio-links [title="ORCID"]').forEach(e => e.href = `https://orcid.org/${bio.orcid}`);
  document.querySelectorAll('.bio-links [title="Google Scholar"]').forEach(e => e.href = bio.googleScholar);
  document.querySelectorAll('.bio-links [title="OSF"]').forEach(e => e.href = bio.osf);
  // Contact email in #contact section
  document.getElementById('contactEmail').textContent = bio.email.replace(/\s?\[at\]\s?/i, " [at] ").replace(/\s?\[dot\]\s?/ig, " [dot] ");
}

/* ==== CV ==== */
function renderCV(cv) {
  /* Render CV sections and items from content.js */
  const cvDiv = document.getElementById('cvContent');
  cvDiv.innerHTML = '';
  cv.forEach(group => {
    const g = document.createElement('div');
    g.className = 'cv-group';
    g.innerHTML = `<h3>${group.section}</h3><ul></ul>`;
    group.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.title}</strong>${item.institution ? ', ' + item.institution : ''} <span class="cv-year">${item.year || ""}</span>${item.details ? '<br>' + item.details : ''}`;
      g.querySelector('ul').appendChild(li);
    });
    cvDiv.appendChild(g);
  });
}

/* ==== PUBLICATIONS ==== */
function renderPublications(pubs) {
  // Group by year, descending
  const years = [...new Set(pubs.map(p => p.year))].sort((a, b) => b - a);
  const listDiv = document.getElementById('publicationsList');
  listDiv.innerHTML = '';
  const ul = document.createElement('ul');
  ul.className = 'publication-list';
  years.forEach(y => {
    const yearLi = document.createElement('li');
    yearLi.className = 'publication-year';
    yearLi.textContent = y;
    ul.appendChild(yearLi);
    pubs.filter(p => p.year === y).forEach(pub => {
      const item = document.createElement('li');
      item.className = 'publication-item';
      item.innerHTML = `
        <div class="publication-title">${pub.title}</div>
        <div class="publication-meta">${pub.authors}${pub.venue ? ' — ' + pub.venue : ''}</div>
        <div class="publication-links">
          ${pub.doi ? `<a href="${pub.url}" target="_blank" rel="noopener">DOI</a>` : ''}
          ${pub.url && !pub.doi ? `<a href="${pub.url}" target="_blank" rel="noopener">PDF</a>` : ''}
          ${pub.bibtex ? `<button class="pub-bibtex" data-id="${pub.id}" tabindex="0">BibTeX</button>` : ''}
        </div>
        <button class="publication-abstract-toggle" aria-expanded="false">Show abstract</button>
        <div class="publication-abstract" hidden>${pub.abstract || ""}</div>
      `;
      ul.appendChild(item);
    });
  });
  listDiv.appendChild(ul);
  setupPublicationToggles();
  setupBibtexDownload(pubs);
}

/* ==== TOGGLES: ABSTRACTS ==== */
function setupPublicationToggles() {
  document.querySelectorAll('.publication-abstract-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const abs = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      abs.hidden = expanded;
      btn.setAttribute('aria-expanded', !expanded);
      btn.textContent = expanded ? "Show abstract" : "Hide abstract";
      if (!expanded) abs.style.display = 'block';
      else abs.style.display = 'none';
    });
  });
}

/* ==== BIBTEX EXPORT ==== */
function setupBibtexDownload(publications) {
  // Download all BibTeX as .bib
  const downloadBtn = document.getElementById('downloadBib');
  if (!downloadBtn) return;
  downloadBtn.onclick = function () {
    const bibs = publications.map(pub => pub.bibtex).filter(Boolean).join('\n\n');
    const blob = new Blob([bibs], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'publications.bib';
    a.click();
  };
  // Individual BibTeX (optional)
  document.querySelectorAll('.pub-bibtex').forEach(btn => {
    btn.onclick = function () {
      const pub = publications.find(p => p.id === btn.dataset.id);
      if (!pub) return;
      const blob = new Blob([pub.bibtex], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${btn.dataset.id}.bib`;
      a.click();
    };
  });
}

/* ==== PUBLICATIONS FILTERS ==== */
function setupFilters(publications, portfolio) {
  // Publications: search, year and type filters
  const search = document.getElementById('pubSearch');
  const yearSel = document.getElementById('pubYearFilter');
  const typeSel = document.getElementById('pubTypeFilter');
  if (yearSel && publications) {
    // Fill year filter options
    [...new Set(publications.map(p => p.year))].sort((a, b) => b - a).forEach(y => {
      yearSel.add(new Option(y, y));
    });
  }
  if (typeSel && publications) {
    // Fill type filter options using tags
    const types = [...new Set(publications.flatMap(p => p.tags || []))];
    types.forEach(t => typeSel.add(new Option(t, t)));
  }
  function filterPubs() {
    let q = search.value.trim().toLowerCase();
    let y = yearSel.value;
    let t = typeSel.value;
    let filtered = publications.filter(pub => {
      let match = true;
      if (q) {
        match = (pub.title + pub.authors + pub.venue + pub.abstract).toLowerCase().includes(q);
      }
      if (y) match = match && pub.year == y;
      if (t) match = match && (pub.tags && pub.tags.includes(t));
      return match;
    });
    renderPublications(filtered);
  }
  if (search) search.oninput = filterPubs;
  if (yearSel) yearSel.onchange = filterPubs;
  if (typeSel) typeSel.onchange = filterPubs;

  // Portfolio art: filter by category
  const pf = document.getElementById('portfolioFilters');
  if (pf && portfolio) {
    const cats = [...new Set(portfolio.map(a => a.category))];
    pf.innerHTML = `<button class="active" data-cat="">All</button>` +
      cats.map(c => `<button data-cat="${c}">${c[0].toUpperCase() + c.slice(1)}</button>`).join('');
    pf.querySelectorAll('button').forEach(btn => {
      btn.onclick = function () {
        pf.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPortfolio(portfolio, btn.dataset.cat);
      };
    });
  }
}

/* ==== PORTFOLIO ==== */
function renderPortfolio(portfolio, filterCat = "") {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  grid.innerHTML = '';
  (filterCat ? portfolio.filter(i => i.category === filterCat) : portfolio).forEach(item => {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.tabIndex = 0;
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', item.title);
    div.innerHTML = `
      <img class="portfolio-thumb" src="assets/images/${item.thumb}" alt="${item.title} thumbnail" loading="lazy" srcset="assets/images/${item.thumb} 1x, assets/images/${item.thumb.replace('.jpg', '@2x.jpg')} 2x">
      <div class="portfolio-meta">
        <span class="title">${item.title}</span>
        <span class="year">${item.year}</span>
        <span class="medium">${item.medium}</span>
      </div>
    `;
    div.onclick = () => openLightbox(item);
    div.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(item); };
    grid.appendChild(div);
  });
}

/* ==== PORTFOLIO LIGHTBOX ==== */
function setupLightbox() {
  const lb = document.getElementById('portfolioLightbox');
  if (!lb) return;
  document.getElementById('lightboxClose').onclick = closeLightbox;
  lb.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}
function openLightbox(item) {
  // Show lightbox with image, caption, and optional download link
  const lb = document.getElementById('portfolioLightbox');
  if (!lb) return;
  lb.hidden = false;
  lb.querySelector('#lightboxImage').src = `assets/images/${item.image}`;
  lb.querySelector('#lightboxImage').alt = item.title + ' (large)';
  lb.querySelector('#lightboxCaption').textContent = `${item.title} (${item.year}) – ${item.medium}. ${item.caption}`;
  // Download button
  const dl = lb.querySelector('#lightboxDownload');
  if (item.download) {
    dl.href = `assets/images/${item.download}`;
    dl.hidden = false;
  } else {
    dl.hidden = true;
  }
  lb.focus();
}
function closeLightbox() {
  const lb = document.getElementById('portfolioLightbox');
  if (lb) lb.hidden = true;
}

/* ==== BUILD-UP RAIL ==== */
function setupScrollBuildUp(sectionIds) {
  // Only on wide screens
  if (window.innerWidth < 900) return;
  const rail = document.getElementById('buildUpRail');
  if (!rail) return;
  rail.innerHTML = '';
  // Map section id to emoji or icon (edit as desired)
  const icons = {
    cv: "📄", publications: "📚", portfolio: "🎨"
  };
  // Create rail items for each major section
  sectionIds.forEach(id => {
    const el = document.createElement('div');
    el.className = 'rail-item';
    el.id = `rail-${id}`;
    el.innerHTML = `<span>${icons[id] || "•"}</span>`;
    rail.appendChild(el);
  });
  // IntersectionObserver for build-up animation
  const opts = { threshold: 0.3 };
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const railItem = document.getElementById('rail-' + entry.target.id);
      if (railItem) {
        if (entry.isIntersecting) {
          railItem.classList.add('visible');
        } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          railItem.classList.remove('visible');
        }
      }
    });
  }, opts);
  sectionIds.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) observer.observe(sec);
  });
}

/* ==== DARK MODE ==== */
function setupDarkToggle() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  btn.onclick = function () {
    document.documentElement.classList.toggle('dark-mode');
    // Optionally persist preference
    if (document.documentElement.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };
  // On load, apply persisted preference
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
}

/* ==== EMAIL OBFUSCATION ==== */
function obfuscateEmail(email) {
  // Converts "foo [at] bar [dot] edu" to a mailto link on click
  const link = document.getElementById('emailLink');
  if (!link) return;
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const addr = email.replace(/\s?\[at\]\s?/i, "@").replace(/\s?\[dot\]\s?/ig, ".");
    link.href = "mailto:" + addr;
    window.location.href = "mailto:" + addr;
  });
}

/**
 * CANDLEAPPETITE.COM — DINNER GASTRONOMY & SOMMELIER CORE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initSearchModal();
  initFaqAccordion();
  initPairingCalculator();
  initReadingProgressBar();
  initBackToTop();
});

function initMobileDrawer() {
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggle || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1181 && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

function initSearchModal() {
  const triggers = document.querySelectorAll('.search-trigger-btn');
  const modal = document.querySelector('.search-modal-backdrop');
  const input = document.querySelector('.search-modal-input');
  const resultsContainer = document.querySelector('.search-modal-results');

  if (!modal || !input || !resultsContainer) return;

  const siteSearchIndex = [
    { title: "7-Course Candlelight Tasting Menu", url: "/#tasting", desc: "Our flagship evening gastronomy journey illuminated by pure beeswax taper candles." },
    { title: "Candlelight Illumination & Sensory Gastronomy", url: "/blog/candlelight-illumination-sensory-gastronomy.html", desc: "Scientific treatise on 1800K color temperature and gustatory perception enhancement." },
    { title: "Wine Decanting Fluid Dynamics & Tannins", url: "/blog/wine-decanting-aeration-fluid-dynamics.html", desc: "Navier-Stokes fluid aeration and anthocyanin-tannin polymerization." },
    { title: "Maillard Reaction & High-Heat Protein Searing", url: "/blog/maillard-reaction-protein-searing-flavor.html", desc: "Thermal pyrolysis, melanoidin synthesis, and wagyu caramelization." },
    { title: "Table Scape Ergonomics & Crystal Stemware", url: "/blog/table-setting-ergonomics-crystal-geometry.html", desc: "Bordeaux vs Burgundy bowl geometries and acoustic resonance." },
    { title: "Slow-Food Seasonality & Truffle Chemistry", url: "/blog/slow-food-seasonality-truffle-chemistry.html", desc: "Dimethyl sulfide volatility and sustainable estate harvesting." },
    { title: "Dessert Flambé Thermodynamics & Caramelization", url: "/blog/flambe-thermodynamics-alcohol-caramelization.html", desc: "Phase change physics and vapor flash points at the tableside." },
    { title: "Private Alcove & Veranda Reservations", url: "/#reservations", desc: "Bespoke dinner bookings for intimate anniversaries and gastronomic celebrations." }
  ];

  function openSearch() {
    modal.classList.add('open');
    input.focus();
    renderResults(siteSearchIndex);
  }

  function closeSearch() {
    modal.classList.remove('open');
    input.value = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openSearch));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderResults(siteSearchIndex);
      return;
    }
    const filtered = siteSearchIndex.filter(item => 
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
    renderResults(filtered);
  });

  function renderResults(list) {
    if (list.length === 0) {
      resultsContainer.innerHTML = '<p style="color: var(--text-muted); padding: 1rem; text-align: center;">No matching culinary journeys found.</p>';
      return;
    }
    resultsContainer.innerHTML = list.map(item => `
      <a href="${item.url}" class="search-result-item">
        <strong style="display: block; color: var(--text-primary); font-size: 0.95rem;">${item.title}</strong>
        <span style="font-size: 0.82rem; color: var(--text-secondary);">${item.desc}</span>
      </a>
    `).join('');
  }
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

function initPairingCalculator() {
  const courseSelect = document.getElementById('calc-course');
  const paletteSelect = document.getElementById('calc-palette');
  const outputPair = document.getElementById('calc-output-pairing');
  const outputNotes = document.getElementById('calc-output-notes');

  if (!courseSelect || !paletteSelect || !outputPair || !outputNotes) return;

  const pairings = {
    "wagyu_bold": { wine: "2018 Barolo Monprivato", notes: "Nebbiolo tannins slice through marbled A5 lipid structures." },
    "wagyu_delicate": { wine: "2019 Vosne-Romanée Premier Cru", notes: "Silky red fruit lifts umami without overwhelming the palate." },
    "scallop_bold": { wine: "2020 Meursault-Charmes", notes: "Buttery brioche notes mirror caramelized scallop crusts." },
    "scallop_delicate": { wine: "2021 Chablis Grand Cru Les Clos", notes: "Flinty minerality highlights caviar salinity." },
    "duck_bold": { wine: "2017 Hermitage Rouge", notes: "Syrah black pepper notes harmonize with spiced plum reduction." },
    "duck_delicate": { wine: "2018 Oregon Willamette Pinot Noir", notes: "Earthy forest floor undertones elevate game fowl succulence." },
    "chocolate_bold": { wine: "1994 Vintage Port", notes: "Velvety fig and raisin depth anchors 72% Venezuelan cocoa." },
    "chocolate_delicate": { wine: "20-Year Tawny Port", notes: "Roasted hazelnut aromatics complement soft molten fondant." }
  };

  function updatePairing() {
    const key = courseSelect.value + "_" + paletteSelect.value;
    const res = pairings[key] || { wine: "Sommelier Special Reserve", notes: "A custom cellar pairing curated for your evening." };
    outputPair.textContent = res.wine;
    outputNotes.textContent = res.notes;
  }

  courseSelect.addEventListener('change', updatePairing);
  paletteSelect.addEventListener('change', updatePairing);
  updatePairing();
}

function initReadingProgressBar() {
  const bar = document.querySelector('.reading-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const progress = (window.scrollY / docHeight) * 100;
    bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  });
}

function initBackToTop() {
  const btt = document.querySelector('.back-to-top');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =====================================================================
   Miami Vibes Limos — page behavior only.
   The header, footer, quote form and car cards are written into each page
   by build.js from data.js. To change content, edit data.js and run:  node build.js
   ===================================================================== */

/* ----- Car cards: photo arrows, filter chips, Check Availability ----- */
const grid = document.getElementById('carGrid');
if (grid) {
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.nav');
    if (btn) {
      const card = btn.closest('.car');
      const images = JSON.parse(card.dataset.images);
      let idx = Number(card.dataset.idx || 0) + (btn.classList.contains('next') ? 1 : -1);
      idx = (idx + images.length) % images.length;
      card.dataset.idx = idx;
      card.querySelector('img').src = images[idx];
      card.querySelector('.count').textContent = `${idx + 1} / ${images.length}`;
    }
    const r = e.target.closest('.reserve');
    const vs = document.getElementById('vehicleSelect');
    if (r && vs) vs.value = r.dataset.vehicle;
  });

  // Filter chips. grid.dataset.view drives which rate shows on cars offered both ways (see styles.css)
  const chips = document.querySelectorAll('.chip');
  const applyFilter = tag => {
    chips.forEach(c => c.classList.toggle('active', c.dataset.filter === tag));
    grid.dataset.view = tag;
    grid.querySelectorAll('.car').forEach(card => {
      card.hidden = tag !== 'all' && !card.dataset.tags.split(' ').includes(tag);
    });
  };
  chips.forEach(c => c.addEventListener('click', () => applyFilter(c.dataset.filter)));
  // Links like index.html#self-drive open the fleet pre-filtered (hash survives clean-URL redirects)
  const fromHash = () => {
    const f = location.hash.slice(1);
    if (f && document.querySelector(`.chip[data-filter="${f}"]`)) {
      applyFilter(f);
      document.getElementById('fleet').scrollIntoView();
    }
  };
  fromHash();
  addEventListener('hashchange', fromHash);
}

/* Buttons with data-service preselect the Service dropdown */
document.querySelectorAll('[data-service]').forEach(a =>
  a.addEventListener('click', () => {
    const s = document.getElementById('serviceSelect');
    if (s) s.value = a.dataset.service;
  }));

/* ----- Quote form submit ----- */
const form = document.getElementById('quoteForm');
if (form) {
  const status = document.getElementById('formStatus');
  const phone = form.dataset.phone;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, phone, email and vehicle.';
      form.reportValidity();
      return;
    }
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = `Thanks! We'll reach out shortly. For faster service call ${phone}.`;
    } catch {
      status.textContent = `Something went wrong — please call ${phone}.`;
    }
  });
}

/* ----- Mobile menu ----- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

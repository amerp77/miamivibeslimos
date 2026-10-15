/* =====================================================================
   Miami Vibes Limos — build step.   Run:  node build.js
   Writes the header, footer, quote form and car cards from data.js into
   every page, between marker comments like these:
     <!-- build:header --> ... <!-- /build:header -->
     <!-- build:footer --> ... <!-- /build:footer -->
     <!-- build:quote preset="Executive Chauffeur" --> ... <!-- /build:quote -->
     <!-- build:fleet only="chauffeur" --> ... <!-- /build:fleet -->   (inside the car grid)
   Everything between a pair of markers is replaced on each run, so edit
   data.js (or this file's templates), never the generated HTML.
   Also writes sitemap.xml and robots.txt. Safe to run as often as you like.
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const { SITE, PAGES, LEGAL, SERVICES, FLEET } = require('./data.js');

const ROOT = __dirname;
const PAGE_FILES = ['index.html', 'chauffeur.html', 'shoots.html', 'about.html', 'terms.html', 'privacy.html', '404.html'];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ----- Templates ----- */

function headerHTML(page) {
  const links = PAGES.map(p =>
    `<a href="${p.href}"${p.key === page ? ' class="current" aria-current="page"' : ''}>${esc(p.label)}</a>`).join('\n    ');
  return `
<header class="site-header">
  <div class="container header-inner">
    <a href="index.html" class="logo" aria-label="Miami Vibes Limos home">
      <img src="${SITE.logo}" alt="Miami Vibes Limos">
    </a>
    <div class="header-right">
      <a class="call-now" href="tel:${SITE.tel}">Call Now <span>– ${SITE.phone}</span></a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
  <nav class="site-nav" aria-label="Main">
    ${links}
    <a href="index.html#quote">Reservations</a>
    <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
  </nav>
</header>
`;
}

const WA_ICON = '<svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3.2 29l7.3-1.9c1.8 1 3.9 1.5 6 1.5 7 0 12.7-5.7 12.7-12.7C29.2 8.6 23 3 16 3zm0 23.3c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.3 1.1 1.2-4.2-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6C5.2 9.8 10 5.1 16 5.1s10.8 4.8 10.8 10.6S21.9 26.3 16 26.3zm5.9-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4z"/></svg>';

function footerHTML() {
  const fleetLinks = FLEET.map(c =>
    `<a href="index.html#${c.tags.includes('self-drive') ? 'self-drive' : 'chauffeur'}">${esc(c.name.replace(/^\d{4} /, ''))}</a>`).join('\n      ');
  const waText = encodeURIComponent('Hi Miami Vibes Limos, I would like to check availability.');
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <h4>Miami Vibes Limos</h4>
      <a href="about.html">About Us</a>
      <a href="index.html#quote">Reservations</a>
      <a href="about.html#how-to-book">How to Book</a>
      ${LEGAL.map(l => `<a href="${l.href}">${esc(l.label)}</a>`).join('\n      ')}
    </div>
    <div>
      <h4>Fleet</h4>
      ${fleetLinks}
    </div>
    <div>
      <h4>Services</h4>
      <a href="index.html">Exotic Car Rental</a>
      <a href="chauffeur.html">Executive Chauffeur</a>
      <a href="shoots.html">Photo &amp; Video Shoots</a>
    </div>
    <div>
      <h4>Contact</h4>
      <p>Miami, Florida</p>
      <a href="tel:${SITE.tel}">${SITE.phone}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <div class="social">
        <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
      </div>
    </div>
  </div>
  <p class="copyright">© ${new Date().getFullYear()} Miami Vibes Limos. All rights reserved.</p>
</footer>
<a class="sticky-call" href="tel:${SITE.tel}">Call to Book — ${SITE.phone}</a>
<a class="wa-float" href="https://wa.me/${SITE.whatsapp}?text=${waText}" target="_blank" rel="noopener" aria-label="Message us on WhatsApp">
  ${WA_ICON}
  <span>WhatsApp</span>
</a>
`;
}

function quoteHTML(page, preset) {
  return `
  <section id="quote" class="quote container">
    <h2 class="section-title">Check Availability</h2>
    <p class="trust">Owner-operated <i>·</i> Delivered to your door <i>·</i> English &amp; Español</p>
    <p class="form-note">We reply within 12 hours. Prefer to talk? Call <a href="tel:${SITE.tel}">${SITE.phone}</a> or <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener">message us on WhatsApp</a>.</p>
    <!-- Requests go to SITE.bookingEmail. The first submission triggers a formsubmit.co activation email there. -->
    <form id="quoteForm" class="quote-form" action="https://formsubmit.co/ajax/${SITE.bookingEmail}" method="POST" data-phone="${SITE.phone}" novalidate>
      <input type="hidden" name="_subject" value="New quote request — Miami Vibes Limos">
      <input type="hidden" name="page" value="${page}">
      <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off">
      <label>Name<input type="text" name="name" autocomplete="name" required></label>
      <label>Phone<input type="tel" name="phone" autocomplete="tel" required></label>
      <label>Email<input type="email" name="email" autocomplete="email" required></label>
      <label>Vehicle<select name="vehicle" id="vehicleSelect" required>
        <option value="">Select a vehicle</option>
        <option>Not sure yet</option>
        ${FLEET.map(c => `<option>${esc(c.name)}</option>`).join('\n        ')}
      </select></label>
      <label>Service<select name="service" id="serviceSelect">
        ${SERVICES.map(s => `<option${s === preset ? ' selected' : ''}>${esc(s)}</option>`).join('\n        ')}
      </select></label>
      <label>Pick-up location<input type="text" name="pickup_location" placeholder="Hotel, home, airport or address"></label>
      <label>Pick-up date<input type="date" name="pickup_date"></label>
      <label>Pick-up time<input type="time" name="pickup_time"></label>
      <label>Return date<input type="date" name="return_date"></label>
      <label>Return time<input type="time" name="return_time"></label>
      <label class="full">Details<textarea name="message" rows="3" placeholder="Number of passengers, drop-off location, anything else we should know…"></textarea></label>
      <button type="submit" class="btn full">Send</button>
      <p class="form-status full" id="formStatus" role="status"></p>
    </form>
  </section>
`;
}

function cardHTML(car, i) {
  const media = car.images.length
    ? `<img src="${car.images[0]}" alt="${esc(car.name)}" loading="lazy">${car.images.length > 1 ? `
          <button class="nav prev" aria-label="Previous photo">‹</button>
          <button class="nav next" aria-label="Next photo">›</button>
          <span class="count">1 / ${car.images.length}</span>` : ''}`
    : `<div class="placeholder"><span>Photos coming soon</span></div>`;
  // a spec in [brackets] is a fill-in and gets the yellow placeholder highlight
  const specs = (car.specs || []).map(s => s.includes('[') ? `<span class="todo">${esc(s)}</span>` : esc(s)).join(' · ');
  const ch = car.chauffeur;
  return `
      <article class="car" data-tags="${car.tags.join(' ')}" data-i="${i}" data-images='${JSON.stringify(car.images)}'>
        <div class="car-media">
          ${media}
          <span class="badge">${esc(car.mode)}</span>
        </div>
        <div class="car-info">
          <p class="price${ch ? ' pv-self' : ''}">${car.price}<span>${car.unit}</span></p>${ch ? `
          <p class="alt-price pv-alt">or ${ch.price}${ch.unit.replace('with driver', 'with chauffeur')} · ${ch.note}</p>
          <p class="price pv-chauf">${ch.price}<span>${ch.unit}</span></p>` : ''}
          <h3>${esc(car.name)}</h3>
          <p class="specs">${specs}${car.note ? ` · ${car.note}` : ''}${ch ? `<span class="pv-chauf"> · ${ch.note}</span>` : ''}</p>
          <a href="#quote" class="reserve" data-vehicle="${esc(car.name)}">Check Availability</a>
        </div>
      </article>`;
}

function fleetHTML(only) {
  return FLEET.map((c, i) => (!only || c.tags.includes(only)) ? cardHTML(c, i) : '').join('') + '\n    ';
}

/* ----- First-run migration: turn the old empty placeholders into marker pairs ----- */
function migrate(html) {
  return html
    .replace(/<!-- Header, footer and the quote form are filled in by script\.js \(edit them there, once\) -->\r?\n/, '')
    .replace('<div id="site-header"></div>', '<!-- build:header --><!-- /build:header -->')
    .replace('<div id="site-footer"></div>', '<!-- build:footer --><!-- /build:footer -->')
    .replace(/<div id="quote-slot" data-preset="([^"]*)"><\/div>/, '<!-- build:quote preset="$1" --><!-- /build:quote -->')
    .replace(/<div class="car-grid" id="carGrid"( data-only="([\w-]+)")?><!--[^>]*--><\/div>/, (m, a, only) =>
      `<div class="car-grid" id="carGrid"${only ? ` data-only="${only}"` : ''} data-view="${only || 'all'}"><!-- build:fleet${only ? ` only="${only}"` : ''} --><!-- /build:fleet --></div>`);
}

/* ----- Fill every marker pair ----- */
function render(html, page) {
  return html
    // link-preview image must be a full address, so it follows SITE.domain
    .replace(/<meta property="og:image" content="[^"]*\/images\/og-image\.png">/, `<meta property="og:image" content="${SITE.domain}/images/og-image.png">`)
    .replace(/<!-- build:header -->[\s\S]*?<!-- \/build:header -->/, () => `<!-- build:header -->${headerHTML(page)}<!-- /build:header -->`)
    .replace(/<!-- build:footer -->[\s\S]*?<!-- \/build:footer -->/, () => `<!-- build:footer -->${footerHTML()}<!-- /build:footer -->`)
    .replace(/<!-- build:quote preset="([^"]*)" -->[\s\S]*?<!-- \/build:quote -->/, (m, preset) =>
      `<!-- build:quote preset="${preset}" -->${quoteHTML(page, preset)}  <!-- /build:quote -->`)
    .replace(/<!-- build:fleet( only="([\w-]+)")? -->[\s\S]*?<!-- \/build:fleet -->/, (m, a, only) =>
      `<!-- build:fleet${only ? ` only="${only}"` : ''} -->${fleetHTML(only)}<!-- /build:fleet -->`);
}

for (const file of PAGE_FILES) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) { console.log(`skip  ${file} (not found)`); continue; }
  const raw = fs.readFileSync(full, 'utf8');
  const nl = raw.includes('\r\n') ? '\r\n' : '\n';
  const page = (raw.match(/<body data-page="([^"]+)"/) || [])[1] || '';
  const out = render(migrate(raw.replace(/\r\n/g, '\n')), page).replace(/\n/g, nl);
  if (!out.includes('<!-- build:header -->') || !out.includes('<!-- build:footer -->')) throw new Error(`${file}: header/footer markers missing`);
  fs.writeFileSync(full, out);
  console.log(`built ${file}`);
}

/* ----- sitemap.xml + robots.txt (clean URLs: index.html -> /, about.html -> /about) ----- */
const today = new Date().toISOString().slice(0, 10);
const urls = [...PAGES, ...LEGAL].map(p => `${SITE.domain}/${p.href === 'index.html' ? '' : p.href.replace(/\.html$/, '')}`);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`);
console.log('built sitemap.xml, robots.txt');

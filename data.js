/* =====================================================================
   Miami Vibes Limos — SITE DATA (edit here, then run:  node build.js)
   build.js writes the header, footer, quote form and car cards into every
   page from this file. Vercel also runs it automatically on every deploy.

   FLEET fields:
   - images: first image is the cover. Leave [] to show a "Photos coming soon" placeholder.
   - tags:   which filter chips the car appears under ('self-drive' or 'chauffeur').
   - mode:   the badge on the photo. specs: short facts under the name.
   - chauffeur: optional second rate for a car offered both ways. The Self-Drive view shows only
     the day rate, the With Chauffeur view and chauffeur page only this rate, and 'All' shows both.
   ===================================================================== */

const SITE = {
  domain: 'https://miamivibeslimos.com',   // sitemap + link previews
  phone: '(305) 432-1757',
  tel: '+13054321757',
  whatsapp: '13054321757',                 // digits only, country code first (used for wa.me links)
  email: 'aperwez@ironworldfencing.com',   // shown publicly in the footer and on the Terms / Privacy pages (temporary; switch to a Miami Vibes inbox later)
  bookingEmail: 'aperwez@ironworldfencing.com', // where quote-form requests are delivered (via formsubmit.co)
  instagram: 'https://instagram.com/miamivibes_limos',
  logo: 'images/logo-header.png',          // small copy of images/logo.png (the original from the old site)
};

// Main menu, in order. key matches <body data-page="..."> so the current page is highlighted.
const PAGES = [
  { href: 'index.html',     label: 'Exotic Car Rental',    key: 'home' },
  { href: 'chauffeur.html', label: 'Executive Chauffeur',  key: 'chauffeur' },
  { href: 'shoots.html',    label: 'Photo & Video Shoots', key: 'shoots' },
  { href: 'about.html',     label: 'About Us',             key: 'about' },
];

// Footer-only pages (also listed in the sitemap).
const LEGAL = [
  { href: 'terms.html',   label: 'Rental Terms',   key: 'terms' },
  { href: 'privacy.html', label: 'Privacy Policy', key: 'privacy' },
];

// Choices in the quote form's Service dropdown.
const SERVICES = ['Self-drive rental', 'Executive Chauffeur', 'Photo / video shoot', 'Wedding / event'];

const FLEET = [
  {
    name: '2024 Lamborghini Revuelto',
    price: '$4,000', unit: '/day',
    mode: 'Self-Drive', tags: ['self-drive'],
    specs: ['2 seats', '1,001 hp'],
    images: [                                       // web copies of Rev 1-6.png (originals kept in the same folder)
      'images/Revuelto/revuelto-1.jpg',
      'images/Revuelto/revuelto-2.jpg',
      'images/Revuelto/revuelto-3.jpg',
      'images/Revuelto/revuelto-4.jpg',
      'images/Revuelto/revuelto-5.jpg',
      'images/Revuelto/revuelto-6.jpg',
    ],
  },
  {
    name: '2022 Lamborghini Urus',
    price: '$1,000', unit: '/day',
    mode: 'Self-Drive', tags: ['self-drive'],
    specs: ['5 seats', '641 hp'],
    images: [                                       // web copies of Urus 1-6.png (originals kept in the same folder)
      'images/Urus/urus-1.jpg',
      'images/Urus/urus-2.jpg',
      'images/Urus/urus-3.jpg',
      'images/Urus/urus-4.jpg',
      'images/Urus/urus-5.jpg',
      'images/Urus/urus-6.jpg',
    ],
  },
  {
    name: '2024 Mercedes-Benz S580',
    price: '$500', unit: '/day',
    chauffeur: { price: '$180', unit: '/hr with driver', note: '4 hr minimum' },   // shown instead of the day rate in chauffeur views
    mode: 'Self-Drive or Chauffeur', tags: ['self-drive', 'chauffeur'],
    specs: ['5 seats', '496 hp'],
    images: [                                       // web copies of M1-6.png (%20 = the space in the folder name)
      'images/Mercedes%20S580/s580-1.jpg',
      'images/Mercedes%20S580/s580-2.jpg',
      'images/Mercedes%20S580/s580-3.jpg',
      'images/Mercedes%20S580/s580-4.jpg',
      'images/Mercedes%20S580/s580-5.jpg',
      'images/Mercedes%20S580/s580-6.jpg',
    ],
  },
  {
    name: '2026 Rolls-Royce Phantom',
    price: '$1,000', unit: '/hr with driver', note: '4 hr minimum',
    mode: 'With Chauffeur', tags: ['chauffeur'],
    specs: ['5 seats', '563 hp'],
    images: [                                       // web copies of Phantom 1-6.png (originals kept in the same folder)
      'images/Phantom/phantom-1.jpg',
      'images/Phantom/phantom-2.jpg',
      'images/Phantom/phantom-3.jpg',
      'images/Phantom/phantom-4.jpg',
      'images/Phantom/phantom-5.jpg',
      'images/Phantom/phantom-6.jpg',
    ],
  },
  {
    name: 'Mercedes-Benz Sprinter',
    price: '$180', unit: '/hr with driver', note: '4 hr minimum',
    mode: 'With Chauffeur', tags: ['chauffeur'],
    specs: ['8 passengers', 'Starlight ceiling, TV & bar'],
    images: [                                       // web copies of S1-6.png (sprinter-7..9.jpg are also ready; %20 = the space in the folder name)
      'images/Sprinter%20Van/sprinter-1.jpg',
      'images/Sprinter%20Van/sprinter-2.jpg',
      'images/Sprinter%20Van/sprinter-3.jpg',
      'images/Sprinter%20Van/sprinter-4.jpg',
      'images/Sprinter%20Van/sprinter-5.jpg',
      'images/Sprinter%20Van/sprinter-6.jpg',
    ],
  },
];

module.exports = { SITE, PAGES, LEGAL, SERVICES, FLEET };

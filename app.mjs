import { products, filterProducts, getWhatsAppUrl } from './catalog.mjs';

const chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M8.4 7.7c.3-.2.7.2 1.2 1.3.2.4-.5 1-.4 1.3.7 1.4 1.7 2.4 3.2 3 .4.2.8-.9 1.3-.7 1.2.5 1.8.8 1.7 1.3-.3 1.3-1.5 1.7-2.6 1.3-3.5-1.1-5.7-3.5-6-5.7-.1-.8.7-1.6 1.6-1.8Z"/></svg>';

function swatch(product) {
  const { id, background, ink, motif } = product;
  const motifs = {
    flower: `<g fill="${ink}" opacity=".85"><ellipse cy="-7" rx="3" ry="6"/><ellipse cy="7" rx="3" ry="6"/><ellipse cx="-7" rx="6" ry="3"/><ellipse cx="7" rx="6" ry="3"/><circle r="3.3" fill="${background}"/><circle r="1.6"/></g><path d="M0 13v12m0-6c-9-7-12-2-2 2m2-6c8-7 11-2 2 2" fill="none" stroke="${ink}" stroke-width="1.1"/>`,
    leaf: `<path d="M0 22V-18m0 27c-15-2-15-14 0-7m0-3c15-2 15-15 0-7m0-4c-11-2-11-12 0-7" fill="none" stroke="${ink}" stroke-width="1.5"/><path d="M0 1c-11-8-14 2 0 8m0-10c11-7 14-2 0 3" fill="${ink}" opacity=".55"/>`,
    diamond: `<path d="m0-14 10 14L0 14-10 0Z" fill="none" stroke="${ink}" stroke-width="1.5"/><path d="m0-6 4 6-4 6-4-6Z" fill="${ink}"/><circle cy="23" r="1.5" fill="${ink}"/>`,
    solid: `<path d="M-30 0h60" stroke="${ink}" stroke-width=".35" opacity=".3"/>`,
  };
  return `<svg viewBox="0 0 500 420" role="img" aria-label="Illustrative ${product.tone.toLowerCase()} ${product.theme.toLowerCase()} bedsheet design swatch" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="pattern-${id}" width="62" height="67" patternUnits="userSpaceOnUse"><g transform="translate(31 24)">${motifs[motif]}</g></pattern><pattern id="weave-${id}" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0h4M0 2h4M0 0v4M2 0v4" stroke="#fff" stroke-width=".5" opacity=".2"/></pattern><linearGradient id="light-${id}" x1="0" x2="1" y2=".8"><stop stop-color="#fff" stop-opacity=".4"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#78644c" stop-opacity=".12"/></linearGradient><linearGradient id="fold-${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#000" stop-opacity=".15"/><stop offset=".18" stop-color="#fff" stop-opacity=".36"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="2" dy="11" stdDeviation="10" flood-color="#473c2f" flood-opacity=".16"/></filter></defs><rect width="500" height="420" fill="${background}"/><rect width="500" height="420" fill="url(#light-${id})"/><g transform="translate(37 42) rotate(-8 220 170)" filter="url(#shadow-${id})"><rect x="30" y="35" width="354" height="292" rx="5" fill="${background}"/><rect x="30" y="35" width="354" height="292" rx="5" fill="url(#pattern-${id})"/><path d="M30 270h354v42q0 15-12 15H42q-12 0-12-15Z" fill="${background}"/><path d="M30 280h354m-354 5h354m-354 29h354m-354 5h354" stroke="${ink}" stroke-width="2" opacity=".7"/><path d="m32 297 8-7 8 7-8 8Z m16 0 8-7 8 7-8 8Z" fill="${ink}" opacity=".6"/><rect x="30" y="35" width="354" height="292" rx="5" fill="url(#weave-${id})"/><rect x="30" y="35" width="354" height="292" rx="5" fill="url(#light-${id})"/><path d="M30 163q150-16 354 0v30q-200-13-354 0Z" fill="url(#fold-${id})"/><path d="M33 165q150-16 348 0" stroke="#fff" stroke-width="1.3" opacity=".4"/><path d="M34 325h344" stroke="${ink}" stroke-width="1" opacity=".2"/></g><g transform="translate(335 260) rotate(9)"><rect width="105" height="74" fill="${background}" stroke="${ink}" stroke-opacity=".17"/><rect x="7" y="7" width="91" height="60" fill="url(#pattern-${id})"/><rect width="105" height="74" fill="url(#weave-${id})"/></g></svg>`;
}

const grid = document.getElementById('products');
const sizeSelect = document.getElementById('size');
let activeTheme = 'All';
function renderProducts() {
  const visible = filterProducts(products, activeTheme, sizeSelect.value);
  document.getElementById('product-count').textContent = `${visible.length} designs`;
  grid.innerHTML = visible.length ? visible.map(product => `<article class="product-card"><div class="product-image">${swatch(product)}${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}<span class="swatch-label">ILLUSTRATIVE DESIGN</span></div><div class="product-info"><p class="product-meta">${product.fabric} · ${product.theme}</p><div class="product-title"><h3>${product.name}</h3><span class="color-dot" style="background:${product.ink}" title="${product.tone}"></span></div><p class="product-tone">${product.tone}</p><div class="product-footer"><span class="product-sizes">${product.sizes.join(' / ')}</span><a class="inquiry-link" href="${getWhatsAppUrl(product.name, sizeSelect.value === 'All' ? '' : sizeSelect.value)}" target="_blank" rel="noopener noreferrer" aria-label="Ask about ${product.name} on WhatsApp (dummy number)">${chatIcon} Ask about this <span aria-hidden="true">↗</span></a></div></div></article>`).join('') : '<p class="empty">No designs in this combination. Try another theme or bed size.</p>';
}

document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
  activeTheme = button.dataset.theme;
  document.querySelectorAll('[data-theme]').forEach(tab => {
    const selected = tab === button;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-pressed', String(selected));
  });
  renderProducts();
}));
sizeSelect.addEventListener('change', renderProducts);
document.querySelectorAll('[data-inquiry]').forEach(link => { link.href = getWhatsAppUrl(); });
document.querySelectorAll('[data-icon="chat"]').forEach(element => { element.innerHTML = chatIcon; });
document.getElementById('year').textContent = new Date().getFullYear();
renderProducts();

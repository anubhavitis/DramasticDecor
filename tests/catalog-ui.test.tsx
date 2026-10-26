import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Catalog } from '../src/components/catalog';
import type { CatalogSnapshot, Product } from '../src/lib/catalog';

const product: Product = {
  id: 'test', name: 'Cotton Bloom', fabric: 'Cotton', theme: 'Florals',
  sizes: ['Queen', 'King'], price: 1299, tone: 'Ivory', note: '',
  photoReference: '', imageUrl: null,
};
const render = (snapshot: CatalogSnapshot) => renderToStaticMarkup(
  <Catalog snapshot={snapshot} whatsappNumber="910000000000" />,
);

test('live catalog renders product details, rupee prices and a product-specific inquiry', () => {
  const html = render({ products: [product], mode: 'live' });
  assert.match(html, /Cotton Bloom/);
  assert.match(html, /₹1,299/);
  assert.match(html, /Queen \/ King/);
  assert.match(html, /Cotton%20Bloom/);
  assert.match(html, /Photo coming soon/);
  assert.doesNotMatch(html, /Sample collection/);
});

test('empty and unavailable catalogs keep WhatsApp inquiries accessible', () => {
  const unavailable = render({ products: [], mode: 'unavailable' });
  assert.match(unavailable, /temporarily unavailable/);
  assert.match(unavailable, /Ask us on WhatsApp/);
  assert.doesNotMatch(unavailable, /Cotton Bloom/);
  const empty = render({ products: [], mode: 'live' });
  assert.match(empty, /New designs are on their way/);
});

test('owner text is escaped and zero is displayed as a real price', () => {
  const html = render({ products: [{ ...product, name: '<script>alert(1)</script>', note: '<img src=x onerror=alert(1)>', price: 0 }], mode: 'live' });
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>|<img src=x/);
  assert.match(html, /₹0/);
  assert.doesNotMatch(html, /Price on request/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { getWhatsAppUrl } from '../catalog.mjs';

test('product inquiry opens the configured WhatsApp recipient with product details', () => {
  const url = new URL(getWhatsAppUrl('Malabar Bloom', 'Queen'));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/910000000000');
  assert.match(url.searchParams.get('text'), /Malabar Bloom/);
  assert.match(url.searchParams.get('text'), /Queen/);
});

test('theme and bed size filters combine and can return no matches', async () => {
  const { filterProducts, products } = await import('../catalog.mjs');
  const matches = filterProducts(products, 'Florals', 'Queen');
  assert.ok(matches.length > 0);
  assert.ok(matches.every(p => p.theme === 'Florals' && p.sizes.includes('Queen')));
  assert.equal(filterProducts(products, 'Nonexistent', 'King').length, 0);
  assert.equal(filterProducts(products, 'All', 'All').length, products.length);
});

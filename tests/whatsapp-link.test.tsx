import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { WhatsAppLink } from '../src/components/whatsapp-link';

test('icon-only WhatsApp link retains an accessible name and safe external navigation', () => {
  const href = 'https://wa.me/919958258362?text=Hello';
  const html = renderToStaticMarkup(<WhatsAppLink href={href} />);
  assert.match(html, /aria-label="Chat on WhatsApp"/);
  assert.match(html, /href="https:\/\/wa.me\/919958258362\?text=Hello"/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.match(html, /<svg[^>]*aria-hidden="true"/);
  assert.equal(html.replace(/<[^>]*>/g, ''), '');
});

export const WHATSAPP_NUMBER = '910000000000';
export function getWhatsAppUrl(product, size) {
  const text = product
    ? `Hello DramasticDecor! I'd like to know more about ${product}${size ? ` (${size})` : ''}. Please share available fabrics, colours, sizes and prices.`
    : "Hello DramasticDecor! I'd love to explore your bedsheet collection. Please share available designs, sizes and prices.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const products = [
  { id: 'malabar', name: 'Malabar Bloom', theme: 'Florals', fabric: 'Cotton', tone: 'Terracotta on ivory', sizes: ['Queen', 'King'], background: '#f3e5d3', ink: '#a85c43', motif: 'flower', badge: 'A little everyday tradition' },
  { id: 'nilgiri', name: 'Nilgiri Botanicals', theme: 'Botanicals', fabric: 'Cotton', tone: 'Sage on cream', sizes: ['Single', 'Queen', 'King'], background: '#e6ebdf', ink: '#697b50', motif: 'leaf', badge: '' },
  { id: 'indigo', name: 'Indigo Evenings', theme: 'Geometrics', fabric: 'Cotton', tone: 'Indigo on ivory', sizes: ['Queen', 'King'], background: '#e6e5df', ink: '#465d78', motif: 'diamond', badge: '' },
  { id: 'kanak', name: 'Kanak Marigold', theme: 'Florals', fabric: 'Cotton blend', tone: 'Ochre on warm white', sizes: ['Single', 'Queen'], background: '#f3e9cf', ink: '#ac853b', motif: 'flower', badge: '' },
  { id: 'everyday', name: 'Everyday Ivory', theme: 'Solids', fabric: 'Cotton', tone: 'Natural ivory', sizes: ['Single', 'Queen', 'King'], background: '#ede9e0', ink: '#d2c9b6', motif: 'solid', badge: '' },
  { id: 'rose', name: 'Rose Courtyard', theme: 'Botanicals', fabric: 'Cotton blend', tone: 'Dusty rose on cream', sizes: ['Queen', 'King'], background: '#eee0dc', ink: '#a77575', motif: 'leaf', badge: '' },
];
export function filterProducts(items, theme = 'All', size = 'All') {
  return items.filter(p => (theme === 'All' || p.theme === theme) && (size === 'All' || p.sizes.includes(size)));
}

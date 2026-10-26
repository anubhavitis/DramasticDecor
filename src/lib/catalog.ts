export const themes = ['Florals', 'Botanicals', 'Geometrics', 'Solids', 'Other'] as const;
export const bedSizes = ['Single', 'Queen', 'King'] as const;
export type BedSize = (typeof bedSizes)[number];
export type CellValue = string | number | boolean | null;
export type Pattern = { background: string; ink: string; motif: 'flower' | 'leaf' | 'diamond' | 'solid' };
export type Product = {
 id: string; name: string; fabric: string; theme: string; sizes: BedSize[];
 price: number | null; tone: string; note: string; photoReference: string;
 imageUrl: string | null; pattern?: Pattern;
};
export type CatalogSnapshot = { products: Product[]; mode: 'demo' | 'live' | 'unavailable' };
export const sheetHeaders = ['Show on website', 'Product name', 'Fabric', 'Theme', 'Single', 'Queen', 'King', 'Price INR', 'Colour', 'Photo link', 'Short note'];
const isChecked = (value: CellValue | undefined) => value === true || String(value).trim().toUpperCase() === 'TRUE';
const text = (value: CellValue | undefined) => String(value ?? '').trim();

export function parseProducts(rows: CellValue[][]): { products: Product[]; issues: string[] } {
 if (!rows.length) throw new Error('Products sheet is missing its header row.');
 const headings = rows[0].map(value => text(value).toLowerCase());
 const indexes = new Map(headings.map((value,index) => [value,index]));
 const required = sheetHeaders.slice(0,7);
 if(required.some(header => !indexes.has(header.toLowerCase()))) throw new Error('Products sheet has missing required headings.');
 if (new Set(headings.filter(Boolean)).size !== headings.filter(Boolean).length) throw new Error('Products sheet has duplicate headings.');
 const products: Product[] = [];
 const issues: string[] = [];
 rows.slice(1).forEach((row,index) => {
  const get = (header: string) => row[indexes.get(header.toLowerCase()) ?? -1];
  if(!isChecked(get('Show on website'))) return;
  const name = text(get('Product name'));
  const fabric = text(get('Fabric'));
  const theme = text(get('Theme'));
  const sizes = bedSizes.filter(size => isChecked(get(size)));
  const rawPrice = text(get('Price INR'));
  const numericPrice = rawPrice.replace(/[₹,\s]/g,'');
  const price = rawPrice === '' ? null : /^\d+(?:\.\d{1,2})?$/.test(numericPrice) ? Number(numericPrice) : NaN;
  if(!name || !fabric || !themes.includes(theme as (typeof themes)[number]) || !sizes.length || (price !== null && (!Number.isFinite(price) || price < 0))) {
   issues.push(`Row ${index+2} needs a name, fabric, valid theme, at least one size, and a valid price or blank price.`);
   return;
  }
  products.push({id:`row-${index+2}`,name,fabric,theme,sizes,price,tone:text(get('Colour')),note:text(get('Short note')),photoReference:text(get('Photo link')),imageUrl:null});
 });
 return {products,issues};
}

export function filterProducts(products: Product[], theme = 'All', size = 'All') {
 return products.filter(product => (theme === 'All' || product.theme === theme) && (size === 'All' || product.sizes.includes(size as BedSize)));
}

export function getWhatsAppUrl(number: string, product?: string, size?: string) {
 const digits = number.replace(/[+\s()-]/g,'');
 if(!/^\d{8,15}$/.test(digits)) throw new Error('WhatsApp number must include the country code and contain 8 to 15 digits.');
 const message = product
  ? `Hello DramasticDecor! I'd like to know more about ${product}${size ? ` (${size})` : ''}. Please share available fabrics, colours, sizes and prices.`
  : "Hello DramasticDecor! I'd love to explore your bedsheet collection. Please share available designs, sizes and prices.";
 return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

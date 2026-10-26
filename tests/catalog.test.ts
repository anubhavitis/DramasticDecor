import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProducts } from '../src/lib/catalog';
const headers = ['Show on website','Product name','Fabric','Theme','Single','Queen','King','Price INR','Colour','Photo link','Short note'];

test('only visible, complete rows become products, preserving optional prices', () => {
 const result = parseProducts([headers,
  [true,'Malabar Bloom','Cotton','Florals',false,true,true,1299,'Ivory','','Soft cotton'],
  [false,'Hidden','Cotton','Solids',true,false,false,500,'','',''],
  [true,'Missing size','Cotton','Solids',false,false,false,'','','',''],
  [true,'Price on request','Cotton','Solids',true,false,false,'','','',''],
 ]);
 assert.equal(result.products.length,2);
 assert.deepEqual(result.products[0].sizes,['Queen','King']);
 assert.equal(result.products[0].price,1299);
 assert.equal(result.products[1].price,null);
 assert.equal(result.issues.length,1);
});

test('sheet column reordering works and broken headers fail explicitly', () => {
 const reordered = [...headers].reverse();
 const row = [true,'One','Cotton','Solids',true,false,false,0,'','',''];
 const result = parseProducts([reordered,[...row].reverse()]);
 assert.equal(result.products[0].price,0);
 assert.throws(() => parseProducts([['Name']]),/heading/);
 assert.throws(() => parseProducts([[...headers,'Product name']]),/duplicate/);
});

test('untrusted row content stays text and invalid prices are excluded', () => {
 const result = parseProducts([headers,
  ['TRUE','<script>alert(1)</script>','Cotton','Solids',true,false,false,'₹1,299.50','','',''],
  [true,'Bad price','Cotton','Solids',true,false,false,'-40','','',''],
  [true,'Bad price text','Cotton','Solids',true,false,false,'100oops','','',''],
 ]);
 assert.equal(result.products.length,1);
 assert.equal(result.products[0].name,'<script>alert(1)</script>');
 assert.equal(result.products[0].price,1299.5);
 assert.equal(result.issues.length,2);
});

test('filters combine and inquiry messages include product and bed size', async () => {
 const {filterProducts,getWhatsAppUrl} = await import('../src/lib/catalog');
 const {products} = parseProducts([headers,[true,'A & B','Cotton','Florals',false,true,true,'','','','']]);
 assert.equal(filterProducts(products,'Florals','Queen').length,1);
 assert.equal(filterProducts(products,'Solids','Queen').length,0);
 const url = new URL(getWhatsAppUrl('+91 00000 00000','A & B','Queen'));
 assert.equal(url.pathname,'/910000000000');
 assert.match(url.searchParams.get('text')!,/A & B \(Queen\)/);
});

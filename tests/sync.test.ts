import test from 'node:test';
import assert from 'node:assert/strict';
import {syncCatalog} from '../src/lib/sync-catalog';
import {sheetHeaders} from '../src/lib/catalog';

test('photo syncing preserves listings and does not repeatedly copy a shared image',async()=>{
 let calls=0;
 const rows=[sheetHeaders,
  [true,'One','Cotton','Solids',true,false,false,'','','https://drive.google.com/file/d/photo-1/view',''],
  [true,'Two','Cotton','Solids',true,false,false,'','','https://drive.google.com/file/d/photo-1/view',''],
 ];
 const result=await syncCatalog(async()=>rows,{publish:async()=>{calls++;return 'https://test.public.blob.vercel-storage.com/products/image.png';}});
 assert.equal(calls,1);
 assert.equal(result.products.length,2);
 assert.ok(result.products.every(p=>p.imageUrl?.endsWith('image.png')));
 assert.ok(result.products.every(p=>p.photoReference===''));
});

test('a broken photo keeps product details available but a broken sheet is not replaced by demo stock',async()=>{
 const rows=[sheetHeaders,[true,'One','Cotton','Solids',true,false,false,'','','https://drive.google.com/file/d/photo-1/view','']];
 const result=await syncCatalog(async()=>rows,{publish:async()=>{throw new Error('unavailable');}});
 assert.equal(result.products.length,1);
 assert.equal(result.products[0].imageUrl,null);
 assert.equal(result.issues.length,1);
 await assert.rejects(()=>syncCatalog(async()=>{throw new Error('upstream unavailable');},{publish:async()=>''}),/upstream/);
 assert.equal((await syncCatalog(async()=>[sheetHeaders],{publish:async()=>''})).products.length,0);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {GoogleApi} from '../src/lib/google-api';
import {DrivePhotoPublisher,syncCatalog,type ImageStore} from '../src/lib/sync-catalog';
const base=process.env.SIMULATION_URL;

test('Google HTTP integration reads rows, verifies folder, downloads once, and reuses stored photos',{skip:!base},async()=>{
 const google=new GoogleApi({accessToken:async()=>'simulation-only',sheetsBaseUrl:base,driveBaseUrl:base});
 const stored=new Map<string,string>();
 let uploads=0;
 const store:ImageStore={find:async path=>stored.get(path)??null,upload:async(path,bytes,type)=>{
  assert.equal(type,'image/png');assert.equal(bytes[0],137);uploads++;
  const url=`https://example.public.blob.vercel-storage.com/${path}`;stored.set(path,url);return url;
 }};
 const publisher=new DrivePhotoPublisher(google,store,'folder-1');
 const run=()=>syncCatalog(()=>google.readRows('sheet-1','Products'),publisher);
 const first=await run();
 assert.equal(first.products.length,2);
 assert.equal(first.products[0].price,1299);
 assert.equal(first.issues.length,0);
 assert.equal(uploads,1);
 assert.ok(first.products[0].imageUrl?.includes('/products/photo-1/'));
 await run();
 assert.equal(uploads,1);
 await assert.rejects(()=>google.readRows('unavailable','Products'),/503/);
 const forbidden=new DrivePhotoPublisher(google,store,'different-folder');
 await assert.rejects(()=>forbidden.publish('https://drive.google.com/file/d/photo-1/view'),/folder/);
});

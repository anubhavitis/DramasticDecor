import test from 'node:test';
import assert from 'node:assert/strict';
import { photoStoragePath, readImageBytes, validatePhotoMetadata } from '../src/lib/photos';

test('photos are limited to the configured folder, safe file types and upload size', () => {
 const photo={id:'photo-1',mimeType:'image/png',modifiedTime:'2026-10-26T01:00:00Z',size:'12',parents:['folder-1']};
 assert.doesNotThrow(()=>validatePhotoMetadata(photo,'folder-1'));
 assert.throws(()=>validatePhotoMetadata({...photo,parents:['other']},'folder-1'),/folder/);
 assert.throws(()=>validatePhotoMetadata({...photo,mimeType:'image/svg+xml'},'folder-1'),/format/);
 assert.throws(()=>validatePhotoMetadata({...photo,size:String(11*1024*1024)},'folder-1'),/10 MB/);
 assert.equal(photoStoragePath(photo),photoStoragePath({...photo}));
 assert.notEqual(photoStoragePath(photo),photoStoragePath({...photo,modifiedTime:'2026-10-26T02:00:00Z'}));
});

test('downloaded files must contain actual image bytes',async()=>{
 const png=new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,0]);
 assert.equal((await readImageBytes(new Response(png),'image/png')).byteLength,png.length);
 await assert.rejects(()=>readImageBytes(new Response('<html>Login</html>'),'image/png'),/content/);
 await assert.rejects(()=>readImageBytes(new Response(png,{headers:{'content-length':String(11*1024*1024)}}),'image/png'),/10 MB/);
});

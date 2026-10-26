import { createHash } from 'node:crypto';
export const MAX_PHOTO_BYTES = 10*1024*1024;
const extensions: Record<string,string> = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
export type DrivePhoto = {id:string;mimeType:string;modifiedTime:string;size:string;parents?:string[];trashed?:boolean};
export function validatePhotoMetadata(photo: DrivePhoto, folderId: string) {
 if(!photo.parents?.includes(folderId) || photo.trashed) throw new Error('Photo must be in the configured product folder.');
 if(!extensions[photo.mimeType]) throw new Error('Photo format must be JPG, PNG or WebP.');
 if(!photo.modifiedTime || !/^\d+$/.test(photo.size) || Number(photo.size)>MAX_PHOTO_BYTES) throw new Error('Photo must be under 10 MB and have valid metadata.');
}
export function photoStoragePath(photo: DrivePhoto) {
 const version=createHash('sha256').update(`${photo.id}:${photo.modifiedTime}:${photo.size}`).digest('hex').slice(0,24);
 return `products/${photo.id}/${version}.${extensions[photo.mimeType]}`;
}
export async function readImageBytes(response: Response, mimeType: string): Promise<Buffer> {
 if(Number(response.headers.get('content-length'))>MAX_PHOTO_BYTES) throw new Error('Photo must be under 10 MB.');
 if(!response.body) throw new Error('Photo has no content.');
 const reader=response.body.getReader();
 const chunks:Uint8Array[]=[];
 let length=0;
 try {
  while(true) {
   const {done,value}=await reader.read();
   if(done) break;
   length+=value.byteLength;
   if(length>MAX_PHOTO_BYTES) {await reader.cancel();throw new Error('Photo must be under 10 MB.');}
   chunks.push(value);
  }
 } finally { reader.releaseLock(); }
 const bytes=Buffer.concat(chunks,length);
 const png=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
 const jpg=bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
 const webp=bytes.subarray(0,4).toString()==='RIFF' && bytes.subarray(8,12).toString()==='WEBP';
 if(!(mimeType==='image/png' && png || mimeType==='image/jpeg' && jpg || mimeType==='image/webp' && webp)) throw new Error('Downloaded content is not the expected image format.');
 return bytes;
}

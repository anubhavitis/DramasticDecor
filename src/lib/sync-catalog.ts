import { parseProducts, type CellValue, type Product } from './catalog';
import {getDriveFile} from './config';
import {photoStoragePath,readImageBytes,validatePhotoMetadata} from './photos';
import type {GoogleApi} from './google-api';

export interface ImageStore {
 find(path:string):Promise<string|null>;
 upload(path:string,bytes:Buffer,contentType:string):Promise<string>;
}
export class DrivePhotoPublisher {
 constructor(private google:GoogleApi,private store:ImageStore,private folderId:string) {}
 async publish(link:string):Promise<string> {
  const reference=getDriveFile(link);
  const photo=await this.google.photoMetadata(reference);
  validatePhotoMetadata(photo,this.folderId);
  const path=photoStoragePath(photo);
  const existing=await this.store.find(path);
  if(existing) return existing;
  const bytes=await readImageBytes(await this.google.downloadPhoto(reference),photo.mimeType);
  return this.store.upload(path,bytes,photo.mimeType);
 }
}
export async function syncCatalog(readRows:()=>Promise<CellValue[][]>,publisher:{publish:(link:string)=>Promise<string>}) {
 const {products,issues}=parseProducts(await readRows());
 const photos=new Map<string,Promise<string>>();
 let position=0;
 const results=new Array<Product>(products.length);
 const workers=Array.from({length:Math.min(4,products.length)},async()=>{
  while(position<products.length) {
   const index=position++;
   const product=products[index];
   if(product.photoReference) {
    try {
     let pending=photos.get(product.photoReference);
     if(!pending) {pending=publisher.publish(product.photoReference);photos.set(product.photoReference,pending);}
     product.imageUrl=await pending;
    } catch {
     issues.push(`Photo unavailable for ${product.id}.`);
    }
   }
   results[index]={...product,photoReference:''};
  }
 });
 await Promise.all(workers);
 return {products:results,issues};
}

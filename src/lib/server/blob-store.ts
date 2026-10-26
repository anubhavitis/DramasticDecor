import 'server-only';
import {head,put,BlobNotFoundError} from '@vercel/blob';
import type {ImageStore} from '../sync-catalog';
export class VercelBlobStore implements ImageStore {
 constructor(private token:string) {}
 async find(path:string):Promise<string|null> {
  try {return (await head(path,{token:this.token})).url;}
  catch(error) {if(error instanceof BlobNotFoundError) return null;throw error;}
 }
 async upload(path:string,bytes:Buffer,contentType:string):Promise<string> {
  try {
   return (await put(path,bytes,{access:'public',token:this.token,contentType,addRandomSuffix:false,allowOverwrite:false,cacheControlMaxAge:31536000})).url;
  } catch(error) {
   const concurrent=await this.find(path);
   if(concurrent) return concurrent;
   throw error;
  }
 }
}

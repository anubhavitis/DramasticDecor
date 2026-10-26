import 'server-only';
import {unstable_cache} from 'next/cache';
import {readConfig} from '../config';
import {DrivePhotoPublisher,syncCatalog} from '../sync-catalog';
import type {CatalogSnapshot} from '../catalog';
import {createGoogleApi} from './google';
import {VercelBlobStore} from './blob-store';
import {demoProducts} from '../demo-products';

export async function getCatalog():Promise<CatalogSnapshot> {
 const config=readConfig(process.env);
 if(config.mode==='demo') return {products:demoProducts,mode:'demo'};
 if(config.missing.length) {
  console.error('Catalog setup incomplete:',config.missing.join(', '));
  return {products:[],mode:'unavailable'};
 }
 try {
  const load=unstable_cache(async()=>{
   const google=createGoogleApi();
   const publisher=new DrivePhotoPublisher(google,new VercelBlobStore(process.env.BLOB_READ_WRITE_TOKEN!),config.folderId);
   const result=await syncCatalog(()=>google.readRows(config.sheetId,config.tab),publisher);
   if(result.issues.length) console.warn('Catalog rows/photos need attention:',result.issues.join(' '));
   return result.products;
  },['catalog-v1',config.sheetId,config.tab,config.folderId],{revalidate:300,tags:['catalog']});
  return {products:await load(),mode:'live'};
 } catch {
  console.error('Catalog connection unavailable. Check Google and Blob configuration.');
  return {products:[],mode:'unavailable'};
 }
}

import type { CellValue } from './catalog';
import type { DrivePhoto } from './photos';

type GoogleApiOptions = {
 accessToken: () => Promise<string>;
 sheetsBaseUrl?: string;
 driveBaseUrl?: string;
 timeoutMs?: number;
};
export class GoogleApi {
 private readonly options: GoogleApiOptions;
 constructor(options: GoogleApiOptions) { this.options=options; }
 private async request(url: URL, resource?: {id:string;resourceKey?:string}) {
  const token=await this.options.accessToken();
  const headers:Record<string,string>={Authorization:`Bearer ${token}`};
  if(resource?.resourceKey) headers['X-Goog-Drive-Resource-Keys']=`${resource.id}/${resource.resourceKey}`;
  const response=await fetch(url,{headers,cache:'no-store',signal:AbortSignal.timeout(this.options.timeoutMs??12000)});
  if(!response.ok) throw new Error(`Google request failed (${response.status}).`);
  return response;
 }
 async readRows(sheetId:string,tab:string):Promise<CellValue[][]> {
  const range=`'${tab.replace(/'/g,"''")}'`;
  const url=new URL(`${this.options.sheetsBaseUrl??'https://sheets.googleapis.com'}/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(range)}`);
  url.searchParams.set('valueRenderOption','UNFORMATTED_VALUE');
  const data=await (await this.request(url)).json() as {values?:CellValue[][]};
  if(data.values!==undefined && !Array.isArray(data.values)) throw new Error('Google Sheets returned invalid data.');
  if((data.values?.length??0)>1001) throw new Error('Catalog supports at most 1000 product rows.');
  return data.values??[];
 }
 async photoMetadata(reference:{id:string;resourceKey?:string}):Promise<DrivePhoto> {
  const url=new URL(`${this.options.driveBaseUrl??'https://www.googleapis.com'}/drive/v3/files/${encodeURIComponent(reference.id)}`);
  url.searchParams.set('fields','id,mimeType,modifiedTime,size,parents,trashed');
  url.searchParams.set('supportsAllDrives','true');
  const photo=await (await this.request(url,reference)).json() as DrivePhoto;
  if(photo.id!==reference.id) throw new Error('Drive returned a different photo.');
  return photo;
 }
 async downloadPhoto(reference:{id:string;resourceKey?:string}) {
  const url=new URL(`${this.options.driveBaseUrl??'https://www.googleapis.com'}/drive/v3/files/${encodeURIComponent(reference.id)}`);
  url.searchParams.set('alt','media');
  url.searchParams.set('supportsAllDrives','true');
  return this.request(url,reference);
 }
}

export type Environment = Record<string,string|undefined>;
const validId = (id: string | undefined | null) => id && /^[a-zA-Z0-9_-]+$/.test(id) ? id : null;

export function getGoogleResourceId(value: string, kind: 'sheet'|'folder'): string {
 const url = new URL(value);
 const host = kind === 'sheet' ? 'docs.google.com' : 'drive.google.com';
 const path = kind === 'sheet' ? /^\/spreadsheets\/d\/([\w-]+)(?:\/|$)/ : /^\/drive\/(?:u\/\d+\/)?folders\/([\w-]+)(?:\/|$)/;
 const id = url.protocol === 'https:' && url.hostname === host && !url.username && !url.password && !url.port ? validId(url.pathname.match(path)?.[1]) : null;
 if(!id) throw new Error(`Invalid Google ${kind} URL.`);
 return id;
}

export function getDriveFile(value: string): {id:string;resourceKey?:string} {
 const url = new URL(value);
 if(url.protocol !== 'https:' || url.hostname !== 'drive.google.com' || url.username || url.password || url.port) throw new Error('Use a Google Drive photo link.');
 const id = validId(url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1] ?? (['/open','/uc'].includes(url.pathname) ? url.searchParams.get('id') : null));
 if(!id) throw new Error('Use a Google Drive file link, not a folder link.');
 const resourceKey=url.searchParams.get('resourcekey')??undefined;
 if(resourceKey && !validId(resourceKey)) throw new Error('Invalid Drive resource key.');
 return {id,resourceKey};
}

export function readConfig(env: Environment) {
 const mode = env.CATALOG_MODE === 'demo' ? 'demo' : 'sheets';
 const required = ['GOOGLE_SHEET_URL','GOOGLE_DRIVE_FOLDER_URL','GOOGLE_SERVICE_ACCOUNT_EMAIL','GOOGLE_PRIVATE_KEY','BLOB_READ_WRITE_TOKEN'] as const;
 const missing: string[] = mode === 'demo' ? [] : required.filter(key=>!env[key]?.trim());
 let sheetId='',folderId='';
 if(mode === 'sheets') {
  for(const [key,kind] of [['GOOGLE_SHEET_URL','sheet'],['GOOGLE_DRIVE_FOLDER_URL','folder']] as const) {
   if(!env[key]) continue;
   try { const id=getGoogleResourceId(env[key]!,kind); if(kind === 'sheet') sheetId=id; else folderId=id; }
   catch { missing.push(`${key} (invalid URL)`); }
  }
 }
 const tab = (env.GOOGLE_SHEET_TAB || 'Products').trim();
 if(!tab || tab.length>100) missing.push('GOOGLE_SHEET_TAB (invalid name)');
 const whatsappNumber = env.WHATSAPP_NUMBER || '910000000000';
 const instagramHandle = env.INSTAGRAM_HANDLE || 'dramstic_decor2023';
 return {
  mode, missing, sheetId, folderId, tab,
  site:{whatsappNumber,instagramUrl:`https://www.instagram.com/${/^[\w.]+$/.test(instagramHandle)?instagramHandle:'dramstic_decor2023'}/`,instagramHandle:/^[\w.]+$/.test(instagramHandle)?instagramHandle:'dramstic_decor2023',dummyWhatsApp:whatsappNumber.replace(/\D/g,'')==='910000000000'},
 };
}

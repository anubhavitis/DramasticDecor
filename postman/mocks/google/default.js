const http = require('node:http');
const headers=['Show on website','Product name','Fabric','Theme','Single','Queen','King','Price INR','Colour','Photo link','Short note'];
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aDUcAAAAASUVORK5CYII=','base64');
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};
 if(req.method!=='GET') return json(501,{error:'Endpoint not modeled'});
 if(req.headers.authorization!=='Bearer simulation-only') return json(401,{error:'Missing token'});
 if(url.pathname.startsWith('/v4/spreadsheets/')) {
  if(url.pathname.includes('/unavailable/')) return json(503,{error:'Unavailable'});
  if(url.searchParams.get('valueRenderOption')!=='UNFORMATTED_VALUE') return json(400,{error:'Wrong value rendering'});
  if(!decodeURIComponent(url.pathname).endsWith("/values/'Products'")) return json(400,{error:'Wrong sheet range'});
  return json(200,{range:'Products!A1:K4',majorDimension:'ROWS',values:[headers,
   [true,'Live cotton','Cotton','Florals',false,true,true,1299,'Cream','https://drive.google.com/file/d/photo-1/view','A real listing'],
   [false,'Hidden listing','Cotton','Solids',true,false,false,500,'','',''],
   [true,'Second product','Cotton','Florals',true,true,false,'','Cream','https://drive.google.com/file/d/photo-1/view','']
  ]});
 }
 if(url.pathname==='/drive/v3/files/photo-1') {
  if(url.searchParams.get('alt')==='media') {res.writeHead(200,{'Content-Type':'image/png','Content-Length':png.length});return res.end(png);}
  if(!url.searchParams.get('fields')?.includes('parents')) return json(400,{error:'Missing folder check'});
  return json(200,{id:'photo-1',mimeType:'image/png',modifiedTime:'2026-10-26T00:00:00Z',size:String(png.length),parents:['folder-1'],trashed:false});
 }
 return json(501,{error:'Endpoint not modeled'});
}).listen(process.env.PORT);

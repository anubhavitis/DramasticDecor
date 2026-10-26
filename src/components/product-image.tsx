'use client';
import Image from 'next/image';
import {useState} from 'react';
import type {Product} from '@/lib/catalog';

function DesignSwatch({product}:{product:Product}) {
 const pattern=product.pattern!;
 const {background,ink,motif}=pattern;
 const id=product.id;
 return <svg viewBox="0 0 500 420" role="img" aria-label={`Illustrative ${product.tone.toLowerCase()} ${product.theme.toLowerCase()} bedsheet design swatch`}>
  <defs>
   <pattern id={`pattern-${id}`} width="62" height="67" patternUnits="userSpaceOnUse"><g transform="translate(31 24)" fill={ink} stroke={ink}>
    {motif==='flower' ? <><g stroke="none" opacity=".85"><ellipse cy="-7" rx="3" ry="6"/><ellipse cy="7" rx="3" ry="6"/><ellipse cx="-7" rx="6" ry="3"/><ellipse cx="7" rx="6" ry="3"/><circle r="3.3" fill={background}/><circle r="1.6"/></g><path d="M0 13v12m0-6c-9-7-12-2-2 2m2-6c8-7 11-2 2 2" fill="none" strokeWidth="1.1"/></>:null}
    {motif==='leaf' ? <><path d="M0 22V-18m0 27c-15-2-15-14 0-7m0-3c15-2 15-15 0-7m0-4c-11-2-11-12 0-7" fill="none" strokeWidth="1.5"/><path d="M0 1c-11-8-14 2 0 8m0-10c11-7 14-2 0 3" opacity=".55"/></>:null}
    {motif==='diamond' ? <><path d="m0-14 10 14L0 14-10 0Z" fill="none" strokeWidth="1.5"/><path d="m0-6 4 6-4 6-4-6Z"/><circle cy="23" r="1.5"/></>:null}
    {motif==='solid' ? <path d="M-30 0h60" strokeWidth=".35" opacity=".3"/>:null}
   </g></pattern>
   <pattern id={`weave-${id}`} width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0h4M0 2h4M0 0v4M2 0v4" stroke="#fff" strokeWidth=".5" opacity=".2"/></pattern>
   <linearGradient id={`light-${id}`} x1="0" x2="1" y2=".8"><stop stopColor="#fff" stopOpacity=".4"/><stop offset=".4" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#78644c" stopOpacity=".12"/></linearGradient>
   <linearGradient id={`fold-${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#000" stopOpacity=".15"/><stop offset=".18" stopColor="#fff" stopOpacity=".36"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
   <filter id={`shadow-${id}`} x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="2" dy="11" stdDeviation="10" floodColor="#473c2f" floodOpacity=".16"/></filter>
  </defs>
  <rect width="500" height="420" fill={background}/><rect width="500" height="420" fill={`url(#light-${id})`}/>
  <g transform="translate(37 42) rotate(-8 220 170)" filter={`url(#shadow-${id})`}>
   <rect x="30" y="35" width="354" height="292" rx="5" fill={background}/><rect x="30" y="35" width="354" height="292" rx="5" fill={`url(#pattern-${id})`}/>
   <path d="M30 270h354v42q0 15-12 15H42q-12 0-12-15Z" fill={background}/>
   <path d="M30 280h354m-354 5h354m-354 29h354m-354 5h354" stroke={ink} strokeWidth="2" opacity=".7"/>
   <path d="m32 297 8-7 8 7-8 8Z m16 0 8-7 8 7-8 8Z" fill={ink} opacity=".6"/>
   <rect x="30" y="35" width="354" height="292" rx="5" fill={`url(#weave-${id})`}/><rect x="30" y="35" width="354" height="292" rx="5" fill={`url(#light-${id})`}/>
   <path d="M30 163q150-16 354 0v30q-200-13-354 0Z" fill={`url(#fold-${id})`}/><path d="M33 165q150-16 348 0" stroke="#fff" strokeWidth="1.3" opacity=".4"/>
  </g>
  <g transform="translate(335 260) rotate(9)"><rect width="105" height="74" fill={background} stroke={ink} strokeOpacity=".17"/><rect x="7" y="7" width="91" height="60" fill={`url(#pattern-${id})`}/><rect width="105" height="74" fill={`url(#weave-${id})`}/></g>
 </svg>;
}
export function ProductImage({product}:{product:Product}) {
 const [failed,setFailed]=useState(false);
 if(product.pattern) return <div className="product-image"><DesignSwatch product={product}/><span className="swatch-label">ILLUSTRATIVE DESIGN</span></div>;
 return <div className="product-image">
  {product.imageUrl && !failed ? <Image src={product.imageUrl} alt={`${product.name}${product.tone?` — ${product.tone}`:''}`} fill sizes="(max-width: 580px) 45vw, (max-width: 800px) 46vw, 30vw" onError={()=>setFailed(true)}/>:<div className="photo-placeholder"><span aria-hidden="true">✳</span><p>Photo coming soon</p></div>}
 </div>;
}

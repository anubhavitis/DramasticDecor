'use client';
import {useState} from 'react';
import {bedSizes,filterProducts,getWhatsAppUrl,themes,type CatalogSnapshot} from '@/lib/catalog';
import {Button} from './ui/button';
import {ProductImage} from './product-image';
import {WhatsAppIcon} from './whatsapp-icon';
const rupees=new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2});

export function Catalog({snapshot,whatsappNumber}:{snapshot:CatalogSnapshot;whatsappNumber:string}) {
 const [theme,setTheme]=useState('All');
 const [size,setSize]=useState('All');
 const products=filterProducts(snapshot.products,theme,size);
 const availableThemes=['All',...themes.filter(value=>snapshot.products.some(product=>product.theme===value))];
 return <section className="collection wrap" id="collection" aria-labelledby="collection-title">
  <div className="section-heading"><div><p className="eyebrow">THE BEDSHEET EDIT</p><h2 id="collection-title">Find a little of <em>yourself.</em></h2></div><p>Florals, earthy solids, and timeless motifs.<br/>A fresh feeling for every kind of bedroom.</p></div>
  <div className="filters"><div className="tabs" role="group" aria-label="Filter by theme">{availableThemes.map(value=><Button key={value} variant="ghost" className={`tab ${theme===value?'active':''}`} aria-pressed={theme===value} onClick={()=>setTheme(value)}>{value==='All'?'All designs':value}</Button>)}</div><label className="size-filter" htmlFor="size">Bed size <select id="size" value={size} onChange={event=>setSize(event.target.value)}><option value="All">All sizes</option>{bedSizes.map(value=><option key={value}>{value}</option>)}</select></label></div>
  <div className="catalog-note"><p>{snapshot.mode==='demo'?'Sample collection · Design swatches and fabric details are illustrative.':'Choose your design and ask us about availability.'}</p><span id="product-count" aria-live="polite">{products.length} {products.length===1?'design':'designs'}</span></div>
  <div className="products" id="products">{products.map(product=><article className="product-card" key={product.id}>
   <ProductImage product={product}/>
   <div className="product-info"><p className="product-meta">{product.fabric} · {product.theme}</p><div className="product-title"><h3>{product.name}</h3>{product.pattern?<span className="color-dot" style={{background:product.pattern.ink}} title={product.tone}/>:null}</div>
    {product.tone?<p className="product-tone">{product.tone}</p>:null}
    <p className="product-price">{product.price===null?'Price on request':rupees.format(product.price)}</p>
    {product.note && snapshot.mode==='live'?<p className="product-note">{product.note}</p>:null}
    <div className="product-footer"><span className="product-sizes">{product.sizes.join(' / ')}</span><a className="inquiry-link" href={getWhatsAppUrl(whatsappNumber,product.name,size==='All'?undefined:size)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${product.name} on WhatsApp`}><WhatsAppIcon/> Ask about this <span aria-hidden="true">↗</span></a></div>
   </div>
  </article>)}</div>
  {products.length===0?<div className="empty" role="status"><p>{snapshot.mode==='unavailable'?'Our catalogue is temporarily unavailable. Message us to explore the collection.':snapshot.products.length?'No designs in this combination. Try another theme or bed size.':'New designs are on their way. Ask us what is available.'}</p><Button variant="outline" asChild><a href={getWhatsAppUrl(whatsappNumber)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp ↗</a></Button></div>:null}
  <p className="collection-bottom">Something caught your eye? <a href={getWhatsAppUrl(whatsappNumber)} target="_blank" rel="noopener noreferrer">Ask us about fabrics, sizes &amp; prices ↗</a></p>
 </section>;
}

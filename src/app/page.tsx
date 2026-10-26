import Image from 'next/image';
import {connection} from 'next/server';
import {Catalog} from '@/components/catalog';
import {Button} from '@/components/ui/button';
import {WhatsAppIcon} from '@/components/whatsapp-icon';
import {getCatalog} from '@/lib/server/catalog';
import {getWhatsAppUrl} from '@/lib/catalog';
import {readConfig} from '@/lib/config';

export const maxDuration=60;
export default async function Home() {
 await connection();
 const snapshot=await getCatalog();
 const {site}=readConfig(process.env);
 const inquiryUrl=getWhatsAppUrl(site.whatsappNumber);
 return <>

<a className="skip" href="#collection">Skip to collection</a>
<div className="topline">Thoughtful textiles. Familiar comforts. A home that feels like you.</div>
<header className="header wrap">
  <a className="brand" href="#" aria-label="DramasticDecor home"><Image src="/assets/mark.svg" alt="" width="36" height="36"/><span>Dramastic<span className="brand-light">Decor</span><small>TEXTILES FOR THE EVERYDAY</small></span></a>
  <nav aria-label="Main navigation"><a href="#collection">Our collection</a><a href="#our-story">Our inspiration</a><a href="#how-to-order">How to order</a></nav>
  <Button asChild className="button button-small header-chat h-auto"><a href={inquiryUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Let&apos;s talk <span aria-hidden="true">↗</span></a></Button>
</header>
<main>
<section className="hero wrap" aria-labelledby="hero-title">
  <div className="hero-copy">
    <p className="eyebrow"><span className="small-line"></span> ROOTED IN TRADITION. MADE FOR HOME.</p>
    <h1 id="hero-title">A little tradition.<br/>A lot of <em>comfort.</em></h1>
    <p className="intro">Beautiful bedsheets for the place you call home. Discover familiar patterns, gentle colours, and the simple joy of a well-made bed.</p>
    <Button asChild className="button h-auto"><a href="#collection">Find your everyday comfort <span aria-hidden="true">↓</span></a></Button>
    <div className="hero-note"><span className="sun-icon" aria-hidden="true">✳</span><p>Inspired by Indian homes.<br/>Chosen with yours in mind.</p></div>
  </div>
  <figure className="hero-visual"><Image src="/assets/bedroom.png" alt="Illustrative heritage bedroom with floral ivory bedsheets, a teak bed and sage throw" preload width={1536} height={1024} sizes="(max-width: 580px) 100vw, 50vw"/><figcaption><span>THE ART OF FEELING AT HOME</span><span>01 / EVERYDAY COMFORT</span></figcaption><span className="photo-note">Illustrative styling</span></figure>
</section>
<div className="values wrap"><span><span aria-hidden="true">✳</span> Patterns with a sense of home</span><span><span aria-hidden="true">◈</span> A fabric for every preference</span><span><WhatsAppIcon/> A real conversation on WhatsApp</span></div>
<Catalog snapshot={snapshot} whatsappNumber={site.whatsappNumber}/>
<section className="story-section" id="our-story"><div className="story wrap"><div className="story-art" aria-hidden="true"><div className="art-frame"><span className="art-flower">✳</span><p>Threads of tradition.<br/>Spaces of your own.</p><div className="art-lines"></div><span className="art-caption">THE DRAMASTICDECOR WAY</span></div></div><div className="story-copy"><p className="eyebrow">FAMILIAR BY FEELING</p><h2>For homes with<br/><em>a story to tell.</em></h2><p>A favourite print. A colour that reminds you of home. The bed you look forward to at the end of a long day.</p><p>Our inspiration comes from the warmth of Indian homes and the patterns woven into everyday life. DramasticDecor brings that feeling to your bedroom, one bedsheet at a time.</p><a className="text-link" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">A little more of our world on Instagram <span aria-hidden="true">↗</span></a></div></div></section>
<section className="ordering wrap" id="how-to-order"><p className="eyebrow">NO CART. JUST A CONVERSATION.</p><h2>Your next favourite bedsheet,<br/><em>one hello away.</em></h2><div className="steps"><div><span>01</span><h3>Find your favourite</h3><p>Explore the designs and pick what feels like home.</p></div><div><span>02</span><h3>Say hello on WhatsApp</h3><p>Ask about the fabric, size, colours, or anything else.</p></div><div><span>03</span><h3>Work out the details</h3><p>Confirm availability, price, and delivery with us directly.</p></div></div><Button asChild className="button h-auto"><a href={inquiryUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon/> Let&apos;s find something for your home <span aria-hidden="true">↗</span></a></Button>{site.dummyWhatsApp ? <p className="demo-note">Preview: WhatsApp uses a dummy number and cannot receive inquiries.</p> : null}</section>
</main>
<footer className="footer"><div className="wrap footer-main"><a className="brand" href="#"><Image src="/assets/mark.svg" alt="" width="32" height="32"/><span>Dramastic<span className="brand-light">Decor</span><small>A LITTLE TRADITION. A LOT OF COMFORT.</small></span></a><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram · @{site.instagramHandle} <span aria-hidden="true">↗</span></a></div><div className="wrap footer-bottom"><span>© <span>{new Date().getFullYear()}</span> DramasticDecor</span><span>Made for the feeling of home.</span><a href="#">Back to top ↑</a></div></footer>
<a className="floating-chat" href={inquiryUrl} target="_blank" rel="noopener noreferrer" aria-label="Ask on WhatsApp"><WhatsAppIcon/><span>Chat with us</span></a>

</>;
}

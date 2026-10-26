import Image from 'next/image';
import { connection } from 'next/server';
import { Catalog } from '@/components/catalog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brand, Eyebrow, InquiryButton, SectionTitle, containerClassName, linkFocusClassName } from '@/components/site-ui';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { getCatalog } from '@/lib/server/catalog';
import { getWhatsAppUrl } from '@/lib/catalog';
import { readConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

export const maxDuration = 60;

export default async function Home() {
  await connection();
  const snapshot = await getCatalog();
  const { site } = readConfig(process.env);
  const inquiryUrl = getWhatsAppUrl(site.whatsappNumber);

  return <>
    <a href="#collection" className="fixed -top-25 left-5 z-50 rounded-sm bg-primary p-3 text-primary-foreground focus:top-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Skip to collection</a>
    <div className="bg-bar px-3 py-[7px] text-center text-[9px] tracking-[.3px] text-bar-foreground sm:px-5 sm:py-2 sm:text-[11px] sm:tracking-[1.3px]">Thoughtful textiles. Familiar comforts. A home that feels like you.</div>
    <header className={cn(containerClassName, 'flex min-h-20 items-center justify-between gap-2 sm:min-h-[86px] sm:gap-[25px] md:min-h-[102px]')}>
      <Brand />
      <nav aria-label="Main navigation" className="hidden gap-5 text-[13px] md:flex lg:gap-8">
        {[['#collection', 'Our collection'], ['#our-story', 'Our inspiration'], ['#how-to-order', 'How to order']].map(([href, label]) => <a key={href} href={href} className={cn('hover:text-rust', linkFocusClassName)}>{label}</a>)}
      </nav>
      <InquiryButton compact href={inquiryUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Let&apos;s talk <span aria-hidden="true">↗</span></InquiryButton>
    </header>

    <main>
      <section aria-labelledby="hero-title" className={cn(containerClassName, 'grid grid-cols-1 items-center gap-[27px] pt-6 pb-[29px] sm:grid-cols-2 sm:gap-[25px] sm:pt-[25px] sm:pb-[55px] lg:grid-cols-[1fr_1.1fr] lg:gap-12 2xl:pt-[45px]')}>
        <div className="text-center sm:text-left">
          <Eyebrow className="mb-[18px] justify-center text-[8px] sm:mb-[22px] sm:justify-start sm:text-[8px] lg:text-[10px]"><span className="h-px w-6 bg-rust" /> ROOTED IN TRADITION. MADE FOR HOME.</Eyebrow>
          <h1 id="hero-title" className="mb-[19px] font-serif text-[59px] max-[360px]:text-[50px] leading-[1.04] font-normal tracking-[-2px] sm:mb-[25px] sm:text-[49px] sm:tracking-[-1.9px] md:text-[59px] lg:text-[clamp(52px,5.1vw,76px)]">A little tradition.<br />A lot of <em className="font-normal text-rust">comfort.</em></h1>
          <p className="mx-auto mb-[23px] max-w-[330px] text-[13px] leading-[1.8] text-muted-foreground sm:mx-0 sm:mb-7 sm:max-w-[410px] sm:text-xs sm:leading-[1.9] md:text-sm">Beautiful bedsheets for the place you call home. Discover familiar patterns, gentle colours, and the simple joy of a well-made bed.</p>
          <InquiryButton href="#collection">Find your everyday comfort <span aria-hidden="true">↓</span></InquiryButton>
          <div className="mt-6 hidden items-center gap-[13px] sm:flex md:mt-[34px]"><span aria-hidden="true" className="text-[35px] leading-none text-rust">✳</span><p className="text-[10px] leading-[1.6] text-muted-foreground">Inspired by Indian homes.<br />Chosen with yours in mind.</p></div>
        </div>
        <figure className="relative m-0 h-[330px] pb-[30px] sm:h-[400px] md:h-[440px] lg:h-[490px] 2xl:h-[550px]">
          <Image src="/assets/bedroom.png" alt="Illustrative heritage bedroom with floral ivory bedsheets, a teak bed and sage throw" preload width={1536} height={1024} sizes="(max-width: 580px) 100vw, 50vw" className="h-full w-full rounded-[70px_3px_3px_3px] bg-muted object-cover object-center sm:rounded-[110px_3px_3px_3px] sm:object-[54%_center]" />
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-between pt-[10px] text-[6px] tracking-[1px] text-muted-foreground sm:text-[8px] sm:tracking-[1.3px]"><span>THE ART OF FEELING AT HOME</span><span>01 / EVERYDAY COMFORT</span></figcaption>
          <Badge variant="secondary" className="absolute right-[13px] bottom-[45px] rounded-[2px] border-0 bg-black/60 px-[7px] py-[3px] text-[9px] font-normal text-white">Illustrative styling</Badge>
        </figure>
      </section>

      <div className={containerClassName}>
        <Separator />
        <div className="grid grid-cols-1 gap-[10px] py-[15px] sm:grid-cols-3 sm:py-5">
          {[
            <><span aria-hidden="true" className="text-[18px] text-ornament sm:text-[22px]">✳</span> Patterns with a sense of home</>,
            <><span aria-hidden="true" className="text-[18px] text-ornament sm:text-[22px]">◈</span> A fabric for every preference</>,
            <><WhatsAppIcon /> A real conversation on WhatsApp</>,
          ].map((content, index) => <div key={index} className={cn('flex items-center justify-center gap-3 text-[11px] sm:gap-[7px] sm:text-[10px] md:gap-3 md:text-[11px]', index > 0 && 'sm:border-l sm:border-border')}>{content}</div>)}
        </div>
        <Separator />
      </div>

      <Catalog snapshot={snapshot} whatsappNumber={site.whatsappNumber} />

      <section id="our-story" className="border-y border-border bg-muted">
        <div className={cn(containerClassName, 'grid grid-cols-1 items-center gap-[29px] py-[35px] sm:grid-cols-[.9fr_1fr] sm:gap-[30px] sm:py-[65px] md:gap-[55px] lg:gap-[110px]')}>
          <div aria-hidden="true" className="aspect-[1.5] max-w-full bg-art p-4 sm:aspect-[1.2] sm:max-w-[440px] sm:p-[22px]">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden border border-art-border bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_3px,var(--color-art-line)_4px)] p-7">
              <span className="absolute inset-x-0 top-2 text-center text-base tracking-[12px] whitespace-nowrap text-art-border">◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇</span>
              <span className="mb-[10px] text-[43px] leading-none text-art-foreground sm:mb-[15px] sm:text-[46px] md:text-[65px]">✳</span>
              <p className="text-center font-serif text-[31px] leading-[1.1] text-art-foreground sm:text-[27px] md:text-[34px]">Threads of tradition.<br />Spaces of your own.</p>
              <span className="mt-[15px] text-[7px] tracking-[2px] text-art-caption sm:mt-[26px] sm:text-[8px]">THE DRAMASTICDECOR WAY</span>
              <span className="absolute inset-x-0 bottom-2 text-center text-base tracking-[12px] whitespace-nowrap text-art-border">◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇ ◇</span>
            </div>
          </div>
          <div>
            <Eyebrow className="mb-[14px]">FAMILIAR BY FEELING</Eyebrow>
            <SectionTitle className="mb-6 text-[43px] sm:text-[40px] lg:text-[49px]">For homes with<br /><em>a story to tell.</em></SectionTitle>
            <p className="mb-[14px] max-w-[400px] text-[13px] leading-[1.9] text-muted-foreground sm:text-xs">A favourite print. A colour that reminds you of home. The bed you look forward to at the end of a long day.</p>
            <p className="mb-[14px] max-w-[400px] text-[13px] leading-[1.9] text-muted-foreground sm:text-xs">Our inspiration comes from the warmth of Indian homes and the patterns woven into everyday life. DramasticDecor brings that feeling to your bedroom, one bedsheet at a time.</p>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={cn('mt-1 inline-flex gap-[18px] border-b border-border py-2 text-[11px] hover:text-rust', linkFocusClassName)}>A little more of our world on Instagram <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section id="how-to-order" className={cn(containerClassName, 'py-[45px] pb-10 text-center sm:pt-[70px] sm:pb-[65px]')}>
        <Eyebrow className="mb-[17px] justify-center">NO CART. JUST A CONVERSATION.</Eyebrow>
        <SectionTitle className="text-[37px] tracking-[-1.3px] sm:text-[42px] sm:tracking-[-1.9px] lg:text-[48px]">Your next favourite bedsheet,<br /><em>one hello away.</em></SectionTitle>
        <div className="mx-2 my-[30px] grid max-w-[960px] grid-cols-1 gap-[22px] text-left sm:mx-auto sm:mt-10 sm:mb-[35px] sm:grid-cols-3 sm:gap-[50px] sm:text-center">
          {[
            ['01', 'Find your favourite', 'Explore the designs and pick what feels like home.'],
            ['02', 'Say hello on WhatsApp', 'Ask about the fabric, size, colours, or anything else.'],
            ['03', 'Work out the details', 'Confirm availability, price, and delivery with us directly.'],
          ].map(([step, title, description], index) => <div key={step} className={cn('relative pl-11 sm:pl-0', index > 0 && 'sm:before:absolute sm:before:top-[15px] sm:before:bottom-0 sm:before:-left-[25px] sm:before:w-px sm:before:bg-border')}>
            <span className="absolute top-0 left-0 font-serif text-[25px] text-rust sm:static">{step}</span>
            <h3 className="mb-[6px] text-sm font-medium sm:my-2">{title}</h3>
            <p className="text-xs text-muted-foreground sm:mx-auto sm:max-w-[220px]">{description}</p>
          </div>)}
        </div>
        <InquiryButton href={inquiryUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> Let&apos;s find something for your home <span aria-hidden="true">↗</span></InquiryButton>
        {site.dummyWhatsApp ? <p className="mt-[13px] text-[9px] text-muted-foreground sm:text-[10px]">Preview: WhatsApp uses a dummy number and cannot receive inquiries.</p> : null}
      </section>
    </main>

    <footer className="border-t border-border bg-secondary">
      <div className={cn(containerClassName, 'flex flex-col items-start justify-between gap-5 py-[27px] sm:flex-row sm:items-center sm:py-8')}>
        <Brand footer />
        <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={cn('text-[11px] hover:text-rust', linkFocusClassName)}>Instagram · @{site.instagramHandle} <span aria-hidden="true">↗</span></a>
      </div>
      <div className={containerClassName}>
        <Separator className="bg-border" />
        <div className="flex flex-wrap items-center justify-between gap-3 py-[17px] pb-[75px] text-[9px] text-muted-foreground sm:pb-[17px]"><span>© {new Date().getFullYear()} DramasticDecor</span><span className="hidden sm:inline">Made for the feeling of home.</span><a href="#" className={linkFocusClassName}>Back to top ↑</a></div>
      </div>
    </footer>
    <InquiryButton href={inquiryUrl} target="_blank" rel="noopener noreferrer" aria-label="Ask on WhatsApp" className="fixed right-[15px] bottom-[15px] z-40 gap-[9px] rounded-full border-white/25 px-[15px] py-[11px] text-[11px] shadow-[0_3px_13px_#24392a20] sm:right-[23px] sm:bottom-[22px] sm:px-[18px] sm:py-3 sm:text-xs md:gap-[9px] md:px-[18px] md:py-3 md:text-xs"><WhatsAppIcon /><span>Chat with us</span></InquiryButton>
  </>;
}

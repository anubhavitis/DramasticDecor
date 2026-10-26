import type {Metadata,Viewport} from 'next';
import './globals.css';
import { Analytics } from "@vercel/analytics/next";
export const metadata:Metadata={
 metadataBase:new URL(process.env.SITE_URL||'http://localhost:4173'),
 title:'DramasticDecor — A little tradition. A lot of comfort.',
 description:'Discover bedsheets with a little tradition and a lot of comfort. Explore DramasticDecor and inquire directly on WhatsApp.',
 icons:{icon:'/assets/mark.svg'},
 openGraph:{title:'DramasticDecor',description:'A little tradition. A lot of comfort.',images:[{url:'/assets/bedroom.png',width:1536,height:1024}],type:'website'},
};
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: light)',color:'#faf8f2'},{media:'(prefers-color-scheme: dark)',color:'#111b15'}]};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en" className="scheme-light dark:scheme-dark scroll-smooth scroll-pt-[35px] motion-reduce:scroll-auto"><body className="bg-background font-sans text-[15px] leading-[1.6] text-foreground antialiased motion-reduce:[&_*]:transition-none">{children}<Analytics /></body></html>;
}

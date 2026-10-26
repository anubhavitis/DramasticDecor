import type {Metadata,Viewport} from 'next';
import './globals.css';
export const metadata:Metadata={
 metadataBase:new URL(process.env.SITE_URL||'http://localhost:4173'),
 title:'DramasticDecor — A little tradition. A lot of comfort.',
 description:'Discover bedsheets with a little tradition and a lot of comfort. Explore DramasticDecor and inquire directly on WhatsApp.',
 icons:{icon:'/assets/mark.svg'},
 openGraph:{title:'DramasticDecor',description:'A little tradition. A lot of comfort.',images:[{url:'/assets/bedroom.png',width:1536,height:1024}],type:'website'},
};
export const viewport:Viewport={themeColor:'#244c3c'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>{children}</body></html>;
}

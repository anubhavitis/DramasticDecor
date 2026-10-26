'use client';
import {Button} from '@/components/ui/button';
export default function ErrorPage({reset}:{reset:()=>void}) {
 return <main className="wrap ordering"><h1>A little pause.</h1><p>We couldn’t load the page. Please try again.</p><Button onClick={reset}>Try again</Button></main>;
}

'use client';
import { Button } from '@/components/ui/button';
import { containerClassName } from '@/components/site-ui';
import { cn } from '@/lib/utils';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className={cn(containerClassName, 'py-16 text-center')}>
    <h1 className="mb-6 font-serif text-6xl leading-tight">A little pause.</h1>
    <p className="mb-6 text-muted-foreground">We couldn’t load the page. Please try again.</p>
    <Button onClick={reset}>Try again</Button>
  </main>;
}

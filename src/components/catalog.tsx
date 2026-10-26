'use client';

import { useState } from 'react';
import { bedSizes, filterProducts, getWhatsAppUrl, themes, type CatalogSnapshot } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product-card';
import { Eyebrow, SectionTitle, containerClassName, linkFocusClassName } from '@/components/site-ui';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';

export function Catalog({ snapshot, whatsappNumber }: { snapshot: CatalogSnapshot; whatsappNumber: string }) {
  const [theme, setTheme] = useState('All');
  const [size, setSize] = useState('All');
  const products = filterProducts(snapshot.products, theme, size);
  const availableThemes = ['All', ...themes.filter(value => snapshot.products.some(product => product.theme === value))];
  const emptyTitle = snapshot.mode === 'unavailable' ? 'Our catalogue is temporarily unavailable.' : snapshot.products.length ? 'No designs in this combination.' : 'New designs are on their way.';
  const emptyDescription = snapshot.mode === 'unavailable' ? 'Message us to explore the collection.' : snapshot.products.length ? 'Try another theme or bed size.' : 'Ask us what is available.';

  return <section id="collection" aria-labelledby="collection-title" className={cn(containerClassName, 'py-[45px] sm:pt-[55px] sm:pb-[65px] md:pt-20')}>
    <div className="mb-[23px] sm:mb-[35px] sm:flex sm:items-end sm:justify-between sm:gap-[25px]">
      <div><Eyebrow className="mb-3 sm:mb-[14px]">THE BEDSHEET EDIT</Eyebrow><SectionTitle id="collection-title" className="tracking-[-1.5px] sm:tracking-[-1.9px]">Find a little of <em>yourself.</em></SectionTitle></div>
      <p className="mt-[15px] text-xs leading-[1.8] text-muted-foreground sm:mt-0 sm:mb-1 sm:max-w-[220px] sm:text-[11px] md:max-w-none md:text-xs">Florals, earthy solids, and timeless motifs.<br />A fresh feeling for every kind of bedroom.</p>
    </div>

    <div className="border-b border-border pb-[14px] sm:flex sm:items-start sm:justify-between sm:gap-[10px] sm:pb-[17px] md:items-center md:gap-5">
      <ToggleGroup type="single" value={theme} onValueChange={value => { if (value) setTheme(value); }} spacing={2} aria-label="Filter by theme" className="flex-wrap justify-start gap-[3px] rounded-none pb-[7px] sm:gap-[2px] sm:pb-0 md:gap-2">
        {availableThemes.map(value => <ToggleGroupItem key={value} value={value} className="h-10 rounded-sm border border-transparent bg-transparent px-3 py-2 text-[11px] font-normal text-muted-foreground transition-colors hover:border-border hover:bg-transparent hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground sm:px-[11px] md:px-4 md:py-[9px] md:text-xs">{value === 'All' ? 'All designs' : value}</ToggleGroupItem>)}
      </ToggleGroup>
      <div className="mt-2 flex items-center justify-between gap-3 sm:mt-0 sm:flex-col sm:items-start sm:gap-[3px] md:flex-row md:items-center md:gap-3">
        <Label htmlFor="bed-size" className="text-[11px] font-normal whitespace-nowrap text-muted-foreground">Bed size</Label>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger id="bed-size" aria-label="Bed size" className="min-h-[38px] min-w-[127px] rounded-sm border-border bg-transparent text-xs shadow-none sm:min-h-10 sm:min-w-[110px]"><SelectValue>{size === 'All' ? 'All sizes' : size}</SelectValue></SelectTrigger>
          <SelectContent position="popper" align="end" className="border-border"><SelectItem value="All">All sizes</SelectItem>{bedSizes.map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    </div>

    <div className="flex items-start justify-between gap-[15px] pt-3 pb-5 text-[9px] text-muted-foreground sm:pt-[14px] md:text-[10px]">
      <p className="max-w-[235px] sm:max-w-none">{snapshot.mode === 'demo' ? 'Sample collection · Design swatches and fabric details are illustrative.' : 'Choose your design and ask us about availability.'}</p>
      <span aria-live="polite" className="whitespace-nowrap">{products.length} {products.length === 1 ? 'design' : 'designs'}</span>
    </div>

    <div className="grid grid-cols-2 gap-x-[14px] gap-y-[27px] sm:gap-x-[25px] sm:gap-y-9 md:grid-cols-3">
      {products.map(product => <ProductCard key={product.id} product={product} whatsappNumber={whatsappNumber} selectedSize={size} showNote={snapshot.mode === 'live'} />)}
    </div>

    {products.length === 0 ? <Empty role="status" className="rounded-none border-0 py-[50px] text-muted-foreground">
      <EmptyHeader><EmptyTitle className="text-base font-medium">{emptyTitle}</EmptyTitle><EmptyDescription className="text-muted-foreground">{emptyDescription}</EmptyDescription></EmptyHeader>
      <EmptyContent><Button variant="outline" asChild><a href={getWhatsAppUrl(whatsappNumber)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp ↗</a></Button></EmptyContent>
    </Empty> : null}

    <p className="mt-[27px] text-center text-[11px] leading-loose text-muted-foreground sm:mt-10 sm:text-xs sm:leading-[1.6]">Something caught your eye? <a href={getWhatsAppUrl(whatsappNumber)} target="_blank" rel="noopener noreferrer" className={cn('block text-primary underline underline-offset-4 sm:inline', linkFocusClassName)}>Ask us about fabrics, sizes &amp; prices ↗</a></p>
  </section>;
}

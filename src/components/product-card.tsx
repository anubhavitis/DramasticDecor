import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductImage } from '@/components/product-image';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { getWhatsAppUrl, type Product } from '@/lib/catalog';

const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

export function ProductCard({ product, whatsappNumber, selectedSize, showNote }: {
  product: Product; whatsappNumber: string; selectedSize: string; showNote: boolean;
}) {
  return <Card role="article" className="group gap-0 rounded-none border-0 bg-transparent py-0 shadow-none">
    <ProductImage product={product} />
    <CardHeader className="gap-0 px-0 pt-[13px] sm:pt-[17px]">
      <p className="mb-[6px] text-[8px] tracking-[.6px] text-muted-foreground uppercase sm:text-[9px] sm:tracking-[1.2px]">{product.fabric} · {product.theme}</p>
      <div className="flex items-center justify-between gap-[10px]">
        <CardTitle className="font-serif text-[23px] leading-[1.1] font-normal wrap-anywhere sm:text-[24px] sm:leading-[1.3] lg:text-[27px]"><h3>{product.name}</h3></CardTitle>
        {product.pattern ? <span title={product.tone} className="size-3 shrink-0 overflow-hidden rounded-full border-2 border-background ring-1 ring-border"><svg viewBox="0 0 12 12" aria-hidden="true" className="size-full"><circle cx="6" cy="6" r="6" fill={product.pattern.ink} /></svg></span> : null}
      </div>
    </CardHeader>
    <CardContent className="px-0">
      {product.tone ? <p className="mt-[7px] mb-[10px] min-h-4 text-xs text-muted-foreground sm:mt-[5px] sm:mb-[13px]">{product.tone}</p> : null}
      <p className="mt-2 mb-[13px] text-[13px]">{product.price === null ? 'Price on request' : rupees.format(product.price)}</p>
      {product.note && showNote ? <p className="mb-3 text-xs wrap-anywhere text-muted-foreground">{product.note}</p> : null}
    </CardContent>
    <Separator className="mt-auto" />
    <CardFooter className="flex-col items-start justify-between gap-[2px] px-0 pt-3 sm:flex-row sm:items-center sm:gap-[10px] md:flex-col md:items-start md:gap-[3px] lg:flex-row lg:items-center lg:gap-[10px]">
      <span className="text-[11px] text-muted-foreground">{product.sizes.join(' / ')}</span>
      <Button variant="link" asChild className="min-h-10 w-fit gap-[6px] rounded-sm p-0 text-xs font-medium text-primary">
        <a href={getWhatsAppUrl(whatsappNumber, product.name, selectedSize === 'All' ? undefined : selectedSize)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${product.name} on WhatsApp`}><WhatsAppIcon className="[&_svg]:size-[14px]" /> Ask about this <span aria-hidden="true">↗</span></a>
      </Button>
    </CardFooter>
  </Card>;
}

import Image from 'next/image';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const containerClassName = 'mx-auto w-[calc(100%-2.25rem)] max-w-[1240px] sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-7rem)]';
export const linkFocusClassName = 'rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring';

export function Eyebrow({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('mb-[22px] flex items-center gap-3 text-[8px] leading-[1.8] font-semibold tracking-[1.1px] sm:text-[9px] lg:text-[10px] lg:tracking-[1.8px]', className, 'leading-[1.8]')} {...props} />;
}

export function SectionTitle({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 className={cn('font-serif text-[40px] leading-[1.04] font-normal tracking-[-1.9px] sm:text-[42px] lg:text-[49px] [&_em]:font-normal [&_em]:text-rust', className, 'leading-[1.04]')} {...props} />;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#" aria-label="DramasticDecor home" className={cn('flex items-center gap-2 font-serif leading-[1.1] whitespace-nowrap sm:gap-[11px]', footer ? 'text-[24px] sm:text-[25px]' : 'text-[23px] sm:text-[25px] lg:text-[28px]', linkFocusClassName, 'leading-[1.1]')}>
    <Image src="/assets/mark.svg" alt="" width={36} height={36} className={cn('size-[30px] shrink-0 dark:brightness-0 dark:invert', footer ? 'sm:size-8' : 'sm:size-9')} />
    <span>Dramastic<span className="font-normal">Decor</span><small className={cn('mt-[6px] block font-sans text-[6px] tracking-[1.5px] sm:mt-[9px]', footer ? 'sm:text-[7px] sm:tracking-[1.4px]' : 'sm:text-[7px] sm:tracking-[2px] lg:text-[8px]')}>{footer ? 'A LITTLE TRADITION. A LOT OF COMFORT.' : 'TEXTILES FOR THE EVERYDAY'}</small></span>
  </a>;
}

export function InquiryButton({ compact = false, className, children, ...props }: ComponentProps<'a'> & { compact?: boolean }) {
  return <Button asChild className={cn('h-auto rounded-sm border border-primary font-medium text-primary-foreground transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-primary-dark motion-reduce:transform-none', compact ? 'gap-[6px] px-[10px] py-2 text-[10px] sm:gap-[10px] sm:px-[15px] sm:py-[10px] sm:text-xs [&_svg]:size-[14px] sm:[&_svg]:size-[18px]' : 'gap-[13px] px-4 py-[13px] text-xs leading-normal md:gap-5 md:px-[23px] md:py-[15px] md:text-[13px]', className)}>
    <a {...props}>{children}</a>
  </Button>;
}

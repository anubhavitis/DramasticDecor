import {cn} from '@/lib/utils';
export function WhatsAppIcon({className}:{className?:string}={}) {
 return <span className={cn("inline-flex shrink-0 items-center",className)} data-icon="chat"><svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.8Z"/><path d="M8.4 7.7c.3-.2.7.2 1.2 1.3.2.4-.5 1-.4 1.3.7 1.4 1.7 2.4 3.2 3 .4.2.8-.9 1.3-.7 1.2.5 1.8.8 1.7 1.3-.3 1.3-1.5 1.7-2.6 1.3-3.5-1.1-5.7-3.5-6-5.7-.1-.8.7-1.6 1.6-1.8Z"/></svg></span>;
}

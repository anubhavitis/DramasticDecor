import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/whatsapp-icon';

export function WhatsAppLink({ href }: { href: string }) {
  return <Button variant="ghost" size="icon" asChild className="size-11 text-primary [&_svg]:size-7">
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <WhatsAppIcon />
    </a>
  </Button>;
}

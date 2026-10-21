import type { ReactNode } from 'react';
import { AnchorButton } from '@/styles/ui';
import { WHATSAPP_URL } from '@/lib/site';
import { track } from '@/lib/gtag';
import { useT } from '@/lib/i18n';

type Props = { location: string; children?: ReactNode };

export default function WhatsAppLink({ location, children }: Props) {
  const t = useT();
  return (
    <AnchorButton
      $variant='whatsapp'
      href={WHATSAPP_URL}
      target='_blank'
      rel='noopener noreferrer'
      onClick={() => track('contact_click', { method: 'whatsapp', location })}
    >
      {children ?? t.common.whatsapp}
      <span className='sr-only'>{t.common.newTab}</span>
    </AnchorButton>
  );
}

import styled from '@emotion/styled';
import Link from 'next/link';
import { Container } from '@/styles/ui';
import { useLang, useT } from '@/lib/i18n';
import { PHONE_DISPLAY, PHONE_E164, SOCIAL, WHATSAPP_URL } from '@/lib/site';
import { track } from '@/lib/gtag';

const Wrap = styled.footer`
  border-block-start: 1px solid var(--divider);
  padding-block: 3rem 2rem;
  color: var(--text-muted);
  font-size: 0.9375rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }

  h2 {
    font-size: 1rem;
    color: var(--text);
    margin-block-end: 0.75rem;
  }

  li + li {
    margin-block-start: 0.5rem;
  }

  a {
    text-underline-offset: 3px;
  }
`;

const Brand = styled.p`
  color: var(--text);
  font-weight: 900;
  font-size: 1.25rem;
`;

const Small = styled.p`
  margin-block-start: 2.5rem;
  font-size: 0.875rem;
`;

export default function Footer() {
  const lang = useLang();
  const t = useT();
  return (
    <Wrap>
      <Container>
        <Grid>
          <div>
            <Brand>Web Witch</Brand>
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h2>{t.footer.contactTitle}</h2>
            <ul role='list'>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => track('contact_click', { method: 'whatsapp', location: 'footer' })}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_E164}`}
                  dir='ltr'
                  onClick={() => track('contact_click', { method: 'phone', location: 'footer' })}
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t.footer.linksTitle}</h2>
            <ul role='list'>
              <li>
                <a href={SOCIAL.linkedin} target='_blank' rel='noopener noreferrer'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SOCIAL.github} target='_blank' rel='noopener noreferrer'>
                  GitHub
                </a>
              </li>
              <li>
                <Link href={`/${lang}/privacy`}>{t.footer.privacy}</Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Small>
          <bdi>© Julia Savransky-Perl · Web Witch</bdi>
        </Small>
      </Container>
    </Wrap>
  );
}

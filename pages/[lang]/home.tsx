import styled from '@emotion/styled';
import Link from 'next/link';
import PageSeo from '@/components/PageSeo';
import Logo from '@/components/Logo';
import WhatsAppLink from '@/components/WhatsAppLink';
import { clientProjects } from '@/data/projects';
import { langStaticPaths, langStaticProps, useLang, useT } from '@/lib/i18n';
import { Actions, Container, H1, H2, Lead, LinkButton, Section } from '@/styles/ui';

export const getStaticPaths = langStaticPaths;
export const getStaticProps = langStaticProps;

const Hero = styled(Section)`
  padding-block-start: clamp(2.5rem, 7vw, 5rem);

  h1 {
    margin-block-start: 1.5rem;
    max-width: 22em;
  }
`;

const Columns = styled.ol`
  display: grid;
  gap: 2rem;
  counter-reset: step;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  h3 {
    font-size: 1.25rem;
    margin-block-end: 0.5rem;
  }

  p {
    color: var(--text-muted);
  }
`;

const Step = styled.li`
  counter-increment: step;

  h3::before {
    content: counter(step) '. ';
    color: var(--accent);
  }
`;

const Clients = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2rem;
  font-size: 1.125rem;
  font-weight: 700;

  a {
    text-decoration-color: var(--line);
    text-underline-offset: 4px;
  }
`;

export default function Home() {
  const lang = useLang();
  const t = useT();
  return (
    <>
      <PageSeo page='home' />
      <Hero>
        <Container>
          <Logo />
          <H1>{t.home.h1}</H1>
          <Lead>{t.home.lead}</Lead>
          <Actions>
            <WhatsAppLink location='hero' />
            <LinkButton href={`/${lang}/projects`} $variant='secondary'>
              {t.home.secondaryCta}
            </LinkButton>
          </Actions>
        </Container>
      </Hero>

      <Section aria-labelledby='services'>
        <Container>
          <H2 id='services'>{t.home.servicesTitle}</H2>
          <Columns as='ul' role='list'>
            {t.home.services.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </Columns>
        </Container>
      </Section>

      <Section aria-labelledby='process'>
        <Container>
          <H2 id='process'>{t.home.processTitle}</H2>
          <Columns role='list'>
            {t.home.process.map((s) => (
              <Step key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Step>
            ))}
          </Columns>
        </Container>
      </Section>

      <Section aria-labelledby='clients'>
        <Container>
          <H2 id='clients'>{t.home.clientsTitle}</H2>
          <Clients role='list'>
            {clientProjects.map((p) => (
              <li key={p.url}>
                <Link href={`/${lang}/projects`}>{p.name[lang]}</Link>
              </li>
            ))}
          </Clients>
        </Container>
      </Section>

      <Section aria-labelledby='next-step'>
        <Container>
          <H2 id='next-step'>{t.home.finalTitle}</H2>
          <Lead>{t.home.finalBody}</Lead>
          <Actions>
            <WhatsAppLink location='home_final' />
            <LinkButton href={`/${lang}/contact`} $variant='secondary'>
              {t.home.finalCta}
            </LinkButton>
          </Actions>
        </Container>
      </Section>
    </>
  );
}

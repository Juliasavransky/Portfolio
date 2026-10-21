import styled from '@emotion/styled';
import Image from 'next/image';
import PageSeo from '@/components/PageSeo';
import myProfile from '@/public/images/myProfile.jpg';
import { langStaticPaths, langStaticProps, useLang, useT } from '@/lib/i18n';
import { Actions, Container, H1, H2, LinkButton, Section } from '@/styles/ui';

export const getStaticPaths = langStaticPaths;
export const getStaticProps = langStaticProps;

const TOOLS = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Redux',
  'SCSS', 'Material UI', 'WordPress', 'Gutenberg', 'Headless CMS', 'Figma', 'Zeplin', 'Git', 'UX/UI',
];

const Intro = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 16rem;
  }

  img {
    width: 100%;
    max-width: 16rem;
    border-radius: var(--radius);
    border: 1px solid var(--divider);
  }
`;

const Prose = styled.div`
  max-width: 38em;

  p {
    margin-block-start: 1.25rem;
    font-size: 1.125rem;
  }
`;

const Tools = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  direction: ltr;

  html[lang='he'] & {
    justify-content: flex-end;
  }

  li {
    padding: 0.375rem 0.875rem;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    font-size: 0.9375rem;
  }
`;

export default function About() {
  const lang = useLang();
  const t = useT().about;
  return (
    <>
      <PageSeo page='about' />
      <Section>
        <Container>
          <Intro>
            <Prose>
              <H1>{t.h1}</H1>
              {t.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <Actions>
                <LinkButton href={`/${lang}/contact`}>{t.cta}</LinkButton>
              </Actions>
            </Prose>
            <Image src={myProfile} alt={t.photoAlt} sizes='16rem' priority />
          </Intro>
        </Container>
      </Section>
      <Section aria-labelledby='tools'>
        <Container>
          <H2 id='tools'>{t.toolsTitle}</H2>
          <Tools role='list'>
            {TOOLS.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </Tools>
        </Container>
      </Section>
    </>
  );
}

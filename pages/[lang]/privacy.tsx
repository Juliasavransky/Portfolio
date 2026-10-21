import styled from '@emotion/styled';
import PageSeo from '@/components/PageSeo';
import { langStaticPaths, langStaticProps, useT } from '@/lib/i18n';
import { Container, H1, Section } from '@/styles/ui';

export const getStaticPaths = langStaticPaths;
export const getStaticProps = langStaticProps;

const Prose = styled.div`
  max-width: 38em;

  h2 {
    font-size: 1.25rem;
    margin-block: 2rem 0.5rem;
  }

  p {
    color: var(--text-muted);
  }
`;

export default function Privacy() {
  const t = useT().privacy;
  return (
    <>
      <PageSeo page='privacy' />
      <Section>
        <Container>
          <Prose>
            <H1>{t.h1}</H1>
            {t.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
          </Prose>
        </Container>
      </Section>
    </>
  );
}

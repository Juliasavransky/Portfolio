import styled from '@emotion/styled';
import PageSeo from '@/components/PageSeo';
import ProjectCard from '@/components/ProjectCard';
import { clientProjects, experiments } from '@/data/projects';
import { langStaticPaths, langStaticProps, useLang, useT } from '@/lib/i18n';
import { track } from '@/lib/gtag';
import { Container, H1, H2, Lead, Section } from '@/styles/ui';

export const getStaticPaths = langStaticPaths;
export const getStaticProps = langStaticProps;

const Grid = styled.ul`
  display: grid;
  gap: 3rem 2rem;
  margin-block-start: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const List = styled.ul`
  display: grid;
  gap: 1rem;
  margin-block-start: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  a {
    font-weight: 700;
    text-underline-offset: 3px;
  }

  p {
    color: var(--text-muted);
  }
`;

export default function Projects() {
  const lang = useLang();
  const t = useT();

  const itemList = {
    '@type': 'ItemList',
    name: t.projects.h1,
    itemListElement: clientProjects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name[lang],
        description: p.summary[lang],
        url: p.url,
        image: `https://webwitch.click${p.img}`,
        creator: { '@id': 'https://webwitch.click/#julia' },
      },
    })),
  };

  return (
    <>
      <PageSeo page='projects' schema={[itemList]} />
      <Section>
        <Container>
          <H1>{t.projects.h1}</H1>
          <Lead>{t.projects.lead}</Lead>
          <Grid role='list'>
            {clientProjects.map((project, i) => (
              <li key={project.url}>
                <ProjectCard project={project} priority={i < 2} />
              </li>
            ))}
          </Grid>
        </Container>
      </Section>
      <Section aria-labelledby='experiments'>
        <Container>
          <H2 id='experiments'>{t.projects.experimentsTitle}</H2>
          <Lead>{t.projects.experimentsLead}</Lead>
          <List role='list'>
            {experiments.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => track('outbound_project_click', { project: p.name.en })}
                >
                  {p.name[lang]}
                  <span className='sr-only'> {t.common.newTab}</span>
                </a>
                <p>{p.summary[lang]}</p>
              </li>
            ))}
          </List>
        </Container>
      </Section>
    </>
  );
}

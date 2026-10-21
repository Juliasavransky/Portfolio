import styled from '@emotion/styled';
import Image from 'next/image';
import type { Project } from '@/data/projects';
import { useLang, useT } from '@/lib/i18n';
import { track } from '@/lib/gtag';

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  img {
    width: 100%;
    aspect-ratio: 1518 / 721;
    object-fit: cover;
    object-position: top;
    border-radius: var(--radius);
    border: 1px solid var(--divider);
    transition: border-color 160ms ease;
  }

  @media (hover: hover) {
    &:hover img {
      border-color: var(--accent);
    }
  }

  h2 {
    font-size: 1.25rem;
    line-height: 1.3;
  }

  /* Stretched link: the whole card is clickable, the title is the link text. */
  a {
    text-decoration: none;
  }
  a::after {
    content: '';
    position: absolute;
    inset: 0;
  }
  a:focus-visible {
    outline: none;
  }
  &:has(a:focus-visible) {
    outline: 2px solid var(--accent);
    outline-offset: 6px;
  }

  p {
    color: var(--text-muted);
  }
`;

const Visit = styled.span`
  color: var(--accent);
  font-weight: 700;
  font-size: 0.9375rem;
`;

type Props = { project: Project; priority?: boolean };

export default function ProjectCard({ project, priority }: Props) {
  const lang = useLang();
  const t = useT();
  const name = project.name[lang];
  return (
    <Card>
      {project.img && (
        <Image
          src={project.img}
          alt=''
          width={1518}
          height={721}
          sizes='(min-width: 1024px) 28rem, (min-width: 768px) 45vw, 92vw'
          priority={priority}
        />
      )}
      <h2>
        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          onClick={() => track('outbound_project_click', { project: project.name.en })}
        >
          {name}
          <span className='sr-only'> {t.common.newTab}</span>
        </a>
      </h2>
      <p>{project.summary[lang]}</p>
      <Visit aria-hidden='true'>
        {t.projects.visit} <span className='flip-rtl'>↗</span>
      </Visit>
    </Card>
  );
}

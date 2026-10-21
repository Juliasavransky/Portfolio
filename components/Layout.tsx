import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useT } from '@/lib/i18n';

const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-height: 100dvh;

  @media (min-width: 1024px) {
    grid-template-columns: 13rem minmax(0, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  main {
    flex: 1;
  }
`;

const SkipLink = styled.a`
  position: absolute;
  inset-inline-start: 1rem;
  top: -10rem;
  z-index: 20;
  padding: 0.75rem 1rem;
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;

  &:focus {
    top: 1rem;
  }
`;

export default function Layout({ children }: { children: ReactNode }) {
  const t = useT();
  return (
    <Shell>
      <SkipLink href='#main'>{t.nav.skip}</SkipLink>
      <Nav />
      <Column>
        <main id='main' tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </Column>
    </Shell>
  );
}

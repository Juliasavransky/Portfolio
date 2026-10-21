import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useLang, useT } from '@/lib/i18n';
import { track } from '@/lib/gtag';

const PAGES = ['home', 'about', 'projects', 'contact'] as const;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg);
  border-block-end: 1px solid var(--divider);

  @media (min-width: 1024px) {
    height: 100dvh;
    border-block-end: 0;
    border-inline-end: 1px solid var(--divider);
  }
`;

const Inner = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem var(--gutter);

  @media (min-width: 1024px) {
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    gap: 2.5rem;
    padding: 2rem 0;
  }
`;

const Brand = styled(Link)`
  font-weight: 900;
  font-size: 1.25rem;
  text-decoration: none;
  direction: ltr;

  span {
    color: var(--accent);
  }

  @media (min-width: 1024px) {
    text-align: center;
  }
`;

const MenuButton = styled.button`
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--input-border);
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Panel = styled.div`
  flex-basis: 100%;
  padding-block: 1rem 0.5rem;

  &[data-open='false'] {
    display: none;
  }

  @media (min-width: 1024px) {
    &[data-open] {
      display: block;
    }
    padding: 0;
  }
`;

const Links = styled.ul`
  display: grid;

  @media (min-width: 1024px) {
    border-block: 1px solid var(--divider);
  }
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.875rem 1.25rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 700;
  transition: color 160ms ease, background-color 160ms ease;

  @media (hover: hover) {
    &:hover {
      color: var(--text);
      background: var(--surface);
    }
  }

  &[aria-current='page'] {
    background: var(--accent);
    color: var(--on-accent);
  }

  @media (min-width: 1024px) {
    text-align: center;
  }
`;

const LangLink = styled(Link)`
  display: block;
  margin-block-start: 1rem;
  padding: 0.75rem 1.25rem;
  color: var(--text);
  font-weight: 700;

  @media (min-width: 1024px) {
    text-align: center;
  }
`;

export default function Nav() {
  const lang = useLang();
  const t = useT();
  const { asPath } = useRouter();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const path = asPath.split(/[?#]/)[0];
  const other = lang === 'he' ? 'en' : 'he';
  const otherPath = /^\/(he|en)(\/|$)/.test(path)
    ? path.replace(/^\/(he|en)/, `/${other}`)
    : `/${other}/home`;

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <Bar>
      <Inner aria-label={t.nav.label}>
        <Brand href={`/${lang}/home`} onClick={close}>
          <span>W</span>eb <span>W</span>itch
        </Brand>
        <MenuButton
          ref={buttonRef}
          type='button'
          aria-expanded={open}
          aria-controls='site-menu'
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.nav.close : t.nav.menu}
        </MenuButton>
        <Panel id='site-menu' ref={panelRef} data-open={open}>
          <Links role='list'>
            {PAGES.map((page) => {
              const href = `/${lang}/${page}`;
              return (
                <li key={page}>
                  <NavLink href={href} aria-current={path === href ? 'page' : undefined} onClick={close}>
                    {t.nav[page]}
                  </NavLink>
                </li>
              );
            })}
          </Links>
          <LangLink
            href={otherPath}
            hrefLang={other}
            lang={other}
            onClick={() => {
              close();
              track('language_switch', { to: other });
            }}
          >
            {t.nav.otherLang}
          </LangLink>
        </Panel>
      </Inner>
    </Bar>
  );
}

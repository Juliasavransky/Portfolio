import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Container, H1, Lead, Section } from '@/styles/ui';
import he from '@/i18n/he';
import en from '@/i18n/en';

// No lang in the URL here, so the page speaks both languages.
const Block = styled.div`
  & + & {
    margin-block-start: 3rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-block-start: 1.25rem;
  }

  a {
    color: var(--accent);
    font-weight: 700;
  }
`;

const pages = ['home', 'projects', 'contact'] as const;

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Web Witch</title>
        <meta name='robots' content='noindex' />
      </Head>
      <Section>
        <Container>
          {[
            { lang: 'he', dict: he },
            { lang: 'en', dict: en },
          ].map(({ lang, dict }) => (
            <Block key={lang} lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
              {lang === 'he' ? <H1>{dict.notFound.title}</H1> : <h2>{dict.notFound.title}</h2>}
              <Lead>{dict.notFound.body}</Lead>
              <ul role='list'>
                {pages.map((page) => (
                  <li key={page}>
                    <Link href={`/${lang}/${page}`}>{dict.nav[page]}</Link>
                  </li>
                ))}
              </ul>
            </Block>
          ))}
        </Container>
      </Section>
    </>
  );
}

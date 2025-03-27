import { ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import baseTheme from '../styles/theme';
import Reset from '../styles/reset';
import Layout from '@/components/layout';
import dynamic from 'next/dynamic';
import Seo from '@/components/Seo';
import type { AppProps } from 'next/app';
import '../styles/fonts/fonts.css';
import { roboto } from '../styles/fonts/font';

const SparkleTrail = dynamic(() => import('@/components/sparkleTrail'), {
  ssr: false,
});
const SideBar = dynamic(() => import('@/components/sideBar'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [lang, setLang] = useState<'he' | 'en'>('he');

  useEffect(() => {
    const urlLang = router.query.lang;
    if (urlLang === 'he' || urlLang === 'en') {
      setLang(urlLang);
      localStorage.setItem('preferredLang', urlLang);
    } else {
      const stored = localStorage.getItem('preferredLang');
      if (stored === 'he' || stored === 'en') {
        setLang(stored);
      }
    }
  }, [router.query.lang]);

  const fullTheme = {
    ...baseTheme,
    lang,
    fonts: baseTheme.fonts,
  };

  return (
    <>
      <ThemeProvider theme={fullTheme}>
        <Reset />
        <Seo />
        <SparkleTrail>
          <Layout>
            <div
              className={lang === 'he' ? '' : roboto.className}
              style={{
                fontFamily: lang === 'he' ? 'Alef MultiGndr' : undefined,
              }}
            >
              <SideBar lang={lang} initialDict={{}} />
              <Component {...pageProps} />
            </div>
          </Layout>
        </SparkleTrail>
      </ThemeProvider>
    </>
  );
}

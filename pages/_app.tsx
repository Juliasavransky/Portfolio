import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import SiteSchema from '@/components/SiteSchema';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { LangContext, type Lang } from '@/lib/i18n';
import { globalStyles } from '@/styles/global';
import { alef, roboto } from '@/styles/fonts';

export default function App({ Component, pageProps }: AppProps<{ lang?: Lang }>) {
  // The page's lang prop is the single source of truth (404 has none: Hebrew default).
  const lang = pageProps.lang ?? 'he';
  return (
    <LangContext.Provider value={lang}>
      <Global styles={globalStyles} />
      <SiteSchema />
      <GoogleAnalytics />
      <div className={`app ${alef.variable} ${roboto.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </LangContext.Provider>
  );
}

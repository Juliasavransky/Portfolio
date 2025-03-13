import Head from 'next/head';
<Head>
  {/* כותרת של הדף */}
  <title>Web Witch | Creative Design |בניית אתרים</title>

  {/* תיאור שיווקי */}
  <meta
    name='description'
    content=' אתר תדמית קסום לעסק שלך ✨ עיצוב עם נגיעה מכושפת, חוויית משתמש מהפנטת ותשומת לב לפרטים הקטנים.'
  />

  {/* מילות מפתח (optional) */}
  <meta
    name='keywords'
    content='עיצוב אתרים, אתרי תדמית, חוויית משתמש, אתרים קסומים,
     Web Witch, UI, UX, CSS, JavaScript, js, React-JS, SCSS, Hooks,Git,JSON, Zeplin, Next.js, WordPress, Gutenberg, Headless'
  />
  <meta
    name='author'
    content='Julia Savransky-Perl |Web-Witch| יוליה סברנסקי-פרל'
  />
  {/* תמיכה במובייל */}
  <meta name='viewport' content='width=device-width, initial-scale=1' />

  {/* מנועי חיפוש */}
  <meta name='robots' content='index, follow' />
  <meta name='googlebot' content='index, follow' />

  {/* הגדרת שפה */}
  <meta httpEquiv='Content-Language' content='he' />
  <meta name='language' content='Hebrew' />

  {/* פביקון */}
  <link rel='icon' href='/favicon.ico' />

  {/* canonical URL */}
  <link rel='canonical' href='https://webwitch.click/' />

  {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
  <meta property='og:title' content='Web Witch | Creative Design' />
  <meta
    property='og:description'
    content='עיצוב עם נגיעה מכושפת ✨ אתרי תדמית שמייצרים חוויה ייחודית ומושכת.'
  />
  <meta
    property='og:image'
    content='https://webwitch.click/images/og-image.png'
  />
  <meta property='og:url' content='https://webwitch.click/' />
  <meta property='og:type' content='website' />

  {/* Twitter Card (גם משפיע על וואטסאפ) */}
  <meta name='twitter:card' content='summary_large_image' />
  <meta name='twitter:title' content='Web Witch | Creative Design' />
  <meta
    name='twitter:description'
    content='עיצוב דיגיטלי מהפנט ✨ עם אנימציות, UX מוקפד ונראות שובה לב.'
  />
  <meta
    name='twitter:image'
    content='https://webwitch.click/images/og-image.png'
  />

  {/* תיוג לשפות RTL */}
  <meta name='language' content='HE' />
  <meta name='robots' content='index, follow' />
</Head>;

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
import { Roboto } from '@next/font/google';
import Reset from '../styles/reset';
import Layout from '@/components/layout';
import dynamic from 'next/dynamic';
const SparkleTrail = dynamic(() => import('@/components/sparkleTrail'), {
  ssr: false,
});
const SideBar = dynamic(() => import('@/components/sideBar'), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Reset />
        <SparkleTrail>
          <Layout>
            <div className={roboto.className}>
              <SideBar />
              <Component {...pageProps} />
            </div>
          </Layout>
        </SparkleTrail>
      </ThemeProvider>
    </>
  );
}

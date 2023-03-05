import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
import { Roboto } from '@next/font/google';
import SideBar from '@/components/sideBar';
import Reset from '../styles/reset';
import Layout from '@/components/layout';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Reset />
        <Layout>
          <div className={roboto.className}>
            <SideBar />
            <Component {...pageProps} />
          </div>
        </Layout>
      </ThemeProvider>
    </>
  );
}

import type { AppProps } from 'next/app';
import SideBar from '@/components/sideBar';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
import { Roboto, La_Belle_Aurore } from '@next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

const laBelle = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={roboto.className}>
        <ThemeProvider theme={theme}>
          <SideBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

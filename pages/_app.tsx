import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SideBar from '@/components/sideBar';
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    greyLight1: '#8d8d8d',
    greyLight2: '#7b7b7d',
    yellow: ' #ffcc00',
    purple: '#4b116f',
    greyDarkBG1: '#1d1d1d',
    greyDarkBG2: '#181818',
    white: '#fff',
  },
  fonts: {
    tagFont: 'La Belle Aurore',
    textFont: 'Roboto',
  },
  size: {
    fontHuge: '9.3rem',
    fontH2: '8rem',
    fontBig: '3.3rem',
    fontReg: '2.2rem',
    fontSmall: '1.8rem',
    fontTiny: '1.4rem',
  },
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SideBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

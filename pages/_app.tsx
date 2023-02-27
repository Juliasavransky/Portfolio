import type { AppProps } from 'next/app';
import SideBar from '@/components/sideBar';
import { ThemeProvider } from '@emotion/react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../styles/theme';

const globalStyles = styled('body')({
  margin: '0',
  padding: '0',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Global styles={globalStyles}> */}
      <ThemeProvider theme={theme}>
        <SideBar />
        <Component {...pageProps} />
      </ThemeProvider>
      {/* </Global> */}
    </>
  );
}

import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document';

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const lang = __NEXT_DATA__.query.lang === 'en' ? 'en' : 'he';
  return (
    <Html lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

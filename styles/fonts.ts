import localFont from 'next/font/local';
import { Roboto, Fredericka_the_Great, Barrio, Cherish } from 'next/font/google';

export const alef = localFont({
  src: './fonts/AlefMultiGndr-Regular.woff2',
  variable: '--font-he',
  display: 'swap',
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-en',
  display: 'swap',
});

// Logo letter-shuffle only. Not preloaded: they download on the first hover.
// No fallback metrics exist for it; not needed since swapped glyphs are overlaid (no layout shift).
const fredericka = Fredericka_the_Great({ subsets: ['latin'], weight: '400', preload: false, adjustFontFallback: false });
const barrio = Barrio({ subsets: ['latin'], weight: '400', preload: false });
const cherish = Cherish({ subsets: ['latin'], weight: '400', preload: false });

export const shuffleFonts = [fredericka.className, barrio.className, cherish.className];

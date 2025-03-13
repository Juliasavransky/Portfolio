import {
    Barrio,
    Cherish,
    Nosifer,
    Londrina_Sketch,
    Fredericka_the_Great,
    Roboto,
  } from '@next/font/google';
  
  const barrio = Barrio({ subsets: ['latin'], weight: '400' });
  const cherish = Cherish({ subsets: ['latin'], weight: '400' });
  const nosifer = Nosifer({ subsets: ['latin'], weight: '400' });
  const londrina = Londrina_Sketch({ subsets: ['latin'], weight: '400' });
  const fredericka = Fredericka_the_Great({ subsets: ['latin'], weight: '400' });
  const roboto = Roboto({ subsets: ['latin'], weight: ['900'] });
  
  export const fontClasses = [
    roboto.className,
    barrio.className,
    cherish.className,
    nosifer.className,
    londrina.className,
    fredericka.className,
  ];
  
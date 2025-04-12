import {
  Barrio,
  Cherish,
  Nosifer,
  Londrina_Sketch,
  Fredericka_the_Great,
  Roboto,
  La_Belle_Aurore,

  
  Amatic_SC,
  Solitreo,
  Rubik_Glitch,
  Rubik_Wet_Paint,
  Noto_Rashi_Hebrew,
  Fredoka,
  Rubik,
} from '@next/font/google';


export const fredoka = Fredoka({
  subsets: ['hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const notoRashiHebrew = Noto_Rashi_Hebrew({
  subsets: ['hebrew'],
  weight: [ '100','200','300','400','500','600','700','800','900' ],
  display: 'swap',
});

export const rubikWetPaint = Rubik_Wet_Paint({
  subsets: ['hebrew'],
  weight: [ '400' ],
  display: 'swap',
});
export const rubikGlitch = Rubik_Glitch({
  subsets: ['hebrew'],
  weight: [ '400' ],
  display: 'swap',
});
export const solitreo = Solitreo({
  subsets: ['hebrew'],
  weight: [ '400' ],
  display: 'swap',
});

export const amatic = Amatic_SC({
  subsets: ['hebrew'],
  weight: [ '400', '700' ],
  display: 'swap',
});

export const rubik = Rubik({
  subsets: ['hebrew'],
  weight: [ '400', '700', '900'],
  display: 'swap',
});



export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  display: 'swap',
});

export const laBelle = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
});

export const barrio = Barrio({
  subsets: ['latin'],
  weight: '400',
});

export const cherish = Cherish({
  subsets: ['latin'],
  weight: '400',
});
export const nosifer = Nosifer({
  subsets: ['latin'],
  weight: '400',
});
export const londrina = Londrina_Sketch({ 
  subsets: ['latin'],
   weight: '400'
 });
export const fredericka = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
});

export const englishfontClasses = [
  roboto.className,
  barrio.className,
  cherish.className,
  nosifer.className,
  londrina.className,
  fredericka.className,
];
export const hebrewFontClasses = [
  rubik.className,
  fredoka.className,
  notoRashiHebrew.className,
  rubikWetPaint.className,
  rubikGlitch.className,
  solitreo.className,
  amatic.className,
];


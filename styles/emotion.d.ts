// types/emotion.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    lang: 'he' | 'en';
    colors: {
      greyLight1: string;
      greyLight2: string;
      yellow: string;
      purple: string;
      greyDarkBG1: string;
      greyDarkBG2: string;
      white: string;
    };
    fonts: {
      he: {
        tagFont: string;
        textFont: string;
      };
      en: {
        tagFont: string;
        textFont: string;
      };
    };
    size: {
      fontHuge: string;
      fontH2: string;
      fontBig: string;
      fontReg: string;
      fontSmall: string;
      fontTiny: string;
    };
  }
}

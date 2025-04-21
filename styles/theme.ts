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
    en: {
      tagFont: string;
      textFont: string;
    };
    he: {
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



const theme: Theme = {
  lang: 'he',
  colors: {
    greyLight1: '#8d8d8d',
    greyLight2: '#7b7b7d',
    yellow: '#ffcc00',
    purple: '#4b116f',
    greyDarkBG1: '#1d1d1d',
    greyDarkBG2: '#181818',
    white: '#fff',
  },

  fonts: {
    he: {
      tagFont: 'La Belle Aurore',
      textFont: 'Alef MultiGndr', 
    },
    en: {
      tagFont: 'La Belle Aurore',
      textFont: 'Roboto',
    },
  },
  size: {
    fontHuge: 'clamp(9rem, 14vw, 16rem)',
    fontH2: 'clamp(2.7rem, 5.4vw, 7.2rem)',
    fontBig: 'clamp(1.8rem, 3.2vw, 2.7rem)',
    fontReg: 'clamp(1.6rem, 2vw, 2rem)',
    fontSmall: 'clamp(1.3rem, 1.5vw, 1.5rem)',
    fontTiny: 'clamp(0.9rem, 1.5vw, .9rem)',
  },
};

export default theme;



interface Theme {
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
    tagFont: string;
    textFont: string;
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
    fontSmall: '1.5rem',
    fontTiny: '.9rem',
  },
};
export default theme;

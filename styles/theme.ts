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
    greyLight1: "#8d8d8d",
    greyLight2: "#7b7b7d",
    yellow: " #ffcc00",
    purple: "#4b116f",
    greyDarkBG1: "#1d1d1d",
    greyDarkBG2: "#181818",
    white: "#fff",
  },
  fonts: {
    tagFont: "La Belle Aurore",
    textFont: "Roboto",
  },
  size: {
    fontHuge: "clamp(4rem, 7vw, 9.3rem)", // מתאים לכותרות ענקיות
    fontH2: "clamp(3rem, 6vw, 8rem)", // מתאים לכותרות משנה
    fontBig: "clamp(2rem, 4vw, 3.3rem)", // מתאים לכותרות קטנות יותר
    fontReg: "clamp(1.6rem, 2.5vw, 2.2rem)", // טקסט רגיל
    fontSmall: "clamp(1.3rem, 1.5vw, 1.5rem)", // טקסט קטן יותר
    fontTiny: "clamp(0.9rem, 1.5vw, .9rem)", // טקסט מינימלי (כמו הערות שוליים)
  },
};
export default theme;

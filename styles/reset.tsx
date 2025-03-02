import { Global, css } from "@emotion/react";

const Reset = () => (
  <Global
    styles={css`
      /* Box sizing rules */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      /* Remove default padding */
      ul[class],
      ol[class] {
        padding: 0;
      }

      /* Remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      ul[class],
      ol[class],
      li,
      figure,
      figcaption,
      blockquote,
      dl,
      dd {
        margin: 0;
        max-width: 100vw;
        /* overflow-wrap: break-word; */
      }

      /* Set core body defaults */
      body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.2;
        color: white;
        background-color: #1d1d1d;
        height: 100%;
        overflow-x: hidden;
        display: flex;
        font-weight: 100;
        font-size: clamp(1rem, 1.8vw, 1.2rem); /* גודל טקסט דינמי */
      }

      /* Remove list styles on ul, ol elements with a class attribute */
      ul[class],
      ol[class] {
        list-style: none;
      }

      /* A elements that don't have a class get default styles */
      a:not([class]) {
        text-decoration-skip-ink: auto;
        text-decoration: none;
        color: inherit;
      }

      /* Make images easier to work with */
      img {
        max-width: 100%;
        display: block;
      }

      /* Natural flow and rhythm in articles by default */
      article > * + * {
        margin-top: clamp(0.5rem, 1vw, 1em);
      }

      /* Inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      ::-webkit-scrollbar {
        width: clamp(0.8rem, 1vw, 1.3em);
      }
      ::-webkit-scrollbar-track {
        background: #ffcc00;
      }
      ::-webkit-scrollbar-thumb {
        background: #4b116f;
        border-radius: 100vw;
        border: clamp(0.2rem, 0.5vw, 0.25em) #ffcc00 solid;
      }
    `}
  />
);

export default Reset;

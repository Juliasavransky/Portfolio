import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    --bg: #1d1d1d;
    --surface: #262626;
    --text: #f2f2f2;
    --text-muted: #b3b3b3;
    --accent: #ffcc00;
    --on-accent: #1d1d1d;
    --brand-purple: #4b116f;
    --line: #a06cd5;
    --input-border: #8a8a8a;
    --divider: rgba(255, 255, 255, 0.14);
    --danger: #ff8a80;
    --whatsapp: #25d366;
    --radius: 4px;
    --maxw: 64rem;
    --gutter: clamp(1rem, 4vw, 3rem);
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    color-scheme: dark;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: Arial, sans-serif;
    font-size: 1.0625rem;
    line-height: 1.6;
  }

  /* Font variables live on the .app wrapper (next/font can't run in _document). */
  .app {
    font-family: var(--font-en), Arial, sans-serif;
  }

  html[lang='he'] .app {
    font-family: var(--font-he), Arial, sans-serif;
    line-height: 1.7;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input,
  button,
  textarea {
    font: inherit;
  }

  a {
    color: inherit;
  }

  ul[role='list'],
  ol[role='list'] {
    list-style: none;
    padding: 0;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--accent);
    color: var(--on-accent);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Arrows and other directional glyphs point the reading direction. */
  [dir='rtl'] .flip-rtl {
    display: inline-block;
    transform: scaleX(-1);
  }

  /* Keep colour and opacity feedback, drop movement. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-property: color, background-color, border-color, opacity !important;
      scroll-behavior: auto !important;
    }
  }
`;

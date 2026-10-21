import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { shuffleFonts } from '@/styles/fonts';

// Each word: the W, then its other letters with a running index (0..5) for the shuffle.
const WORDS = [
  { word: 'Web', letters: [...'eb'].map((ch, i) => ({ ch, index: i })) },
  { word: 'Witch', letters: [...'itch'].map((ch, i) => ({ ch, index: i + 2 })) },
];
const SWAPS = 8;
const STEP_MS = 140;

const Wordmark = styled.p`
  direction: ltr;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.25em;
  font-size: clamp(3.5rem, 12vw, 8rem);
  font-weight: 700;
  line-height: 1;
  cursor: default;
  user-select: none;

  html[lang='he'] & {
    justify-content: flex-end;
  }
`;

const W = styled.span`
  color: var(--brand-purple);
  text-shadow: 0.07em 0 var(--accent);
  font-weight: 900;
`;

// The base letter keeps its width; the swapped glyph is overlaid, so nothing shifts.
const Char = styled.span`
  position: relative;
  display: inline-block;

  &[data-swapped] > span:first-of-type {
    visibility: hidden;
  }

  & > span + span {
    position: absolute;
    inset: 0;
    text-align: center;
  }
`;

type Swap = { index: number; font: string } | null;

/** The one signature motion on the site: on hover, a few letters flicker through display fonts. */
export default function Logo() {
  const [swap, setSwap] = useState<Swap>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(timer.current), []);

  const play = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    window.clearInterval(timer.current);
    let step = 0;
    timer.current = window.setInterval(() => {
      if (step++ >= SWAPS) {
        window.clearInterval(timer.current);
        setSwap(null);
        return;
      }
      setSwap({
        index: Math.floor(Math.random() * 6), // the 6 non-W letters: e b i t c h
        font: shuffleFonts[Math.floor(Math.random() * shuffleFonts.length)],
      });
    }, STEP_MS);
  };

  return (
    <Wordmark onMouseEnter={play}>
      <span className='sr-only'>Web Witch</span>
      {WORDS.map(({ word, letters }) => (
        <span key={word} aria-hidden='true'>
          <W>W</W>
          {letters.map(({ ch, index }) => {
            const font = swap?.index === index ? swap.font : null;
            return (
              <Char key={index} data-swapped={font ? '' : undefined}>
                <span>{ch}</span>
                {font && <span className={font}>{ch}</span>}
              </Char>
            );
          })}
        </span>
      ))}
    </Wordmark>
  );
}

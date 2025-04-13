import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { englishfontClasses, hebrewFontClasses } from '../styles/fonts/font';
import { useTheme } from '@emotion/react';
import { Theme } from '../styles/theme';

interface SplitTextProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  baseIndex: number;
  animateIndex: number | null;
  animateFont: string | null;
  theme: Theme;
  lang?: 'en' | 'he'; // Define Lang as a union type for English and Hebrew
  initialDict: Record<string, string>;
}

function SplitText({
  text,
  style,
  baseIndex,
  animateIndex,
  animateFont,
}: SplitTextProps) {
  const theme = useTheme();
  const fontSet = theme.lang === 'he' ? hebrewFontClasses : englishfontClasses;

  const [wordWidths, setWordWidths] = useState<number[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const widths = wordRefs.current.map((el) =>
      el ? el.getBoundingClientRect().width : 0
    );
    setWordWidths(widths);
  }, [text, animateFont]);

  const [charWidths, setCharWidths] = useState<number[]>([]);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]); // שמירה על רפרנסים

  const allChars = text.replaceAll('_', '').split('');
  const charCount = allChars.length;
  useEffect(() => {
    // מדידת הרוחב של כל אות
    const widths = charRefs.current.map(
      (el) => (el ? el.getBoundingClientRect().width : 0.65 * 16) // fallback: 0.65em ב־px
    );
    setCharWidths(widths);
  }, [text, animateFont]); // נריץ מחדש רק אם הטקסט או הפונט משתנים
  let globalIndex = baseIndex;

  return (
    <motion.div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.3ch',
        textAlign: 'center',
      }}
    >
      {text.split('_').map((word, wordIdx) => {
        const wordWidth = wordWidths[wordIdx] || 'auto';
        return (
          <span
            key={wordIdx}
            ref={(el) => (wordRefs.current[wordIdx] = el)}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              direction: 'inherit',
              width: wordWidth,
              transition: 'width 0.3s ease-in-out',
              marginInlineEnd: '0.5ch', // << הוספת רווח בין מילים
            }}
          >
            {word.split('').map((char, i) => {
              const isActive = globalIndex === animateIndex;
              const fontClass = isActive
                ? animateFont || fontSet[0]
                : fontSet[0];

              const width = charWidths[globalIndex] || 'auto';

              const span = (
                <motion.span
                  key={i}
                  className={fontClass}
                  ref={(el) => (charRefs.current[globalIndex] = el)}
                  style={{
                    ...style,
                    transition: 'all 0.3s ease-in-out',
                    color: char === '_' ? 'transparent' : 'inherit',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                    height: '1em', // גובה אחיד לכל אות
                    lineHeight: '1',
                    verticalAlign: 'middle',
                  }}
                >
                  {char}
                </motion.span>
              );

              globalIndex++;
              return span;
            })}
          </span>
        );
      })}
    </motion.div>
  );
}

export default SplitText;

import React from 'react';
import { motion } from 'framer-motion';
import { fontClasses, hebrewFontClasses } from '../styles/fonts/font';
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

const splitTextMotions = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      mass: 5,
      damping: 10,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const spanMotions = {
  hidden: { opacity: 0, scale: 0.1 },
  visible: { opacity: 1, scale: 1 },
};

function SplitText({
  text,
  style,
  className,
  baseIndex,
  animateIndex,
  animateFont,
}: SplitTextProps) {
  const theme = useTheme();
  let globalIndex = baseIndex;
  const fontSet = theme.lang === 'he' ? hebrewFontClasses : fontClasses;

  return (
    <motion.div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.3ch',
        textAlign: 'center',
      }}
    >
      {text.split('_').map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            direction: 'inherit',
          }}
        >
          {word.split('').map((char, i) => {
            const isActive = globalIndex === animateIndex;
            const fontClass = isActive 
            ? animateFont || fontSet[0] 
            : fontSet[0];

            const span = (
              <motion.span
                key={i}
                className={fontClass}
                style={{
                  ...style,
                  transition: 'all 0.3s ease-in-out',
                  color: char === '_' ? 'transparent' : 'inherit',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // width: '0.8em',       // רוחב אחיד לכל אות
                  height: '1em',      // גובה אחיד לכל אות
                  lineHeight: '1',
                  overflow: 'hidden',
                  verticalAlign: 'middle',
                }}
              >
                {char}
              </motion.span>
            );

            globalIndex++;
            return span;
          })}

          {/* רווח אחרי כל מילה */}
          <span style={{ display: 'inline-block', width: '1ch' }} />
        </span>
      ))}
    </motion.div>
  );
}

export default SplitText;

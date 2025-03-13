import React from 'react';
import { motion } from 'framer-motion';
import { fontClasses } from '../utils/fontList';
interface SplitTextProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  baseIndex: number;
  animateIndex: number | null;
  animateFont: string | null;
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
  return (
    <motion.div style={{ display: 'flex', gap: '5px', flexWrap: 'nowrap' }}>
      {text.split('').map((char, i) => {
        const globalIndex = baseIndex + i;
        const isActive = globalIndex === animateIndex;
        const fontClass = isActive
          ? animateFont || fontClasses[0]
          : fontClasses[0];

        return (
          <motion.span
            key={i}
            className={fontClass}
            style={{
              ...style,
              transition: 'all 0.3s ease-in-out',
              color: char === '_' ? 'transparent' : 'inherit',
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export default SplitText;

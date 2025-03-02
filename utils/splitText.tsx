import React, { CSSProperties } from 'react';
import { color, motion } from 'framer-motion';
import {
  Barrio,
  Cherish,
  Nosifer,
  Londrina_Sketch,
  Fredericka_the_Great,
  Roboto,
} from '@next/font/google';

interface SplitTextProps {
  text: string;
  style?: CSSProperties;
  className?: string;
}

const barrio = Barrio({
  subsets: ['latin'],
  weight: '400',
});

const cherish = Cherish({
  subsets: ['latin'],
  weight: '400',
});

const nosifer = Nosifer({
  subsets: ['latin'],
  weight: '400',
});
const londrina_Sketch = Londrina_Sketch({
  subsets: ['latin'],
  weight: '400',
});

const fredericka_The_Great = Fredericka_the_Great({
  subsets: ['latin'],
  weight: '400',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['900'],
});

const myFonts = [
  roboto.className,
  barrio.className,
  cherish.className,
  nosifer.className,
  londrina_Sketch.className,
  fredericka_The_Great.className,
];

const splitTextMotions = {
  hidden: {
    x: '-100vw',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    mass: 5,
    damping: 10,
    when: 'beforeChildren',
    staggerChildren: 0.7,
  },
};

const spanMotions = {
  hidden: {
    opacity: 0,
    scale: 0.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

function SplitText({ text, style, className }: SplitTextProps) {
  return (
    <motion.div
      variants={splitTextMotions}
      initial='hidden'
      animate='visible'
      style={{ display: 'flex', gap: '5px', flexWrap: 'nowrap' }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={spanMotions}
          whileHover={{
            transition: {
              type: 'spring',
              stiffness: 100,
              damping: 20,
              duration: 1,
            },
          }}
          className={`${myFonts[0]}`} // הפונט תמיד חוזר לברירת המחדל
          onMouseEnter={(e) => {
            e.currentTarget.className =
              myFonts[Math.floor(Math.random() * myFonts.length)];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.className = myFonts[0]; // חזרה לפונט המקורי אחרי hover
          }}
          style={{
            ...style,
            color: char === '_' ? 'transparent' : 'inherit',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default SplitText;

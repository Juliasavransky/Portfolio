import React, { CSSProperties, ReactNode, useState } from 'react';
import { La_Belle_Aurore } from '@next/font/google';
import styled from '@emotion/styled';
import animationsList from './animationList';
import { motion } from 'framer-motion';

type AnimationType = keyof typeof animationsList;

const getRandomAnimation = (): AnimationType => {
  const keys = Object.keys(animationsList) as AnimationType[];
  return keys[Math.floor(Math.random() * keys.length)];
};

const laBelle = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
});

type DecoTagProps = {
  text?: string;
  style?: CSSProperties;
  className?: string;
  isSpecial: boolean;
};

const Tag = styled.span<{ isSpecial?: boolean }>`
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);
  margin: 0 0.5rem;
  line-height: 1;
  color: #7b7b7d;
  cursor: grab;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  @media (max-width: 310px) {
    font-size: 2rem;
  }
`;

const DecoTag = ({ text, style, className, isSpecial }: DecoTagProps) => {
  const [animation, setAnimation] = useState<AnimationType>(
    getRandomAnimation()
  );

  const handleInteraction = () => {
    setAnimation(getRandomAnimation());
  };

  return (
    <motion.div
      variants={animationsList[animation]}
      initial='hidden'
      animate='visible'
      whileHover='visible'
      onClick={handleInteraction} // מוסיף תמיכה במובייל
      onHoverStart={() => setAnimation(getRandomAnimation())}
      onHoverEnd={() => setAnimation((initial) => initial)}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Tag
        style={{ color: '#7b7b7d', ...style }}
        className={`${laBelle.className} ${
          isSpecial ? 'special' : ''
        } ${className}`}
      >
        {text}
      </Tag>
    </motion.div>
  );
};

export default DecoTag;

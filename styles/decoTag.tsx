import React, { CSSProperties, useState,useEffect } from 'react';
import { laBelle } from '../styles/fonts/font';
import styled from '@emotion/styled';
import animationsList from './animationList';
import { motion } from 'framer-motion';
import { TooltipBubble, TooltipWrapper } from '../components/toolTip';
type AnimationType = keyof typeof animationsList;

const getRandomAnimation = (): AnimationType => {
  const keys = Object.keys(animationsList) as AnimationType[];
  return keys[Math.floor(Math.random() * keys.length)];
};



type DecoTagProps = {
  text?: string;
  style?: CSSProperties;
  className?: string;
  isPrimaryTag: boolean;
  children?: React.ReactNode;
};

const Tag = styled.span<{ isPrimaryTag?: boolean }>`
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);
  margin: 0 0.5rem;
  line-height: 1;
  color: #7b7b7d;
  cursor: grab;


  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }

  @media (max-width: 310px) {
    font-size: 2rem;
  }
`;
const DecoTag = ({ text, style, className, isPrimaryTag, children }: DecoTagProps) => {

  const [animation, setAnimation] = useState<AnimationType>(
    getRandomAnimation()
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [interacted, setInteracted] = useState(false);


  // Tooltip רק אם זה אלמנט מרכזי, ולא הייתה אינטראקציה
  useEffect(() => {
    if (!isPrimaryTag) return;
  
    // בדיקה אם המשתמש כבר ראה את הטולטיפ
    const hasSeen = localStorage.getItem('hasSeenDecoTooltip') === 'true';
  
    if (hasSeen || interacted) return;
  
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000); // אחרי 3 שניות
  
    return () => clearTimeout(timer);
  }, [isPrimaryTag, interacted]);
  

  const handleInteraction = () => {
    setInteracted(true);
    setShowTooltip(false);
    localStorage.setItem('hasSeenDecoTooltip', 'true');
    setAnimation(getRandomAnimation());
  };
  
  return (
    <motion.div
      variants={animationsList[animation]}
      initial='hidden'
      animate='visible'
      whileHover='visible'
      onClick={handleInteraction} // מוסיף תמיכה במובייל
      onHoverStart={handleInteraction}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Tag
        style={{ color: '#7b7b7d', ...style }}
        className={`${laBelle.className} ${className}`}
      >
        {text}
        {showTooltip && isPrimaryTag && (
        <TooltipWrapper>
        {children}
        <TooltipBubble className={showTooltip && !interacted ? 'show' : ''}>
        👆 נסי לגעת בנו ✨
        </TooltipBubble>
      </TooltipWrapper>
        )}
      </Tag>
    </motion.div>
  );
};

export default DecoTag;

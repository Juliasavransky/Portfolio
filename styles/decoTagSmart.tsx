import { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { laBelle } from '../styles/fonts/font';
import animationsList from './animationList';
import { TooltipBubble, TooltipWrapper } from '../components/toolTip';

type AnimationType = keyof typeof animationsList;

interface DecoTagSmartProps {
  text?: string;
  style?: CSSProperties;
  className?: string;
  isPrimaryTag: boolean;
  children?: ReactNode;

}

const Tag = styled.span`
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);
  color: #7b7b7d;
  cursor: grab;
/* background:red; */
display:content;
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 3rem);
  }

  @media (max-width: 310px) {
    font-size: 2rem;
  }
`;

const DecoTagSmart = ({
  text,
  style,
  className = '',
  isPrimaryTag,
  children,
}: DecoTagSmartProps) => {
  const [interacted, setInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const animation = useMemo(() => {
    return animationsList[
      Object.keys(animationsList)[
        Math.floor(Math.random() * Object.keys(animationsList).length)
      ] as AnimationType
    ];
  }, [animationKey]);

  useEffect(() => {
    if (
      !isPrimaryTag ||
      interacted ||
      localStorage.getItem('hasSeenDecoTooltip') === 'true'
    )
      return;
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, [isPrimaryTag, interacted]);

  const handleClick = () => {
    setInteracted(true);
    setShowTooltip(false);
    localStorage.setItem('hasSeenDecoTooltip', 'true');
    setAnimationKey((prev) => prev + 1); // force re-animation
  };

  return (
    <motion.div
      key={animationKey}
      variants={animation}
      initial='hidden'
      animate='visible'
      onClick={handleClick}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      
    >
      <Tag style={style} className={`${laBelle.className} ${className}`}>
        {text}
        {showTooltip && isPrimaryTag && (
          <TooltipWrapper>
            {children}
            <TooltipBubble className='show'>
              👆 נסי ללחוץ אלינו ✨
            </TooltipBubble>
          </TooltipWrapper>
        )}
      </Tag>
    </motion.div>
  );
};

export default DecoTagSmart;

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: default;
`;

export const TooltipBubble = styled.div`
  position: absolute;
  top: -120%; /* מעל האלמנט */
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #7b7b7d;
  color: #ffcc00;
  padding: 8px 16px;
  border-radius: 9px;
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
  width: clamp(7.5rem, 24vw, 10rem);

  &::after {
    position: absolute;
    bottom: -20px;
    left: 30%;
    transform: translateX(-50%);
  }

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0px);
    animation: float 1s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% {
      transform: translateX(-50%) translateY(8px);
    }
    100% {
      transform: translateX(-50%) translateY(-2px);
    }
  }
`;

type TooltipTopProps = {
  children: React.ReactNode;
  text: string;
};

const TooltipTop = ({ children, text }: TooltipTopProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenTopTooltip') === 'true';
    if (seen) return;

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hide = () => {
      setShowTooltip(false);
      setInteracted(true);
      localStorage.setItem('hasSeenTopTooltip', 'true');
      window.removeEventListener('click', hide);
      window.removeEventListener('touchstart', hide);
    };

    window.addEventListener('click', hide);
    window.addEventListener('touchstart', hide);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', hide);
      window.removeEventListener('touchstart', hide);
    };
  }, []);

  return (
    <TooltipWrapper>
      {children}
      <TooltipBubble className={showTooltip && !interacted ? 'show' : ''}>
        {text}
      </TooltipBubble>
    </TooltipWrapper>
  );
};

export default TooltipTop;

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
  transform: translateX(-50%) translateY(0.625rem);
  background: #1d1d1d;
  color: #ffcc00;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
  width: clamp(7.5rem, 24vw, 10rem);

  &::after {
    position: absolute;
    bottom: -1.25rem;
    left: 30%;
    transform: translateX(-50%);
  }

  &.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(-50%) translateY(0);
    animation: float 1s ease-in-out infinite alternate;
  }

  @keyframes float {
    0% {
      transform: translateX(-50%) translateY(0.5rem);
    }
    100% {
      transform: translateX(-50%) translateY(-0.125rem);
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

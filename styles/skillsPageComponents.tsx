import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: clamp(2rem, 22vw, 24rem);
  width: clamp(80%, 80%, 100%);
  margin: auto;
  flex-wrap: wrap;
  text-align: center;

  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
  }
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 38vw;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    min-width: 100vw;
  }
`;
export const SkillsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 900;
  font-size: clamp(2.5rem, 4vw, 5rem);
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    flex-direction: column;
    justify-content: center;
    line-height: 1.1;
    font-size: clamp(5vw, 6vw, 8vw);
    margin-top: 0;
  }
`;

export const SkillsParagraphContainer = styled.div`
  width: clamp(60%, 75%, 90%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: clamp(1.5rem, 2vh, 2rem);

  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: row;
  }
`;
export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`;
export const Arrow = styled.div`
  font-size: ${({ theme }) => theme.size.fontBig};
  animation: ${bounce} 1s infinite ease-in-out;
`;
export const BouncingArrow = () => {
  return <Arrow>⭭</Arrow>; 
};


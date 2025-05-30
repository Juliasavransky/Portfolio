import styled from '@emotion/styled';
import DecoTagSmart from './decoTagSmart';
import { motion } from 'framer-motion';

export const MotionMainWrapper = motion(styled('div')<{ isReady: boolean }>`
  &.not-ready * {
    transition: none !important;
    animation: none !important;
    opacity: 0;
  }

  &.ready * {
    opacity: 1;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
`);

export const MainPageContainer = styled.div`
  display: flex;
  height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90vw;
  position: absolute;
  left: clamp(2rem, 15vw, 12rem);

  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
  }
  @media (max-width: 428px) {
    left: 0;
    width: 100vw;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: clamp(2.5rem, 4vw, 5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 90%;
  letter-spacing: clamp(1px, 0.3vw, 3px);

  @media (max-width: 768px) {
    width: 95vw;
    max-width: 95vw;
    flex-direction: column;
    font-size: clamp(5vw, 6vw, 8vw);
    margin-top: 5rem;
  }

  @media (max-width: 428px) {
    font-size: clamp(6vw, 9vw, 10vw);
    margin-top: 0;
  }

  @media (max-width: 320px) {
    margin-top: 3rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  position: relative;

  @media (max-width: 400px) {
    font-size:clamp(2rem, 4vw, 5rem) !important;
  }
`;

export const Spacer = styled.span`
  margin-left: clamp(0.5rem, 1.5vw, 2rem);
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.size.fontReg};
  font-weight: 400;
  margin: 1rem auto;
  text-align: center;
  letter-spacing: clamp(1px, 0.3vw, 2px);
  word-spacing: 0.1rem;
  line-height: 1.4;
  text-wrap: balance;
  position: relative;
`;

export const TheW = styled.span`
  font-size: ${({ theme }) => theme.size.fontHuge};
  line-height: clamp(1.8rem, 4vw, 5.9rem);
  text-shadow: 2.2vmin 0 ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.purple};
  padding-right: 0.8vw;
  font-weight: 900;
`;

export const DecoTagWrapper = styled(DecoTagSmart)`
  @media (max-width: 768px) {
    display: none;
  }
`;

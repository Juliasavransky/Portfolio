import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import theme from './../styles/theme';

const Btn = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 36vw;
  height: 20vh;

  @media (max-width: 1220px) {
    flex-direction: column;
    width: 70vw;
    height: 22vh;
  }
  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const BtnMainPage = styled.div<{ theme: Theme }>`
  display: flex;
  width: 100%;
  height: 5rem;
  perspective: 1000px;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  text-align: center;
  margin: 0 auto;
  position: relative;

  & > a {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    letter-spacing: 5px;
    transform-style: preserve-3d;
    transform: translateZ(-20px);
    transition: transform 0.3s;
    font-weight: 100;
    position: relative;

    &:hover {
      transform: translateZ(-2rem) rotateX(-90deg);
    }

    /* @media (hover:hover) and (pointer:fine) {
      & > a:hover {
        transform: translateZ(-2rem) rotateX(-90deg);
      }
    } */

    &::before,
    &::after {
      position: absolute;
      height: 5rem;
      width: clamp(16rem, 25vw, 35rem);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      border: 5px solid ${theme.colors.purple};

      @media (max-width: 1220px) {
        width: 64vw;
        margin: 0 clamp(2rem, 0.1875vw, 4rem);
      }
      @media (max-width: 768px) {
        width: 80vw;
        margin: 0 clamp(2rem, 0.1875vw, 4rem);
      }
      @media (max-width: 320px) {
        width: 80vw;
        margin: 0 clamp(1.4rem, 0.2vw, 2rem);
      }
    }

    &::before {
      content: 'Wanna See More Magic';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateY(0deg) translateZ(2rem);
    }

    &::after {
      content: 'Explore Design & Innovation';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateX(90deg) translateZ(2rem);
    }
  }
`;

export { Btn, BtnMainPage };
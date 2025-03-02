import React from 'react';
import styled from '@emotion/styled';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import Link from 'next/link';
import {
  MainPageContainer,
  HeaderContainer,
  Header,
  Spacer,
} from '../styles/layoutComponents';
import { Theme } from '@emotion/react';
import theme from './../styles/theme';
import { motion } from 'framer-motion';

type HomePageProps = {
  theme: Theme;
};

const TheJ = styled.span<{ theme: Theme }>`
  line-height: clamp(1.8rem, 4vw, 5.9rem);
  text-shadow: 1vmin 0 ${theme.colors.yellow};
  color: ${theme.colors.purple};
  padding-right: 0.5vw;
`;

const Btn = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  width: 100vw;

  @media (max-width: 1510px) {
    margin: 0 auto;
    width: 65vw;
    min-width: 65vw;
  }
  @media (max-width: 1220px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 768px) {
    align-content: center;
    margin-top: 4vw;
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

  @media (max-width: 1510px) {
  }

  & > a {
    font-size: clamp(1.5rem, 3.5vw, 2rem);
    letter-spacing: 5px;
    transform-style: preserve-3d;
    transform: translateZ(-20px);
    transition: transform 0.3s;
    font-weight: 100;

    &:hover {
      transform: translateZ(-2rem) rotateX(-90deg);
    }

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
      content: 'WANNA C MORE';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateY(0deg) translateZ(2rem);
    }

    &::after {
      content: 'CHECK MY PROJECTS';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateX(90deg) translateZ(2rem);
    }
  }
`;

const DecoTagWrapper = styled(DecoTag)`
  @media (max-width: 768px) {
    display: none;
  }
`;

function HomePage({ theme }: HomePageProps) {
  const AnimatedSplitText = motion(SplitText);
  return (
    <MainPageContainer>
      <HeaderContainer>
        <DecoTagWrapper
          text={'</html>'}
          isSpecial={false}
          style={{
            position: 'relative',
            right: 'clamp(35rem, calc(30rem + (100vw - 340px) ), 45rem)',
            top: '-2rem',
          }}
        />
      <DecoTagWrapper
        text={'</body>'}
        isSpecial={false}
        style={{
          position: 'relative',
          right: 'clamp(25rem, calc(30rem + (100vw - 340px) ), 35rem)',
          top: '-2rem',
        }}
      />
        <Header>
          <DecoTag
            text={'<h1>'}
            style={{
              position: 'relative',
              left: 'clamp(-4rem, calc(-10rem + (100vw - 320px) * 0.01), -15rem)',
              top: '-1rem',
            }}
            className='special'
            isSpecial={true}
          />
          <span
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <TheJ
              theme={theme}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            >
              W
            </TheJ>
            <AnimatedSplitText
              text='eb '
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            />
          </span>

          <Spacer />
          <span
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <TheJ
              theme={theme}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            >
              W
            </TheJ>
            <AnimatedSplitText
              text='itch'
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            />
          </span>

          <Spacer />
        </Header>

        <Header>
          <AnimatedSplitText
            text='Creative '
            style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
          />
          <Spacer />
          <AnimatedSplitText
            text='Design'
            style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
          />
          <DecoTag text={'</h1>'} isSpecial={false} 
             style={{
              position: 'relative',
              right: 'clamp(-4.5rem, calc(-8rem + (100vw - 320px) * 0.05), 1rem)', 
              bottom: 'clamp(-2rem, -1rem, 2rem)',  
            }}
          />
        </Header>
      </HeaderContainer>

      <Btn>
        <DecoTag
          text={'<button>'}
          style={{ marginBottom: '1rem' }}
          isSpecial={false}
        />
        <BtnMainPage theme={theme}>
          <Link href='/projects'></Link>
        </BtnMainPage>
        <DecoTag
          text={'</button>'}
          style={{ marginTop: '1.5rem' }}
          isSpecial={false}
        />
      </Btn>
    </MainPageContainer>
  );
}

export default HomePage;

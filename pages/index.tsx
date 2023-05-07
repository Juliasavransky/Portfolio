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
  font-size: calc(6 * 1.45rem);
  line-height: 95px;
  text-shadow: 1vmin 0 ${theme.colors.yellow};
  color: ${theme.colors.purple};
`;

const Btn = styled.div`
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnMainPage = styled.div<{ theme: Theme }>`
  display: inline-flex;
  width: 30rem;
  height: 5rem;
  margin: 0 1.5rem;
  perspective: 1000px;

  & > a {
    font-size: 2rem;
    letter-spacing: 5px;
    transform-style: preserve-3d;
    transform: translateZ(-25px);
    transition: transform 0.3s;
    font-weight: 100;

    &:hover {
      transform: translateZ(-2.5rem) rotateX(-90deg);
    }
    &::before,
    &::after {
      position: absolute;
      height: 5rem;
      width: 30rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 5px;
      border: 5px solid ${theme.colors.purple};
    }
    &::before {
      content: 'WANNA C MORE';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateY(0deg) translateZ(2.5rem);
    }
    &::after {
      content: 'CHECK MY PROJECTS';
      color: ${theme.colors.yellow};
      background: ${theme.colors.greyDarkBG1};
      transform: rotateX(90deg) translateZ(2.5rem);
    }
  }
`;
function HomePage({ theme }: HomePageProps) {
  const AnimatedSplitText = motion(SplitText);

  return (
    <MainPageContainer>
      <DecoTag text={'<html>'} />
      <span style={{ marginLeft: '4rem' }}>
        <DecoTag text={'<body>'} />
      </span>
      <HeaderContainer>
        <span>
          <DecoTag text={'<h1>'} />
        </span>

        <Header>
          <SplitText style={{ fontSize: '6rem' }} text='Hi,' />
        </Header>
        <Header>
          <SplitText style={{ fontSize: '6rem' }} text="I'm " />
          <Spacer>
            <TheJ theme={theme}>J</TheJ>
          </Spacer>
          <SplitText style={{ fontSize: '6rem' }} text='ulia,' />
        </Header>
        <Header>
          <SplitText style={{ fontSize: '6rem' }} text='Frontend ' />
          <Spacer />
          <SplitText style={{ fontSize: '6rem' }} text='Developer' />
        </Header>

        <span>
          <DecoTag text={'</h1>'} />
        </span>
      </HeaderContainer>

      <Btn>
        <span>
          <DecoTag text={'<button>'} />
        </span>
        <BtnMainPage theme={theme}>
          <Link style={{ textDecoration: 'none' }} href='/projects'></Link>
        </BtnMainPage>
        <span>
          <DecoTag text={'</button>'} />
        </span>
      </Btn>
    </MainPageContainer>
  );
}

export default HomePage;

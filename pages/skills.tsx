import TextCloud from '@/components/textCloud';
import DecoTag from '@/styles/decoTag';
import { Header, Paragraph } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '@emotion/react';
import { useSplitTextAnimation } from '../hooks/useSplitTextAnimation';
import ProfileImg from '../components/profileImg';

type SkillsProps = {
  theme: Theme;
};
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
    margin-top: clamp(60px, 8vh, 100px);
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    width: 100%;
    min-width: 100%;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    margin-top: clamp(3rem, 4vh, 5rem);
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
  margin-top: 3rem;

  @media (max-width: 1220px) {
    width: 45vw;
    min-width: 45vw;
    margin-left: 0;
  }

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

function Skills({ theme }: SkillsProps) {
  const texts = ['Made_to_Shine'];
  const { animateIndex, animateFont } = useSplitTextAnimation(texts);
  return (
    <Row>
      <Column>
        <SkillsHeaderContainer>
          <DecoTag
            text={'<h2> '}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0',
            }}
          />
          <Header>
            <SplitText
              style={{ fontSize: 'clamp(2.368rem, 5.036vw, 4.536rem)' }}
              text='Made_to_Shine'
              baseIndex={0}
              animateIndex={animateIndex}
              animateFont={animateFont}
            />
          </Header>
          <DecoTag
            text={' </h2>'}
            isPrimaryTag={true}
            style={{
              position: 'relative',
              right:
                'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0',
            }}
          />
        </SkillsHeaderContainer>
        <ProfileImg />
        <br />
        <SkillsParagraphContainer>
          <Paragraph theme={theme}>
            <DecoTag
              text={'<p>'}
              isPrimaryTag={false}
              style={{
                position: 'relative',
                left: 'clamp(-8.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
                top: '0.5rem',
              }}
            />
            <br />
            Hi, I'm Julia, an Industrial <span style={{color:'#ffcc00'}}>Designer
             and Front-End Developer</span> who
            thrives on challenges and innovation. Technology excites me, but
            what truly drives me is creating <span style={{color:'#ffcc00'}}>unique and engaging user
            experiences</span> — making websites with Personality and Purpose. More
            dynamic, visually exciting, and less uniform space. I believe great
            design should <span style={{color:'#ffcc00'}}>captivate, surprise, and break the mold</span>. With a sharp
            eye for aesthetics and a love for the unexpected, <span style={{color:'#ffcc00'}}>I craft digital
            experiences that are anything but ordinary</span>. I design and build
            websites, landing pages, and other digital products — from concept
            to code — blending creativity and functionality into every pixel.
            <br />
            <DecoTag
              text={'</p>'}
              isPrimaryTag={false}
              style={{
                position: 'relative',
                left: 'clamp(8rem, calc(10rem + (100vw - 320px) * -0.014), 8rem)',
                top: '0.5rem',
              }}
            />
          </Paragraph>
        </SkillsParagraphContainer>
      </Column>
      <Column>
        <TextCloud />
      </Column>
    </Row>
  );
}

export default Skills;

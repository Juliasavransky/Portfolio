import TextCloud from '@/components/textCloud';
import DecoTag from '@/styles/decoTag';
import { Header, Paragraph } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '@emotion/react';

type SkillsProps = {
  theme: Theme;
};
export const Row = styled.div`
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: clamp(2rem, 22vw, 24rem);
  width: clamp(80%, 80%, 100%);
  margin: auto 0;

  @media (max-width: 1510px) {
    left: clamp(4rem, 14vw, 11rem);
  }

  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
    margin-top: clamp(60px, 8vh, 100px);
    flex-direction: row;
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
  @media (max-width: 320px) {
  }
`;

export const Column = styled.div`
  max-height: auto;
  height: auto;
  width: 38vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1510px) {
  }
  @media (max-width: 1220px) {
    max-width: 48vw;
  }
  @media (max-width: 768px) {
    width: 100vw;
    min-width: 100vw;
    align-items: center;
    text-aline: center;
    margin: 0 auto;
  }
`;
export const SkillsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 900;
  letter-spacing: clamp(0.5px, 0.2vw, 2px);
  font-size: clamp(2.5rem, 4vw, 5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 100%;
  word-wrap: break-word;
  margin-top: 3rem;
  letter-spacing: clamp(1px, 0.3vw, 3px);
  
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
    font-size: clamp(6vw, 7vw, 10vw);
    letter-spacing: clamp(0.5px, 0.2vw, 2px);
    line-height: 1.1;
    font-size: clamp(5vw, 6vw, 8vw);
    margin-top: 0;
  }
  
  @media (max-width: 428px) {
    font-size: clamp(8vw, 9vw, 12vw);
    letter-spacing: clamp(0px, 0.1vw, 1px);
    font-size: clamp(6vw, 7vw, 9vw);
  }
  
  @media (max-width: 320px) {
    flex-direction: column;
    font-size: clamp(9vw, 10vw, 13vw);
  }
  `;

export const SkillsParagraphContainer = styled.div`
  width: clamp(60%, 75%, 90%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: clamp(1.5rem, 2vh, 2rem);
  font-weight: 100;
  
  @media (max-width: 1510px) {
 
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-width: 100vw;
    margin-top: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
  }
`;

function Skills({ theme }: SkillsProps) {
  return (
    <Row>
      <Column>
        <SkillsHeaderContainer >
          <DecoTag text={'<h2> '} isSpecial={false}     
           style={{
                position: 'relative',
                left: 'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
                top: '0',
              }}/>
          <Header>
            <SplitText
              style={{ fontSize: 'clamp(2.368rem, 5.036vw, 4.536rem)' }}
              text='Made_to_Shine'
            />
          </Header>
          <DecoTag text={' </h2>'} isSpecial={false}     
           style={{
                position: 'relative',
                right: 'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
                top: '0',
              }}/>
        </SkillsHeaderContainer>
        <br />
        <SkillsParagraphContainer>
          <Paragraph theme={theme}>
            <DecoTag
              text={'<p>'}
              isSpecial={false}
              style={{
                position: 'relative',
                left: 'clamp(-8.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
                top: '0.5rem',
              }}
            />
            <br />
            Hi, I'm Julia, an Industrial <strong> Designer </strong> and Front-End 
            <strong> Developer </strong>  who
            thrives on challenges and innovation. Technology excites me, but
            what truly drives me is creating unique and engaging user
            experiences making the web-sites with <strong>Personality and Purpose</strong>. More
            dynamic, visually exciting, and less uniform space. I believe great
            design should captivate, surprise, and break the mold. With a sharp
            eye for aesthetics and a love for the unexpected, <strong> I craft digital experiences </strong>
             that are anything but ordinary.
            <br />
            <DecoTag
              text={'</p>'}
              isSpecial={false}
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

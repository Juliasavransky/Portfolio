import TextCloud from '@/components/textCloud';
import DecoTag from '@/styles/decoTag';
import {
  Header,
  HeaderContainer,
  Paragraph,
  ParagraphContainer,
  Spacer,
} from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '@emotion/react';
import theme from '@/styles/theme';

type SkillsProps = {
  theme: Theme;
};
export const Row = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: absolute;
  left: 12rem;
  padding-top: 2rem;
  width: 100%;
`;
export const Column = styled.div`
  max-height: 100vh;
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Skills({ theme }: SkillsProps) {
  return (
    <>
      <Row>
        <Column>
          <HeaderContainer style={{ marginLeft: '0' }}>
            <span>
              <DecoTag text={'<h2>'} />
            </span>

            <Header>
              <SplitText style={{ fontSize: '4.5rem' }} text='Me,' />
              <Spacer />
              <SplitText style={{ fontSize: '4.5rem' }} text='Myself' />
              <Spacer />
              <SplitText style={{ fontSize: '4.5rem' }} text='and' />
              <Spacer />
              <SplitText style={{ fontSize: '4.5rem' }} text='I' />
            </Header>

            <span style={{ marginLeft: 'auto' }}>
              <DecoTag text={'</h2>'} />
            </span>
          </HeaderContainer>
          <ParagraphContainer>
            <span style={{ margin: '0,auto' }}>
              <DecoTag text={'<p>'} />
            </span>
            <Paragraph theme={theme}>
              Aspiring Front End Developer, in the process of a career change
              from Industrial Design, just before my big break… I am a fast
              learner, with excellent analytical skills, passionate about
              challenges and learning new technologies. I volunteer in the She
              Codes community as a Web module Leader, supporting course
              participants in their studies of HTML5, CSS3, JavaScript,
              React-JS. I contribute to the open-source project "Brave Together"
              I'm looking for a Junior Web Developer position where I can bring
              value to the team with my knowledge and skills.
            </Paragraph>
            <span style={{ marginTop: 'auto' }}>
              <DecoTag text={'</p>'} />
            </span>
          </ParagraphContainer>
        </Column>
        <Column>
          <TextCloud />
        </Column>
      </Row>
    </>
  );
}

export default Skills;

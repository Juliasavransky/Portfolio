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

const SmallTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 3rem;
  margin-left: 12rem;
`;

const SmallTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 100;
`;

function Projects() {
  return (
    <MainPageContainer>
      <HeaderContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ marginRight: '2rem' }}>
          <DecoTag text={'<h2>'} />
        </span>

        <Header>
          <SplitText style={{ fontSize: '4.5rem' }} text='My' />
          <Spacer />
          <SplitText style={{ fontSize: '4.5rem' }} text='Projects' />
        </Header>

        <span style={{ marginLeft: '2rem' }}>
          <DecoTag text={'</h2>'} />
        </span>
      </HeaderContainer>

      <SmallTitleContainer>
        <span style={{ marginRight: '3rem' }}>
          <DecoTag text={'<p>'} />
        </span>
        <SmallTitle>Welcome to check some of my projects</SmallTitle>
        <span style={{ marginLeft: '3rem' }}>
          <DecoTag text={'</p>'} />
        </span>
      </SmallTitleContainer>
    </MainPageContainer>
  );
}

export default Projects;

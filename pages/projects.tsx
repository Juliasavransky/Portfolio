import React from 'react';
import styled from '@emotion/styled';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import {
  MainPageContainer,
  HeaderContainer,
  Header,
  Spacer,
} from '../styles/layoutComponents';
import projectsList from '../utils/projectList.json';
import Card from '../components/card';
import { Theme } from '@emotion/react';

type ProjectsProps = {
  theme: Theme;
};

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

const CardWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex: 1 1 10em;
`;

function Projects({ theme }: ProjectsProps) {
  const projects = projectsList;

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

      <CardWrapper>
        {projects.map((project) => {
          return (
            <div key={project.projectName}>
              <Card
                projectName={project.projectName}
                gitHubLink={project.gitHubLink}
                pageLink={project.pageLink}
                summary={project.summary}
                img={project.img}
                theme={theme}
              />
            </div>
          );
        })}
      </CardWrapper>
    </MainPageContainer>
  );
}

export default Projects;

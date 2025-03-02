import React from 'react';
import styled from '@emotion/styled';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import { Spacer } from '../styles/layoutComponents';
import projectsList from '../utils/projectList.json';
import Card from '../components/card';
import { Theme } from '@emotion/react';

type ProjectsProps = {
  theme: Theme;
};

export const ProjectsContainer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
  justify-content: center;
  left: clamp(2rem, 15vw, 12rem);
  width: clamp(80vw, 90vw, 100vw);
  align-items: center;

  @media (max-width: 1510px) {
    /* width: 84vw; */
    flex-wrap: wrap;
    text-align: center;
    margin-top: clamp(2rem, 3vh, 4rem);
  }
  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
    flex-wrap: wrap;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100vw;
    /* left: 0; */
  }
`;

export const ProjectsHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 900;
  letter-spacing: clamp(2px, 0.5vw, 4px);
  font-size: clamp(3rem, 3.8vw, 6rem);
  width: 100vw;
  
  @media (max-width: 1510px) {
    width: 40vw;
    min-width: 40vw;
    flex-direction: column;
    margin-left: 0;
  }
  @media (max-width: 1220px) {
    width: 95vw;
    max-width: 95vw;
    font-size: clamp(7vw, 7.5vw, 12vw);
    margin-top: 3rem;
    line-height: 1.5;
  }

  `;
export const ProjectsHeader = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  font-size: clamp(3rem, 6vw, 4.5rem);
  flex-wrap: nowrap;
  align-items: center;
  @media (max-width: 1510px) {
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }
  @media (max-width: 328px) {
    font-size: 2rem;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
const SmallTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1510px) {
  }
  @media (max-width: 1220px) {
  }
  @media (max-width: 768px) {
    width: 95vw;
    max-width: 95vw;
    margin: 0 auto;
  }
`;

const SmallTitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 100;

  @media (max-width: 768px) {
    margin-top: clamp(1rem, 2vh, 3rem);
    width: 60vw;
    min-width: 60vw;
    font-size: clamp(1.2rem, 3vw, 1.5rem);
  }
`;

const CardWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1590px;
`;

const SpacerTagWrapper = styled(Spacer)`
  @media (max-width: 768px) {
    display: none;
  }
`;

function Projects({ theme }: ProjectsProps) {
  const projects = projectsList;

  return (
    <ProjectsContainer>
      <ProjectsHeaderContainer>
        <ProjectsHeader>
          <DecoTag text={'<h2>'} isSpecial={false}         
          style={{
            position: 'relative',
            left: 'clamp(-0.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            top: '0',
          }}/>
          <SplitText text='My_Projects' />
          <DecoTag text={'</h2>'} isSpecial={false}   style={{
            position: 'relative',
            left: 'clamp(1rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            top: '0',
          }}/>
        </ProjectsHeader>
        <SmallTitleContainer>
          <DecoTag text={'<p>'} isSpecial={false} />
          <SmallTitle>Step into my world of creative web experiences</SmallTitle>
          <DecoTag text={'</p>'} isSpecial={false} />
        </SmallTitleContainer>
      </ProjectsHeaderContainer>

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
    </ProjectsContainer>
  );
}

export default Projects;

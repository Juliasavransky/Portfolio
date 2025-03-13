import React from 'react';
import styled from '@emotion/styled';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import projectsList from '../utils/projectList.json';
import Card from '../components/card';
import { Theme } from '@emotion/react';
import { useSplitTextAnimation } from '../hooks/useSplitTextAnimation';


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

  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
    flex-wrap: wrap;
    text-align: center;
  }

`;

export const ProjectsHeaderContainer = styled.div`
  font-weight: 900;
  letter-spacing: clamp(2px, 0.5vw, 4px);
  font-size: clamp(3rem, 3.8vw, 6rem);
  width: 100%;
  text-align: center;

  @media (max-width: 1220px) {
    margin-top: 4rem;
  }
`;
export const ProjectsHeader = styled.div`
  font-size: clamp(3rem, 6vw, 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  text-align: center;
  
  @media (max-width: 428px) {
    font-size: 2.5rem;
    flex-direction: column;
    flex-wrap: wrap;
  }
  
`;
const SmallTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  `;

const SmallTitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 100;
  text-align: center;
  margin-top: 1.5rem;
  
  
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

function Projects({ theme }: ProjectsProps) {
  const projects = projectsList;
  const texts = ['My_Projects'];
  const { activeGroup, activeChar, activeFont } = useSplitTextAnimation(texts);
  return (
    <ProjectsContainer>
      <ProjectsHeaderContainer>
        <ProjectsHeader>
          <DecoTag
            text={'<h2>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(-0.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0',
            }}
          />
          <SplitText text={texts.join(' ')}
            animateIndex={activeGroup === 0 ? activeChar : null}
            animateFont={activeGroup === 0 ? activeFont : null}/>
          <DecoTag
            text={'</h2>'}
            isPrimaryTag={true}
            style={{
              position: 'relative',
              left: 'clamp(1rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0',
            }}
          />
        </ProjectsHeader>
        <SmallTitleContainer>
          <DecoTag text={'<p>'} isPrimaryTag={false} />
          <SmallTitle>
            Step into my world of creative web experiences
          </SmallTitle>
          <DecoTag text={'</p>'} isPrimaryTag={false} />
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

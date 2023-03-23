import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Theme } from '@emotion/react';
import theme from '@/styles/theme';

type CardProps = {
  projectName?: string;
  gitHubLink: URL | string;
  pageLink: URL | string;
  summary?: string;
  img: string;
  theme: Theme;
};

const ProjectCard = styled.div`
  margin: 1.5rem auto;
  justify-content: center;

  &:hover .project-card__details {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.5s ease-in-out;
  }

  &:hover .project-card__image {
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
    filter: blur(1px) brightness(40%) saturate(1.3);
  }
`;

const ProjectCardItem = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  display: inline-block;
  flex: 0 1 33%;
`;
const ProjectCardIMage = styled.div`
  transform: scale(1.03);
  object-fit: cover;

  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
    filter: blur(1px) brightness(40%) saturate(1.3);
  }
`;
const ProjectCardDetails = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 70%;
  margin-left: 2rem;
  transform: translateY(20%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
  backface-visibility: hidden;
  color: ${theme.colors.greyLight2};

  &:hover {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.6s ease-in-out;
  }
`;
const DetailsTitle = styled.h2<{ theme: Theme }>`
  font-size: ${theme.size.fontSmall};
  font-weight: 700;
  color: ${theme.colors.white};
  letter-spacing: 3px;
  margin-bottom: 1rem;
`;
const DetailsDescription = styled.p<{ theme: Theme }>`
  font-size: ${theme.size.fontTiny};
  color: ${theme.colors.white};
  font-weight: 100;
  margin-bottom: 1.6rem;
  width: 95%;
`;
const DetailsButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DetailsLink = styled.div<{ theme: Theme }>`
  text-decoration: none;
  font-size: ${theme.size.fontTiny};
  color: ${theme.colors.white};
  transition: all 0.3s;

  &:hover {
    color: ${theme.colors.yellow};
    transform: rotate(-5deg) scale(1.25);
    border-bottom: solid 1px ${theme.colors.purple};
  }
`;

function Card({
  projectName,
  gitHubLink,
  pageLink,
  summary,
  img,
  theme,
}: CardProps) {
  return (
    <ProjectCard>
      <ProjectCardItem>
        <ProjectCardIMage className='project-card__image'>
          <Image src={img} alt='project' height={255} width={525} />
        </ProjectCardIMage>

        <ProjectCardDetails className='project-card__details' theme={theme}>
          <DetailsTitle theme={theme}>{projectName}</DetailsTitle>
          <DetailsDescription theme={theme}>{summary}</DetailsDescription>

          <DetailsButton>
            <Link href={pageLink} target='_blank'>
              <DetailsLink theme={theme}>Visit the page &#8594;</DetailsLink>
            </Link>
            <Link href={gitHubLink} target='_blank'>
              <DetailsLink theme={theme}>See the code &#8594;</DetailsLink>
            </Link>
          </DetailsButton>
        </ProjectCardDetails>
      </ProjectCardItem>
    </ProjectCard>
  );
}

export default Card;

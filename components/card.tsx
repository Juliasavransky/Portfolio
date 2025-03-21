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
  background: ${theme.colors.white};
  padding: 0.7rem 0.7rem 1.5rem;
  border-radius: 3px;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  flex-wrap: wrap;


  &:hover .project-card__details {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.5s ease-in-out;
  }

  &:hover .project-card__image {
    transform: scale(1.3);
    transition: all 0.5s ease-in-out;
    filter: blur(1px) brightness(40%) saturate(1.3);
  }
`;

const ProjectCardItem = styled.div`
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  margin: 10px; /* רווחים בין הקלפים */
  flex: 1 0 calc(40% - 20px);
  min-width: calc(33.33% - 20px);
  border: 2px solid rgba(${theme.colors.greyLight1}, 0.6);
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
  color: ${theme.colors.greyLight1};

  &:hover {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.6s ease-in-out;
  }
`;
const DetailsTitle = styled.h2<{ theme: Theme }>`
  font-size: ${theme.size.fontSmall};
  font-weight: 500;
  color: ${theme.colors.greyDarkBG2};
  letter-spacing: 2px;
  word-spacing: 3px;
  margin-top: 1rem;
  word-break: break-word;

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

const ResponsiveImage = styled(Image)`
  width: 100%;
  height: clamp(180px, 75vw, 390px);
  aspect-ratio: 5/6;
  object-fit: cover;
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
      <DetailsTitle theme={theme}>{projectName}</DetailsTitle>
      <ProjectCardItem>
        <ProjectCardIMage className='project-card__image'>
          <ResponsiveImage
            src={img}
            alt='project'
            width={400} // כל גודל אפשרי ששומר על יחס 16:9
            height={225} // גובה מחושב לפי 16:9
            priority
          />
        </ProjectCardIMage>

        <ProjectCardDetails className='project-card__details' theme={theme}>
          {/* <DetailsTitle theme={theme}>{projectName}</DetailsTitle> */}
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

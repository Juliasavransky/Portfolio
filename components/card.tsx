import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Image from 'next/image';

type CardProps = {
  projectName?: string;
  gitHubLink: URL | string;
  pageLink: URL | string;
  summary?: string;
  img: string;
};

const ProjectCard = styled.div`
  margin: 1.5rem auto;
  justify-content: center;
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
    transform: scale(1.3);
    transition: all 0.6s ease-in-out;
    filter: blur(1px) brightness(40%) saturate(1.3);
  }
`;
const ProjectCardDetails = styled.div`
  position: absolute;
  top: 70%;
  margin-left: 3rem;
  transform: translateY(20%);
  opacity: 0;
  transition: all 0.6s ease-in-out;
  backface-visibility: hidden;
  color: ${(props) => props.theme.colors.greyLight2};

  &:hover {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.6s ease-in-out;
  }
`;
const DetailsTitle = styled.h2`
  font-size: ${(props) => props.theme.size.fontReg};
  font-weight: 300;
  color: ${(props) => props.theme.colors.white};
  letter-spacing: 3px;
  margin-bottom: 2rem;
`;
const DetailsDescription = styled.p`
  font-size: $font-tiny;
  font-size: ${(props) => props.theme.size.fontTiny};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 2rem;
  width: 95%;
`;
const DetailsButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DetailsLink = styled.div`
  text-decoration: none;
  font-size: ${(props) => props.theme.size.fontTiny};
  color: ${(props) => props.theme.colors.white};
  transition: all 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.yellow};
    transform: rotate(-4deg) scale(1.4);
    border-bottom: solid 1px ${(props) => props.theme.colors.purple};
  }
`;

const DetailsIcon = styled.div`
  fill: ${(props) => props.theme.colors.purple};
  height: ${(props) => props.theme.size.fontSmall};
  width: ${(props) => props.theme.size.fontSmall};
  cursor: pointer;
`;

function Card({ projectName, gitHubLink, pageLink, summary, img }: CardProps) {
  return (
    <ProjectCard>
      <ProjectCardItem>
        <ProjectCardIMage>
          <Image src={img} alt='project' height={255} width={525} />
        </ProjectCardIMage>

        <ProjectCardDetails>
          <DetailsTitle>{projectName}</DetailsTitle>
          <DetailsDescription>{summary}</DetailsDescription>

          <DetailsButton>
            <Link href={pageLink} target='_blank'>
              <DetailsLink>
                Visit the page<DetailsIcon>&#8594;</DetailsIcon>
              </DetailsLink>
            </Link>
            <Link href={gitHubLink} target='_blank'>
              <DetailsLink>
                See the code <DetailsIcon>&#8594;</DetailsIcon>
              </DetailsLink>
            </Link>
          </DetailsButton>
        </ProjectCardDetails>
      </ProjectCardItem>
    </ProjectCard>
  );
}

export default Card;

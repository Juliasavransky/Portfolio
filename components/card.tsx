import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Image from 'next/image';
import { laBelle, amatic } from '../styles/fonts/font';
import { useTranslation } from '@/hooks/useTranslation';
import '@emotion/react';
import { Theme as CustomTheme } from '../styles/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}

type CardProps = {
  projectName?: string;
  pageLink: URL | string;
  summary?: string;
  img: string;
  className?: string;
  lang: string;
};

function hexToRgb(hex: string): string {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const ProjectCard = styled.div`
  margin: 2rem;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem 1rem 2rem;
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
  flex: 1 0 calc(40% - 20px);
  min-width: calc(33.33% - 20px);
  ${({ theme }) => `
    border: 2px solid rgba(${hexToRgb(theme.colors.greyLight1)}, 0.3);
  `}
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
const ProjectCardDetails = styled.div`
  position: absolute;
  top: 70%;
  margin-left: 2rem;
  transform: translateY(20%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
  backface-visibility: hidden;
  color: ${({ theme }) => theme.colors.greyLight1};

  &:hover {
    opacity: 1;
    transform: translateY(-70%);
    transition: all 0.6s ease-in-out;
  }
`;
const DetailsTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.fontReg};
  color: ${({ theme }) => theme.colors.greyDarkBG1};
  margin-top: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.125rem;
    left: -0.5rem;
    right: -0.5rem;
    height: 0.75rem;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const DetailsDescription = styled.p`
  font-size: calc(${({ theme }) => theme.size.fontSmall}*.8);
  color: ${({ theme }) => theme.colors.white};
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
const DetailsLink = styled.div`
  text-decoration: none;
  font-size: ${({ theme }) => theme.size.fontSmall};
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    transform: rotate(-5deg) scale(1.25);
    border-bottom: solid 1px ${({ theme }) => theme.colors.purple};
  }
`;

const ResponsiveImage = styled(Image)`
  width: 100%;
  height: clamp(180px, 75vw, 390px);
  aspect-ratio: 5/6;
  object-fit: cover;
`;

function Card({ projectName, pageLink, summary, img, lang }: CardProps) {
  const { t } = useTranslation('projects');

  return (
    <ProjectCard>
      <DetailsTitle
        className={lang === 'he' ? amatic.className : laBelle.className}
      >
        <Link href={pageLink} target='_blank'>
          {projectName}
        </Link>
      </DetailsTitle>
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

        <ProjectCardDetails className='project-card__details'>
          <DetailsDescription>{summary}</DetailsDescription>

          <DetailsButton>
            <Link href={pageLink} target='_blank'>
              <DetailsLink>{t.visitLink} &#8594;</DetailsLink>
            </Link>
          </DetailsButton>
        </ProjectCardDetails>
      </ProjectCardItem>
    </ProjectCard>
  );
}

export default Card;

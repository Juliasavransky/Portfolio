import React from 'react';
import {
  ProjectsContainer,
  ProjectsHeaderContainer,
  ProjectsHeader,
  SmallTitleContainer,
  SmallTitle,
  CardWrapper,
} from '@/styles/projectsPageComponents';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import projectsList from '../../utils/projectList.json';
import Card from '../../components/card';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import TextWrapper from '../../components/TextWrapper';
import { useCustomTheme } from '../../hooks/useTheme';

type ProjectsProps = {
  lang: Lang;
  initialDict: Record<string, string>;
};

function Projects({ lang, initialDict }: ProjectsProps) {
  const { t } = useTranslation('projects', initialDict);
  const projects = projectsList;
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title]);
  const theme = useCustomTheme();

  return (
    <div>
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
            <TextWrapper lang={lang}>
              <SplitText
                lang={lang}
                initialDict={initialDict}
                theme={theme}
                text={t.title}
                baseIndex={0}
                animateIndex={animateIndex}
                animateFont={animateFont}
                style={{
                  fontSize: `${theme.size.fontH2}`,
                  // fontFamily: 'Roboto, sans-serif',
                }}
              />
            </TextWrapper>
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
            <SmallTitle>{t.subtitle}</SmallTitle>
            <DecoTag text={'</p>'} isPrimaryTag={false} />
          </SmallTitleContainer>
        </ProjectsHeaderContainer>

        <CardWrapper>
          {projects.map((project) => {
            return (
              <div key={project.pageLink}>
                <Card
                  projectName={project.projectName[lang]}
                  summary={project.summary[lang]}
                  pageLink={project.pageLink}
                  img={project.img}
                  lang={lang}
                />
              </div>
            );
          })}
        </CardWrapper>
      </ProjectsContainer>
    </div>
  );
}

export default Projects;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang: Lang =
    langParam === 'he' || langParam === 'en' ? langParam : 'he';
  const initialDict = await getDictionary('projects', lang);

  return {
    props: {
      lang,
      initialDict,
    },
  };
};

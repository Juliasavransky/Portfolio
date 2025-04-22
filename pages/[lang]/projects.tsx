import React from 'react';
import {
  ProjectsContainer,
  ProjectsHeaderContainer,
  ProjectsHeader,
  SmallTitleContainer,
  SmallTitle,
  CardWrapper,
} from '@/styles/projectsPageComponents';
import {  MotionMainWrapper} from '../../styles/layoutComponents';
import { useSmoothReady } from '@/hooks/useSmoothReady';
import SplitText from '@/utils/splitText';
import DecoTagSmart from '@/styles/decoTagSmart';
import projectsList from '../../utils/projectList.json';
import Card from '../../components/card';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import TextWrapper from '../../components/TextWrapper';
import { useCustomTheme } from '../../hooks/useTheme';
import {DecoTagWrapper} from '../../styles/layoutComponents';

type ProjectsProps = {
  lang: Lang;
  initialDict: Record<string, string>;
};

function Projects({ lang, initialDict }: ProjectsProps) {
  const { t } = useTranslation('projects', initialDict);
  const projects = projectsList;
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title], lang);
  const theme = useCustomTheme();
    const { isFullyReady } = useSmoothReady({ delay: 300 });
  

  return (
        <MotionMainWrapper
          isReady={isFullyReady}
          initial={{ opacity: 0, y: 20 }}
          animate={isFullyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >

      <ProjectsContainer >
        <ProjectsHeaderContainer >
          <ProjectsHeader >
            <DecoTagWrapper
              text={'<h2>'}
              isPrimaryTag={false}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
              }}
              />
            <TextWrapper lang={lang}>
              <SplitText
                lang={lang}
                initialDict={initialDict}
                theme={theme}
                text={t.title}
                baseIndex={0}
                animateIndex={isFullyReady ? animateIndex ?? null : null}
                animateFont={isFullyReady ? animateFont ?? null : null}
                style={{
                  fontSize: `${theme.size.fontH2}`, 
                }}
                />
            </TextWrapper>
            <DecoTagWrapper
              text={'</h2>'}
              isPrimaryTag={true}
              style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
              }}
              />
          </ProjectsHeader>
          <SmallTitleContainer>
            <DecoTagSmart text={'<p>'} isPrimaryTag={false} />
            <SmallTitle>{t.subtitle}</SmallTitle>
            <DecoTagSmart text={'</p>'} isPrimaryTag={false} />
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
      </MotionMainWrapper>
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

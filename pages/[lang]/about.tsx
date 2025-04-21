import TextCloud from '@/components/textCloud';
import {
  Row,
  SkillsHeaderContainer,
  SkillsParagraphContainer,
  BouncingArrow,
} from '@/styles/skillsPageComponents';
import DecoTagSmart from '@/styles/decoTagSmart';
import { Header, Paragraph , MotionMainWrapper } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import React from 'react';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import ProfileImg from '../../components/profileImg';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';
import { useSmoothReady } from '@/hooks/useSmoothReady';

type SkillsProps = {
  lang: Lang;
  initialDict: Record<string, string>;
};

function About({ lang, initialDict }: SkillsProps) {
  const { isFullyReady } = useSmoothReady({ delay: 300 });
  const theme = useCustomTheme();
  const { t } = useTranslation('about', initialDict);
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title], lang);

  return (
      <MotionMainWrapper
        isReady={isFullyReady}
        initial={{ opacity: 0, y: 20 }}
        animate={isFullyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
      <Row>
        <SkillsHeaderContainer>
          <Header>
            <DecoTagSmart
              text={'<h2> '}
              isPrimaryTag={false}
              style={{
                position: 'absolute',
                top: '0',
                left: '-4rem',
              }}
            />
            <TextWrapper lang={lang}>
              <SplitText
                style={{
                  fontSize: `${theme.size.fontH2}`,
                }}
                lang={lang}
                initialDict={initialDict}
                theme={theme}
                text={t.title}
                baseIndex={0}
                animateIndex={isFullyReady ? animateIndex : null}
                animateFont={isFullyReady ? animateFont : null}
              />
            </TextWrapper>
            <DecoTagSmart
              text={' </h2>'}
              isPrimaryTag={true}
              style={{
                position: 'absolute',
                right: '0',
                top: '4rem',
              }}
            />
            <ProfileImg />
          </Header>
        </SkillsHeaderContainer>
        <SkillsParagraphContainer>
          <Paragraph theme={theme} style={{width:'70%'}}>
            <DecoTagSmart
              text={'<p>'}
              isPrimaryTag={false}
              style={{
                position: 'absolute',
                top: '0',
                left: '-2rem',
              }}
            />
            {t.part1} <span style={{ color: '#ffcc00' }}>{t.highlight1}</span>{' '}
            {t.part2} <span style={{ color: '#ffcc00' }}>{t.highlight2}</span>{' '}
            {t.part3} <span style={{ color: '#ffcc00' }}>{t.highlight3}</span>{' '}
            {t.part4}
            <DecoTagSmart
              text={'</p>'}
              isPrimaryTag={false}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
              }}
            />
          </Paragraph>
        </SkillsParagraphContainer>
        <Paragraph
          theme={theme}
          style={{
            fontSize: `calc(${theme.size.fontBig}*1.7)`,
            marginTop: 'clamp(1rem, 2vw, 2rem)',
          }}
        >
          {t.textCloud}
          <BouncingArrow />
          <TextCloud />
        </Paragraph>
      </Row>
    </MotionMainWrapper>
  );
}

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang: Lang =
    langParam === 'he' || langParam === 'en' ? langParam : 'he';
  const initialDict = await getDictionary('about', lang);

  return {
    props: {
      lang,
      initialDict,
    },
  };
};

import TextCloud from '@/components/textCloud';
import {
  Row,
  SkillsHeaderContainer,
  SkillsParagraphContainer,
  BouncingArrow,
} from '@/styles/skillsPageComponents';
import DecoTagSmart from '@/styles/decoTagSmart';
import { Header, Paragraph } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import React from 'react';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import ProfileImg from '../../components/profileImg';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';

type SkillsProps = {
  lang: Lang;
  initialDict: Record<string, string>;
};

function About({ lang, initialDict }: SkillsProps) {
  const theme = useCustomTheme();
  const { t } = useTranslation('about', initialDict);
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title], lang);

  return (
    <Row>
      <SkillsHeaderContainer>
        <DecoTagSmart
          text={'<h2> '}
          isPrimaryTag={false}
          style={{
            position: 'relative',
            left: 'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            top: '0',
          }}
        />
        <Header>
          <TextWrapper lang={lang} >
            <SplitText
              style={{
                fontSize: `${theme.size.fontH2}`,
                // fontFamily: 'Roboto, sans-serif',
              }}
              lang={lang}
              initialDict={initialDict}
              theme={theme}
              text={t.title}
              baseIndex={0}
              animateIndex={animateIndex}
              animateFont={animateFont}
            />
     
          </TextWrapper>
        </Header>
        <DecoTagSmart
          text={' </h2>'}
          isPrimaryTag={true}
          style={{
            position: 'relative',
            right:
              'clamp(-6rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            top: '0',
          }}
        />
      </SkillsHeaderContainer>
      <ProfileImg />
      <SkillsParagraphContainer>
        <Paragraph theme={theme}>
          <DecoTagSmart
            text={'<p>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(-8.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0.5rem',
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
              position: 'relative',
              left: 'clamp(8rem, calc(10rem + (100vw - 320px) * -0.014), 8rem)',
              top: '0.5rem',
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

import React from 'react';
import SplitText from '@/utils/splitText';
import {
  MainPageContainer,
  Header,
  DecoTagWrapper,
  TheW,
  Paragraph,
  MotionMainWrapper,
} from '../../styles/layoutComponents';
import { useSmoothReady } from '@/hooks/useSmoothReady';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import AnimatedBackground from '../../components/animatedBackground ';
import { MagicButton, Btn } from '../../components/magicButton.tsx';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';
import DecoTagSmart from '@/styles/decoTagSmart';

// English Home
export const metadata = {
  title: "Custom Web Design for Creative Businesses in Israel | Web Witch",
  description: "Custom websites for creative and spiritual entrepreneurs in Israel. Design + development + automations — all in one place. Starting at ₪4,500.",
  keywords: ["web design Israel", "website for creative business", "custom web development", "spiritual business website", "web designer Israel", "Web Witch"],
  openGraph: {
    title: "Web Witch | A Website That Actually Feels Like You",
    description: "Creative entrepreneurs: a website that brings clients — without having to explain yourself every time. Design + development + automations.",
    url: "https://webwitch.click/en/home",
    locale: "en_IL",
    type: "website",
  },
  alternates: {
    canonical: "https://webwitch.click/en/home",
    languages: {
      "he": "https://webwitch.click/he/home",
      "en": "https://webwitch.click/en/home",
      "x-default": "https://webwitch.click/he/home",
    },
  },
};

// Hebrew Home
export const metadata = {
  title: "עיצוב ופיתוח אתרים לעסקים יצירתיים | Web Witch",
  description: "בונה אתרים מותאמים אישית לעסקים יצירתיים ורוחניים בישראל. עיצוב + פיתוח + אוטומציות — ביחד, תחת גג אחד. החל מ-₪4,500.",
  keywords: ["עיצוב אתרים", "בניית אתרים לעסקים קטנים", "אתר לעסק יצירתי", "מפתחת אתרים ישראל", "אתר לעסק רוחני", "Web Witch"],
  openGraph: {
    title: "Web Witch | אתר שמייצג אותך לאמיתי",
    description: "יזמיות יצירתיות: אתר שמביא לקוחות — בלי שתצטרכי להסביר את עצמך. עיצוב + פיתוח + אוטומציות.",
    url: "https://webwitch.click/he/home",
    locale: "he_IL",
    type: "website",
  },
  alternates: {
    canonical: "https://webwitch.click/he/home",
    languages: {
      "he": "https://webwitch.click/he/home",
      "en": "https://webwitch.click/en/home",
      "x-default": "https://webwitch.click/he/home",
    },
  },
};
type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};

export default function Home({ lang, initialDict }: Props) {
  const { isFullyReady } = useSmoothReady({ delay: 300 });
  const { t } = useTranslation('home', initialDict);
  const theme = useCustomTheme();
  const { animateIndex, animateFont } = useSplitTextAnimation(
    ['eb_', 'itch'],
    lang
  );

  return (
    <MotionMainWrapper
      isReady={isFullyReady}
      initial={{ opacity: 0, y: 20 }}
      animate={isFullyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AnimatedBackground>
        <MainPageContainer>
          <DecoTagWrapper
            text={'</html>'}
            isPrimaryTag={false}
            style={{ position: 'absolute', left: '0', top: '0' }}
          />
          <DecoTagWrapper
            text={'</body>'}
            isPrimaryTag={false}
            style={{ position: 'absolute', left: '5%', top: '3rem' }}
          />

          <Header>
            <DecoTagSmart
              text={'<h1>'}
              isPrimaryTag={true}
              className='special'
              style={{ position: 'absolute', left: '0', top: '0' }}
            />
            <TheW theme={theme}>W</TheW>
            <SplitText
              lang='en'
              initialDict={initialDict}
              text='eb_'
              baseIndex={0}
              style={{ fontSize: `${theme.size.fontHuge}`, fontWeight: '500' }}
              animateIndex={isFullyReady ? animateIndex : null}
              animateFont={isFullyReady ? animateFont : null}
              theme={theme}
            />
          </Header>

          <Header>
            <TheW theme={theme}>W</TheW>
            <SplitText
              lang='en'
              initialDict={initialDict}
              text='itch'
              baseIndex={3}
              style={{ fontSize: `${theme.size.fontHuge}`, fontWeight: '500' }}
              animateIndex={isFullyReady ? animateIndex : null}
              animateFont={isFullyReady ? animateFont : null}
              theme={theme}
            />
            <DecoTagSmart
              text={'</h1>'}
              isPrimaryTag={false}
              style={{ position: 'absolute', right: '-6rem', bottom: '2rem' }}
            />
          </Header>

          <TextWrapper lang={lang}>
            <Paragraph theme={theme}>{t.subtitle}</Paragraph>
          </TextWrapper>

          <Btn>
            <DecoTagSmart text={'<button>'} isPrimaryTag={false} />
            <MagicButton
              frontText={t.buttonFront}
              backText={t.buttonBack}
              href={`/${lang}/projects`}
            />
            <DecoTagSmart text={'</button>'} isPrimaryTag={false} />
          </Btn>
        </MainPageContainer>
      </AnimatedBackground>
    </MotionMainWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang: Lang =
    langParam === 'he' || langParam === 'en' ? langParam : 'he';
  const initialDict = await getDictionary('home', lang);

  return {
    props: {
      lang,
      initialDict,
    },
  };
};

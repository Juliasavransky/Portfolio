// 🧙‍♀️ Refactored Home Page with simplified tag positioning and debug utility

import React, { useEffect } from 'react';
import SplitText from '@/utils/splitText';
import {
  MainPageContainer,
  HeaderContainer,
  Header,
  DecoTagWrapper,
  TheW,
  Paragraph,
} from '../../styles/layoutComponents';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import AnimatedBackground from '../../components/animatedBackground ';
import { MagicButton, Btn } from '../../components/magicButton.tsx';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';
import { roboto } from '../../styles/fonts/font';
import DecoTagSmart from '@/styles/decoTagSmart';

// Utility for consistent tag styling
const decoStyle = (pos: 'topLeft' | 'bottomRight' | 'left' | 'right', offset = '0') => {
  const base = {
    position: 'relative' as const,
  };
  switch (pos) {
    case 'topLeft':
      return { ...base, top: offset, left: offset };
    case 'bottomRight':
      return { ...base, bottom: offset, right: offset };
    case 'left':
      return { ...base, left: offset };
    case 'right':
      return { ...base, right: offset };
    default:
      return base;
  }
};

// Debug utility to log tag positions
const useTagDebugger = () => {
  useEffect(() => {
    const tags = document.querySelectorAll('[data-tag]');
    tags.forEach((tag) => {
      const rect = tag.getBoundingClientRect();
      console.log(`[${tag.getAttribute('data-tag')}] top: ${rect.top}px, left: ${rect.left}px`);
    });
  }, []);
};

type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};

export default function Home({ lang, initialDict }: Props) {
  const { t } = useTranslation('home', initialDict);
  const theme = useCustomTheme();
  const texts = ['eb_', 'itch'];
  const { animateIndex, animateFont } = useSplitTextAnimation(texts);

  useTagDebugger(); // 🔍 debug helper

  return (
    <div>
      <AnimatedBackground>
        <MainPageContainer>
          <HeaderContainer>
            <DecoTagWrapper
              text={'</html>'}
              isPrimaryTag={false}
              style={{ ...decoStyle('right', '32rem') }}
              data-tag="html"
            />
            <DecoTagWrapper
              text={'</body>'}
              isPrimaryTag={false}
              style={{ ...decoStyle('right', '26rem') }}
              data-tag="body"
            />
            <Header>
              <DecoTagSmart
                text={'<h1>'}
                isPrimaryTag={true}
                className='special'
                style={{ ...decoStyle('left', '2rem') }}
                data-tag="h1-open"
              />
              <span style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                <TheW theme={theme}>W</TheW>
                <SplitText
                  lang='en'
                  initialDict={initialDict}
                  text='eb_'
                  baseIndex={0}
                  style={{ fontSize: `${theme.size.fontHuge}` }}
                  animateIndex={animateIndex}
                  animateFont={animateFont}
                  theme={theme}
                />
              </span>
              <span style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                <TheW theme={theme}>W</TheW>
                <SplitText
                  lang='en'
                  initialDict={initialDict}
                  text='itch'
                  baseIndex={3}
                  style={{ fontSize: `${theme.size.fontHuge}` }}
                  animateIndex={animateIndex}
                  animateFont={animateFont}
                  theme={theme}
                />
              </span>
              <DecoTagSmart
                text={'</h1>'}
                isPrimaryTag={false}
                style={{ ...decoStyle('right', '1rem') }}
                data-tag="h1-close"
              />
              <TextWrapper lang={lang}>
                <Paragraph theme={theme}>{t.subtitle}</Paragraph>
              </TextWrapper>
            </Header>
          </HeaderContainer>

          <Btn>
            <DecoTagSmart
              text={'<button>'}
              style={{ marginBottom: '1rem' }}
              isPrimaryTag={false}
              data-tag="button-open"
            />
            <MagicButton
              frontText={t.buttonFront}
              backText={t.buttonBack}
              href={`/${lang}/projects`}
            />
            <DecoTagSmart
              text={'</button>'}
              style={{ marginTop: '1.5rem' }}
              isPrimaryTag={false}
              data-tag="button-close"
            />
          </Btn>
        </MainPageContainer>
      </AnimatedBackground>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang: Lang = langParam === 'he' || langParam === 'en' ? langParam : 'he';
  const initialDict = await getDictionary('home', lang);

  return {
    props: {
      lang,
      initialDict,
    },
  };
};

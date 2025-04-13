import React from 'react';
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
import  DecoTagSmart  from '@/styles/decoTagSmart';

type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};

export default function Home({ lang, initialDict }: Props) {
  const { t } = useTranslation('home', initialDict);
  const theme = useCustomTheme();
  const texts = ['eb ', 'itch'];
  const { animateIndex, animateFont } = useSplitTextAnimation(texts);

  return (
    <div>
      <AnimatedBackground>
        <MainPageContainer>
          <HeaderContainer>
            <DecoTagWrapper
              text={'</html>'}
              isPrimaryTag={false}
              style={{
                position: 'relative',
                right: 'clamp(35rem, calc(30rem + (100vw - 340px) ), 45rem)',
                top: '-2rem',
              }}
            />
            <DecoTagWrapper
              text={'</body>'}
              isPrimaryTag={false}
              style={{
                position: 'relative',
                right: 'clamp(25rem, calc(30rem + (100vw - 340px) ), 35rem)',
                top: '-2rem',
              }}
            />
            <Header>
              <DecoTagSmart
                text={'<h1>'}
                isPrimaryTag={true}
                className='special'
                style={{
                  position: 'relative',
                  left: 'clamp(0rem, calc(-10rem + (100vw - 320px) * 0.01), -15rem)',
                  top: '-1.5rem',
                }}
              />
              <span
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <TheW theme={theme}>W</TheW>
                <SplitText
                  lang='en'
                  initialDict={initialDict}
                  text='eb '
                  baseIndex={0}
                  style={{
                    fontSize: `${theme.size.fontHuge}`,
                  }}
                  animateIndex={animateIndex}
                  animateFont={animateFont}
                  theme={theme}
                />
              </span>
              <span
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}
              >
                <TheW theme={theme}>W</TheW>
                <SplitText
                  lang='en'
                  initialDict={initialDict}
                  text='itch'
                  baseIndex={3}
                  style={{
                    fontSize: `${theme.size.fontHuge}`,
                  }}
                  animateIndex={animateIndex}
                  animateFont={animateFont}
                  theme={theme}
                />
              </span>
              <DecoTagSmart
                text={'</h1>'}
                isPrimaryTag={false}
                style={{
                  position: 'relative',
                  right: 'clamp(0rem, calc(-8rem + (100vw - 320px) * 0.05), 1rem)',
                  bottom: 'clamp(-2rem, -1rem, 2rem)',
                }}
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
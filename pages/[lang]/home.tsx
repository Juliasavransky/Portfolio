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
import DecoTagSmart from '@/styles/decoTagSmart';

type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};

export default function Home({ lang, initialDict }: Props) {
  const { t } = useTranslation('home', initialDict);
  const theme = useCustomTheme();
  const { animateIndex, animateFont } = useSplitTextAnimation(
    ['eb_', 'itch'],
    lang
  );

  return (
    <AnimatedBackground>
      <MainPageContainer>
        <DecoTagWrapper
          text={'</html>'}
          isPrimaryTag={false}
          style={{
            position: 'absolute',
            left: '0',
            //  right: 'clamp(35rem, calc(30rem + (100vw - 340px) ), 45rem)',
            top: '0',
          }}
        />
        <DecoTagWrapper
          text={'</body>'}
          isPrimaryTag={false}
          style={{
            position: 'absolute',
            left: '5%',
            //  right: 'clamp(25rem, calc(30rem + (100vw - 340px) ), 35rem)',
            top: '3rem',
          }}
        />
        <Header>
          <DecoTagSmart
            text={'<h1>'}
            isPrimaryTag={true}
            className='special'
            style={{
              position: 'absolute',
              left: '0',
              //  left: 'clamp(0rem, calc(-10rem + (100vw - 320px) * 0.01), -15rem)',
              top: '0',
            }}
          />

          <TheW theme={theme}>W</TheW>
          <SplitText
            lang='en'
            initialDict={initialDict}
            text='eb_'
            baseIndex={0}
            style={{ fontSize: `${theme.size.fontHuge}`, fontWeight: '500' }}
            animateIndex={animateIndex}
            animateFont={animateFont}
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
            animateIndex={animateIndex}
            animateFont={animateFont}
            theme={theme}
          />
          <DecoTagSmart
            text={'</h1>'}
            isPrimaryTag={false}
            style={{
              position: 'absolute',
              right: '-6rem',
              //  right:
              //    'clamp(0rem, calc(-8rem + (100vw - 320px) * 0.05), 1rem)',
              bottom: '2rem',
            }}
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

import React from 'react';
import DecoTagSmart from '@/styles/decoTagSmart';
import {
  ContactMainPageContainer,
  IconsContactWrapper,
  ContactHeaderContainer,
  ContactParagraphContainer,
} from '@/styles/contactListComponents';
import { Paragraph, DecoTagWrapper } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import ContactForm from '@/components/contactForm';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import SocialLinks from '../../components/socialLinks';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';

type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};

function Contact({ lang, initialDict }: Props) {
  const { t } = useTranslation('contact', initialDict);
  const theme = useCustomTheme();
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title]);
  return (
    <div>
      <ContactMainPageContainer>
        <IconsContactWrapper>
          <SocialLinks />
        </IconsContactWrapper>
        <ContactHeaderContainer>
          <DecoTagSmart
            text={'<h2>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              right: 'clamp(6rem, calc(7rem + (100vw + 320px) * 0.015), 8rem)',
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

          <DecoTagSmart
            text={'</h2>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(6rem, calc(7rem + (100vw + 320px) * 0.015), 8rem)',
              top: '0',
            }}
          />
        </ContactHeaderContainer>

        <ContactParagraphContainer>
          <DecoTagSmart
            text={'<p>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(1.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              top: '0',
            }}
          />
          <Paragraph theme={theme}>{t.subtitle}</Paragraph>

          <DecoTagSmart
            text={'</p>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              left: 'clamp(-1.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
              bottom: '-3rem',
            }}
          />
        </ContactParagraphContainer>

        <ContactForm />

        <DecoTagWrapper
          text={'</body>'}
          isPrimaryTag={false}
          style={{
            position: 'relative',
            left: 'clamp(26rem, calc(30rem + (100vw - 340px) ), 35rem)',
            top: '2rem',
          }}
        />
        <DecoTagWrapper
          text={'</html>'}
          isPrimaryTag={false}
          style={{
            position: 'relative',
            left: 'clamp(30rem, calc(35rem + (100vw - 340px) ), 40rem)',
            top: '4rem',
          }}
        />
      </ContactMainPageContainer>
    </div>
  );
}

export default Contact;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const langParam = context.params?.lang;
  const lang: Lang =
    langParam === 'he' || langParam === 'en' ? langParam : 'he';
  const initialDict = await getDictionary('contact', lang);

  return {
    props: {
      lang,
      initialDict,
    },
  };
};

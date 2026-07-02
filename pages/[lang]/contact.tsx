import React from 'react';
import DecoTagSmart from '@/styles/decoTagSmart';
import {
  ContactMainPageContainer,
  IconsContactWrapper,
  ContactHeaderContainer,
  ContactParagraphContainer,
} from '@/styles/contactListComponents';
import { Paragraph, MotionMainWrapper } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import ContactForm from '@/components/contactForm';
import { useSplitTextAnimation } from '../../hooks/useSplitTextAnimation';
import SocialLinks from '../../components/socialLinks';
import { GetServerSideProps } from 'next';
import { getDictionary, Lang } from '../../hooks/getDictionary';
import { useTranslation } from '../../hooks/useTranslation';
import { useCustomTheme } from '../../hooks/useTheme';
import TextWrapper from '../../components/TextWrapper';
import { useSmoothReady } from '@/hooks/useSmoothReady';
type Props = {
  lang: Lang;
  initialDict: Record<string, string>;
};
// English Contact
export const metadata = {
  title: "Contact — Let's Build Something Together | Web Witch",
  description: "Interested in a website that actually feels like you? Reach out — I take 2-3 projects per month to give each client full attention.",
  openGraph: {
    title: "Contact | Web Witch",
    description: "Want to find out if we're the right fit? Send a message — I respond within 24 hours.",
    url: "https://webwitch.click/en/contact",
    locale: "en_IL",
  },
  alternates: {
    canonical: "https://webwitch.click/en/contact",
    languages: {
      "he": "https://webwitch.click/he/contact",
      "en": "https://webwitch.click/en/contact",
      "x-default": "https://webwitch.click/he/contact",
    },
  },
};
// Hebrew Contact
export const metadata = {
  title: "צור קשר — בואי נבנה משהו ביחד | Web Witch",
  description: "מעוניינת באתר שמייצג אותך לאמיתי? דברי איתי — אני לוקחת 2-3 פרויקטים בחודש כדי לתת לכל לקוחה תשומת לב מלאה.",
  openGraph: {
    title: "צור קשר | Web Witch",
    description: "רוצה לדעת אם אנחנו מתאימות? שלחי לי הודעה — אתגובה תוך 24 שעות.",
    url: "https://webwitch.click/he/contact",
    locale: "he_IL",
  },
  alternates: {
    canonical: "https://webwitch.click/he/contact",
    languages: {
      "he": "https://webwitch.click/he/contact",
      "en": "https://webwitch.click/en/contact",
      "x-default": "https://webwitch.click/he/contact",
    },
  },
};
function Contact({ lang, initialDict }: Props) {
  const { t } = useTranslation('contact', initialDict);
  const theme = useCustomTheme();
  const { isFullyReady } = useSmoothReady({ delay: 300 });
  const { animateIndex, animateFont } = useSplitTextAnimation([t.title], lang);
  return (
    <MotionMainWrapper      
     isReady={isFullyReady}
    initial={{ opacity: 0, y: 20 }}
    animate={isFullyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}>
      <ContactMainPageContainer>
        <IconsContactWrapper>
          <SocialLinks />
        </IconsContactWrapper>
        <ContactHeaderContainer>
          <DecoTagSmart
            text={'<h2>'}
            isPrimaryTag={false}
            style={{
              position: 'absolute',
              left: '-3rem',
              top: '-1rem',
            }}
          />
          <TextWrapper lang={lang}>
            <SplitText
              lang={lang}
              initialDict={initialDict}
              theme={theme}
              text={t.title}
              baseIndex={0}
              animateIndex={isFullyReady ? animateIndex : null}
              animateFont={isFullyReady ? animateFont : null}
              style={{
                fontSize: `${theme.size.fontH2}`,
              }}
            />
          </TextWrapper>

          <DecoTagSmart
            text={'</h2>'}
            isPrimaryTag={false}
            style={{
              position: 'absolute',
              right: '-5rem',
              bottom: '-1rem',
            }}
          />
        </ContactHeaderContainer>

        <ContactParagraphContainer>
          <DecoTagSmart
            text={'<p>'}
            isPrimaryTag={false}
            style={{
              position: 'absolute',
              left: '-1rem',
              top: '0',
            }}
          />
          <Paragraph theme={theme}>{t.subtitle}</Paragraph>

          <DecoTagSmart
            text={'</p>'}
            isPrimaryTag={false}
            style={{
              position: 'absolute',
              right: '0',
              bottom: '-1rem',
            }}
          />
        </ContactParagraphContainer>

        <ContactForm />

      </ContactMainPageContainer>
    </MotionMainWrapper>
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

import React from 'react';
import DecoTag from '@/styles/decoTag';
import { Paragraph } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import theme from '@/styles/theme';
import ContactForm from '@/components/contactForm';
import styled from '@emotion/styled';

export const ContactMainPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  left: clamp(2rem, 15vw, 12rem);
  width: clamp(80vw, 90vw, 100vw);

  @media (max-width: 1220px) {
    left: 0;
    bottom: 0;
    height: 92%;
    width: 100vw;
  }
`;

const DecoTagWrapper = styled(DecoTag)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ContactHeaderContainer = styled.div`
  display: flex;
  font-weight: 900;
  letter-spacing: clamp(2px, 0.5vw, 4px);
  font-size: clamp(3rem, 3.8vw, 6rem);
  align-items: center;
  flex-direction: column;
`;

export const ContactParagraphContainer = styled.div`
  width: clamp(55vw, 75vw, 90vw);
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Contact() {
  return (
    <ContactMainPageContainer>
      <ContactHeaderContainer>
        <DecoTag
          text={'<h2>'}
          isSpecial={false}
          style={{
            position: 'relative',
            right: 'clamp(6rem, calc(7rem + (100vw + 320px) * 0.015), 8rem)',
            top: '0',
          }}
        />

        <SplitText
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          text='Let’s_Talk!'
        />

        <DecoTag
          text={'</h2>'}
          isSpecial={false}
          style={{
            position: 'relative',
            left: 'clamp(6rem, calc(7rem + (100vw + 320px) * 0.015), 8rem)',
            top: '0',
          }}
        />
      </ContactHeaderContainer>

      <ContactParagraphContainer>
        <DecoTag
          text={'<p>'}
          isSpecial={false}
          style={{
            position: 'relative',
            left: 'clamp(1.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            top: '0',
          }}
        />
        <Paragraph theme={theme}>And Create Something Extraordinary</Paragraph>
        <DecoTag
          text={'</p>'}
          isSpecial={false}
          style={{
            position: 'relative',
            left: 'clamp(-1.5rem, calc(-10rem + (100vw - 320px) * 0.015), -7rem)',
            bottom: '-3rem',
          }}
        />
      </ContactParagraphContainer>

      <ContactForm theme={theme} />

      <DecoTagWrapper
        text={'</body>'}
        isSpecial={false}
        style={{
          position: 'relative',
          left: 'clamp(26rem, calc(30rem + (100vw - 340px) ), 35rem)',
          top: '2rem',
        }}
      />
      <DecoTagWrapper
        text={'</html>'}
        isSpecial={false}
        style={{
          position: 'relative',
          left: 'clamp(30rem, calc(35rem + (100vw - 340px) ), 40rem)',
          top: '4rem',
        }}
      />
    </ContactMainPageContainer>
  );
}

export default Contact;

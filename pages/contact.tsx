import React from 'react';
import DecoTag from '@/styles/decoTag';
import { Paragraph } from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import theme from '@/styles/theme';
import ContactForm from '@/components/contactForm';
import styled from '@emotion/styled';

export const ContactMainPageContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  left: clamp(2rem, 15vw, 12rem);
  width: clamp(80vw, 90vw, 100vw);

  @media (max-width: 1510px) {
    text-align: center;
  }
  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
  }

  @media (max-width: 768px) {
    width: 100vw;
    left: 0;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
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

  @media (max-width: 1510px) {
    width: 40vw;
    min-width: 40vw;
  }

  @media (max-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    flex-direction: row;
    align-items: center;
    font-size: clamp(7vw, 7.5vw, 12vw);
    line-height: 0.3;
    margin-top: 3.5rem;
  }

  @media (max-width: 428px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1510px) {
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
    letter-spacing: 0;
    line-height: 0;
    padding: 1rem;
  }
`;
export const ContactParagraphContainer = styled.div`
  width: clamp(60%, 75%, 90%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 55vw;

  @media (max-width: 1510px) {
    padding: 0 1rem;
    width: 50vw;
    margin: auto;
  }
  @media (max-width: 1220px) {
    padding: 0 1rem;
    width: 50vw;
    margin: auto;
  }

  @media (max-width: 768px) {
    width: 100vw;
    min-width: 100vw;
  }
`;
function Contact() {
  return (
    <ContactMainPageContainer>
      <ContactHeaderContainer>
        <DecoTag
          text={'<h2>'}
          isSpecial={false}
          style={{ marginRight: '2rem' }}
        />

        <ContactHeader>
          <SplitText
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            text='Contact  Me'
          />
        </ContactHeader>

        <DecoTag
          text={'</h2>'}
          isSpecial={false}
          style={{ marginLeft: '2rem' }}
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
        <Paragraph theme={theme}>
          I would love to hear from you and promising to return an email 😎
        </Paragraph>
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
          marginLeft: 'auto',
          marginRight: '4rem',
          marginBottom: '1rem',
        }}
      />
      <DecoTag
        text={'</html>'}
        isSpecial={false}
        style={{
          position: 'relative',
          left: 'clamp(6rem, calc(7.5rem + (100vw - 340px) ), 9rem)',
          top: '3rem',
        }}
      />
    </ContactMainPageContainer>
  );
}

export default Contact;

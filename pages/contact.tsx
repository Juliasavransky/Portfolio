import React from 'react';
import DecoTag from '@/styles/decoTag';
import {
  Header,
  HeaderContainer,
  MainPageContainer,
  Paragraph,
  ParagraphContainer,
  Spacer,
} from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import theme from '@/styles/theme';
import ContactForm from '@/components/contactForm';

function Contact() {
  return (
    <MainPageContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <HeaderContainer
        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '0' }}
      >
        <span style={{ marginRight: '2rem' }}>
          <DecoTag text={'<h2>'} />
        </span>

        <Header style={{ width: '100%' }}>
          <SplitText style={{ fontSize: '4.5rem' }} text='Contact' />
          <Spacer />
          <SplitText style={{ fontSize: '4.5rem' }} text='me' />
        </Header>

        <span style={{ marginLeft: '2rem' }}>
          <DecoTag text={'</h2>'} />
        </span>
      </HeaderContainer>

      <ParagraphContainer style={{ width: '50%' }}>
        <span style={{ margin: 'auto' }}>
          <DecoTag text={'<p>'} />
        </span>
        <Paragraph theme={theme}>
          I would love to hear from you and promising to return an email 😎
        </Paragraph>
        <span style={{ margin: 'auto' }}>
          <DecoTag text={'</p>'} />
        </span>
      </ParagraphContainer>
      <ContactForm theme={theme} />
      <span style={{ marginLeft: 'auto', marginRight: '4rem' }}>
        <DecoTag text={'</body>'} />
      </span>
      <span style={{ marginLeft: 'auto' }}>
        <DecoTag text={'</html>'} />
      </span>
    </MainPageContainer>
  );
}

export default Contact;

import DecoTag from '@/styles/decoTag';
import {
  Header,
  HeaderContainer,
  MainPageContainer,
  Spacer,
} from '@/styles/layoutComponents';
import SplitText from '@/utils/splitText';
import styled from '@emotion/styled';
import React from 'react';
import { Theme } from '@emotion/react';
import theme from '@/styles/theme';

type ContactProps = {
  theme: Theme;
};
const Form = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input<{ theme: Theme }>`
  margin: 1rem 0;
  font-size: ${theme.size.fontSmall};
  color: ${theme.colors.greyLight1};
  padding: 1rem 1.5rem;
  background-color: rgba(#8d8d8d, 0.5);
  border: none;
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0.5rem 2rem rgba(#8d8d8d, 0.5);
    border-bottom: 3px solid rgba(#ffcc00, 1);
  }

  &:focus:invalid {
    border-bottom: 3px solid red;
  }

  &::placeholder {
    color: ${theme.colors.greyLight1};
  }
`;

const TextArea = styled.textarea<{ theme: Theme }>`
  resize: none;
  width: 100%;
  height: 10rem;
  margin: 1rem 0;
  font-size: ${theme.size.fontSmall};
  color: ${theme.colors.greyLight1};
  padding: 1.5rem 2rem;
  border-radius: 2px;
  background-color: rgba(#8d8d8d, 0.5);
  border: none;
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;

  &:focus {
    outline: none;
    box-shadow: 0 0.5rem 2rem rgba(#8d8d8d, 0.5);
    border-bottom: 3px solid rgba(#ffcc00, 1);
  }

  &:focus:invalid {
    border-bottom: 3px solid red;
  }

  &::placeholder {
    color: ${theme.colors.greyLight1};
  }
`;

const ContactBtn = styled.button<{ theme: Theme }>`
  margin-top: 1rem;
  padding: 1.5rem;
  border: none;
  outline: none;
  background-color: rgba(#7b7b7d, 0.5);
  color: ${theme.colors.greyLight1};
  font-size: ${theme.size.fontSmall};
  text-align: center;
  cursor: pointer;
`;
function Contact({ theme }: ContactProps) {
  return (
    <MainPageContainer
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <HeaderContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ marginRight: '2rem' }}>
          <DecoTag text={'<h2>'} />
        </span>

        <Header>
          <SplitText style={{ fontSize: '4.5rem' }} text='Contact' />
          <Spacer />
          <SplitText style={{ fontSize: '4.5rem' }} text='me' />
        </Header>

        <span style={{ marginLeft: '2rem' }}>
          <DecoTag text={'</h2>'} />
        </span>
      </HeaderContainer>

      <span style={{ marginLeft: '2rem' }}>
        <DecoTag text={'<p>'} />
      </span>
      <p>I would love to hear from you and promising to return an email 😎</p>
      <span style={{ marginLeft: '2rem' }}>
        <DecoTag text={'</p>'} />
      </span>

      <Form>
        <span style={{ marginLeft: '2rem' }}>
          <DecoTag text={'<form>'} />
        </span>

        <FormGroup>
          <Input
            type='text'
            theme={theme}
            placeholder='Name'
            required
            style={{ width: '50%' }}
          ></Input>
          <Input
            required
            style={{ width: '50%' }}
            type='email'
            theme={theme}
            placeholder='Email'
          ></Input>
        </FormGroup>
        <Input required type='text' theme={theme} placeholder='Subject'></Input>
        <TextArea required theme={theme} placeholder='Message'></TextArea>
        <ContactBtn theme={theme}>Send message!</ContactBtn>
        <span style={{ marginLeft: 'auto' }}>
          <DecoTag text={'</form>'} />
        </span>
      </Form>

      <span style={{ marginLeft: 'auto' }}>
        <DecoTag text={'</body>'} />
      </span>
      <span style={{ marginLeft: 'auto' }}>
        <DecoTag text={'</html>'} />
      </span>
    </MainPageContainer>
  );
}

export default Contact;

import React, { FormEvent, useState } from 'react';
import DecoTag from '@/styles/decoTag';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';
import theme from '@/styles/theme';

type contactFormProps = {
  theme: Theme;
};
const Form = styled.form`
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

  &:disabled {
    border: 1px solid red;
  }
`;

function contactForm({ theme }: contactFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [massage, setMassage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          subject,
          massage,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  //   const onBlur = ({ target }) =>
  //     setFocused((prev) => ({ ...prev, [target.name]: true }));

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <span style={{ marginRight: 'auto' }}>
          <DecoTag text={'<form>'} />
        </span>

        <FormGroup>
          <Input
            // onBlur={onBlur}
            type='text'
            theme={theme}
            placeholder='Name'
            required
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '50%' }}
          ></Input>
          <Input
            // onBlur={onBlur}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '50%' }}
            type='email'
            theme={theme}
            name='email'
            value={email}
            placeholder='Email'
          ></Input>
        </FormGroup>
        <Input
          //   onBlur={onBlur}
          required
          type='text'
          onChange={(e) => setSubject(e.target.value)}
          theme={theme}
          placeholder='Subject'
          value={subject}
          name='subject'
        ></Input>
        <TextArea
          //   onBlur={onBlur}
          required
          onChange={(e) => setMassage(e.target.value)}
          theme={theme}
          placeholder='Massage'
          value={massage}
          name='massage'
        ></TextArea>
        <ContactBtn
          theme={theme}
          disabled={!name || !email || !subject || !massage}
        >
          Send message!
        </ContactBtn>
        <span style={{ marginLeft: 'auto', marginTop: '1rem' }}>
          <DecoTag text={'</form>'} />
        </span>
      </Form>
    </div>
  );
}

export default contactForm;

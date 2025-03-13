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
  width: clamp(300px, 50%, 600px);
  flex-direction: column;
  margin-top: 3rem;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 clamp(0.5rem, 2vw, 2rem);
`;

const Input = styled.input<{ theme: Theme }>`
  margin: 1vh 0;
  font-size: ${theme.size.fontSmall};
  color: ${theme.colors.greyLight1};
  padding: clamp(0.75rem, 1vw, 1rem) clamp(1rem, 1.5vw, 1.5rem);
  background-color: rgba(#8d8d8d, 0.5);
  border: none;
  transition: box-shadow 0.3s;
  max-height: 5vh;

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
  height: clamp(8rem, 10vw, 12rem);
  max-height: 15vh;
  margin: 1vh 0;
  font-size: ${theme.size.fontSmall};
  color: ${theme.colors.greyLight1};
  padding: clamp(1rem, 1.5vw, 1.5rem) clamp(1.5rem, 2vw, 2rem);
  border-radius: 2px;
  background-color: rgba(#8d8d8d, 0.5);
  border: none;
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;

  &:focus ~ button {
  background-color: rgba(123, 123, 125, 0.5) ;
  outline: none;
}

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
  margin-top: 1vh;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border: none;
  background-color: rgba(#7b7b7d, 0.5);
  color: ${theme.colors.white};
  font-size: ${theme.size.fontSmall};
  max-height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function ContactForm({ theme }: contactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  interface HandleSubmitEvent extends FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <DecoTag text={'<form>'} isPrimaryTag={true} />
        <FormGroup>
          <Input
            type='text'
            name='name'
            placeholder='Name'
            required
            value={formData.name}
            onChange={handleChange}
            theme={theme}
            style={{ width: '50%' }}
          />
          <Input
            type='email'
            name='email'
            placeholder='Email'
            required
            value={formData.email}
            onChange={handleChange}
            theme={theme}
            style={{ width: '50%' }}
          />
        </FormGroup>

        <Input
          type='text'
          name='subject'
          placeholder='Subject'
          required
          value={formData.subject}
          onChange={handleChange}
          theme={theme}
        />
        <TextArea
          name='message'
          placeholder='Message'
          required
          value={formData.message}
          onChange={handleChange}
          theme={theme}
        />
        <ContactBtn
          type='submit'
          disabled={loading || Object.values(formData).some((v) => !v)}
          theme={theme}
        >
          {loading ? 'Sending...' : 'Send message!'}
        </ContactBtn>
        <DecoTag text={'</form>'} isPrimaryTag={false} />
      </Form>

      {showPopup && (
        <div className='popup'>
          <p>💌 ההודעה נשלחה בהצלחה!</p>
        </div>
      )}

      <style jsx>{`
        .popup {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffcc00;
          color: #4b116f;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 2.5s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }
      `}</style>
    </>
  );
}

export default ContactForm;

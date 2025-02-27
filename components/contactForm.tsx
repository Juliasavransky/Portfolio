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

  @media (max-width: 768px) {
    margin-top: 3rem;
    width: 85%;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
  }
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0 clamp(0.5rem, 2vw, 2rem);

  @media (max-width: 768px) {
    margin-top: 1rem;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
  }
`;

const Input = styled.input<{ theme: Theme }>`
  margin: 1vh 0;
  font-size: ${theme.size.fontSmall};
  color: ${theme.colors.greyLight1};
  padding: clamp(0.75rem, 1vw, 1rem) clamp(1rem, 1.5vw, 1.5rem);
  background-color: rgba(#8d8d8d, 0.5);
  border: none;
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;
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

  @media (max-width: 768px) {
    min-height: 6vh;
    max-height: 7vh;
    height: 6vh;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
    min-height: 10vh;
    max-height: 17vh;
    height: 8vh;
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

  @media (max-width: 768px) {
    min-height: 17vh;
    max-height: 25vh;
    height: 17vh;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
    min-height: 25vh;
    max-height: 35vh;
    height: 25vh;
  }
`;

const ContactBtn = styled.button<{ theme: Theme }>`
  margin-top: 1vh;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border: none;
  outline: none;
  background-color: rgba(#7b7b7d, 0.5);
  color: ${theme.colors.white};
  font-size: ${theme.size.fontSmall};
  max-height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    /* border: 1px solid red; */
  }

  @media (max-width: 768px) {
    min-height: 6vh;
    max-height: 7vh;
    height: 6vh;
  }

  @media (max-width: 428px) {
  }

  @media (max-width: 320px) {
    min-height: 10vh;
    max-height: 17vh;
    height: 8vh;
  }
`;

function contactForm({ theme }: contactFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      email,
      subject,
      message,
    };

    console.log('Sending data:', formData); // לוודא שכל הנתונים קיימים

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // חייב להגדיר JSON
      },
      body: JSON.stringify(formData), // לשלוח את הנתונים בפורמט JSON
    });

    const responseData = await res.json();
    console.log('res', res);

    if (!res.ok) {
      console.error('Error:', responseData.message);
    } else {
      console.log('Success:', responseData.message);
    }
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    // הצגת ה-Pop-up
    setShowPopup(true);
    // הסתרה אוטומטית אחרי 3 שניות
    setTimeout(() => setShowPopup(false), 3000);

    setLoading(false); // מסמן שהתהליך הסתיים
  };

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <span style={{ marginRight: 'auto' }}>
        <DecoTag text={'<form>'} isSpecial={false} />
      </span>

      <FormGroup>
        <Input
          onBlur={() => {
            onblur;
          }}
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
          onBlur={() => {
            onblur;
          }}
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
        onBlur={() => {
          onblur;
        }}
        required
        type='text'
        placeholder='Subject'
        onChange={(e) => setSubject(e.target.value)}
        theme={theme}
        value={subject}
        name='subject'
      ></Input>
      <TextArea
        onBlur={() => {
          onblur;
        }}
        required
        onChange={(e) => setMessage(e.target.value)}
        theme={theme}
        placeholder='Message'
        value={message}
        name='message'
      ></TextArea>
      <ContactBtn
        theme={theme}
        type='submit'
        disabled={!name || !email || !subject || !message || loading}
      >
        {loading ? 'Sending.....' : 'Send message!'}
      </ContactBtn>
      <span style={{ marginLeft: 'auto', marginTop: '1rem' }}>
        <DecoTag text={'</form>'} isSpecial={false} />
      </span>
    </Form>
          {showPopup && (
            <div className="popup">
              <p>💌 ההודעה נשלחה בהצלחה!</p>
            </div>
          )}
    
          <style jsx>{`
            .popup {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: #d4de18;
              color: white;
              padding: 15px 25px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              animation: fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 2.5s;
            }
    
            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
    
            @keyframes fadeOut {
              from { opacity: 1; transform: translate(-50%, 0); }
              to { opacity: 0; transform: translate(-50%, -20px); }
            }
          `}</style>
        </>
  );
}

export default contactForm;

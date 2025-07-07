import React, { FormEvent, useState } from 'react';
import DecoTagSmart from '@/styles/decoTagSmart';
import { useTranslation } from '@/hooks/useTranslation';
import { DecoTagWrapper } from '@/styles/layoutComponents';
import { useTheme } from '@emotion/react';
import {
  Form,
  FormGroup,
  Input,
  TextArea,
  ContactBtn,
} from '@/styles/contactFormComponents';
import MailErrorPopup from './MailErrorPopup'; 

const ContactForm: React.FC = () => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  const lang = 'he'; // Define the lang variable

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Network response error');

      setShowPopup(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending form:', error);
      setErrorPopup(true); // הצג את הפופאפ
      setTimeout(() => {
        setShowPopup(false);
        setErrorPopup(false);
      }, 12000);
    } finally {
      setLoading(false);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <DecoTagSmart
          style={{
            position: 'absolute',
            top: '-2rem',
            left: '0',
          }}
          text={'<form>'}
          isPrimaryTag={true}
        />
        <FormGroup>
          <Input
            lang={lang}
            type='text'
            name='name'
            placeholder={t.name}
            required
            value={formData.name}
            onChange={handleChange}
            theme={theme}
            style={{ width: '50%' }}
          />
          <Input
            lang={lang}
            type='email'
            name='email'
            placeholder={t.email}
            required
            value={formData.email}
            onChange={handleChange}
            theme={theme}
            style={{ width: '50%' }}
          />
        </FormGroup>

        <Input
          lang={lang}
          type='text'
          name='subject'
          placeholder={t.subject}
          required
          value={formData.subject}
          onChange={handleChange}
          theme={theme}
        />
        <TextArea
          lang={lang}
          name='message'
          placeholder={t.message}
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
          {loading ? t.sending : t.send}
        </ContactBtn>
        <DecoTagSmart
          text={'</form>'}
          isPrimaryTag={false}
          style={{
            position: 'absolute',
            bottom: '-2.5rem',
            right: '0',
          }}
        />
        <DecoTagWrapper
          text={'</body>'}
          isPrimaryTag={false}
          style={{
            position: 'absolute',
            right: '-5rem',
            bottom: '-5rem',
          }}
        />
        <DecoTagWrapper
          text={'</html>'}
          isPrimaryTag={false}
          style={{
            position: 'absolute',
            right: '-8rem',
            bottom: '-8rem',
          }}
        />
      </Form>
      {showPopup && (
        <div className='popup'>
          <p>{t.sent}</p>
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

      {errorPopup && (
        <MailErrorPopup onClose={() => setErrorPopup(false)} />
      )}

    </>
  );
};

export default ContactForm;

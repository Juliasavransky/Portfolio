import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  width: clamp(18.75rem, 50%, 37.5rem);
  flex-direction: column;
  margin-top: 3rem;
  position: relative;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 clamp(0.5rem, 2vw, 2rem);
`;

export const Input = styled.input<{ lang: 'he' | 'en' }>`
  margin: 1vh 0;
  font-size: ${({ theme }) => theme.size.fontSmall};
  color: ${({ theme }) => theme.colors.white};
  padding: clamp(0.75rem, 1vw, 1rem) clamp(1rem, 1.5vw, 1.5rem);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.3s;
  direction: ${({ lang }) => (lang === 'he' ? 'rtl' : 'ltr')};
  text-align: ${({ lang }) => (lang === 'he' ? 'right' : 'left')};


  &:focus {
    outline: none;
    box-shadow: 0 0.5rem 2rem rgba(141, 141, 141, 0.5);
    border-bottom: 3px solid #ffcc00;
  }

  &:focus:invalid {
    border-bottom: 3px solid red;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyLight1};
  }
`;

export const TextArea = styled.textarea<{ lang: 'he' | 'en' }>`
  resize: none;
  width: 100%;
  height: clamp(8rem, 10vw, 12rem);
  margin: 1vh 0;
  font-size: ${({ theme }) => theme.size.fontSmall};
  color: ${({ theme }) => theme.colors.white};
  padding: clamp(1rem, 1.5vw, 1.5rem) clamp(1.5rem, 2vw, 2rem);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;
  direction: ${({ lang }) => (lang === 'he' ? 'rtl' : 'ltr')};
  text-align: ${({ lang }) => (lang === 'he' ? 'right' : 'left')};

  &:focus {
    outline: none;
    box-shadow: 0 0.5rem 2rem rgba(141, 141, 141, 0.5);
    border-bottom: 3px solid #ffcc00;
  }

  &:focus:invalid {
    border-bottom: 3px solid red;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.greyLight1};
  }
`;

export const ContactBtn = styled.button`
  margin-top: 1vh;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border-radius: 3px;
  border: none;
  background-color: rgba(123, 123, 125, 0.5);
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.size.fontSmall};
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(75, 17, 111, 0.7);
  }
`;

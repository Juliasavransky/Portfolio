import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  width: clamp(300px, 50%, 600px);
  flex-direction: column;
  margin-top: 3rem;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 clamp(0.5rem, 2vw, 2rem);
`;

export const Input = styled.input<{ lang: 'he' | 'en' }>`
  margin: 1vh 0;
  font-size: ${({ theme }) => theme.size.fontSmall};
  color: ${({ theme }) => theme.colors.greyLight1};
  padding: clamp(0.75rem, 1vw, 1rem) clamp(1rem, 1.5vw, 1.5rem);
  background-color: rgba(141, 141, 141, 0.5);
  border: none;
  transition: box-shadow 0.3s;
  max-height: 5vh;
  direction: ltr;
  text-align: left;


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
    direction: ${({ lang }) => (lang === 'he' ? 'rtl' : 'ltr')};
    text-align: ${({ lang }) => (lang === 'he' ? 'right' : 'left')};
  }
`;

export const TextArea = styled.textarea<{ lang: 'he' | 'en' }>`
  resize: none;
  width: 100%;
  height: clamp(8rem, 10vw, 12rem);
  max-height: 15vh;
  margin: 1vh 0;
  font-size: ${({ theme }) => theme.size.fontSmall};
  color: ${({ theme }) => theme.colors.greyLight1};
  padding: clamp(1rem, 1.5vw, 1.5rem) clamp(1.5rem, 2vw, 2rem);
  border-radius: 2px;
  background-color: rgba(141, 141, 141, 0.5);
  border: none;
  box-shadow: 0 1rem 2rem transparent;
  transition: transform 0.3s;
  direction: ltr; /* שומר על הכיוון הכללי של השדה */
  text-align: left;

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
    direction: ${({ lang }) => (lang === 'he' ? 'rtl' : 'ltr')};
    text-align: ${({ lang }) => (lang === 'he' ? 'right' : 'left')};
  }
`;

export const ContactBtn = styled.button`
  margin-top: 1vh;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border: none;
  background-color: rgba(123, 123, 125, 0.5);
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.size.fontSmall};
  max-height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

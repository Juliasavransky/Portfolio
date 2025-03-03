import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const MainPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90vw;
  position: absolute;
  left: clamp(2rem, 15vw, 12rem);

  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
  font-size: clamp(2.5rem, 4vw, 5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 90%;
  letter-spacing: clamp(1px, 0.3vw, 3px);

  @media (max-width: 768px) {
    width: 95vw;
    max-width: 95vw;
    flex-direction: column;
    font-size: clamp(6vw, 7vw, 10vw);
    font-size: clamp(5vw, 6vw, 8vw);
    margin-top: 5rem;
  }

  @media (max-width: 428px) {
    font-size: clamp(6vw, 9vw, 10vw);
    margin-top: 0;
  }

  @media (max-width: 320px) {
    margin-top: 3rem;
  }
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 80%;
  gap: 0.2em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }
`;

export const Spacer = styled.span`
  margin-left: clamp(0.5rem, 1.5vw, 2rem);
`;

export const Paragraph = styled.p<{ theme: Theme }>`
  font-size: clamp(1.25rem, 1.875vw, 1.5rem);
  font-weight: 400;
  margin: 1rem auto;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    min-width: 90%;
  }
`;

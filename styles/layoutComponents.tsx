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
  /* left: 5vw; */
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
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
  letter-spacing: clamp(0.5px, 0.2vw, 2px);
  font-size: clamp(2.5rem, 4vw, 5rem);
  text-align: center;
  line-height: 1.2;
  max-width: 90%;
  word-wrap: break-word;
  margin-top: 3rem;

  letter-spacing: clamp(1px, 0.3vw, 3px);

  @media (max-width: 1510px) {
    width: 40vw;
    min-width: 40vw;
    flex-direction: column;
    margin-left: 0;
  }

  @media (max-width: 768px) {
    width: 95vw;
    max-width: 95vw;
    flex-direction: column;
    font-size: clamp(6vw, 7vw, 10vw);
    letter-spacing: clamp(0.5px, 0.2vw, 2px);
    line-height: 1.1;
    margin-top: 1rem;

    font-size: clamp(5vw, 6vw, 8vw);
    margin-top: 5rem;
  }

  @media (max-width: 428px) {
    font-size: clamp(8vw, 9vw, 12vw);
    letter-spacing: clamp(0px, 0.1vw, 1px);
    margin-top: 0.5rem;

    font-size: clamp(6vw, 7vw, 9vw);
    letter-spacing: 0px;
    margin-top: 5rem;
  }

  @media (max-width: 320px) {
    font-size: clamp(9vw, 10vw, 13vw);
    letter-spacing: 0px;
    margin-top: 3rem;

    /* font-size: clamp(7vw, 8vw, 10vw);
    margin-top: 1rem; */
  }
`;

export const Header = styled.div`
  /* align-items: baseline; */
  align-items: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  max-width: 80%;
  word-wrap: break-word;
  gap: 0.2em;

  @media (max-width: 1510px) {
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }
`;

export const Spacer = styled.span`
  /* margin-left: clamp(1rem, 2vw, 3rem); */

  margin-left: clamp(0.5rem, 1.5vw, 2rem);
`;

export const ParagraphContainer = styled.div`
  /* width: clamp(60%, 75%, 90%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: clamp(1.5rem, 2vh, 2rem); */

  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  max-width: 80%;
  word-wrap: break-word;

  @media (max-width: 1510px) {
    /* width: 50vw;
    max-width: 36vw; */
  }

  @media (max-width: 768px) {
    /* width: 90vw;
    min-width: 90vw;
    margin-top: 0; */

    width: 95%;
  }
`;

export const Paragraph = styled.p<{ theme: Theme }>`
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  font-weight: 400;
  margin: 1rem auto;
  text-align: center;
  max-width: 80%;
  word-wrap: break-word;
  /* margin: clamp(2rem, 1.5vw, 2rem) auto; */

  @media (max-width: 1220px) {
    /* width: 90vw; */
  }

  @media (max-width: 768px) {
    min-width: 90%;
  }
`;

import styled from '@emotion/styled';

export const ContactMainPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  left: clamp(2rem, 15vw, 12rem);
  width: clamp(80vw, 90vw, 100vw);

  @media (max-width: 1220px) {
    left: 0;
    bottom: 0;
    height: 92%;
    width: 100vw;
  }
`;

export const IconsContactWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    width: 90%;
  }
`;

export const ContactHeaderContainer = styled.div`
  display: flex;
  font-weight: 600;
  letter-spacing: clamp(2px, 0.5vw, 4px);
  font-size: clamp(3rem, 3.8vw, 6rem);
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const ContactParagraphContainer = styled.div`
  /* width: clamp(55vw, 75vw, 90vw); */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

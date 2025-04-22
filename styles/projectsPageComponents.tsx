import styled from '@emotion/styled';

export const ProjectsContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: absolute;
  justify-content: center;
  left: clamp(2rem, 15vw, 12rem);
  width: clamp(80vw, 90vw, 100vw);
  align-items: center;
  
  @media (max-width: 1220px) {
    left: 0;
    width: 100vw;
    flex-wrap: wrap;
    text-align: center ;
  }
  @media (max-width: 428px) {
    left: 0;
    width: 100vw;
    flex-wrap: wrap;
    text-align: center;
  }
`;

export const ProjectsHeaderContainer = styled.div`
  font-weight: 600;
  letter-spacing: clamp(2px, 0.5vw, 4px);
  font-size: clamp(3rem, 3.8vw, 6rem);
  width: 100%;
  text-align: center;

  @media (max-width: 428px) {
    text-align: center;
  }
`;
export const ProjectsHeader = styled.div`
  font-size: clamp(3rem, 6vw, 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  text-align: center;
  position: relative;
  
  @media (max-width: 428px) {
    font-size: 2.5rem;
    flex-direction: column;
    flex-wrap: wrap;
    line-height: 0.7;
  }
`;
export const SmallTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SmallTitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 100;
  text-align: center;
  margin-top: 1.5rem;
`;

export const CardWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1590px;
`;
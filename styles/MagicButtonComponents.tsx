import styled from '@emotion/styled';


export const Btn = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 36vw;
  height: 20vh;

  @media (max-width: 1220px) {
    flex-direction: column;
    width: 70vw;
    height: 22vh;
  }
  @media (max-width: 768px) {
    width: 95vw;
  }
`;

export const BtnMainPage = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  perspective: 1000px;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  text-align: center;
  margin: 0 auto;
  position: relative;

  a {
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-2rem);
    transition: transform 0.4s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateZ(-2rem) rotateX(-90deg);
    }

    &.force-hover {
      transform: translateZ(-2rem) rotateX(-90deg);
    }
  }
`;

export const Face = styled.div`
  position: absolute;
  height: 5rem;
  width: clamp(16rem, 25vw, 35rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 5px solid ${({ theme }) => theme.colors.purple};
  background: ${({ theme }) => theme.colors.greyDarkBG1 };
  color: ${({ theme }) => theme.colors.yellow};
  font-weight: 100;

  @media (max-width: 1220px) {
    width: 64vw;
  }
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const Front = styled(Face)`
  transform: rotateY(0deg) translateZ(2rem);
`;

export const Back = styled(Face)`
  transform: rotateX(90deg) translateZ(2rem);
`;



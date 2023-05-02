import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const MainPageContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  /* flex: 0 0 84.99%; */
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  left: 12rem;
  padding-top: 2rem;
  width: 90%;
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 900;
  letter-spacing: 4px;
  margin-left: 11rem;
`;
export const Header = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const Spacer = styled.span`
  margin-left: 3rem;
`;

export const ParagraphContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 4rem;
`;
export const Paragraph = styled.p<{ theme: Theme }>`
  font-size: 1.5rem;
  font-weight: 100;
  margin: 3rem auto;
`;

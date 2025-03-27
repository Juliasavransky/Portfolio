import styled from '@emotion/styled';

export const DesktopOnly = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Nav = styled.nav`
  flex: 0 0 clamp(5%, 10%, 15%);
  position: relative;
  z-index: 1000;

  @media (max-width: 1220px) {
    position: sticky;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    top: 0;
    width: 100vw;
    background-color: ${({ theme }) => theme.colors.greyDarkBG1};
  }
`;

export const SideBarNav = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1220px) {
    position: relative;
    transform: translateY(0);
    top: 0;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  min-width: 10vw;

  @media (max-width: 1220px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

interface NavItemProps {
  $active?: boolean;
}

export const NavItem = styled.li<NavItemProps>`
  box-sizing: content-box;
  font-size: ${({ theme }) => theme.size.fontSmall};
  position: relative;
  padding: clamp(1rem, 1.5rem, 2rem) clamp(1rem, 1.5rem, 2rem);
  letter-spacing: clamp(2px, 5px, 8px);
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight1};
  width: clamp(8vw, 10vw, 15vw);

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.colors.greyDarkBG1};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.yellow};
    transform: scaleY(0);
    transition: transform 0.3s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s;
  }

  /* &:hover {
    color: ${({ theme }) => theme.colors.greyDarkBG1};
  } */

  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }

  ${({ $active, theme }) =>
    $active &&
    `
    &::before {
      transform: scaleY(1);
      width: 100%;
    }
  `}

  @media (max-width: 1220px) {
    border-bottom: none;
    width: auto;
    padding: clamp(0.5rem, 2vw, 3rem);
  }
`;

interface NavLinkProps {
  $active: boolean;
  lang: 'he' | 'en';
}

export const NavLink = styled.a<NavLinkProps>`
  text-decoration: none;
  position: relative;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.greyDarkBG1 : theme.colors.greyLight1};
  font-weight: 500;
  

  &:hover {
    color: ${({ theme }) => theme.colors.greyDarkBG1};
  }
`;

export const Icons = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
    margin-top: 3rem;
  }

  @media (max-width: 1220px) {
    margin-top: 0;
    flex-direction: row;
    align-items: center;
  }
`;

import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  socialLinks,
  IconD,
} from "../components/socialLinks";
import { useRouter } from 'next/router';


const Nav = styled.nav`
  flex: 0 0 clamp(5%, 10%, 15%);
  position: relative;
  z-index: 1000;
  @media (max-width: 1510px) {
    
  }
  @media (max-width: 1220px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: sticky;
    top: 0;
    width: 100vw;
    background-color: ${(props) => props.theme.colors.greyDarkBG1};
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }
  `;

const SideBarNav = styled.div`
  position: fixed;
  margin-top: clamp(20vh, 30vh, 40vh);

  @media (max-width: 1220px) {
    position: relative;
    margin-top: 0;
  }
  
  @media (max-width: 768px) {
    width:100vw;
  }
  `;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  min-width: 10vw;
  
  @media (max-width: 1220px) {
    flex-direction: row;
    justify-content: space-around;
  }
  @media (max-width: 768px) {
    justify-content: center;
    border-bottom: 7px solid ${(props) => props.theme.colors.purple};
  }
  `;

const NavItem = styled.li`
  box-sizing: content-box;
  font-size: ${(props) => props.theme.size.fontSmall};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: ${(props) => props.theme.colors.yellow};
    transform: scaleY(0);
    transition:
    transform 0.3s,
    width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s;
  }
  &:hover {
    color:${(props) => props.theme.colors.greyDarkBG1};
  }
  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
  /* מצב active (מותאם לפי prop) */
  ${(props) =>
    props.$active &&
    `
    color: ${props.theme.colors.greyDarkBG1};

    &::before {
      transform: scaleY(1);
      width: 100%;
    }
  `}

  &:first-of-type {
    border-top: 1px solid ${(props) => props.theme.colors.greyDarkBG1};
  }
  padding: clamp(1rem, 1.5rem, 2rem) clamp(1rem, 1.5rem, 2rem);
  letter-spacing: clamp(2px, 5px, 8px);
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyLight1};
  width: clamp(8vw, 10vw, 15vw);
  
  @media (max-width: 1220px) {
    border-bottom: none;
    width: auto;
    padding: clamp(0.5rem, 2vw, 3rem);
  }
  @media (max-width: 768px) {
    padding:  clamp(0.7rem, 0.8rem,1rem) 0.5rem;
    font-size: clamp(0.8rem, 1rem, 1.5rem);
    font-weight: 500;
  }
  `;



const NavLink = styled.a`
  text-decoration: "none";
  position: relative;
color: ${(props) => props.theme.colors.greyLight1};
font-weight: 500;

@media (max-width: 768px) {
  margin-left: 0;
  letter-spacing: clamp(1px, 2.5px, 4px);
}
`;


const Icons = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
    margin-top: 3rem;
  }
  @media(max-width:1220px){
    margin-top:0;
    flex-direction:row;
    align-items:center;
  }
  `;

const navLinks = [
  { href: "/", pathname: "Home" },
  { href: "/skills", pathname: "About" },
  { href: "/projects", pathname: "Projects" },
  { href: "/contact", pathname: "Contact" },
];

function SideBar() {
  const router = useRouter();
  return (
    <Nav>
      <SideBarNav>
        <NavList>
          {navLinks.map(({ href, pathname }) => {
            const isActive = router.pathname === href;
            return (
              <NavItem key={href} $active={isActive}>
                <Link href={href} passHref legacyBehavior>
                  <NavLink
                    style={{ textDecoration: 'none' }}>
                    {pathname}
                  </NavLink>
                </Link>
              </NavItem>
            )
          })}

          <Icons>
            {socialLinks.map(({ href, title, icon, dataIcon }) => (
              <IconD key={title} data-icon={dataIcon}>
                <Link href={href} passHref legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer" title={title}>
                    <svg viewBox="0 0 32 32">
                      <title>{title}</title>
                      <path d={icon}></path>
                    </svg>
                  </a>
                </Link>
              </IconD>
            ))}
          </Icons>
        </NavList>
      </SideBarNav>
    </Nav>
  );
}

export default SideBar;

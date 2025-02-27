import { Theme as EmotionTheme } from "@emotion/react";

interface CustomTheme extends EmotionTheme {
  colors: {
    greyLight1: string;
    greyLight2: string;
    yellow: string;
  };
  size: {
    fontSmall: string;
  };
}
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
// import { useState } from 'react';

// const  [isOpen, setIsOpen] = useState(false);

const MobileNavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MobileNavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MobileNavBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
//  ☰

const MobileNavOpen = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
  }
`;

const IconD = styled.div`
  height: clamp(2rem, 2.5rem, 3rem);
  width: clamp(2rem, 2.5rem, 3rem);
  filter: invert(49%) sepia(1%) saturate(1741%) hue-rotate(201deg)
    brightness(98%) contrast(87%);
  cursor: pointer;
  &:hover {
    filter: invert(83%) sepia(34%) saturate(3975%) hue-rotate(359deg)
      brightness(105%) contrast(104%);
  }
  @media (max-width: 1220px) {
    margin: 0 1rem;
  }
`;
const NavLink = styled.span`
  text-decoration: "none";
  position: relative;
  color: red;
  z-index: 10;
  margin-left: clamp(0.5rem, 1rem, 1.5rem);
  &:hover {
    color: inherit;
  }
`;

interface CustomTheme extends EmotionTheme {
  colors: {
    greyLight1: string;
    greyLight2: string;
    yellow: string;
  };
  size: {
    fontSmall: string;
  };
}

const NavItem = styled.li`
  box-sizing: content-box;
  font-size: ${(props) => (props.theme as CustomTheme).size.fontSmall};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: ${(props) => (props.theme as CustomTheme).colors.yellow};
    transform: scaleY(0);
    transition:
      transform 0.3s,
      width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s;
  }
  &:hover {
    color: white;
  }
  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
  &:first-of-type {
    border-top: 1px solid
      ${(props) => (props.theme as CustomTheme).colors.greyLight2};
  }
  padding: clamp(1rem, 1.5rem, 2rem) clamp(1rem, 1.5rem, 2rem);
  letter-spacing: clamp(2px, 5px, 8px);
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid
    ${(props) => (props.theme as CustomTheme).colors.greyLight2};
  width: clamp(8vw, 10vw, 15vw);

  @media (max-width: 1220px) {
    border-bottom: none;
    width: auto;
    padding: clamp(0.5rem, 2vw, 3rem);
  }
  @media (max-width: 768px) {
    padding: clamp(1rem, 1.5rem, 2rem) clamp(1rem, 1vh, 3rem);
    /* font-size: clamp(1rem, 1.5rem, 2rem); */
  }
`;

function MobileNav() {
  return (
    <MobileNavContainer>
      <MobileNavContent>
        <div>
          <MobileNavBtn
          // onClick={() => setIsOpen(!isOpen)}
          >
            <IconD>☰</IconD>
          </MobileNavBtn>
        </div>
        <MobileNavOpen>
          <NavItem>
            <NavItem>
              <Link style={{ textDecoration: "none" }} href="/">
                <NavLink>About</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link style={{ textDecoration: "none" }} href="/projects">
                <NavLink>Projects</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link style={{ textDecoration: "none" }} href="/skills">
                <NavLink>Skills</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link style={{ textDecoration: "none" }} href="/contact">
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>
          </NavItem>
        </MobileNavOpen>
      </MobileNavContent>
    </MobileNavContainer>
  );
}

export default MobileNav;

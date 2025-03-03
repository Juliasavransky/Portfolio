import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Nav = styled.nav`
  flex: 0 0 clamp(5%, 10%, 15%);
  position: relative;
  @media (max-width: 1510px) {

  }
  @media (max-width: 1220px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    top: 0;
    width: 100%;
    margin: 0 auto;
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
width:90vw;
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
    color: white;
  }
  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
  &:first-of-type {
    border-top: 1px solid ${(props) => props.theme.colors.greyLight2};
  }
  padding: clamp(1rem, 1.5rem, 2rem) clamp(1rem, 1.5rem, 2rem);
  letter-spacing: clamp(2px, 5px, 8px);
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyLight2};
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

const NavLink = styled.span`
  text-decoration: "none";
  color: ${(props) => props.theme.colors.greyLight1};
  position: relative;

  &:hover {
    color: inherit;
  }
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


const navLinks = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/Juliasavransky/", title: "github", icon: "M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z" },
  { href: "https://www.linkedin.com/in/julia-savransky-perl/", title: "linkedin", icon: "M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z M2 12h6v18h-6v-18z M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z" },
  { href: "https://wa.me/972544772571", title: "whatsapp", icon: "M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zM16.069 29.050v0c-2.369 0-4.688-0.637-6.713-1.837l-0.481-0.288-4.987 1.306 1.331-4.863-0.313-0.5c-1.325-2.094-2.019-4.519-2.019-7.012 0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862 2.488 2.494 3.856 5.8 3.856 9.325-0.006 7.275-5.919 13.188-13.181 13.188zM23.294 19.175c-0.394-0.2-2.344-1.156-2.706-1.288s-0.625-0.2-0.894 0.2c-0.262 0.394-1.025 1.288-1.256 1.556-0.231 0.262-0.462 0.3-0.856 0.1s-1.675-0.619-3.188-1.969c-1.175-1.050-1.975-2.35-2.206-2.744s-0.025-0.613 0.175-0.806c0.181-0.175 0.394-0.463 0.594-0.694s0.262-0.394 0.394-0.662c0.131-0.262 0.069-0.494-0.031-0.694s-0.894-2.15-1.219-2.944c-0.319-0.775-0.65-0.669-0.894-0.681-0.231-0.012-0.494-0.012-0.756-0.012s-0.694 0.1-1.056 0.494c-0.363 0.394-1.387 1.356-1.387 3.306s1.419 3.831 1.619 4.1c0.2 0.262 2.794 4.269 6.769 5.981 0.944 0.406 1.681 0.65 2.256 0.837 0.95 0.3 1.813 0.256 2.494 0.156 0.762-0.113 2.344-0.956 2.675-1.881s0.331-1.719 0.231-1.881c-0.094-0.175-0.356-0.275-0.756-0.475z" },
];
function SideBar() {
  return (
    <Nav>
      <SideBarNav>
        <NavList>
          {navLinks.map(({ href, label }) => (
            <NavItem key={href}>
              <Link href={href}>
                <NavLink >{label}</NavLink>
              </Link>
            </NavItem>
          ))}

          <Icons>
          {socialLinks.map(({ href, title, icon }) => (
            <IconD key={title}>
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 32 32"><title>{title}</title><path d={icon}></path></svg>
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

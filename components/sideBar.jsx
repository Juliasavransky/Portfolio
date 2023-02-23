import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const Nav = styled.nav`
  color: ${(props) => props.theme.colors.yellow};
  flex: 0 0 13%;
  position: relative;
`;
const SideBarNav = styled.div`
  position: fixed;
`;

const NavList = styled.ul`
  margin-top: 35vh;
  display: flex;
  flex-direction: column;
  list-style: none;
`;
const NavItem = styled.li`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: ${(props) => props.theme.colors.yellow};
    transform: scaleY(0);
    transition: transform 0.3s, width 0.4s cubic-bezier(1, 0, 0, 1) 0.2s;
  }

  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }
  &:first-child {
    border-top: 1px solid ${(props) => props.theme.colors.greyLight2};
  }
  padding: 1.5rem 1.5rem;
  letter-spacing: 3px;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.colors.greyLight2};
  width: 13vw;
`;

const NavLink = styled.span`
  text-decoration: none;
  color: ${(props) => props.theme.colors.greyLight1};
  position: relative;
  z-index: 10;
  margin-left: 1rem;
`;
function SideBar() {
    return (
        <Nav>
            <SideBarNav>
                <NavList>
                    <NavItem>
                        <Link href='/'>
                            <NavLink>About</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href='/projects'>
                            <NavLink>Projects</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href='/skills'>
                            <NavLink>Skills</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href='/contact'>
                            <NavLink>Contact</NavLink>
                        </Link>
                    </NavItem>
                    <div className='icons'>
                        {/* <a target='_blank' href='https://github.com/Juliasavransky/'>
                <svg className='icon'>
                  <use xlink:href="./img/SVG/sprite.svg#icon-github"></use>
    
                </svg>
              </a> */}

                        {/* <a href="https://www.linkedin.com/in/julia-savransky-perl/" target="_blank">    <svg className="icon">
                <use xlink:href="./img/SVG/sprite.svg#icon-linkedin2"></use>
              </svg></a> */}

                        {/* <a href="https://bit.ly/34fcyP5" target="_blank">    <svg className="icon">
                <use xlink:href="./img/SVG/sprite.svg#icon-file-pdf"></use>
              </svg></a> */}
                    </div>
                </NavList>
            </SideBarNav>
        </Nav>
    );
}

export default SideBar;

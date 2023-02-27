import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import GitHub from '../public/svg/github.svg';
import Pdf from '../public/svg/file-pdf.svg';
import LikedIn from '../public/svg/linkedin2.svg';

const Nav = styled('nav')({
    color: `${(props) => props.theme.colors.yellow}`,
    flex: ' 0 0 13%',
    position: 'relative'
})

const SideBarNav = styled('div')({
    position: 'fixed'
})


const NavList = styled('ul')({
    marginTop: '35vh',
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
})

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

const NavLink = styled('span')({
    textDecoration: 'none',
    color: `${(props) => props.theme.colors.greyLight1}`,
    position: 'relative',
    zIndex: '10',
    marginLeft: '1rem'
})


const Icons = styled('div')({
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '10rem',
    border: '1px solid red',
})


const Icon = styled.svg({
    height: '3rem',
    width: '3rem',
    filter: 'invert(49 %) sepia(1%) saturate(1741 %) hue - rotate(201deg) brightness(98 %) contrast(87 %)',
    cursor: 'pointer',
    border: '1px solid red',


    '&:hover': {
        filter: 'invert(83 %) sepia(34 %) saturate(3975 %) hue - rotate(359deg) brightness(105 %) contrast(104 %)',
    }
})

function SideBar() {
    return (
        <Nav>
            <SideBarNav>
                <NavList>
                    <NavItem>
                        <Link style={{ textDecoration: 'none' }} href='/'>
                            <NavLink>About</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link style={{ textDecoration: 'none' }} href='/projects'>
                            <NavLink>Projects</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link style={{ textDecoration: 'none' }} href='/skills'>
                            <NavLink>Skills</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link style={{ textDecoration: 'none' }} href='/contact'>
                            <NavLink>Contact</NavLink>
                        </Link>
                    </NavItem>
                    <Icons >
                        <Icon>
                            <Link target='_blank' href='https://github.com/Juliasavransky/'>
                                {/* <GitHub /> */}
                            </Link>
                        </Icon>
                        <Icon>
                            <Link href="../pdf/Julia Savransky-Perl CV.pdf" alt="Julia Savransky-Perl CV" target="_blank">
                                {/* <Pdf /> */}
                            </Link>
                        </Icon>
                        <Icon>
                            <Link target='_blank' href='https://www.linkedin.com/in/julia-savransky-perl/'>
                                {/* <LikedIn /> */}
                            </Link>
                        </Icon>
                    </Icons>
                </NavList>
            </SideBarNav>
        </Nav>
    );
}

export default SideBar;

import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';


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
    // border: '1px solid red',
})


const Icon = styled.svg({
    height: '3rem',
    width: '3rem',
    filter: 'invert(49 %) sepia(1%) saturate(1741 %) hue - rotate(201deg) brightness(98 %) contrast(87 %)',
    cursor: 'pointer',
    // border: '1px solid red',
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
                                <svg width='2.9rem' height='2.9rem' viewBox='0 0 32 32'>
                                    <title>github</title>
                                    <path d='M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z'></path>
                                </svg>
                            </Link>
                        </Icon>
                        <Icon>
                            <Link href="../pdf/Julia Savransky-Perl CV.pdf" alt="Julia Savransky-Perl CV" target="_blank">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <title>file-pdf</title>
                                    <path d="M26.313 18.421c-0.427-0.42-1.372-0.643-2.812-0.662-0.974-0.011-2.147 0.075-3.38 0.248-0.552-0.319-1.122-0.665-1.568-1.083-1.202-1.122-2.205-2.68-2.831-4.394 0.041-0.16 0.075-0.301 0.108-0.444 0 0 0.677-3.846 0.498-5.146-0.025-0.178-0.040-0.23-0.088-0.369l-0.059-0.151c-0.184-0.425-0.545-0.875-1.111-0.85l-0.341-0.011c-0.631 0-1.146 0.323-1.281 0.805-0.411 1.514 0.013 3.778 0.781 6.711l-0.197 0.478c-0.55 1.34-1.238 2.689-1.846 3.88l-0.079 0.155c-0.639 1.251-1.22 2.313-1.745 3.213l-0.543 0.287c-0.040 0.021-0.97 0.513-1.188 0.645-1.852 1.106-3.079 2.361-3.282 3.357-0.065 0.318-0.017 0.725 0.313 0.913l0.525 0.264c0.228 0.114 0.468 0.172 0.714 0.172 1.319 0 2.85-1.643 4.959-5.324 2.435-0.793 5.208-1.452 7.638-1.815 1.852 1.043 4.129 1.767 5.567 1.767 0.255 0 0.475-0.024 0.654-0.072 0.276-0.073 0.508-0.23 0.65-0.444 0.279-0.42 0.335-0.998 0.26-1.59-0.023-0.176-0.163-0.393-0.315-0.541zM6.614 25.439c0.241-0.658 1.192-1.958 2.6-3.111 0.088-0.072 0.306-0.276 0.506-0.466-1.472 2.348-2.458 3.283-3.106 3.577zM14.951 6.24c0.424 0 0.665 1.069 0.685 2.070s-0.214 1.705-0.505 2.225c-0.241-0.77-0.357-1.984-0.357-2.778 0 0-0.018-1.517 0.177-1.517v0zM12.464 19.922c0.295-0.529 0.603-1.086 0.917-1.677 0.765-1.447 1.249-2.58 1.609-3.511 0.716 1.303 1.608 2.41 2.656 3.297 0.131 0.111 0.269 0.222 0.415 0.333-2.132 0.422-3.974 0.935-5.596 1.558v0zM25.903 19.802c-0.13 0.081-0.502 0.128-0.741 0.128-0.772 0-1.727-0.353-3.066-0.927 0.515-0.038 0.986-0.057 1.409-0.057 0.774 0 1.004-0.003 1.761 0.19s0.767 0.585 0.637 0.667v0z"></path>
                                    <path d="M28.681 7.159c-0.694-0.947-1.662-2.053-2.724-3.116s-2.169-2.030-3.116-2.724c-1.612-1.182-2.393-1.319-2.841-1.319h-15.5c-1.378 0-2.5 1.121-2.5 2.5v27c0 1.378 1.121 2.5 2.5 2.5h23c1.378 0 2.5-1.122 2.5-2.5v-19.5c0-0.448-0.137-1.23-1.319-2.841v0zM24.543 5.457c0.959 0.959 1.712 1.825 2.268 2.543h-4.811v-4.811c0.718 0.556 1.584 1.309 2.543 2.268v0zM28 29.5c0 0.271-0.229 0.5-0.5 0.5h-23c-0.271 0-0.5-0.229-0.5-0.5v-27c0-0.271 0.229-0.5 0.5-0.5 0 0 15.499-0 15.5 0v7c0 0.552 0.448 1 1 1h7v19.5z"></path>
                                </svg>
                            </Link>
                        </Icon>
                        <Icon>
                            <Link target='_blank' href='https://www.linkedin.com/in/julia-savransky-perl/'>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <title>linkedin2</title>
                                    <path d="M12 12h5.535v2.837h0.079c0.77-1.381 2.655-2.837 5.464-2.837 5.842 0 6.922 3.637 6.922 8.367v9.633h-5.769v-8.54c0-2.037-0.042-4.657-3.001-4.657-3.005 0-3.463 2.218-3.463 4.509v8.688h-5.767v-18z"></path>
                                    <path d="M2 12h6v18h-6v-18z"></path>
                                    <path d="M8 7c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
                                </svg>
                            </Link>
                        </Icon>

                    </Icons>
                </NavList>
            </SideBarNav>
        </Nav>
    );
}

export default SideBar;

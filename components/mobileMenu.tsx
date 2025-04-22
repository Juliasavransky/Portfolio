import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@emotion/react';
import SocialLinks from './socialLinks'; // Adjust the path as necessary
import LanguageSwitcher from './languageSwitcher'; // Adjust the path as necessary
import { Icons, NavItem, NavLink } from '../styles/sideBarComponents'; // Adjust the path as necessary

interface MenuProps {
  lang: 'en' | 'he';
  initialDict: Record<string, string>;
}
const MenuButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  margin: 1rem;
`;

const MenuButton = styled.button`
  /* top: 1rem;
  right: 1.5rem; */
  z-index: 999;
  cursor: pointer;
  border: none;
  background: none;
  /* position: absolute; */

  .bar {
    width: 25px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    margin: 6px 0;
    transition: 0.4s;
  }

  &.open .bar:nth-of-type(1) {
    transform: translateY(8px) rotate(45deg);
  }
  &.open .bar:nth-of-type(2) {
    opacity: 0;
  }
  &.open .bar:nth-of-type(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 90vw;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: right 0.5s ease;
  z-index: 998;

  a {
    font-size: 1.8rem;
    margin: 1rem 0;
    color: ${({ theme }) => theme.colors.greyDarkBG1};
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const MobileMenu: React.FC<MenuProps> = ({ lang, initialDict }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('sideBar', initialDict);
  const router = useRouter();
  const theme = useTheme();

  const navLinks = [
    { href: `/${lang}/home`, key: 'home' },
    { href: `/${lang}/about`, key: 'about' },
    { href: `/${lang}/projects`, key: 'projects' },
    { href: `/${lang}/contact`, key: 'contact' },
  ];

  return (
    <div>
      <MenuButtonContainer>
        <LanguageSwitcher />
        <MenuButton
          className={isOpen ? 'open' : ''}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </MenuButton>
      </MenuButtonContainer>

      <MenuOverlay isOpen={isOpen}>
        {navLinks.map(({ href, key }) => {
          const isActive = router.asPath === href;
          return (
            <NavItem key={key} theme={theme}>
              <Link href={href} passHref legacyBehavior>
                <NavLink
                  onClick={() => setIsOpen(false)}
                  theme={theme}
                  $active={isActive}
                  lang={lang}
                >
                  {t[key]}
                </NavLink>
              </Link>
            </NavItem>
          );
        })}
        <Icons>
          <SocialLinks />
        </Icons>
      </MenuOverlay>
    </div>
  );
};

export default MobileMenu;

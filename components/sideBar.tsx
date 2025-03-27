import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@emotion/react';
import MobileMenu from '@/components/mobileMenu';
import LanguageSwitcher from '@/components/languageSwitcher';
import {
  Nav,
  SideBarNav,
  NavList,
  NavItem,
  NavLink,
  Icons,
  DesktopOnly,
  MobileOnly,
} from '@/styles/sideBarComponents';
import SocialLinks from '@/components/socialLinks';

interface SideBarProps {
  lang: 'he' | 'en';
  initialDict: Record<string, string>;
}

const SideBar: React.FC<SideBarProps> = ({ lang, initialDict }) => {
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
    <div >
      <DesktopOnly>
        <Nav theme={theme}>
          <LanguageSwitcher />
          <SideBarNav>
            <NavList theme={theme}>
              {navLinks.map(({ href, key }) => {
                const isActive = router.asPath === href;
                return (
                  <NavItem $active={isActive} key={key} >
                    <Link href={href} passHref legacyBehavior>
                      <NavLink  $active={isActive} lang={lang}>
                        {t[key]}
                      </NavLink>
                    </Link>
                  </NavItem>
                );
              })}

              <Icons>
                <SocialLinks />
              </Icons>
            </NavList>
          </SideBarNav>
        </Nav>
      </DesktopOnly>

      <MobileOnly>
        <MobileMenu lang={lang} initialDict={initialDict} />
      </MobileOnly>
    </div>
  );
};

export default SideBar;

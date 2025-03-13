import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import SplitText from '@/utils/splitText';
import DecoTag from '@/styles/decoTag';
import Link from 'next/link';
import {
  MainPageContainer,
  HeaderContainer,
  Header,
  Spacer,
} from '../styles/layoutComponents';
import { Theme } from '@emotion/react';
import theme from './../styles/theme';
import { motion } from 'framer-motion';
import { Btn, BtnMainPage } from '../components/btnMainPage';

type HomePageProps = {
  theme: Theme;
};

const TheW = styled.span<{ theme: Theme }>`
  line-height: clamp(1.8rem, 4vw, 5.9rem);
  text-shadow: 1vmin 0 ${theme.colors.yellow};
  color: ${theme.colors.purple};
  padding-right: 0.5vw;
`;

const DecoTagWrapper = styled(DecoTag)`
  @media (max-width: 768px) {
    display: none;
  }
`;


function HomePage({ theme }: HomePageProps) {
  const AnimatedSplitText = motion(SplitText);
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  
    if (!linkRef.current) return;
  
    const link = linkRef.current;
  
    // הוספת class להפעלת אנימציה
    link.classList.add("force-hover");
  
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  
    if (isTouchDevice) {
      const handleTransitionEnd = () => {
        router.push("/projects");
        link.removeEventListener("transitionend", handleTransitionEnd);
      };
  
      // מאזינים לסיום ה־transition
      link.addEventListener("transitionend", handleTransitionEnd);
    } else {
      // דסקטופ: ניווט מיידי
      router.push("/projects");
    }
  };
  
  return (
    <MainPageContainer>
      <HeaderContainer>
        <DecoTagWrapper
          text={'</html>'}
          isSpecial={false}
          style={{
            position: 'relative',
            right: 'clamp(35rem, calc(30rem + (100vw - 340px) ), 45rem)',
            top: '-2rem',
          }}
        />
        <DecoTagWrapper
          text={'</body>'}
          isSpecial={false}
          style={{
            position: 'relative',
            right: 'clamp(25rem, calc(30rem + (100vw - 340px) ), 35rem)',
            top: '-2rem',
          }}
        />
        <Header>
          <DecoTag
            text={'<h1>'}
            style={{
              position: 'relative',
              left: 'clamp(-4rem, calc(-10rem + (100vw - 320px) * 0.01), -15rem)',
              top: '-1rem',
            }}
            className='special'
            isSpecial={true}
          />
          <span
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <TheW
              theme={theme}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            >
              W
            </TheW>
            <AnimatedSplitText
              text='eb '
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            />
          </span>

          <Spacer />
          <span
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <TheW
              theme={theme}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            >
              W
            </TheW>
            <AnimatedSplitText
              text='itch'
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
            />
          </span>

          <Spacer />
        </Header>

        <Header>
          <AnimatedSplitText
            text='Creative '
            style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
          />
          <Spacer />
          <AnimatedSplitText
            text='Design'
            style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
          />
          <DecoTag
            text={'</h1>'}
            isSpecial={false}
            style={{
              position: 'relative',
              right:
                'clamp(-4.5rem, calc(-8rem + (100vw - 320px) * 0.05), 1rem)',
              bottom: 'clamp(-2rem, -1rem, 2rem)',
            }}
          />
        </Header>
      </HeaderContainer>

      <Btn>
        <DecoTag
          text={'<button>'}
          style={{ marginBottom: '1rem' }}
          isSpecial={false}
        />
        <BtnMainPage theme={theme}>
          <Link href='/projects' onClick={handleClick} ref={linkRef}></Link>
        </BtnMainPage>
        <DecoTag
          text={'</button>'}
          style={{ marginTop: '1.5rem' }}
          isSpecial={false}
        />
      </Btn>
    </MainPageContainer>
  );
}

export default HomePage;

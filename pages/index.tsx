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
import { Btn, BtnMainPage } from '../components/btnMainPage';
import { useSplitTextAnimation } from '../hooks/useSplitTextAnimation';
import AnimatedBackground  from '../components/animatedBackground ';


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
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!linkRef.current) return;
    const link = linkRef.current;

    link.classList.add('force-hover');

    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
      const wait = (ms: number) =>
        new Promise<void>((resolve) => {
          const start = performance.now();
          const loop = (now: number) => {
            if (now - start >= ms) resolve();
            else requestAnimationFrame(loop);
          };
          requestAnimationFrame(loop);
        });

      const handleTransitionEnd = async () => {
        link.removeEventListener('transitionend', handleTransitionEnd);

        // ❗ מחכה טיפה כדי שהמשתמש יספיק "להרגיש" את האפקט
        await wait(1000); // 0.7 שניות אחרי שהאפקט נגמר
        router.push('/projects');
      };

      link.addEventListener('transitionend', handleTransitionEnd);
    } else {
      // בדסקטופ – נווט מיידית (או אפשר גם פה לעשות אפקט דומה)
      router.push('/projects');
    }
  };

  const texts = ['eb ', 'itch', 'Creative ', 'Design'];
  const { animateIndex, animateFont } = useSplitTextAnimation(texts);

  return (
    <AnimatedBackground >
      <MainPageContainer>
        <HeaderContainer>
          <DecoTagWrapper
            text={'</html>'}
            isPrimaryTag={false}
            style={{
              position: 'relative',
              right: 'clamp(35rem, calc(30rem + (100vw - 340px) ), 45rem)',
              top: '-2rem',
            }}
          />
          <DecoTagWrapper
            text={'</body>'}
            isPrimaryTag={false}
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
                left: 'clamp(0rem, calc(-10rem + (100vw - 320px) * 0.01), -15rem)',
                top: '-1.5rem',
              }}
              className='special'
              isPrimaryTag={true}
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
              <SplitText
                text='eb '
                baseIndex={0}
                style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
                animateIndex={animateIndex}
                animateFont={animateFont}
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
              <SplitText
                text='itch'
                baseIndex={3}
                style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
                animateIndex={animateIndex}
                animateFont={animateFont}
              />
            </span>

            <Spacer />
            <SplitText
              text='Creative '
              baseIndex={7}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
              animateIndex={animateIndex}
              animateFont={animateFont}
            />
            <Spacer />

            <SplitText
              text='Design'
              baseIndex={16}
              style={{ fontSize: 'clamp(3.036rem, 6.072vw, 6.072rem)' }}
              animateIndex={animateIndex}
              animateFont={animateFont}
            />

            <DecoTag
              text={'</h1>'}
              isPrimaryTag={false}
              style={{
                position: 'relative',
                right:
                  'clamp(0rem, calc(-8rem + (100vw - 320px) * 0.05), 1rem)',
                bottom: 'clamp(-2rem, -1rem, 2rem)',
              }}
            />
          </Header>
        </HeaderContainer>

        <Btn>
          <DecoTag
            text={'<button>'}
            style={{ marginBottom: '1rem' }}
            isPrimaryTag={false}
          />
          <BtnMainPage theme={theme}>
            <Link href='/projects' onClick={handleClick} ref={linkRef}></Link>
          </BtnMainPage>
          <DecoTag
            text={'</button>'}
            style={{ marginTop: '1.5rem' }}
            isPrimaryTag={false}
          />
        </Btn>
      </MainPageContainer>
    </AnimatedBackground>
  );
}

export default HomePage;

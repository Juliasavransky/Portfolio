import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

type MagicButtonProps = {
  frontText: string;
  backText: string;
  href: string;
};

export const Btn = styled.div`
  /* margin: 0 auto; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50vw;

  @media (max-width: 1220px) {
    flex-direction: column;
    width: 70vw;
    height: 22vh;
  }

  @media (max-width: 768px) {
    width: 95vw;
  }
`;

const BtnMain = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  perspective: 1000px;
  justify-content: center;
text-align: center;
`;

const Face = styled.div`
  height: 5rem;
  width: clamp(16rem, 25vw, 35rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 100;
  backface-visibility: hidden;
  border: 5px solid ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.yellow};
  background-color: ${({ theme }) => theme.colors.greyDarkBG1};

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const Front = styled(Face)`
  transform: rotateY(0deg) translateZ(3rem);

`;

const Back = styled(Face)`
  transform: rotateX(90deg) translateZ(3rem);
`;

export const MagicButton = ({
  frontText,
  backText,
  href,
}: MagicButtonProps) => {
  const theme = useTheme();
  const controls = useAnimation();
  const router = useRouter();
  const [isTouch, setIsTouch] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = async () => {
    if (clicked) return;
    setClicked(true);
    await controls.start({
      rotateX: -90,
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
    router.push(href);
  };

  const handleHover = async () => {
    if (isTouch) return;
    await controls.start({
      rotateX: -90,
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
  };

  const handleHoverEnd = async () => {
    if (isTouch) return;
    await controls.start({
      rotateX: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  };

  return (
    <BtnMain>
      <motion.a
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(-2rem)',
          display: 'block',
          cursor: 'pointer',
        }}
        animate={controls}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
      >
        <Front theme={theme}>{frontText}</Front>
        <Back theme={theme}>{backText}</Back>
      </motion.a>
    </BtnMain>
  );
};

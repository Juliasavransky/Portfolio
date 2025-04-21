import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import myProfile from '../public/images/myProfile.jpg';

const Container = styled.div`
  position: relative;
  max-width: 40rem;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 4 / 3.5;
  font-size: 0;
  overflow: hidden;
  margin: 3rem 0;

  @media (max-width: 768px) {
    max-width: 90vw;
    aspect-ratio: 4 / 3.5;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: center;
  z-index: 1;
`;

const SvgOverlay = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: ${({ theme }) => theme.colors.greyDarkBG1};
  mix-blend-mode: darken;

  polyline {
    fill: none;
    stroke: ${({ theme }) => theme.colors.white};
    stroke-width: 13%;
    stroke-dasharray: 19000;
    stroke-dashoffset: 19000;
    transition: stroke-dashoffset 8s linear;
  }
`;

function ProfileImg() {
  const polyRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    if (polyRef.current) {
      requestAnimationFrame(() => {
        polyRef.current!.style.strokeDashoffset = '0';
      });
    }
  }, []);

  return (
    <Container>
      <StyledImage
        src={myProfile}
        alt='Profile Background'
        fill
        priority
        sizes='(max-width: 768px) 90vw, 40rem'
      />
      <SvgOverlay viewBox='0 0 1500 1090' preserveAspectRatio='xMidYMid slice'>
        <polyline
          ref={polyRef}
          points='
                0,177 
                131,0 
                0,400
                 269,0 
                 0,562 
                 437,0 
            0,766 565,16 0,1162 719,0 289,1062 
            843,0 543,1000 995,0 729,1062 1161,0 
            947,1062 1307,0 1143,1062 1500,162 
            1299,1062 1500,777
          '
        />
      </SvgOverlay>
    </Container>
  );
}

export default ProfileImg;

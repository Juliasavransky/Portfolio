import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import myProfile from '../public/images/myProfile.jpg';

// אנימציית scribble:
const scribble = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// הקומפוננטה העיקרית:
const StrippedContainer = styled.div`
  max-width: 550px;
  margin: 0 auto;
  background: #1d1d1d;
  background-image: url(${myProfile.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* הגדרת גובה (לדוגמה, 500 פיקסלים) כדי שייראו את הרקע */
  width: 100%;
  height: 500px;

  /* לעיתים נעשה font-size: 0 כדי "לנקות" רווחים בין אלמנטים inline,
     אבל אם אין טקסט, אפשר לוותר עליו. לא קריטי. */
  font-size: 0; 

  svg {
    display: block;       /* שימנע רווחים מיותרים או התנהגות inline */
    width: 100%;
    height: 100%;         /* ממלא את שטח ה־div */
    background: #1d1d1d;
    mix-blend-mode: darken;

    polyline {
      fill: none;
      stroke: #fff;
      stroke-width: 190;
      stroke-dasharray: 19000;
      stroke-dashoffset: 20000;
      animation: ${scribble} 7s linear forwards;
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    /* גרסת רטינה או מסכים חדים במיוחד */
    background-image: url(${myProfile.src});
  }
`;

function ProfileImg() {
  return (
    <StrippedContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1062">
        <polyline
          points="
            0,154 131,0 0,348 269,0 0,562 437,0 
            0,766 565,14 0,1062 719,0 289,1062 
            843,0 543,1062 995,0 729,1062 1161,0 
            947,1062 1307,0 1143,1062 1500,162 
            1299,1062 1500,830
          "
        />
      </svg>
    </StrippedContainer>
  );
}

export default ProfileImg;

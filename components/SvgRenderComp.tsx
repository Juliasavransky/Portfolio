import styled from '@emotion/styled';
import React from 'react';
import GitHub from '../public/svg/github.svg';
import Pdf from '../public/svg/file-pdf.svg';
import LikedIn from '../public/svg/linkedin2.svg';

const Icon = styled.svg({
  height: '3rem',
  width: '3rem',
  filter:
    'invert(49 %) sepia(1%) saturate(1741 %) hue - rotate(201deg) brightness(98 %) contrast(87 %)',
  cursor: 'pointer',
  border: '1px solid red',
  '&:hover': {
    filter:
      'invert(83 %) sepia(34 %) saturate(3975 %) hue - rotate(359deg) brightness(105 %) contrast(104 %)',
  },
});
function SvgRenderComp() {
  return (
    <Icon>
      <GitHub />
    </Icon>
  );
}

export default SvgRenderComp;

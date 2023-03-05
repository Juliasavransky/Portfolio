import React from 'react';
import { La_Belle_Aurore } from '@next/font/google';
import styled from '@emotion/styled';

const laBelle = La_Belle_Aurore({
  subsets: ['latin'],
  weight: '400',
});

type DecoTagProps = {
  text?: string;
};

const Tag = styled.div`
  font-size: 1.7rem;
  &::before {
    content: '';
  }
`;

const DecoTag = ({ text }: DecoTagProps) => {
  return (
    <Tag style={{ color: '#7b7b7d' }} className={laBelle.className}>
      {text}
    </Tag>
  );
};

export default DecoTag;

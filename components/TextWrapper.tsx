import React from 'react';
import styled from '@emotion/styled';

interface TextWrapperProps {
  lang: 'he' | 'en';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Base = styled.div<{ lang: 'he' | 'en' }>`
  direction: ${({ lang }) => (lang === 'he' ? 'rtl' : 'ltr')};
  text-align: ${({ lang }) => (lang === 'he' ? 'right' : 'left')};
`;

const TextWrapper: React.FC<TextWrapperProps> = ({
  lang,
  as = 'div',
  className,
  children,
}) => {
  return (
    <Base as={as} lang={lang} className={className}>
      {children}
    </Base>
  );
};

export default TextWrapper;

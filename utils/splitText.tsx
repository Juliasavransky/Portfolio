import React, { CSSProperties } from 'react';

interface SplitTextProps {
  text: string;
  style?: CSSProperties;
}
function SplitText({ text, style }: SplitTextProps) {
  return (
    <>
      {text.split('').map((char, index) => (
        <span style={style} key={index}>
          {char}
        </span>
      ))}
    </>
  );
}

export default SplitText;

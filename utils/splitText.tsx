import React from 'react';
interface SplitTextProps {
  text: string;
}
function SplitText({ text }: SplitTextProps) {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </>
  );
}

export default SplitText;

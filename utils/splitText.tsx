import React from 'react';
interface SplitTextProps {
  text: string |string[]; 
  style?: React.CSSProperties;
  animateIndex?: number | null;
  animateFont?: string | null;
}

const splitTextMotions = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      mass: 5,
      damping: 10,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};
// const splitTextMotions = {
//   hidden: {},
//   visible: {},
// };
const spanMotions = {
  hidden: { opacity: 0, scale: 0.1 },
  visible: { opacity: 1, scale: 1 },
};

// function SplitText({ text, style, className }: SplitTextProps) {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [activeFont, setActiveFont] = useState<string>(fontClasses[0]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * text.length);
//       const randomFont = fontClasses[Math.floor(Math.random() * fontClasses.length)];

//       setActiveIndex(randomIndex);
//       setActiveFont(randomFont);

//       const timeout = setTimeout(() => {
//         setActiveIndex(null);
//       }, 1000); // משך זמן השינוי

//       return () => clearTimeout(timeout);
//     }, 2000); // כל כמה זמן תתרחש אנימציה חדשה

//     return () => clearInterval(interval);
//   }, [text]);

//   return (
//     <motion.div
//       variants={splitTextMotions}
//       initial='hidden'
//       animate='visible'
//       style={{ display: 'flex', gap: '5px', flexWrap: 'nowrap' }}
//     >
//       {text.split('').map((char, index) => {
//         const isAnimated = index === activeIndex;
//         const fontClass = isAnimated ? activeFont : fontClasses[0];

//         return (
//           <motion.span
//             key={index}
//             variants={spanMotions}
//             className={fontClass}
//             style={{
//               ...style,
//               transition: 'all 0.3s ease-in-out',
//               color: char === '_' ? 'transparent' : 'inherit',
//             }}
//           >
//             {char}
//           </motion.span>
//         );
//       })}
//     </motion.div>
//   );
// }

function SplitText({
  text,
  style,
  animateIndex,
  animateFont,
}: SplitTextProps) {
  const textToRender = Array.isArray(text) ? text.join('') : text;

  return (
    <div style={{ display: 'flex', gap: '5px', flexWrap: 'nowrap' }}>
      {textToRender.split('').map((char, index) => {
        const isActive = index === animateIndex;
        const fontClass = isActive && animateFont ? animateFont : 'font-roboto'; // או הפונט ברירת המחדל שלך

        return (
          <span
            key={index}
            className={fontClass}
            style={{
              ...style,
              transition: 'all 0.3s ease-in-out',
              color: char === '_' ? 'transparent' : 'inherit',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}


export default SplitText;




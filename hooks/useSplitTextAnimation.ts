import { useEffect, useRef, useState } from 'react';
import { fontClasses } from '../styles/fonts/font';

type PickKey = string; // e.g., '1-3' = group 1, char 3

export function useSplitTextAnimation(texts: string[]) {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  const [animateFont, setAnimateFont] = useState<string | null>(null);
  const cooldownMap = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (!(cooldownMap.current instanceof Map)) {
      cooldownMap.current = new Map();
    }

    const intervalId = setInterval(() => {
      const allChars: number[] = [];

      let globalIndex = 0;

      texts.forEach((text) => {
        text.split('').forEach((char) => {
          if (char !== '_') {
            const cooldown = cooldownMap.current.get(globalIndex) || 0;
            if (cooldown === 0) {
              allChars.push(globalIndex);
            } else {
              cooldownMap.current.set(globalIndex, cooldown - 1);
            }
          }
          globalIndex++;
        });
      });

      if (allChars.length === 0) return;

      const chosenIndex = allChars[Math.floor(Math.random() * allChars.length)];
      const randomFont =
        fontClasses[Math.floor(Math.random() * fontClasses.length)];

      setAnimateIndex(chosenIndex);
      setAnimateFont(randomFont);
      cooldownMap.current.set(
        chosenIndex,
        texts.join('').length // cooldown באורך הטקסט הכולל
      );

      setTimeout(() => {
        setAnimateIndex(null);
        setAnimateFont(null);
      }, 500);
    }, 900);

    return () => clearInterval(intervalId);
  }, [texts]);

  return { animateIndex, animateFont };
}

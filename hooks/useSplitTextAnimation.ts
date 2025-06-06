import { useEffect, useRef, useState } from 'react';
import { englishfontClasses, hebrewFontClasses } from '../styles/fonts/font';

type Lang = 'en' | 'he';

export function useSplitTextAnimation(texts: string[], lang: Lang) {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  const [animateFont, setAnimateFont] = useState<string | null>(null);

  const charQueueRef = useRef<number[]>([]);
  const textLengthRef = useRef<number>(0);

  // פונקציית ערבוב (Fisher-Yates Shuffle)
  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // יצירת תור האותיות מחדש בכל שינוי טקסט
  useEffect(() => {
    let index = 0;
    const queue: number[] = [];

    texts.forEach((text) => {
      text.split('').forEach((char) => {
        if (char !== '_') queue.push(index);
        index++;
      });
    });

    textLengthRef.current = index;
    charQueueRef.current = shuffleArray(queue);
  }, [texts]);

  useEffect(() => {
    const fontClasses = lang === 'he' ? hebrewFontClasses : englishfontClasses;

    const intervalId = setInterval(() => {
      const queue = charQueueRef.current;

      if (queue.length === 0) return;

      const chosenIndex = queue.shift()!;
      const randomFont = fontClasses[Math.floor(Math.random() * fontClasses.length)];

      setAnimateIndex(chosenIndex);
      setAnimateFont(randomFont);

      queue.push(chosenIndex); // החזרת האות לסוף התור

      setTimeout(() => {
        setAnimateIndex(null);
        setAnimateFont(null);
      }, 500);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lang]);

  return { animateIndex, animateFont };
}

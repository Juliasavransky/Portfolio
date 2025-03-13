import { useEffect, useRef, useState } from 'react';
import { fontClasses } from '../utils/fontList';

type PickKey = string; // e.g., '1-3' = group 1, char 3

export function useSplitTextAnimation(texts: string[]) {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeChar, setActiveChar] = useState<number | null>(null);
  const [activeFont, setActiveFont] = useState<string | null>(null);

  const cooldownMap = useRef<Map<PickKey, number> | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // נוודא שיש Map
    if (!(cooldownMap.current instanceof Map)) {
      cooldownMap.current = new Map();
    }

    const intervalId = setInterval(() => {
      const available: { group: number; char: number }[] = [];

      texts.forEach((text, groupIdx) => {
        text.split('').forEach((char, charIdx) => {
          if (char === '_') return;

          const key = `${groupIdx}-${charIdx}`;
          const map = cooldownMap.current;

          if (!map) return;

          const cooldown = map.get(key) || 0;

          if (cooldown === 0) {
            available.push({ group: groupIdx, char: charIdx });
          } else {
            map.set(key, cooldown - 1); // מורידים סבב
          }
        });
      });

      if (available.length === 0) return;

      const pick = available[Math.floor(Math.random() * available.length)];
      const font = fontClasses[Math.floor(Math.random() * fontClasses.length)];

      setActiveGroup(pick.group);
      setActiveChar(pick.char);
      setActiveFont(font);

      const key = `${pick.group}-${pick.char}`;
      cooldownMap.current?.set(key, texts[pick.group].length); // קירור מחדש

      timeoutId = setTimeout(() => {
        setActiveGroup(null);
        setActiveChar(null);
        setActiveFont(null);
      }, 500);
    }, 900);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [texts]);

  return { activeGroup, activeChar, activeFont };
}

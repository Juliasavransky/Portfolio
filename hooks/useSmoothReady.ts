import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * useFullReady
 * 
 * בודק גם שהעמוד נטען (delay + DOM + פונטים) וגם שהשפה התייצבה
 */
export function useSmoothReady({ delay = 300, checkFonts = true, checkDomReady = true } = {}) {
  const { locale } = useRouter();
  const [isPageReady, setIsPageReady] = useState(false);
  const [isFontReady, setIsFontReady] = useState(false);
  const [isDomReady, setIsDomReady] = useState(false);
  const [isLangSwitchDone, setIsLangSwitchDone] = useState(false);

  useEffect(() => {
    // עיכוב כללי
    const pageTimer = setTimeout(() => {
      setIsPageReady(true);
    }, delay);

    // פונטים
    if (checkFonts && typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => setIsFontReady(true));
    } else {
      setIsFontReady(true);
    }

    // DOM Load
    if (checkDomReady) {
      if (document.readyState === 'complete') {
        setIsDomReady(true);
      } else {
        const onLoad = () => setIsDomReady(true);
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
      }
    } else {
      setIsDomReady(true);
    }

    return () => clearTimeout(pageTimer);
  }, [delay, checkFonts, checkDomReady]);

  // טיפול בשינוי שפה
  useEffect(() => {
    setIsLangSwitchDone(false);
    const langTimer = setTimeout(() => {
      setIsLangSwitchDone(true);
    }, delay);
    return () => clearTimeout(langTimer);
  }, [locale, delay]);

  // מחשבים מוכן סופי
  const isFullyReady = isPageReady && isFontReady && isDomReady && isLangSwitchDone;

  return { isFullyReady };
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDictionary, Lang } from './getDictionary';

export const useTranslation = (
  namespace: string,
  initialDict?: Record<string, string>
) => {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('he');
  const [t, setT] = useState<Record<string, string>>(initialDict || {});

  useEffect(() => {
    if (!router.isReady) return;

    const currentLang = (router.query.lang as Lang) || 'he';
    setLang(currentLang);

    getDictionary(namespace, currentLang).then(setT);
  }, [router.isReady, router.query.lang, namespace]);

  return { t, lang };
};

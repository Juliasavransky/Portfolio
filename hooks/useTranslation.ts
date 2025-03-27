import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDictionary, Lang } from './getDictionary';

export const useTranslation = (
  namespace: string,
  initialDict?: Record<string, string>
) => {
  const router = useRouter();
  const lang = (router.query.lang as Lang) || 'he';

  const [t, setT] = useState<Record<string, string>>(initialDict || {});

  useEffect(() => {
    // נטען מחדש כל פעם שהשפה משתנה
    getDictionary(namespace, lang).then(setT);
  }, [lang, namespace]);

  return { t, lang };
};

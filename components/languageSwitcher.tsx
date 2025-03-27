import { useRouter } from 'next/router';
import ToggleSwitch from './toggleSwitch';


type Lang = 'en' | 'he';
const LanguageSwitcher = () => {
  const router = useRouter();
  const { asPath } = router;
  const currentLang = (router.query.lang as Lang) || 'he';
  const otherLang: Lang = currentLang === 'he' ? 'en' : 'he';

  // מחליף את תחילת הנתיב (השפה) לשפה החדשה
  const newPath = asPath.replace(/^\/(he|en)/, `/${otherLang}`);

  const handleLangSwitch = () => {
    router.push(newPath);
  };

  return (
  <>
    <ToggleSwitch 
    isOn={currentLang === 'he'}
    onToggle={handleLangSwitch} 
    isRTL={currentLang === 'he'}
    >
        <span>{currentLang === 'he' ? ' ' : ' '}</span>

    </ToggleSwitch>
   </>
  );
};

export default LanguageSwitcher;

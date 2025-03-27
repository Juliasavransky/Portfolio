export type Lang = 'en' | 'he';

/**
 * טוען מילון לפי namespace ושפה
 * @param namespace לדוגמה: 'sidebar', 'home', 'contact'
 * @param lang לדוגמה: 'en' או 'he'
 * @returns אובייקט עם מפתחות תרגום
 */
export const getDictionary = async (
  namespace: string,
  lang: Lang
): Promise<Record<string, string>> => {
  try {
    const dict = await import(`../i18n/${namespace}/${lang}`);
    return dict.default;
  } catch (error) {
    console.error(`❌ Failed to load dictionary: ${namespace}/${lang}`, error);
    return {};
  }
};

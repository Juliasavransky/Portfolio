import type { Lang } from '@/lib/i18n';

type Localized = Record<Lang, string>;

export type Project = {
  url: string;
  name: Localized;
  summary: Localized;
  img?: string;
};

// Client work: shown first, with screenshots (all ~1518x721).
export const clientProjects: Project[] = [
  {
    url: 'https://mati-mor-event.vercel.app/',
    img: '/images/matiMorEvent.jpg',
    name: { en: 'Mati Mor: Life Journey Event', he: 'מתי מור: מסע חיי' },
    summary: {
      en: 'A one-page site built to fill an intimate numerology evening. Emotional, clean and focused on sign-ups.',
      he: 'דף נחיתה לערב נומרולוגיה אינטימי. רגשי, נקי ובנוי להביא הרשמות.',
    },
  },
  {
    url: 'https://havaya-gems.com',
    img: '/images/havayaGems.jpg',
    name: { en: 'Havaya Gems', he: "הוויה ג'מס" },
    summary: {
      en: 'A spiritual shop that needed to feel as sacred online as it does in person.',
      he: 'חנות רוחנית שהייתה צריכה להרגיש קדושה גם ברשת, בדיוק כמו בחנות עצמה.',
    },
  },
  {
    url: 'https://grace-couture.vercel.app/',
    img: '/images/graceCouture.jpg',
    name: { en: 'Grace Couture', he: 'גרייס קוטייור' },
    summary: {
      en: 'Parisian atelier energy on a screen. A design-led site that makes an impression before a word is read.',
      he: 'אווירה של אטלייה פריזאי על המסך. עיצוב שמרשים עוד לפני שקוראים מילה.',
    },
  },
  {
    url: 'https://mate-workshop.vercel.app/',
    img: '/images/matiMorWorkshop.jpg',
    name: { en: 'Mati Mor: Numerology Workshops', he: 'מתי מור: סדנאות נומרולוגיה' },
    summary: {
      en: 'A workshop page that explains and sells the workshops before Mati even picks up the phone.',
      he: 'דף שמסביר ומוכר את הסדנאות עוד לפני שמתי מרימה טלפון.',
    },
  },
  {
    url: 'https://inclusive-voices.vercel.app/',
    img: '/images/inclusiveVoices.jpg',
    name: { en: 'Inclusive Voices', he: 'Inclusive Voices' },
    summary: {
      en: 'An education project that needed to be felt, not just explained. Built to move teachers to act.',
      he: 'מיזם חינוכי שהיה צריך להרגיש, לא רק להסביר. נבנה כדי להניע מורים לפעולה.',
    },
  },
];

// Learning projects: listed compactly, without screenshots.
export const experiments: Project[] = [
  {
    url: 'https://juliasavransky.github.io/Pokemon-cards-memory-game/',
    name: { en: 'Pokémon memory game', he: 'משחק זיכרון פוקימון' },
    summary: { en: '560 characters, endless rounds.', he: '560 דמויות, סבבים בלי סוף.' },
  },
  {
    url: 'https://github.com/Juliasavransky/Tim',
    name: { en: 'TIM: Time Is Money', he: 'TIM: זמן זה כסף' },
    summary: { en: 'A skill-swap community where time is the currency.', he: 'קהילה להחלפת כישורים שבה הזמן הוא המטבע.' },
  },
  {
    url: 'https://juliasavransky.github.io/Simon-Says---Memory-game/',
    name: { en: 'Simon Says', he: 'סיימון אומר' },
    summary: { en: 'The classic memory game.', he: 'משחק הזיכרון הקלאסי.' },
  },
  {
    url: 'https://juliasavransky.github.io/star-wars-films/',
    name: { en: 'Star Wars recap app', he: 'סיכומי מלחמת הכוכבים' },
    summary: { en: 'Pick a film, get the recap.', he: 'בוחרים סרט ומקבלים את הסיכום.' },
  },
  {
    url: 'https://juliasavransky.github.io/weatherApp/',
    name: { en: 'Weather app', he: 'אפליקציית מזג אוויר' },
    summary: { en: 'A 5-day forecast for any city.', he: 'תחזית ל-5 ימים לכל עיר.' },
  },
  {
    url: 'https://juliasavransky.github.io/FNP/#/',
    name: { en: 'Pass On: parent to parent', he: 'תעבירו הלאה: מהורה להורה' },
    summary: { en: 'A second-hand app that feels like a community.', he: 'אפליקציית יד שנייה שמרגישה כמו קהילה.' },
  },
];

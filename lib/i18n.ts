import { createContext, useContext } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import he from '@/i18n/he';
import en from '@/i18n/en';

export const LANGS = ['he', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export type LangPageProps = { lang: Lang };

const dictionaries = { he, en };

export const LangContext = createContext<Lang>('he');
export const useLang = () => useContext(LangContext);
export const useT = () => dictionaries[useLang()];

// Shared by every page under pages/[lang]/. Any other language slug is a 404.
export const langStaticPaths: GetStaticPaths = async () => ({
  paths: LANGS.map((lang) => ({ params: { lang } })),
  fallback: false,
});

export const langStaticProps: GetStaticProps<LangPageProps> = async ({ params }) => ({
  props: { lang: params?.lang as Lang },
});

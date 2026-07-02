// components/PageSeo.tsx
import Head from 'next/head';
import { Lang } from '../hooks/getDictionary';

type PageSeoProps = {
  lang: Lang;
  title: string;
  description: string;
  path: string; // e.g. "/home", "/about"
  keywords?: string[];
};

const SITE_URL = 'https://webwitch.click';
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const PageSeo = ({ lang, title, description, path, keywords }: PageSeoProps) => {
  const url = `${SITE_URL}/${lang}${path}`;
  const heUrl = `${SITE_URL}/he${path}`;
  const enUrl = `${SITE_URL}/en${path}`;
  const locale = lang === 'he' ? 'he_IL' : 'en_IL';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="language" content={lang} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="he" href={heUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={heUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Web Witch" />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  );
};

export default PageSeo;

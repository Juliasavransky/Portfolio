import Head from 'next/head';
import { SITE_URL } from '@/lib/site';
import { useLang, useT } from '@/lib/i18n';

type Page = 'home' | 'about' | 'projects' | 'contact' | 'privacy';

type Props = {
  page: Page;
  /** Extra schema.org nodes for this page (e.g. the projects ItemList). */
  schema?: object[];
};

export default function PageSeo({ page, schema = [] }: Props) {
  const lang = useLang();
  const t = useT();
  const { title, description } = t.meta[page];
  const path = `/${page}`;
  const url = `${SITE_URL}/${lang}${path}`;
  const image = `${SITE_URL}/images/og-${lang}.jpg`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${url}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.nav.home, item: `${SITE_URL}/${lang}/home` },
        ...(page === 'home'
          ? []
          : [{ '@type': 'ListItem', position: 2, name: page === 'privacy' ? t.footer.privacy : t.nav[page], item: url }]),
      ],
    },
    ...schema,
  ];

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={url} />
      <link rel='alternate' hrefLang='he' href={`${SITE_URL}/he${path}`} />
      <link rel='alternate' hrefLang='en' href={`${SITE_URL}/en${path}`} />
      <link rel='alternate' hrefLang='x-default' href={`${SITE_URL}/he${path}`} />

      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Web Witch' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content={lang === 'he' ? 'he_IL' : 'en_IL'} />
      <meta property='og:locale:alternate' content={lang === 'he' ? 'en_IL' : 'he_IL'} />
      <meta property='og:image' content={image} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={t.common.ogImageAlt} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
        }}
      />
    </Head>
  );
}

// Site-wide entities. Page-level WebPage/Breadcrumb nodes live in <PageSeo>.
import Head from 'next/head';
import { PHONE_E164, SITE_URL, SOCIAL, WHATSAPP_URL } from '@/lib/site';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Web Witch',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      founder: { '@id': `${SITE_URL}/#julia` },
      sameAs: [SOCIAL.linkedin, SOCIAL.github],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#julia`,
      name: 'Julia Savransky-Perl',
      alternateName: 'יוליה סברנסקי-פרל',
      jobTitle: 'Web Designer & Developer',
      image: `${SITE_URL}/images/myProfile.jpg`,
      url: `${SITE_URL}/en/about`,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      knowsLanguage: ['he', 'en'],
      knowsAbout: ['Web design', 'Web development', 'Next.js', 'React', 'WordPress', 'UX', 'RTL websites'],
      sameAs: [SOCIAL.linkedin, SOCIAL.github],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Web Witch',
      url: SITE_URL,
      inLanguage: ['he', 'en'],
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Web Witch',
      url: SITE_URL,
      image: `${SITE_URL}/images/og-en.jpg`,
      telephone: PHONE_E164,
      provider: { '@id': `${SITE_URL}/#organization` },
      founder: { '@id': `${SITE_URL}/#julia` },
      serviceType: ['Web design', 'Web development', 'Website automations'],
      areaServed: { '@type': 'Country', name: 'Israel' },
      availableLanguage: ['he', 'en'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: PHONE_E164,
        url: WHATSAPP_URL,
        availableLanguage: ['he', 'en'],
      },
    },
  ],
};

export default function SiteSchema() {
  const gsc = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='author' content='Julia Savransky-Perl' />
      <link rel='icon' href='/favicon.ico' />
      {gsc && <meta name='google-site-verification' content={gsc} />}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </Head>
  );
}

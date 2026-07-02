// components/Seo.tsx
// Site-wide tags only. Per-page title/description/canonical/og live in <PageSeo>,
// rendered inside each page so they can override these when both target the same key.
import Head from 'next/head';

const SITE_URL = 'https://webwitch.click';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Web Witch',
      url: SITE_URL,
      logo: `${SITE_URL}/images/og-image.png`,
      description:
        'Boutique web studio for creative and spiritual businesses in Israel.',
      founder: {
        '@type': 'Person',
        name: 'Julia Savransky-Perl',
        jobTitle: 'Web Designer & Developer',
      },
      areaServed: { '@type': 'Country', name: 'Israel' },
      knowsLanguage: ['he', 'en'],
      sameAs: [
        'https://github.com/Juliasavransky/',
        'https://www.linkedin.com/in/julia-savransky-perl/',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Web Witch',
      provider: { '@id': `${SITE_URL}/#organization` },
      serviceType: [
        'Web Design',
        'Web Development',
        'Marketing Automation',
        'Brand Identity',
      ],
      areaServed: { '@type': 'Country', name: 'Israel' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Witch Packages',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'הלחש / The Spell',
            price: '4500',
            priceCurrency: 'ILS',
            description: 'Custom website + 1 automation. Delivery 14 business days.',
          },
          {
            '@type': 'Offer',
            name: 'הקלחת / The Cauldron',
            price: '6500',
            priceCurrency: 'ILS',
            description:
              'Full website + brand system + 3 automations. Delivery 21 business days.',
          },
          {
            '@type': 'Offer',
            name: 'הכישוף המלא / The Full Enchantment',
            price: '9900',
            priceCurrency: 'ILS',
            description:
              'Full rebrand + website + visual identity + 5 automations. Delivery 45 days.',
          },
        ],
      },
    },
  ],
};

const Seo = () => {
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Julia Savransky-Perl | Web Witch" />
      <meta name="publisher" content="Web Witch" />
      {gscVerification && (
        <meta name="google-site-verification" content={gscVerification} />
      )}

      <link rel="icon" href="/favicon.ico" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default Seo;
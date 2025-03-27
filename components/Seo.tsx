// components/Seo.tsx
import Head from 'next/head';

const Seo = () => {
  return (
    <Head>
      {/* בסיסי */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Web Witch | Creative Design | בניית אתרים</title>

      {/* תיאור וקידום */}
      <meta
        name="description"
        content="אתר תדמית קסום לעסק שלך ✨ עיצוב עם נגיעה מכושפת, חוויית משתמש מהפנטת ותשומת לב לפרטים הקטנים."
      />
      <meta
        name="keywords"
        content="עיצוב אתרים, אתרי תדמית, UX, UI, React, CSS, JS, Next.js, WordPress, Web Witch"
      />
      <meta name="author" content="Julia Savransky-Perl | Web Witch" />
      <meta name="publisher" content="Web Witch" />

      {/* שפה ו-SEO */}
      <meta httpEquiv="Content-Language" content="he" />
      <meta name="language" content="Hebrew" />

      {/* favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Canonical */}
      <link rel="canonical" href="https://webwitch.click/" />

      {/* alternate languages */}
      <link rel="alternate" hrefLang="he" href="https://webwitch.click/he/home" />
      <link rel="alternate" hrefLang="en" href="https://webwitch.click/en/home" />
      <link rel="alternate" hrefLang="x-default" href="https://webwitch.click/" />

      {/* Open Graph */}
      <meta property="og:title" content="Web Witch | Creative Design" />
      <meta
        property="og:description"
        content="עיצוב עם נגיעה מכושפת ✨ אתרי תדמית שמייצרים חוויה ייחודית ומושכת." />
      <meta property="og:image" content="https://webwitch.click/images/og-image.png" />
      <meta property="og:url" content="https://webwitch.click/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Web Witch" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Web Witch | Creative Design" />
      <meta name="twitter:description" content="עיצוב דיגיטלי מהפנט ✨ עם UX מוקפד ונראות שובה לב." />
      <meta name="twitter:image" content="https://webwitch.click/images/og-image.png" />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Web Witch",
            url: "https://webwitch.click",
            description:
              "אתר תדמית קסום ✨ עיצוב עם נגיעה מכושפת וחוויית משתמש מהפנטת.",
            author: {
              "@type": "Person",
              name: "Julia Savransky-Perl",
            },
          }),
        }}
      />
    </Head>
  );
};

export default Seo;
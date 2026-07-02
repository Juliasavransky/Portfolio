// components/GoogleAnalytics.tsx
// No-op until NEXT_PUBLIC_GA_ID is set (in .env.local for dev, Vercel project settings for prod).
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GA_MEASUREMENT_ID, pageview } from '@/lib/gtag';

const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const handleRouteChange = (url: string) => pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;

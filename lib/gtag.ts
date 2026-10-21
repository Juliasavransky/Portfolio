export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Page views come from GA4 Enhanced Measurement ("page changes based on browser
// history events"), so only conversion events are sent manually.
export const track = (event: string, params: Record<string, string> = {}) => {
  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

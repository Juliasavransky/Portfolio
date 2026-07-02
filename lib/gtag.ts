export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

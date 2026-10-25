// Generates public/sitemap.xml from the pages under pages/[lang]/ so a new page
// can never be forgotten. Runs on `prebuild`. changefreq/priority are omitted:
// Google and Bing both ignore them.
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://webwitch.click';
const LANGS = ['he', 'en'];
const DEFAULT_LANG = 'he';

const pages = readdirSync(join(root, 'pages', '[lang]'))
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace(/\.tsx$/, ''))
  .sort((a, b) => (a === 'home' ? -1 : b === 'home' ? 1 : a.localeCompare(b)));

const lastmod = new Date().toISOString().slice(0, 10);

const url = (lang, page) => `  <url>
    <loc>${SITE_URL}/${lang}/${page}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/${page}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LANG}/${page}"/>
    <lastmod>${lastmod}</lastmod>
  </url>`;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((lang) => pages.map((page) => url(lang, page))).join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${LANGS.length * pages.length} urls (${pages.join(', ')})`);

# CLAUDE.md — Web Witch (webwitch.click)

## Project Overview

Next.js website (Pages Router) for Web Witch — a boutique web studio run by Julia Savransky-Perl.
Bilingual: Hebrew (`/he/*`) and English (`/en/*`). Lang is a URL param handled via `getServerSideProps`.

## Behavior Rules

### Auto-fix without asking:
Any change that is **not visible to site visitors** — technical files, meta tags, JSON, configuration.

### Ask first, then fix:
Any change that **affects what visitors see** — layout, colors, fonts, text on screen, animations, components.

Format for asking:
> 🎨 **שינוי ויזואלי נדרש:** [תיאור קצר]
> **למה:** [הסבר]
> **מה ישתנה:** [לפני / אחרי]
> האם להמשיך?

---

## SEO Issues to Fix (found in audit — 2026-07-02)

**Status as of 2026-07-02: items #1, #2, #5, #6 are done. #3 and #4 are deferred — Julia asked not to add the pricing section to the site yet. See "Additional fixes" section at the bottom for work done beyond this original audit.**

### 🔴 CRITICAL — Auto-fix

#### 1. ✅ DONE — Create `/public/robots.txt`
File does not exist. `/robots.txt` currently redirects to `/he/home`.

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: CCBot
Disallow: /

Sitemap: https://webwitch.click/sitemap.xml
```

#### 2. ✅ DONE — Create `/public/sitemap.xml`
File does not exist. `/sitemap.xml` currently redirects to `/he/home`.
Must include all 8 pages (4 pages × 2 languages) with hreflang alternates.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://webwitch.click/he/home</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/home"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/home"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/home"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://webwitch.click/he/about</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/about"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/about"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://webwitch.click/he/projects</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/projects"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/projects"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/projects"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://webwitch.click/he/contact</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/contact"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/contact"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/contact"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://webwitch.click/en/home</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/home"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/home"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/home"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://webwitch.click/en/about</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/about"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/about"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://webwitch.click/en/projects</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/projects"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/projects"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/projects"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://webwitch.click/en/contact</loc>
    <xhtml:link rel="alternate" hreflang="he"        href="https://webwitch.click/he/contact"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://webwitch.click/en/contact"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://webwitch.click/he/contact"/>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>
```

#### 3. ⏸️ DEFERRED — Create `/public/llms.txt`
Does not exist. Helps ChatGPT, Claude, Perplexity understand and cite the site.
**On hold: Julia doesn't want the pricing/packages content added to the site yet — revisit when she's ready to finalize pricing.**

#### 4. ⏸️ DEFERRED — Create `/public/pricing.md`
Does not exist. Helps AI agents read pricing without JS rendering.
**Same hold as #3 — depends on finalized pricing content.**

#### 5. ✅ DONE — Add Schema Markup to `_app.tsx` or `_document.tsx`
No structured data detected. Add as `<script type="application/ld+json">` in the document `<Head>`.
**Implemented in `components/Seo.tsx`, rendered globally via `_app.tsx`.**

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webwitch.click/#organization",
      "name": "Web Witch",
      "url": "https://webwitch.click",
      "description": "Boutique web studio for creative and spiritual businesses in Israel.",
      "founder": {
        "@type": "Person",
        "name": "Julia Savransky-Perl",
        "jobTitle": "Web Designer & Developer"
      },
      "areaServed": { "@type": "Country", "name": "Israel" },
      "knowsLanguage": ["he", "en"]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://webwitch.click/#service",
      "name": "Web Witch",
      "provider": { "@id": "https://webwitch.click/#organization" },
      "serviceType": ["Web Design", "Web Development", "Marketing Automation", "Brand Identity"],
      "areaServed": { "@type": "Country", "name": "Israel" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Witch Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "הלחש / The Spell",
            "price": "4500",
            "priceCurrency": "ILS",
            "description": "Custom website + 1 automation. Delivery 14 business days."
          },
          {
            "@type": "Offer",
            "name": "הקלחת / The Cauldron",
            "price": "6500",
            "priceCurrency": "ILS",
            "description": "Full website + brand system + 3 automations. Delivery 21 business days."
          },
          {
            "@type": "Offer",
            "name": "הכישוף המלא / The Full Enchantment",
            "price": "9900",
            "priceCurrency": "ILS",
            "description": "Full rebrand + website + visual identity + 5 automations. Delivery 45 days."
          }
        ]
      }
    }
  ]
}
```

#### 6. ✅ DONE — Fix `<Head>` meta tags in all page files
**Problem:** This is a Pages Router project. `export const metadata` does NOT work here — it's App Router only. Any `export const metadata` blocks added to page files must be removed and replaced with `<Head>` from `next/head`.
**Implemented as a shared `components/PageSeo.tsx` component (takes `lang`, `title`, `description`, `path`) rather than inlining the `<Head>` block per page — same tags, less duplication. All 4 pages now use it; no `export const metadata` remains anywhere in `pages/[lang]/`.**

**Pattern to use in every page file:**

```tsx
import Head from 'next/head';

// Inside the component, before the return:
const meta = {
  he: {
    title: "...",
    description: "...",
    url: "https://webwitch.click/he/[page]",
    locale: "he_IL",
  },
  en: {
    title: "...",
    description: "...",
    url: "https://webwitch.click/en/[page]",
    locale: "en_IL",
  },
}[lang];

// Inside return, wrap with fragment and add Head:
return (
  <>
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="language" content={lang} />
      <link rel="canonical" href={meta.url} />
      <link rel="alternate" hrefLang="he" href="https://webwitch.click/he/[page]" />
      <link rel="alternate" hrefLang="en" href="https://webwitch.click/en/[page]" />
      <link rel="alternate" hrefLang="x-default" href="https://webwitch.click/he/[page]" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:locale" content={meta.locale} />
    </Head>
    {/* existing JSX */}
  </>
);
```

**Apply to all 4 page files** using the exact values below:

##### home.tsx
```tsx
const meta = {
  he: {
    title: "עיצוב ופיתוח אתרים לעסקים יצירתיים | Web Witch",
    description: "בונה אתרים מותאמים אישית לעסקים יצירתיים ורוחניים בישראל. עיצוב + פיתוח + אוטומציות — ביחד, תחת גג אחד. החל מ-₪4,500.",
    url: "https://webwitch.click/he/home",
    locale: "he_IL",
  },
  en: {
    title: "Custom Web Design for Creative Businesses in Israel | Web Witch",
    description: "Custom websites for creative and spiritual entrepreneurs in Israel. Design + development + automations — all in one place. Starting at ₪4,500.",
    url: "https://webwitch.click/en/home",
    locale: "en_IL",
  },
}[lang];
```

##### about.tsx
```tsx
const meta = {
  he: {
    title: "על יוליה — מפתחת אתרים לעסקים יצירתיים | Web Witch",
    description: "אני יוליה סברנסקי-פרל — מעצבת שהפכה למפתחת. בונה אתרים לעסקים יצירתיים ורוחניים שיודעים מה הוויב שלהם, ורק צריכים מישהי שתבנה אותו נכון.",
    url: "https://webwitch.click/he/about",
    locale: "he_IL",
  },
  en: {
    title: "About Julia — Web Designer & Developer for Creative Businesses | Web Witch",
    description: "I'm Julia Savransky-Perl — a designer turned developer. I build websites for creative and spiritual businesses that know their vibe and just need someone to build it right.",
    url: "https://webwitch.click/en/about",
    locale: "en_IL",
  },
}[lang];
```

##### projects.tsx
```tsx
const meta = {
  he: {
    title: "פורטפוליו — אתרים לעסקים יצירתיים ורוחניים | Web Witch",
    description: "עבודות של Web Witch: אתרים לנומרולוגית, חנות רוחנית, מתפרה פריזאית, סדנאות, ועוד. כל אתר מותאם אישית לוויב של הלקוחה.",
    url: "https://webwitch.click/he/projects",
    locale: "he_IL",
  },
  en: {
    title: "Portfolio — Websites for Creative & Spiritual Businesses | Web Witch",
    description: "Web Witch portfolio: websites for a numerologist, spiritual shop, Parisian atelier, workshops, and more. Every site custom-built to match the client's vibe.",
    url: "https://webwitch.click/en/projects",
    locale: "en_IL",
  },
}[lang];
```

##### contact.tsx
```tsx
const meta = {
  he: {
    title: "צור קשר — בואי נבנה משהו ביחד | Web Witch",
    description: "מעוניינת באתר שמייצג אותך לאמיתי? דברי איתי — אני לוקחת 2-3 פרויקטים בחודש כדי לתת לכל לקוחה תשומת לב מלאה.",
    url: "https://webwitch.click/he/contact",
    locale: "he_IL",
  },
  en: {
    title: "Contact — Let's Build Something Together | Web Witch",
    description: "Interested in a website that actually feels like you? Reach out — I take 2-3 projects per month to give each client full attention.",
    url: "https://webwitch.click/en/contact",
    locale: "en_IL",
  },
}[lang];
```

Replace `[page]` in the hreflang links with the actual page name (home / about / projects / contact).

---

### 🟡 FRONTEND — Ask Julia first

#### F1. Hero Section copy update
**What:** The subtitle and body text on the homepage currently describe Julia ("בונה אתרים מותאמים אישית שמהגישים אחרת. מעוצבת, מפתחת, מקודדת...").
**Why:** Copy should speak to the visitor, not describe Julia.
**Proposed change:**
- Subtitle: "יזמיות יצירתיות: אתר שמביא לקוחות — בלי שתצטרכי להסביר את עצמך."
- Body: "עיצוב + פיתוח + אוטומציות — הכל ביחד, תחת גג אחד. את מביאה את הוויב, אני בונה את השאר."
- CTA button: "תראי מה אפשר לבנות לך"
→ **Ask before changing.**

#### F2. ✅ RESOLVED — English homepage has Hebrew content
**What:** The English version of the homepage currently shows Hebrew text in the hero section.
**Why:** The lang-based content switch may not be working correctly, or the translation keys are missing.
**Update 2026-07-02:** Investigated — pulled the live server-rendered HTML for `/en/home` directly and it returns correct English text (`i18n/home/en.ts` and `he.ts` are properly separated, `getServerSideProps` loads the right dictionary). Julia confirmed in her own browser that the homepage is correct in both languages. No fix was needed — likely stale from an earlier state or a caching artifact at the time of the original audit.

---

## Project Notes

- **Router:** Pages Router (not App Router). All metadata must use `next/head`, not `export const metadata`.
- **i18n:** Language comes from URL param `[lang]` — always `he` or `en`. Default is `he`.
- **Styling:** Styled-components with custom theme (`useCustomTheme`).
- **Animations:** Framer Motion + custom `SplitText` component.
- **Translations:** `getDictionary(page, lang)` fetches from JSON dict files.
- **Deployment:** Vercel (auto-deploy on push to main).

## File Locations (SEO assets)

All static SEO files go in `/public/`:
- `/public/robots.txt` ✅
- `/public/sitemap.xml` ✅
- `/public/llms.txt` ⏸️ deferred (see #3 above)
- `/public/pricing.md` ⏸️ deferred (see #4 above)

Schema JSON-LD goes in `_document.tsx` or `_app.tsx` inside `<Head>`. (Implemented in `components/Seo.tsx`, rendered via `_app.tsx`.)

---

## Additional fixes (beyond the original 2026-07-02 audit)

Found and fixed while doing this SEO/quality work — not part of the original list above, kept here for the record:

- **Build-breaking bug:** all 4 `pages/[lang]/*.tsx` files had `export const metadata` declared twice (once per language) — a duplicate block-scoped variable, which crashed the Next.js build outright. Fixed as part of #6.
- **Root URL 404:** `https://webwitch.click/` (no `/he` or `/en`) had no matching route and returned HTTP 404. Added `pages/index.tsx` with a permanent redirect to `/he/home`. This was blocking Google Search Console's site-verification crawler.
- **GA4 + Google Search Console** wired up as env-var-gated (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, set in `.env.local` + Vercel). Both are live and verified.
- **Image alt text:** project card images had a generic `alt="project"` for all 11 projects; now use each project's actual name.
- **Core Web Vitals:** every project card image had `priority` set, forcing all 11 to eagerly preload at once (hurts LCP). Removed — only above-the-fold images should use `priority`.
- **Font bloat:** removed the `Solitreo` Google Font from the title letter-cycling animation — Next.js couldn't generate fallback metrics for it (build warning), risking layout shift (CLS) on font swap. The other 14 fonts in the rotation were kept since Julia considers the effect core to the brand.
- Installed `sharp` for faster production image optimization on Vercel (was missing, Vercel build warned about it).
- **Bug sweep across the whole codebase** (contact form, error popup, animations, API) — see git log `9c830fc` for the full list: contact form was hardcoded to Hebrew/RTL regardless of page language; the mail-failure popup was hardcoded Hebrew-only, could be dismissed by clicking inside it, and linked to a WhatsApp number missing a digit; the letter-shimmer animation on About/Contact/Projects landed on the wrong character; the API route was vulnerable to HTML injection into the notification email via unescaped user input.

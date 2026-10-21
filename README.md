# Web Witch — webwitch.click

Portfolio and studio site of Julia Savransky-Perl. Next.js 16 (Pages Router), React 19, Emotion. Bilingual: Hebrew (`/he/*`, RTL, default) and English (`/en/*`).

```bash
npm run dev     # local dev server
npm run build   # static build (all pages are pre-rendered per language)
npm run lint    # ESLint (flat config)
npm test        # contact-form validation check
```

## Structure

- `pages/[lang]/*` — one file per page; `getStaticPaths`/`getStaticProps` come from `lib/i18n.ts` (any language other than `he`/`en` is a 404).
- `i18n/he.ts`, `i18n/en.ts` — all copy. `en` is typed from `he`, so a missing key fails the build.
- `data/projects.ts` — client projects and experiments.
- `components/` — layout, nav, footer, SEO (`PageSeo`, `SiteSchema`), form.
- `styles/global.ts` — design tokens (CSS variables), reset, RTL helpers, reduced motion. `styles/ui.ts` — shared primitives.
- `pages/api/contact.ts` — contact form → Gmail SMTP (`EMAIL_USERNAME`, `EMAIL_PASSWORD`).

## Environment

`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`.

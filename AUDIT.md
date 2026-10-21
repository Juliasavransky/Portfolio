# Web Witch portfolio — full audit

Audit date: 2026-10-21. Scope: the Next.js project in `Portfolio/` (live domain `webwitch.click`). The audit was run against a local production build (`next build` + `next start`). Nothing in the project source was changed (see "Audit side effects" at the end of section 2).

Legend: **Severity** Critical / High / Medium / Low. **Effort** S (under 1 hour), M (half a day), L (1 day or more). Items marked **Needs verification** are plausible, but I couldn't confirm them from code or local runs.

---

## 1. Summary: top 10 issues by impact

| # | ID | Issue | Severity |
|---|----|-------|----------|
| 1 | SEO-01 | **The server sends an empty page.** `SparkleTrail` is loaded with `dynamic(..., { ssr: false })` and wraps the whole app, so the HTML for every route has no title, no meta description, no canonical, no OG tags, no headings, no links and no text. Google has to wait for its JS render queue to see anything. WhatsApp, Facebook, LinkedIn link previews and AI crawlers (GPTBot, ClaudeBot, PerplexityBot) see nothing at all. This is the main reason SEO performance is poor. | Critical |
| 2 | SEO-02 / A11Y-01 | **No `lang` or `dir` on `<html>`** (there is no `_document.tsx`). Hebrew pages aren't declared as Hebrew or RTL to search engines or screen readers. | Critical |
| 3 | DEP-01 | **Next.js 13.1.6 has 27 known advisories**, including 2 critical (one is RCE in the image optimizer, which `next/image` uses). nodemailer 6.10.1 has high-severity DoS advisories in the address parser, and user input reaches that parser through `replyTo`. | Critical |
| 4 | SEO-03 | **No `<h1>` on any page.** Page titles are `styled.div` plus per-letter `<span>`s, and the visible "&lt;h1&gt;" is decorative text. The only real headings on the site are the 11 project-card `<h2>`s. | High |
| 5 | PERF-01 | **Mobile LCP is 7.5–8.5 s on every route** (Lighthouse mobile; target < 2.5 s). All content stays at `opacity: 0` until `window.load`, then `document.fonts.ready`, then two 300 ms timers, and 14 font files are preloaded on every page. | High |
| 6 | CRO-01 / CRO-02 | **Within 5 seconds, it isn't clear how to hire her.** The hero headline is just the brand name. The only CTA goes to Projects, not to contact. Phone and email aren't shown as text anywhere, and there's no testimonial, client logo, process or service list. | High |
| 7 | SEO-05 | **Unassigned Unicode characters in the Hebrew copy** (U+05C9, U+05CA, U+05CC, used as gender-inclusive glyphs by the Alef MultiGndr font), including in the nav label "צור׊ קשר". To crawlers, AI and screen readers these are garbage tokens. Where the font isn't applied (e.g. input placeholders) they render as stray marks. | High |
| 8 | SEO-04 | **Soft-404s and URL leakage.** `/fr/home` returns 200 with Hebrew content. Any single-segment URL (e.g. `/llms.txt`, `/anything`) redirects 307 to `/he/home` instead of returning 404. | High |
| 9 | DES-01 / DES-02 | **Motion overload, and `prefers-reduced-motion` is ignored.** At least 10 effects run at once (particle canvas, cursor sparkles, font shuffle every second, 16 random deco-tag animations, a floating tooltip, a bouncing arrow, a spinning tag cloud, an 8 s photo mask, cycling icons, a 3D flip button). That contradicts the "minimalist, purposeful animation" direction and is an accessibility failure. | High |
| 10 | DES-03 / DES-04 | **Horizontal overflow at every width.** The layout is built from `position:absolute` page containers with `100vw` and `90vw` widths. At 375 px the closed mobile menu peeks in from the right edge. There's no footer, and none is possible without a rework. | High |

---

## 2. Build, lint, typecheck, Lighthouse

### Toolchain

| Step | Command | Result |
|------|---------|--------|
| Install | `npm ci` | **Failed (EPERM)**: `node_modules/@next/swc-win32-x64-msvc/next-swc.win32-x64-msvc.node` was locked, probably by a running `next dev` or by OneDrive sync. Recovered with `npm install` (see side effects below). |
| Lint | `next lint` | ✔ No ESLint warnings or errors |
| Typecheck | `tsc --noEmit` | ✔ 0 errors (`strict: true`) |
| Build | `next build` | ✔ Compiled successfully. Every route is `λ` (server-rendered at runtime), including `/404`. Warning: `caniuse-lite is outdated`. |
| `npm outdated` | | 22 packages behind. Majors: next 13.1.6 → 16.4.2, react 18.2 → 19.3, framer-motion 10 → 14, typescript 4.9 → 7.0, eslint 8 → 10, nodemailer 6 → 10, @next/font 13 → 14 (deprecated, built into `next/font`). |
| `npm audit` | | **25 vulnerabilities: 2 critical, 16 high, 6 moderate, 1 low.** Critical: `next` (27 advisories, incl. "Unauthenticated RCE in Image Optimization API when AVIF files are used" and the middleware auth bypass) and `@babel/traverse`. High: `nodemailer` (addressparser DoS ×3, raw-option file read/SSRF), `postcss`, `braces`, `cross-spawn`, `semver` and others. Most transitive ones are fixed by `npm audit fix`. `next`, `nodemailer` and `postcss` need a major upgrade. |

**Build output (First Load JS):** home 131 kB, about 137 kB, projects 138 kB, contact 140 kB, shared 90.3 kB.

### Lighthouse 13.5 (local production build, headless Chrome; mobile = default throttling, desktop = desktop preset)

| Route | Device | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS |
|-------|--------|-----:|-----:|---------:|----:|----:|----:|----:|----:|
| /he/home | mobile | 71 | 85 | 100 | 100 | 1.4 s | **8.2 s** | 220 ms | 0 |
| /he/home | desktop | 93 | 84 | 100 | 100 | 0.3 s | 1.8 s | 0 ms | 0.026 |
| /en/home | mobile | 73 | 85 | 100 | 100 | 0.8 s | **7.5 s** | 190 ms | 0.007 |
| /en/home | desktop | 94 | 84 | 100 | 100 | 0.2 s | 1.6 s | 0 ms | 0.032 |
| /he/about | mobile | 72 | 86 | 100 | 100 | 1.1 s | **8.2 s** | 140 ms | 0.079 |
| /he/about | desktop | 91 | 81 | 100 | 100 | 0.3 s | 1.8 s | 0 ms | 0.094 |
| /en/about | mobile | 73 | 86 | 100 | 100 | 1.1 s | **7.8 s** | 140 ms | 0.079 |
| /en/about | desktop | 92 | 81 | 100 | 100 | 0.3 s | 1.7 s | 0 ms | 0.085 |
| /he/projects | mobile | 64 | 86 | 100 | 100 | 1.4 s | **8.5 s** | 390 ms | 0.079 |
| /he/projects | desktop | 93 | 81 | 100 | 100 | 0.3 s | 1.8 s | 0 ms | 0.027 |
| /en/projects | mobile | 71 | 86 | 100 | 100 | 1.4 s | **8.3 s** | 170 ms | 0.079 |
| /en/projects | desktop | 93 | 81 | 100 | 100 | 0.3 s | 1.8 s | 0 ms | 0.028 |
| /he/contact | mobile | 63 | 85 | 100 | 100 | 1.4 s | **8.1 s** | 90 ms | **0.233** |
| /he/contact | desktop | 93 | 81 | 100 | 100 | 0.3 s | 1.8 s | 0 ms | 0.027 |
| /en/contact | mobile | 65 | 85 | 100 | 100 | 0.8 s | **7.7 s** | 140 ms | **0.198** |
| /en/contact | desktop | 93 | 81 | 100 | 100 | 0.2 s | 1.7 s | 0 ms | 0.028 |

Targets: LCP < 2.5 s, CLS < 0.1, TBT < 200 ms. **Every mobile run misses LCP by 3×.** Contact on mobile misses CLS. Local server, so TTFB is about 20 ms; production on Vercel will add network latency on top. These are lab numbers. Field data (CrUX / Search Console Core Web Vitals) is **Needs verification**. INP can't be measured in a lab run; TBT is the proxy.

**Read the SEO score of 100 with care.** Lighthouse runs JavaScript, so it sees the client-rendered DOM. With JS disabled, or as a non-rendering crawler, every page is blank (verified with Playwright `javaScriptEnabled:false` and with raw `curl`; see SEO-01).

**Audits failing on every route:** `html-has-lang`, `label` (unlabeled form or toggle input), `agent-accessibility-tree`, `llms-txt`, `bf-cache` (caused by `Cache-Control: no-store` from `getServerSideProps`), `unused-javascript`, `legacy-javascript`, `render-blocking`. Also failing on some routes: `forced-reflow` (SplitText measurement), `list` / `listitem` (nav markup), LCP on mobile.

### Screenshots and DOM checks (Playwright, Chrome, 375 / 768 / 1440 px, all 8 routes)

Saved outside the project, in the audit scratchpad (`…/scratchpad/shots/*.png`, plus `report.json`). Key measurements:

| Check | Result |
|-------|--------|
| `<html lang>` / `dir` after hydration | empty on all 24 captures |
| `<h1>` count | 0 on all pages |
| Horizontal overflow (`scrollWidth` vs `clientWidth`) | every capture overflows, e.g. home 1488/1440, projects 1568/1440, home 433/375 |
| Inputs without label | 4 on Contact |
| JS disabled | blank page (`innerText` = "") |
| `prefers-reduced-motion: reduce` | animation continues (frames differ) |

### Audit side effects (read this)

- `npm ci` deleted most of `node_modules` before it failed. I restored it with `npm install`, which touched `Portfolio/package-lock.json`. **Correction (added later):** `Portfolio/` *is* a git repo (my original check ran from the parent folder). `git diff` shows the lockfile content is identical to the last commit, so nothing actually changed.
- `next build` regenerated `.next/` (a build artifact, gitignored).
- `AUDIT.md` (this file) was created.
- Lighthouse, Playwright, screenshots and HTML dumps live only in the session scratchpad, not in the project.

---

## 3. Findings by category

### 3.1 SEO (highest priority)

#### SEO-01 — Page content is client-only; the server returns an empty shell
- **Severity:** Critical · **Effort:** S · **Source:** seo-audit, ai-seo, karpathy-guidelines (root cause), impeccable (audit)
- **Location:** `pages/_app.tsx:14-19` (`SparkleTrail` and `SideBar` loaded with `ssr:false`), `pages/_app.tsx:50-62` (`SparkleTrail` wraps `Layout` and `Component`)
- **Evidence:** `curl http://localhost:3123/en/home` returns `<div id="__next">` containing only Emotion `<style>` tags. The `<head>` has no `<title>`, no `description`, no `canonical`, no hreflang, no `og:*`, no `twitter:*` (`PageSeo` is rendered *inside* the page, which sits inside the `ssr:false` wrapper). SSR HTML has 0 headings, 0 links, 0 images, 0 nav. The same holds for all 8 routes. JSON-LD and the GSC verification tag *are* present, because `<Seo>` sits outside the wrapper. A Playwright run with JS disabled shows a blank page.
- **Impact:** Google indexes in two waves and only sees content after a deferred JS render. Social previews on WhatsApp, Facebook and LinkedIn (the main sharing channel for Israeli SMBs) show no title, description or image. AI crawlers don't execute JS and get nothing to cite. CLAUDE.md records meta tags as "done", but they never reach the HTML.
- **Fix:** Make `SparkleTrail` a sibling overlay instead of a wrapper (it needs no children; render it next to `<Layout>`), or import it normally. Its browser APIs are already inside `useEffect`, so SSR is safe. Do the same for `SideBar`. Then re-check with `curl` that `<title>`, the description and `<h1>` appear in the raw HTML.

#### SEO-02 — `<html>` has no `lang` or `dir`
- **Severity:** Critical · **Effort:** S · **Source:** seo-audit (international), impeccable, ui-ux-pro-max, Lighthouse `html-has-lang`
- **Location:** missing `pages/_document.tsx`. Direction is only applied per text block in `components/TextWrapper.tsx:12-15`.
- **Evidence:** the raw HTML starts `<!DOCTYPE html><html><head>`. After hydration, `document.documentElement.lang === ""` on all routes.
- **Fix:** Add `_document.tsx` that sets `lang` and `dir` from the route's `lang` param (`he` → `dir="rtl"`), or switch to Next's built-in `i18n` config, which sets `lang` automatically. Once `dir="rtl"` is global, `TextWrapper` and most per-component direction props can be removed (see CODE-02).

#### SEO-03 — No `<h1>`; headings are divs with per-letter spans
- **Severity:** High · **Effort:** S · **Source:** seo-audit, impeccable, ui-ux-pro-max (`heading-hierarchy`), redesign-existing-projects (div soup)
- **Location:** `styles/layoutComponents.tsx:67` (`Header = styled.div`), `utils/splitText.tsx:53-112` (each char is a `motion.span`), `pages/[lang]/home.tsx:88-125`
- **Evidence:** Playwright reports `h1: []` on all routes. The site's only headings are the 11 card titles (`components/card.tsx:95`, `DetailsTitle = styled.h2`). The decorative "&lt;h1&gt;" and "&lt;/h1&gt;" around the logo are plain text.
- **Fix:** Give each page one real `<h1>` with the page's keyword intent. On Home, the brand name alone wastes the h1; consider "Web Witch" plus a visible descriptor such as "בניית אתרים לעסקים קטנים". Put `aria-label` with the full text on the heading and `aria-hidden` on the letter spans, so screen readers and Google read a word, not letters. Use `<h2>` for section headings.

#### SEO-04 — Soft-404s: any language slug returns 200; unknown URLs redirect to Home
- **Severity:** High · **Effort:** S · **Source:** seo-audit (indexation)
- **Location:** `pages/[lang]/index.tsx:3-13`, and the `getServerSideProps` in each `pages/[lang]/*.tsx` (e.g. `home.tsx:147-151`) falls back to `'he'` for any value
- **Evidence:** `GET /fr/home` → 200 (Hebrew page). `GET /llms.txt` → 307 → `/he/home`. `GET /he` → 307 (temporary). `GET /` → 308 (permanent). `GET /he/nope` → 404 (correct).
- **Fix:** Return `notFound: true` for any lang other than `he`/`en`. Better: move to `getStaticProps` + `getStaticPaths` with `paths: he/en, fallback: false` (see SEO-08). Make `/he` and `/en` permanent redirects.

#### SEO-05 — Hebrew copy contains unassigned Unicode code points
- **Severity:** High · **Effort:** M (copy decision) · **Source:** seo-audit (content quality), ai-seo, impeccable (i18n), copy-editing
- **Location:** `i18n/contact/he.ts` (U+05C9 ×1, U+05CA ×2, U+05CC ×1), `i18n/home/he.ts` (U+05CA ×3), `i18n/projects/he.ts` (U+05C9, U+05CA), `i18n/sideBar/he.ts:5` ("צור׊ קשר")
- **Evidence:** a code-point scan found these characters. They're not Hebrew letters in Unicode; the custom Alef MultiGndr font draws gender-inclusive ligatures for them. In the screenshots, input placeholders and the submit button ("בוא׊ נצא לדרך") render them as stray colon-like marks.
- **Impact:** Google, Bing, AI engines and screen readers see unknown tokens inside key words (nav "Contact", CTA, page subtitles), so those words don't match any search query.
- **Fix:** Decide on an addressing strategy (see CRO-06) and use standard Unicode text, e.g. plural "צרו קשר" or slash forms "צור/י". If the inclusive glyphs are core to the brand, keep them purely presentational: real text in the DOM, glyphs drawn via CSS or an `aria-hidden` overlay.

#### SEO-06 — Prices in meta description and JSON-LD contradict the "pricing deferred" decision
- **Severity:** High (business/consistency) · **Effort:** S · **Source:** seo-audit, ai-seo
- **Location:** `pages/[lang]/home.tsx:27` and `:40` ("Starting at ₪4,500" / "החל מ-₪4,500"); `components/Seo.tsx:43-71` (three `Offer`s at ₪4,500 / ₪6,500 / ₪9,900)
- **Evidence:** `CLAUDE.md` says "Julia doesn't want the pricing/packages content added to the site yet". The prices aren't visible on any page, but they're published in SERP snippets and structured data. Google's structured-data guidelines require markup to reflect visible content.
- **Fix:** Either publish the packages on a real page (then the markup is valid and the `/pricing.md` idea from ai-seo applies), or remove the price from the description and the `hasOfferCatalog` from the JSON-LD. **Needs your decision.**

#### SEO-07 — Structured data is thin and not tied to page content
- **Severity:** Medium · **Effort:** M · **Source:** seo-audit, ai-seo
- **Location:** `components/Seo.tsx:8-74`
- **Evidence:** Only `Organization` (with a nested founder `Person`) and `ProfessionalService` exist, on every page. Missing: `WebSite`, a standalone `Person` (`@id`, `image`, `sameAs`, `knowsAbout`) linked from About, `BreadcrumbList`, `CreativeWork`/`WebSite` items for the 5 client projects, `address` / `areaServed` with a city or region, `telephone`, `email`, `priceRange`. `logo` points to a square 1181×1181 OG image.
- **Fix:** Use one `@graph` with `Organization` (+`logo`), `Person` (Julia), `WebSite` (with `inLanguage` he/en), `ProfessionalService` (`areaServed`: the actual cities or "Central District, Israel", `telephone`, `url`), and per-page `WebPage` + `BreadcrumbList`. On Projects, add an `ItemList` of `CreativeWork` with `url`, `image`, `creator` and `about`. Validate in the Rich Results Test after SEO-01 is fixed.

#### SEO-08 — Static content served with `getServerSideProps` (no cache, no bf-cache)
- **Severity:** Medium · **Effort:** S · **Source:** seo-audit (speed), Lighthouse `bf-cache`, ui-ux-pro-max (performance)
- **Location:** `getServerSideProps` in all 4 `pages/[lang]/*.tsx`; `pages/_error.tsx:53` (`getInitialProps` makes `/404` dynamic too)
- **Evidence:** the build marks every route `λ`. Lighthouse reports "Pages with cache-control:no-store header cannot enter back/forward cache". The content only depends on `lang`.
- **Fix:** Use `getStaticProps` + `getStaticPaths` (`he`, `en`). Add a static `pages/404.tsx`. Keep `/` → `/he/home` as a redirect in `next.config.js` (`redirects()`), not a runtime page.

#### SEO-09 — OG image is the wrong shape and shared by all pages
- **Severity:** Medium · **Effort:** S · **Source:** seo-audit, copywriting (meta content)
- **Location:** `components/PageSeo.tsx:14,39,44`; `public/images/og-image.png` (1181×1181, 341 KB PNG)
- **Evidence:** `summary_large_image` and Facebook/LinkedIn expect about 1200×630. A square image gets cropped. There's no `og:image:width`, `og:image:height` or `og:image:alt`, no `og:locale:alternate`, and no per-language image.
- **Fix:** Make 1200×630 JPG/WebP images per language (under 150 KB) and add the dimension and alt tags. Only matters once SEO-01 is fixed.

#### SEO-10 — Thin content and weak internal linking
- **Severity:** High · **Effort:** L · **Source:** seo-audit (content depth, E-E-A-T), ai-seo (citable content), cro
- **Location:** `i18n/*`, `utils/projectList.json`, `pages/[lang]/projects.tsx`
- **Evidence:** each page has roughly 30–150 words of body copy. There are no service descriptions, no process, no FAQ, no case-study pages. Every project card links off-site in a new tab. About has no link to Contact or Projects. Nothing on the site targets queries like "בניית אתר לעסק קטן", "עיצוב אתר תדמית" or "אתר לעסק במרכז".
- **Fix:** Add (a) a services section or page in Hebrew with plain-language deliverables, (b) one case-study page per real client project (`/he/projects/havaya-gems` etc.) covering problem, what was built and result, with screenshots and a quote, (c) a short FAQ (timeline, what's included, maintenance, Hebrew/RTL, price range if published). programmatic-seo isn't warranted: 5 hand-written case studies beat templates at this scale.

#### SEO-11 — Local SEO signals for central Israel are missing
- **Severity:** Medium · **Effort:** M · **Source:** seo-audit (local business), ai-seo
- **Location:** site-wide; `components/Seo.tsx:24,42` (`areaServed: Israel` only)
- **Evidence:** no city or region appears anywhere in visible copy or schema. There's no phone number as text, no Google Business Profile link in `sameAs`, and no NAP (name/address/phone) block. **Needs verification:** whether a Google Business Profile exists.
- **Fix:** Add a footer NAP with service area (e.g. "Serving Tel Aviv, Gush Dan and the Sharon – remote across Israel", using your real area), a clickable phone and WhatsApp number, GBP + LinkedIn in `sameAs`, and the same NAP in JSON-LD. Create or claim a Google Business Profile (service-area business) and list on Israeli directories (the `directory-submissions` skill can help later).

#### SEO-12 — `llms.txt` missing; the URL redirects to Home
- **Severity:** Medium · **Effort:** S · **Source:** ai-seo, Lighthouse `llms-txt`
- **Location:** `public/` (absent); `pages/[lang]/index.tsx` catches `/llms.txt`
- **Evidence:** `/llms.txt` → 307 → `/he/home`. CLAUDE.md defers it because of pricing, but an `llms.txt` doesn't need prices.
- **Fix:** Add `public/llms.txt` with who Julia is, the services, the audience, the service area, contact details and links to the 8 pages and future case studies, without pricing. (Static files in `public/` take precedence over the dynamic route.)

#### SEO-13 — Metadata details
- **Severity:** Low · **Effort:** S · **Source:** seo-audit
- **Location:** `components/PageSeo.tsx:26-27`; `pages/[lang]/about.tsx:24`; `pages/[lang]/contact.tsx:34`
- **Evidence:** `meta keywords` (ignored by Google, and it leaks your keyword strategy) and non-standard `meta name="language"`. The EN About title is about 75 characters and gets truncated. The HE Contact title uses masculine "צור קשר" while its description addresses a woman ("מעוניינת", "דברי"). Sitemap `lastmod` is 2026-07-02 for every URL.
- **Fix:** Remove keywords and language meta. Trim titles to about 60 characters. Align gendered wording with CRO-06. Generate the sitemap at build time so `lastmod` stays truthful.

#### SEO-14 — Unlinked CV PDF is publicly reachable
- **Severity:** Low · **Effort:** S · **Source:** seo-audit, security-review checklist
- **Location:** `public/pdf/Julia Savransky-Perl CV.pdf` (99 KB; no references in code)
- **Evidence:** It's served at `/pdf/Julia%20Savransky-Perl%20CV.pdf` and can be indexed if anything links to it. **Needs verification:** whether it contains a home address or phone you don't want public, and whether it's meant to be published.
- **Fix:** Remove it, or link it intentionally (and rename it without spaces).

### 3.2 Performance

#### PERF-01 — Content hidden until load, fonts and timers finish (mobile LCP 7.5–8.5 s on all routes)
- **Severity:** High · **Effort:** S · **Source:** Lighthouse, ui-ux-pro-max, emil-design-eng, impeccable (optimize)
- **Location:** `hooks/useSmoothReady.ts:17-58`; `MotionMainWrapper` usage in all 4 pages (e.g. `home.tsx:69-74`, `initial={{opacity:0,y:20}}`)
- **Evidence:** `isFullyReady` requires `window` `load`, `document.fonts.ready`, a 300 ms timer and a separate 300 ms lang timer. Until then the page is at opacity 0. Lighthouse puts most of the LCP in "element render delay". Mobile LCP is 7.5–8.5 s on all 8 routes (see table in section 2).
- **Fix:** Render content visible from the server (after SEO-01). Drop `useSmoothReady` and the page-level fade, or limit it to a 150–200 ms opacity fade that doesn't wait for `load` or fonts. `font-display: swap` already handles FOIT.

#### PERF-02 — 14 font files preloaded on every page
- **Severity:** High · **Effort:** S · **Source:** ui-ux-pro-max (`font-preload`), Lighthouse, design-taste-frontend, minimalist-ui
- **Location:** `styles/fonts/font.ts:1-104`; `styles/fonts/fonts.css`
- **Evidence:** the SSR `<head>` contains 14 `<link rel="preload" as="font">` entries. 12 families exist only for the letter-shuffle effect (Barrio, Cherish, Nosifer, Londrina Sketch, Fredericka, Rubik Glitch, Rubik Wet Paint, Noto Rashi Hebrew with 9 weights, Fredoka with 5 weights, etc.). Alef MultiGndr is served as WOFF/TTF (no WOFF2) from `public/`.
- **Fix:** Keep two text families plus at most one display face. If the shuffle effect stays, set `preload: false` on those fonts and load them after idle. Convert Alef to WOFF2. Trim weights to the ones used.

#### PERF-03 — Always-on canvas particles with `shadowBlur`
- **Severity:** Medium · **Effort:** S · **Source:** impeccable (audit: expensive animations), emil-design-eng, ui-ux-pro-max (`main-thread-budget`)
- **Location:** `components/animatedBackground .tsx:50-79`
- **Evidence:** 70 particles redraw every frame with `ctx.shadowBlur = 10` (`blur = radius > 0` is always true, so every particle blurs). The loop never pauses when the tab is hidden and ignores reduced motion. The canvas isn't sized for `devicePixelRatio`, so it looks blurry on retina.
- **Fix:** Remove it (see DES-01), or render a static version, pause on `visibilitychange`, and skip it entirely under `prefers-reduced-motion`.

#### PERF-04 — SplitText forces layout every second
- **Severity:** Medium · **Effort:** M · **Source:** impeccable detector (`layout-transition`), Lighthouse `forced-reflow`, emil-design-eng, ui-ux-pro-max
- **Location:** `utils/splitText.tsx:31-49` (measures every char and word with `getBoundingClientRect` on each `animateFont` change), `:72` (`transition: width`), `:91` (`transition: all`); `hooks/useSplitTextAnimation.ts:43-60` (two `setState` calls per second plus a nested `setTimeout`, never cleared on unmount)
- **Fix:** If the effect stays, animate one letter with `transform`/`opacity` only and reserve width with a fixed-advance container. Clear the inner timeout on unmount. Detector also flags `styles/sideBarComponents.tsx:85` (`transition: width`): use `transform: scaleX`.

#### PERF-05 — Dictionaries re-fetched on the client for every component
- **Severity:** Medium · **Effort:** S · **Source:** karpathy-guidelines (simplicity), ui-ux-pro-max (`react`)
- **Location:** `hooks/useTranslation.ts:13-20`; `components/card.tsx:148` (11 cards call `useTranslation('projects')` without `initialDict`); `components/contactForm.tsx:16`
- **Evidence:** even with `initialDict`, the hook dynamically imports the dictionary again after mount. Cards render an empty "visit" label until that resolves.
- **Fix:** Pass `t` down from the page (or via context) and drop the client re-fetch.

#### PERF-06 — Sparkle trail state updates on every mouse frame
- **Severity:** Low · **Effort:** S · **Source:** design-taste-frontend (3.B: no `useState` for pointer streams), emil-design-eng
- **Location:** `components/sparkleTrail.tsx:18-54`
- **Evidence:** `setSparkles` runs on every animation frame while the mouse moves, keeping up to 30 framer-motion nodes alive. Touch uses `clientX/Y` while mouse uses `pageX/Y`, so on scrolled pages touch sparkles appear in the wrong place.
- **Fix:** Remove it (DES-01). If kept, drive it with a pooled canvas or `useMotionValue` and disable it on touch and reduced motion.

#### PERF-08 — Layout shift on Contact (mobile CLS 0.20–0.23)
- **Severity:** Medium · **Effort:** S · **Source:** Lighthouse, ui-ux-pro-max (`content-jumping`), seo-audit (CWV)
- **Location:** `styles/contactListComponents.tsx:3-18` (`height: 92%` / `clamp(35rem,100vh,…)` absolute container), `components/contactForm.tsx` (labels and dictionary arrive after mount, PERF-05), the 3 s tooltip insertion (`styles/decoTagSmart.tsx:61`)
- **Evidence:** CLS 0.233 (HE) and 0.198 (EN) on mobile, against a target under 0.1. Desktop is 0.03. About is 0.08–0.09 (the profile image container reserves its space, the tag cloud doesn't). The exact shifting nodes are **Needs verification** in the Lighthouse "layout-shifts" details. These are the likely causes based on code.
- **Fix:** Fixed by the SSR, layout and dictionary fixes (SEO-01, DES-04, PERF-05) and removing the tooltip (DES-06). Re-measure afterwards.

#### PERF-07 — Images: missing `sizes`; `width`/`height` don't match rendered aspect
- **Severity:** Low · **Effort:** S · **Source:** seo-audit (images), ui-ux-pro-max (`image-dimension`)
- **Location:** `components/card.tsx:140-145,161-166`
- **Evidence:** declared 400×225 (16:9), but CSS forces `aspect-ratio: 5/6` with a clamp height and no `sizes` attribute. Source JPGs are 60–213 KB (next/image converts them). Some cards (Star Wars, Weather, Pass On) were blank in the full-page screenshots. That's **Needs verification**: probably lazy-loading not triggered by a full-page capture rather than a real bug.
- **Fix:** Set width/height to the real ratio and add `sizes="(max-width:768px) 90vw, 400px"`. Use `priority` only on the first visible card.

### 3.3 Code quality and correctness

#### CODE-01 — `next.config.js` webpack rule has duplicate keys (SVG rule silently lost)
- **Severity:** High · **Effort:** S · **Source:** /review checklist, karpathy-guidelines
- **Location:** `next.config.js:5-14`
- **Evidence:** one object literal defines `test` and `use` twice. JavaScript keeps the last pair, so the SVG/`@svgr` rule is discarded and the rule actually applied is a PDF rule using `file-loader`, which isn't installed. Nothing imports `.svg` or `.pdf` today, so the build passes. The first PDF import would fail.
- **Fix:** Delete the rule along with `@svgr/webpack` and `custom.d.ts` (all unused), plus the commented-out block at the bottom.

#### CODE-02 — Language is tracked in four places and starts as Hebrew on English pages
- **Severity:** High · **Effort:** M · **Source:** karpathy-guidelines (DRY), /review, ui-ux-pro-max
- **Location:** `pages/_app.tsx:23-36` (state + `localStorage`), `hooks/useTranslation.ts:10` (`useState('he')`), `components/languageSwitcher.tsx:9` (router query), `styles/theme.ts:35` (`lang: 'he'`)
- **Evidence:** on `/en/*`, the first render uses `lang='he'`. `_app` applies Alef instead of Roboto, `SplitText` picks Hebrew font classes, `DecoTagSmart` shows the Hebrew tooltip, and `ContactForm` inputs start RTL. All of this flips after the effect runs. Once SSR is restored (SEO-01), this becomes a **hydration mismatch** and a visible flash. `localStorage.preferredLang` is written but never used for routing.
- **Fix:** Use one source of truth: the `lang` page prop from `getStaticProps`. Read `pageProps.lang` in `_app`, put it in the theme or a context, and delete the other copies.

#### CODE-03 — Page boilerplate duplicated four times
- **Severity:** Medium · **Effort:** S · **Source:** karpathy-guidelines (DRY)
- **Location:** identical `getServerSideProps` in `home.tsx:147-159`, `about.tsx:138-150`, `projects.tsx:127-139`, `contact.tsx:126-138`; identical `MotionMainWrapper` props block in each page; identical `useSmoothReady` / `useSplitTextAnimation` / `useCustomTheme` setup
- **Fix:** One `getLangStaticProps(namespace)` helper and one `PageShell` component (`PageSeo` + wrapper + title).

#### CODE-04 — Nav dictionary is never loaded server-side
- **Severity:** Medium · **Effort:** S · **Source:** /review
- **Location:** `pages/_app.tsx:58` (`<SideBar lang={lang} initialDict={{}} />`)
- **Evidence:** nav labels are empty until the client fetches `sideBar/*`. After the SEO-01 fix, the SSR nav would contain empty links (no anchor text for crawlers).
- **Fix:** Load the `sideBar` namespace in the page's static props, or import both small dictionaries statically.

#### CODE-05 — Desktop and mobile nav both always rendered
- **Severity:** Medium · **Effort:** M · **Source:** /review, ui-ux-pro-max, Lighthouse `list`/`listitem`
- **Location:** `components/sideBar.tsx:38-68`; `components/mobileMenu.tsx`; `components/toggleSwitch.tsx:91`
- **Evidence:** `LanguageSwitcher` renders twice, giving a duplicate `id="toggle"`. `SocialLinks` appears 2× in the DOM (3× on Contact via `IconsContactWrapper`). Mobile `NavItem` `<li>`s have no `<ul>`. The desktop `<ul>` contains a `<div>`.
- **Fix:** One `<nav><ul>` styled responsively with CSS, social links outside the list, and one language link.

#### CODE-06 — Dead code and unused assets
- **Severity:** Medium · **Effort:** S · **Source:** karpathy-guidelines, ponytail (YAGNI), /review
- **Location / evidence:**
  - `utils/Icon.tsx`, `utils/iconDictionary.ts`: never imported
  - `components/toolTip.tsx:54-94`: default `TooltipTop` never used (only its styled parts are)
  - `styles/layoutComponents.tsx:38,80`: `HeaderContainer`, `Spacer` unused
  - `styles/theme.ts`: `fonts.*`, `colors.greyDarkBG2`, `size.fontTiny` unused
  - `custom.d.ts`: SVG module declaration for a non-existent folder
  - `tsconfig.json`: includes non-existent `components/SvgRenderComp.jsx`; `typeRoots` points to non-existent `./types`
  - `public/next.svg`, `public/thirteen.svg`, `public/vercel.svg`, `public/svgs/*` (8 files), `public/matiMorWorkshop.jpg` (duplicate of `public/images/…`), `public/images/underline.svg` is used, the others aren't
  - `README.md`: create-next-app boilerplate
  - `components/animatedBackground .tsx:1`: `'use client'` is a no-op in Pages Router
  - `components/card.tsx:69-78`: `ProjectCardIMage:hover` duplicates the parent hover rule
- **Fix:** Delete them.

#### CODE-07 — Theme type declared three times
- **Severity:** Low · **Effort:** S · **Source:** karpathy-guidelines (DRY), design-system
- **Location:** `styles/theme.ts:1-30`, `styles/emotion.d.ts:4-34`, `components/card.tsx:10-12`
- **Fix:** Keep `theme.ts`, and have `emotion.d.ts` do `interface Theme extends CustomTheme {}` once. Remove the augmentation in `card.tsx`.

#### CODE-08 — File naming and structure
- **Severity:** Medium · **Effort:** S · **Source:** /review, redesign-existing-projects (code quality)
- **Location / evidence:** `components/animatedBackground .tsx` (trailing space in the filename, imported as `'../../components/animatedBackground '`), `components/magicButton.tsx.tsx` (double extension), mixed casing (`PageSeo.tsx` / `card.tsx` / `sideBar.tsx` / `MailErrorPopup.tsx`), React components inside `styles/` (`decoTagSmart.tsx`, `animationList.tsx`), `hooks/getDictionary.ts` isn't a hook, `utils/splitText.tsx` is a component. Hebrew comments mixed with English.
- **Fix:** Rename to one convention (PascalCase components in `components/`, camelCase utilities in `lib/`) and fix the imports. A pure rename, no behavior change.

#### CODE-09 — Hydration risks that will surface once SSR is restored
- **Severity:** Medium · **Effort:** S · **Source:** /review (Server vs Client rendering)
- **Location:** `styles/decoTagSmart.tsx:46-52` (`Math.random()` picks the animation variant during render); `pages/_app.tsx:23` and `hooks/useTranslation.ts:10` (lang defaults, see CODE-02); `components/textCloud.tsx:17` (global `.tagcloud` selector, so two instances would collide)
- **Fix:** Pick the random variant in an effect or deterministically from `text`. Use a ref instead of a class selector.
- *Note on "use client":* this is a Pages Router app, so Server/Client Component rules don't apply. The single `'use client'` directive is inert (CODE-06).

#### CODE-10 — Contact API: no spam protection or size limits; nodemailer DoS reachable
- **Severity:** High · **Effort:** M · **Source:** /security-review checklist, agent-skills:security-and-hardening (checklist only)
- **Location:** `pages/api/contact.ts:16-71`
- **Evidence:** no rate limit, honeypot, CAPTCHA or origin check. No max length on `name`, `subject` or `message`. Fields aren't type-checked as strings (a non-string `name` throws inside `escapeHtml` and returns a 500). The user-supplied `email` goes to `replyTo`, which reaches the nodemailer addressparser that has the high-severity quadratic DoS advisories (DEP-02). Gmail SMTP with an app password has daily send limits that a bot can exhaust. HTML escaping is correct. There are no secrets in code (credentials come from `EMAIL_USERNAME`/`EMAIL_PASSWORD` env vars).
- **Fix:** Validate types and lengths (e.g. name ≤ 100, subject ≤ 150, message ≤ 5000). Add a honeypot field and a simple per-IP rate limit (Vercel KV/Upstash or Vercel Firewall rule). Upgrade nodemailer. Consider a transactional provider (Resend/Postmark) instead of Gmail SMTP.

#### CODE-11 — Contact form state and timing bugs
- **Severity:** Medium · **Effort:** S · **Source:** /review, ui-ux-pro-max (forms), cro (form)
- **Location:** `components/contactForm.tsx:36-62`, `:120-126`, `:155-159`
- **Evidence:** on error, a 12 s timer auto-closes the WhatsApp fallback dialog, so a user who's reading it loses the only recovery path. The `finally` block also starts a 3 s timer on failures. Timers aren't cleared on unmount. The error copy always says "my server is swamped" whatever the real cause (often an SMTP or credential failure). The submit button is disabled until all four fields are filled, with no explanation. The success toast has no `role="status"`/`aria-live`.
- **Fix:** Keep the error dialog open until dismissed. Show a neutral error ("ההודעה לא נשלחה. אפשר לנסות שוב או לכתוב בוואטסאפ"). Keep the button enabled and show inline validation on submit. Announce success in a live region.

#### CODE-12 — MagicButton blocks navigation and modifier clicks
- **Severity:** Medium · **Effort:** S · **Source:** emil-design-eng (never block input with animation), ui-ux-pro-max (`no-blocking-animation`)
- **Location:** `components/magicButton.tsx.tsx:83-91,123-126`
- **Evidence:** `preventDefault()` on every click breaks Ctrl/Cmd-click (open in new tab). Navigation waits for a 400 ms flip. `clicked` never resets after a back-navigation in the same session. On hover, the label flips to "Design. Code. Wonder", hiding what the button does.
- **Fix:** Use a normal `next/link`. If you want feedback, use a 120–160 ms `:active` scale. Keep the label constant.

#### CODE-13 — Type safety gaps
- **Severity:** Low · **Effort:** S · **Source:** /review
- **Location:** `hooks/getDictionary.ts:12` (`Record<string,string>`, so a typo like `t.sumbit` compiles and renders `undefined`); `utils/splitText.tsx:7-25` (props `theme`, `lang`, `initialDict` are declared, passed by every caller, and ignored); `components/card.tsx:20` (`lang: string`); `textCloud.tsx` uses two `@ts-ignore`s
- **Fix:** Type dictionaries as `typeof he` so missing keys fail the build. Remove the unused props.

#### CODE-14 — Secrets check
- **Severity:** none (pass) · **Source:** /security-review checklist
- **Evidence:** `.env.local` holds only `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_GSC_VERIFICATION` (public by design) and is gitignored. No API keys, SMTP passwords or tokens appear in source. The recipient email and WhatsApp number are hard-coded and public on purpose. (An earlier version of this item said the project wasn't under git. That was wrong, see DEP-04.)

### 3.4 Design / UX

#### DES-01 — Too much simultaneous, unmotivated motion
- **Severity:** High · **Effort:** M · **Source:** impeccable (quieter/distill), frontend-design ("one orchestrated moment"), emil-design-eng (purpose and frequency), minimalist-ui, design-taste-frontend (motion must be motivated), ui-ux-pro-max (`excessive-motion`)
- **Location:** `animatedBackground .tsx` (particles), `sparkleTrail.tsx` (cursor trail), `useSplitTextAnimation.ts` (font shuffle every 1 s, forever), `decoTagSmart.tsx` + `animationList.tsx` (16 random variants incl. jello, wobble, flip, swing), `toolTip.tsx:36` (infinite float), `skillsPageComponents.tsx:68` (infinite bouncing arrow), `textCloud.tsx` (rotating sphere), `profileImg.tsx:43` (8 s mask), `socialLinks.tsx:111-117` (LinkedIn icon cycles through 4 unrelated icons on hover), `socialLinks.tsx:47` (infinite ring), `magicButton` (3D flip), page fades
- **Evidence:** in the screenshots, the hero has particles, a tooltip, the shuffle and the deco tags all moving at once. None of these communicates state or hierarchy.
- **Fix:** Keep one signature moment and cut the rest. Recommended: the title's letter-shuffle, played once on load or on hover/focus of the title only, with 2–3 fonts. Remove the particles, sparkle trail, random deco-tag variants, infinite loops and the icon cycling. Keep only feedback motion: `:active` press, menu open/close, form result.

#### DES-02 — `prefers-reduced-motion` not supported anywhere
- **Severity:** High · **Effort:** S · **Source:** ui-ux-pro-max (`reduced-motion`), emil-design-eng, impeccable (audit), design-taste-frontend (6.B, mandatory), WCAG 2.3.3
- **Location:** site-wide (0 matches for `prefers-reduced-motion` / `useReducedMotion`)
- **Evidence:** in a Playwright run with `reducedMotion: 'reduce'`, consecutive frames still differ.
- **Fix:** Add a global `@media (prefers-reduced-motion: reduce)` that stops loops and transforms (keeping short opacity fades, per emil-design-eng), wrap framer-motion with `MotionConfig reducedMotion="user"`, and skip the canvas, sparkles and shuffle.

#### DES-03 — Horizontal overflow at every viewport
- **Severity:** High · **Effort:** M · **Source:** ui-ux-pro-max (`horizontal-scroll`), impeccable (adapt), seo-audit (mobile-friendliness)
- **Location:** `components/sparkleTrail.tsx:57` (`width: 100vw`, which includes scrollbar width), `styles/layoutComponents.tsx:24-26` (`width: 90vw` + `left: clamp(2rem,15vw,12rem)`), `styles/projectsPageComponents.tsx:10-11`, `styles/contactListComponents.tsx:10-11`, `components/mobileMenu.tsx:19` (`width:100vw` + `margin:1rem`)
- **Evidence:** `scrollWidth` exceeds `clientWidth` on all 24 captures. At 375 px the closed off-canvas menu shows as a yellow strip on the right edge (screenshot `he-home-375.png`), and the Contact subtitle is clipped at the left edge (`he-contact-375.png`).
- **Fix:** Fix the root cause rather than masking it with `overflow-x: hidden`: use `width: 100%`, not `100vw`, and replace the absolute page containers with normal flow (DES-04). Hide the closed menu with `visibility:hidden`/`inert` (A11Y-07).

#### DES-04 — Layout built on absolutely positioned page containers; no footer
- **Severity:** High · **Effort:** L · **Source:** impeccable (layout), redesign-existing-projects, ui-ux-pro-max (`container-width`)
- **Location:** `MainPageContainer` (`layoutComponents.tsx:18-36`), `Row` (`skillsPageComponents.tsx:4-23`), `ProjectsContainer`, `ContactMainPageContainer`, all `position:absolute; left: clamp(...)`; desktop nav `position:fixed` (`sideBarComponents.tsx:34-44`)
- **Evidence:** page content isn't in document flow. Spacing is managed by viewport math, so there's no max-width container and no place for a footer. The mobile nav (`MenuButtonContainer`) isn't sticky.
- **Fix:** Use a CSS grid shell, `grid-template-columns: [nav] auto [content] 1fr`, with `padding-inline-start` for the fixed sidebar, content in a `max-width: ~72rem` container with logical margins, and a footer.

#### DES-05 — RTL and Hebrew typography errors
- **Severity:** High · **Effort:** M · **Source:** impeccable (i18n), ui-ux-pro-max (`letter-spacing`), seo-audit (lang)
- **Location / evidence:**
  - Hebrew nav letter-spaced `clamp(0.125rem,0.4vw,0.5rem)` (`sideBarComponents.tsx:67`), which pulls Hebrew words apart ("ב י ת", "צ ו ר ׊   ק ש ר" in `he-home-1440.png`). Body `Paragraph` also letter-spaced (`layoutComponents.tsx:89`). Hebrew shouldn't be tracked.
  - No document-level `dir` (SEO-02). Direction is patched per block via `TextWrapper`, `Input lang=`, `TextArea lang=`.
  - Physical properties everywhere (`left`, `right`, `margin-left`, `padding-right`, deco-tag `left:'-4rem'`). The only logical property is `marginInlineEnd` in `splitText.tsx:73`.
  - The "→" in the card link (`card.tsx:174`) isn't mirrored for Hebrew.
  - The mobile menu always slides in from the right (`mobileMenu.tsx:56`), and the toggle is offset `left:2rem` in both languages.
  - Hebrew paragraphs are centered and long (6–9 lines at 1440): hard to read in RTL.
  - Line-height 1.2 on `body` (`reset.tsx:46`) and 1.4 on `Paragraph`. Hebrew with niqqud-free text still needs about 1.6.
- **Fix:** Set `dir` globally, convert to logical properties (`inset-inline-start`, `margin-inline`, `padding-inline-end`), remove letter-spacing for `:lang(he)`, mirror directional icons with `[dir=rtl] { transform: scaleX(-1) }`, start-align body copy, and raise the body line-height.

#### DES-06 — Onboarding tooltip covers content
- **Severity:** Medium · **Effort:** S · **Source:** impeccable (critique), ui-ux-pro-max (`focus-not-obscured`), cro (friction)
- **Location:** `styles/decoTagSmart.tsx:54-93` (shows after 3 s on `isPrimaryTag` tags); `contactForm.tsx:67-75`
- **Evidence:** "👆 נסי ללחוץ אלינו ✨" / "try clicking us" covers the **W** of the logo on Home (all widths) and the **Name input** on Contact (`en-contact-1440.png`, `he-contact-375.png`). It promotes an easter egg, not a goal.
- **Fix:** Remove it.

#### DES-07 — The `</html> <h1> </body>` decoration reads as a generic dev-portfolio template
- **Severity:** Medium · **Effort:** S · **Source:** design-taste-frontend (AI/template tells), redesign-existing-projects, frontend-design (templated defaults), gpt-taste (meta-label ban)
- **Location:** `DecoTagSmart` / `DecoTagWrapper` usage in all pages and `contactForm.tsx:136-153`
- **Evidence:** this is the widespread "developer portfolio" motif. The tags are in reverse order (`</html>`, `</body>` at the top of Home), it speaks to developers rather than the stated audience (small-business owners), and the tags are real text that gets read aloud and indexed (A11Y-10).
- **Fix:** Remove them. If you want a code nod, keep one subtle, `aria-hidden` instance.

#### DES-08 — Typography system: 15 families and inline overrides
- **Severity:** Medium · **Effort:** M · **Source:** impeccable (typeset), frontend-design, minimalist-ui, design-taste-frontend, high-end-visual-design, redesign-existing-projects
- **Location:** `styles/fonts/font.ts`, `styles/theme.ts:56-63`, inline styles in pages (`about.tsx:94` `width:'70%'`, `:122` `calc(fontBig*1.7)`, `home.tsx:101,115`)
- **Evidence:** a size scale exists in `theme.size` but pages bypass it inline. The EN About paragraph is forced to 70% width, giving about 3–4 words per line at 375 px (`en-about-375.png`). Card titles use the La Belle Aurore script, which is hard to read. Roboto at weight 100 for EN body text and CTA ("Let's Make Magic") is too thin on dark.
- **Fix:** Use one Latin and one Hebrew text family that pair well (Alef can stay for Hebrew if the inclusive glyphs are kept, see SEO-05), plus one display face for the logo only. Base 16–18 px body at weight 400, and every size from `theme.size`.

#### DES-09 — Color tokens: primitives only, many hard-coded values, purple fails contrast
- **Severity:** Medium · **Effort:** S · **Source:** design-system (3-layer tokens), ui-styling, ui-ux-pro-max (`color-semantic`), impeccable (theming)
- **Location:** `styles/theme.ts:37-44`. Hard-coded hex in `about.tsx:104-106`, `textCloud.tsx:46`, `toolTip.tsx:15-16`, `contactForm.tsx:167-168`, `MailErrorPopup.tsx:21,57,65`, `_error.tsx:20-21,25`, `reset.tsx:48,92-97`, `sparkleTrail.tsx:80`, `toggleSwitch.tsx:65`, `animatedBackground .tsx:25`, `card.tsx:38`
- **Evidence:** purple `#4b116f` on `#1d1d1d` is **1.29:1**, so the main CTA's 5 px purple border barely shows (WCAG 1.4.11 needs 3:1). Yellow on dark is 11.15:1 (good).
- **Fix:** Add a thin semantic layer (about 8–10 tokens: `bg`, `surface`, `text`, `textMuted`, `accent`, `accentContrast`, `border`, `focus`, `danger`) as CSS variables, and replace the raw hex. Pick a lighter purple for borders on dark, or use yellow as the single accent.

#### DES-10 — Projects page mixes client work with learning exercises; details are hover-only
- **Severity:** Medium · **Effort:** M · **Source:** cro (trust), impeccable (critique), redesign-existing-projects, design-taste-frontend
- **Location:** `utils/projectList.json` (6 of 11 entries are bootcamp/demo apps: Pokémon, TIM, Simon, Star Wars, Weather, Pass On), `components/card.tsx:44-54,79-94`
- **Evidence:** the summary and "Visit" link only appear on `:hover`, so they're unreachable on touch and with the keyboard. Cards have uneven widths and large gaps (`en-projects-1440.png`).
- **Fix:** Show the 5 client projects first, with visible summaries and a link to a case study (SEO-10). Move learning projects to a small "Experiments" list or drop them. Use a grid with consistent card sizes.

#### DES-11 — Founder photo starts hidden behind a black mask for 8 s
- **Severity:** Medium · **Effort:** S · **Source:** emil-design-eng (duration), cro (trust)
- **Location:** `components/profileImg.tsx:28-56`
- **Evidence:** at 2.5 s after load, about half of Julia's face is still covered (`he-about-1440.png`, `en-about-375.png`).
- **Fix:** Show the photo immediately. If you keep the line-draw, run it under 1 s and skip it under reduced motion.

#### DES-12 — Interaction states incomplete
- **Severity:** Medium · **Effort:** S · **Source:** ui-ux-pro-max (`state-clarity`), emil-design-eng (`:active`, hover media query), redesign-existing-projects
- **Location:** `styles/contactFormComponents.tsx:76-94` (no `:disabled` style, so the disabled submit looks clickable), nav and card links (no `:focus-visible` styles beyond the browser default), inputs replace the outline with a soft shadow (`:30-34`), no `:active` press state anywhere, hover effects not gated by `@media (hover:hover)`
- **Fix:** Add disabled, active and focus-visible states from tokens. Gate hover transforms to pointer devices.

#### DES-13 — Emoji used as UI content
- **Severity:** Low · **Effort:** S · **Source:** minimalist-ui, design-taste-frontend (3.D), ui-ux-pro-max (`no-emoji-icons`), gpt-taste
- **Location:** `utils/projectList.json` (every summary starts with an emoji), `i18n/contact/*.ts` (💌✨🧙‍♀️🤯), `decoTagSmart.tsx:89-90` (👆✨)
- **Fix:** Remove them from project summaries and errors. One playful emoji in the success message is acceptable for the brand (see Conflicts).

#### DES-14 — Error and 404 page off-brand
- **Severity:** Low · **Effort:** S · **Source:** redesign-existing-projects (custom 404), seo-audit
- **Location:** `pages/_error.tsx` (inline styles, both languages stacked, feminine-only Hebrew)
- **Fix:** A static `pages/404.tsx` that uses the theme and links to Home, Projects and Contact in the visitor's language.

#### Generic or templated? (verdict)
The site has a personal voice: the witch theme, the yellow/purple palette, the font shuffle on the logo and the inclusive-Hebrew font are all real signatures. They're buried under borrowed devices that read as templated: the code-tag decoration, a particle starfield, the cursor trail, a 3D flip button, the TagCloud sphere and hover-reveal cards. Removing those borrowed layers (DES-01, DES-07) would make the remaining signatures more distinctive.

### 3.5 Accessibility

#### A11Y-01 — No document language
Same as SEO-02. Screen readers will read Hebrew with an English voice. **Critical** · S · Source: ui-ux-pro-max, impeccable, Lighthouse.

#### A11Y-02 — Form fields have no labels
- **Severity:** High · **Effort:** S · **Source:** ui-ux-pro-max (`input-labels`), design-taste-frontend (4.6), cro (form), Lighthouse `label`
- **Location:** `components/contactForm.tsx:76-119`
- **Evidence:** 4 inputs rely on placeholders only. Placeholders are truncated ("Where can I email you bac", "I call you?" in `en-contact-1440.png`). Placeholder contrast is 4.21:1 on the input background. There are no `autocomplete` attributes (`name`, `email`).
- **Fix:** Visible `<label>`s above the fields, short placeholders or none, `autocomplete`, and errors linked with `aria-describedby`.

#### A11Y-03 — Split-letter headings read letter by letter
- **Severity:** High · **Effort:** S · **Source:** ui-ux-pro-max (`voiceover-sr`), impeccable
- **Location:** `utils/splitText.tsx:61-111`
- **Fix:** Put `aria-label={text}` on the container and `aria-hidden` on the spans (same fix as SEO-03).

#### A11Y-04 — Reduced motion
Same as DES-02. **High.**

#### A11Y-05 — Language toggle is an unlabeled, invisible checkbox
- **Severity:** Medium · **Effort:** S · **Source:** ui-ux-pro-max (`aria-labels`), seo-audit (hreflang links), Lighthouse `label`
- **Location:** `components/toggleSwitch.tsx:41-46,85-96`; `components/languageSwitcher.tsx:15-27`
- **Evidence:** `<input type=checkbox>` with `width:0;height:0;opacity:0` and no accessible name. The visible "EN/עב" is CSS `::after` content. "Checked" means Hebrew, which has no meaning to assistive tech. The focus indicator is invisible. Switching uses `router.push`, so there's no crawlable link to the other language.
- **Fix:** Use a real `<a href="/en/…" hrefLang="en" lang="en">English</a>` (and the Hebrew equivalent) styled as a pill. This fixes semantics, gives the switch a visible focus state, and adds a crawlable alternate link.

#### A11Y-06 — Hover-only content on project cards
- **Severity:** Medium · **Effort:** S · **Source:** ui-ux-pro-max (`hover-vs-tap`), WCAG 1.4.13 / 2.1.1
- **Location:** `components/card.tsx:44-54,79-94`
- **Fix:** Show the summary statically, or reveal it on `:focus-within` as well. One link per card, labelled with the project name.

#### A11Y-07 — Closed mobile menu stays in tab order; no Escape or focus handling
- **Severity:** Medium · **Effort:** S · **Source:** ui-ux-pro-max (`keyboard-nav`, `escape-routes`), impeccable (harden)
- **Location:** `components/mobileMenu.tsx:53-79,110-131`
- **Evidence:** the closed overlay is only moved off-screen (`right:-100%`). Its links stay focusable and invisible. There's no Escape handler, no focus move on open or return on close, and the background isn't `inert`.
- **Fix:** `hidden`/`inert` when closed, Escape to close, focus the first link on open and return focus to the button on close.

#### A11Y-08 — Invalid list markup
Lighthouse `list` / `listitem`: `<div>` inside `<ul>` (`sideBar.tsx:57-59`), and `<li>` without a parent list (`mobileMenu.tsx:114`). Medium · S. See CODE-05.

#### A11Y-09 — Contrast failures
- **Severity:** Medium · **Effort:** S · **Source:** ui-ux-pro-max (`color-contrast`), design-taste-frontend (button contrast check)
- **Evidence (computed):** white on WhatsApp green `#25d366` is **1.98:1** (`MailErrorPopup.tsx:57-58`, fails AA). Purple CTA border on bg is 1.29:1 (non-text, fails 3:1). Deco tags `#7b7b7d` on bg are 3.99:1 (fine once they're `aria-hidden` decoration). Nav links `#8d8d8d` are 5.08:1 (pass).
- **Fix:** Dark text on the green (or a darker green, `#128c4a`), and see DES-09.

#### A11Y-10 — Decorative code tags are real text
- **Severity:** Medium · **Effort:** S · **Source:** impeccable, ai-seo (accessibility tree for agents)
- **Location:** every `DecoTagSmart` / `DecoTagWrapper`
- **Evidence:** screen readers and crawlers read "&lt;/html&gt; &lt;/body&gt; &lt;h1&gt; W eb W itch &lt;/h1&gt;". Lighthouse's `agent-accessibility-tree` audit fails on every route.
- **Fix:** Remove them (DES-07), or add `aria-hidden="true"`.

#### A11Y-11 — Text can't be selected
- **Severity:** Low · **Effort:** S · **Source:** ui-ux-pro-max, cro (friction)
- **Location:** `styles/globalStyles.tsx:9-10` (`user-select:none` on `main`)
- **Evidence:** visitors can't copy your name, a project name or anything else.
- **Fix:** Remove it.

#### A11Y-12 — Error dialog focus management
- **Severity:** Low · **Effort:** S · **Source:** ui-ux-pro-max (`modal-escape`, `focus-management`)
- **Location:** `components/MailErrorPopup.tsx:77-125`
- **Evidence:** Escape and backdrop-close exist, which is good. But there's no initial focus, no focus trap, and focus isn't returned to the submit button. The title uses `<h1>`, a second h1 on the page.
- **Fix:** Use native `<dialog>` with `showModal()`, which handles focus. Use `<h2>`.

### 3.6 Conversion and copy

#### CRO-01 — No direct contact path from Home; contact details not visible
- **Severity:** High · **Effort:** S · **Source:** cro, landing-page-copy, copywriting
- **Location:** `pages/[lang]/home.tsx:131-139` (the only CTA → `/projects`); `components/socialLinks.tsx` (icon-only GitHub, LinkedIn, WhatsApp); `styles/contactListComponents.tsx:20-27` (icons on Contact are hidden above 768 px)
- **Evidence:** a visitor who's ready to talk has to find the WhatsApp glyph among GitHub and LinkedIn icons or go to Contact. No phone number or email is shown as text. GitHub (irrelevant to SMB clients) gets equal weight to WhatsApp. On the desktop Contact page, the subtitle says "message on WhatsApp", but no WhatsApp link is visible beside it.
- **Fix:** Make the primary hero CTA "שלחי הודעה בוואטסאפ" / "Message me on WhatsApp" (or "Book a 15-minute call") with a secondary "See my work". Add a persistent contact CTA in the nav and a footer with WhatsApp, phone and email as text. Move GitHub to About.

#### CRO-02 — The 5-second test fails on "what, for whom, where"
- **Severity:** High · **Effort:** S · **Source:** cro, copywriting, landing-page-copy, impeccable (Persuade mode)
- **Location:** `pages/[lang]/home.tsx`, `i18n/home/*.ts`
- **Evidence:** the largest text is "Web Witch". The value proposition is a 32-word subtitle that starts with "יוזמת ויצירתיות:" / "Creative entrepreneurs:". "Israel" and the service type appear only in meta tags, never on screen. The audience shifts between "creative and spiritual businesses" (meta, CLAUDE.md), "creative entrepreneurs" (hero) and "small business owner or a designer" (About). Your brief says "Israeli small-business owners and freelancers".
- **Fix:** Pick one audience statement and lead with it. Keep the brand mark and make the h1 the promise, e.g. "אתרים מעוצבים לעסקים קטנים ועצמאיות, בעברית ובאנגלית". Use a 12–20 word subline: what you build, for whom, one differentiator (design + code + automation by one person). Then add a short proof strip below (client names, see CRO-03).

#### CRO-03 — No trust signals
- **Severity:** High · **Effort:** M · **Source:** cro, landing-page-copy, copy-editing (Prove It), ai-seo (citable proof)
- **Location:** site-wide
- **Evidence:** zero testimonials, no client logos, no outcomes ("sold out the event"? numbers?), no process, no "how working with me looks". The project summaries make claims ("A one-page site built to sell out an intimate numerology event") without saying whether it did.
- **Fix:** Get 3 short attributed quotes from Mati Mor, Havaya Gems and Grace Couture, with a real outcome where one exists. Add a 3-step process (call → design → launch, with typical timeline) and a response-time promise near every CTA.

#### CRO-04 — Case studies are screenshots plus one line
Same root as DES-10 and SEO-10. Each client project needs: the client and their business, the problem, what you built, the result, and a quote. **High** · L.

#### CRO-05 — Contact form friction
- **Severity:** Medium · **Effort:** S · **Source:** cro (form), ui-ux-pro-max, copywriting
- **Location:** `components/contactForm.tsx`, `i18n/contact/*.ts`
- **Evidence:** 4 required fields, including a "subject" that adds nothing. Questions are written as placeholders. There's no phone option (Israeli SMB owners often prefer a call or WhatsApp), no "what happens next", and the CTA is vague ("Let's Make Magic" / "בוא׊ נצא לדרך"). The error copy blames a "swamped server".
- **Fix:** 3 fields (name, email *or* phone, message), labeled. CTA "שליחת הודעה" / "Send message". Add "I reply within one business day" plus a WhatsApp alternative next to the button.

#### CRO-06 — Copy issues (clarity, consistency, grammar)
- **Severity:** Medium · **Effort:** S · **Source:** copy-editing (sweeps 1–2), copywriting, design-taste-frontend (copy self-audit)
- **Evidence:**
  - EN About ends mid-thought: "If you\`re a small business owner or a designer looking for a developer" (`i18n/about/en.ts:16-17`), with no "…let's talk" and no CTA.
  - Backticks used as apostrophes: "don\`t", "you\`re" (`i18n/about/en.ts:8,17`).
  - Hebrew gender addressing is inconsistent: feminine singular ("תצטרכי", "בואי", "נסי"), inclusive glyphs, masculine "צור קשר" (meta title), "סגור" (button), and plural "צרו קשר ונחזור" (error, implying a team where there's one person). **Needs your decision:** is the audience intentionally women-only? If not, feminine-only copy narrows the market of "Israeli small-business owners".
  - Literal translations in project summaries: "ומרוצה בצורה מוזרה" (from "weirdly satisfying", `projectList.json:107`), "קולות כוללניים" (Inclusive Voices).
  - EN hero CTA back face "Design. Code. Wonder" and HE "תיכנס׊ – תתאהב׊ – תבינ׊" replace the CTA meaning on hover.
  - "Projects with a Pulse", "The Mind Behind": clever but say nothing. Plain headings ("Selected work", "About Julia") rank and scan better.
- **Fix:** One copy pass per language with these points. Keep the witch voice in one or two places (logo, success message), and use plain language elsewhere.

#### CRO-07 — Analytics: pageviews only, no conversion tracking, no consent
- **Severity:** Medium · **Effort:** S · **Source:** analytics, cro
- **Location:** `components/GoogleAnalytics.tsx`, `lib/gtag.ts`
- **Evidence:** the only signal is `config` with `page_path` on route change. Nothing fires for contact-form success or failure, WhatsApp clicks, outbound project clicks, CTA clicks or language switches. **Needs verification:** if GA4 Enhanced Measurement "page changes based on browser history events" is on (the default), every client-side navigation is counted twice (manual `config` + automatic history event). There's no consent mechanism and no privacy policy, although the site sets GA cookies and collects personal data in the form. **Needs verification** against Israel's Privacy Protection Law (Amendment 13, in force since Aug 2025) and against GDPR if you target EU visitors.
- **Fix:** Add events `generate_lead` (form success, marked as a key event), `contact_click` (`method`: whatsapp/email/phone, `location`), `outbound_project_click` (`project`) and `language_switch`. Turn off history page views in GA if you keep the manual calls. Add a privacy page and a lightweight consent banner if required.

### 3.7 Dependencies and security

#### DEP-01 — Next.js 13.1.6 is end-of-life with critical advisories
- **Severity:** Critical · **Effort:** L · **Source:** npm audit, /security-review checklist
- **Evidence:** 27 advisories on `next` (vulnerable range up to 15.5.23). The relevant ones here: image-optimizer RCE/DoS/cache confusion (the site uses `next/image`) and cache poisoning. Middleware advisories don't apply (no middleware).
- **Fix:** Upgrade path 13.1 → 14.2 (moves `@next/font` to `next/font`, `legacyBehavior` links still work) → 15.5.24+ or 16.x (React 19, async request APIs, though Pages Router is unaffected). Do it after the structural fixes, behind a preview deploy.

#### DEP-02 — nodemailer 6.10.1 (high)
- **Severity:** High · **Effort:** S · **Source:** npm audit
- **Evidence:** addressparser quadratic DoS (×2) and recursion DoS. User input reaches it through `replyTo`.
- **Fix:** Upgrade to ≥ 10.0.6 (the API used here, `createTransport({service:'gmail'})` + `sendMail`, is unchanged), or switch providers (CODE-10).

#### DEP-03 — Misplaced, unused or deprecated packages
- **Severity:** Medium · **Effort:** S · **Source:** karpathy-guidelines, ponytail (YAGNI)
- **Evidence:**
  - In `dependencies` but build-time only: `typescript`, `eslint`, `eslint-config-next`, `@emotion/eslint-plugin`, `@types/node`, `@types/react`, `@types/react-dom`.
  - Unused: `@emotion/css`, `@svgr/webpack` (CODE-01), `@types/gsap` (gsap isn't installed), `gh-pages` (deploys go to Vercel).
  - Referenced but missing: `file-loader` (`next.config.js:10`).
  - Deprecated: `@next/font`.
  - `engines.node: 24.x` with Next 13.1 is untested territory (**Needs verification** on Vercel).
- **Fix:** Move the build-time packages to `devDependencies`, remove the unused ones, and run `npm audit fix` for the transitive issues.

#### DEP-04 — ~~Not under version control~~ (withdrawn)
- **Correction:** this finding was wrong. `Portfolio/` is a git repo (remote `github.com/Juliasavransky/Portfolio`). My check ran from the parent folder `my site/`, which isn't a repo. The only real leftover is a stray, empty `package-lock.json` in the parent folder.

---

## 4. Conflicts between skills and how they were resolved

Rule applied: **minimalist, with purposeful animation**, for an audience of Israeli small-business owners. Where a rule preserves the existing brand, design-taste-frontend's "Redesign: Preserve" protocol (§11.C) was followed.

| # | Conflict | Skills | Resolution | Why |
|---|----------|--------|------------|-----|
| 1 | "No element appears statically; scroll-entry animations everywhere; GSAP pinning, stacking, scrubbing" vs "one orchestrated moment; motion must be motivated" | high-end-visual-design, gpt-taste **vs** frontend-design, emil-design-eng, design-taste-frontend, impeccable | **Overrode high-end and gpt-taste.** One signature moment (logo letter-shuffle) plus feedback motion only. No GSAP. | Directly matches "minimalist with purposeful animation". The site's problem is already too much motion (DES-01). |
| 2 | Banned fonts (Roboto, Inter) and "swap fonts first" | high-end-visual-design, minimalist-ui, gpt-taste, redesign-existing-projects **vs** brand continuity | **Recommend fewer families (DES-08). Font choice left to you.** Not mandated. | Cutting 15 families to 2–3 is the real win. Which Latin face replaces Roboto is a brand decision, not a defect. |
| 3 | Warm light monochrome palette, pastel accents, no dark sections | minimalist-ui **vs** existing dark + yellow + purple brand | **Kept the dark brand palette.** Only fix contrast and add semantic tokens (DES-09). | The palette is a recognizable brand asset. A full palette change isn't an audit fix. |
| 4 | Dark mode / light mode both mandatory | design-taste-frontend §6.C **vs** single-theme brand | **Rejected.** Single dark theme stays. | Adds a theme to maintain without helping clients find or hire her. |
| 5 | Double-bezel cards, pill buttons with nested icon, `py-24`+ sections | high-end-visual-design **vs** minimalist-ui (no pills for primary buttons, flat cards) | **Followed minimalist-ui.** Flat surfaces, small radius, no nested-bezel chrome. | Fewer decorative layers is the minimalist direction. |
| 6 | Zero emoji anywhere vs playful witch voice | minimalist-ui, design-taste-frontend, gpt-taste, ui-ux-pro-max **vs** brand voice | **Mostly removed** (DES-13). One allowed in the success message. | Emoji in project summaries and errors read as filler. One in a celebratory moment fits the brand. |
| 7 | Em-dash totally banned | design-taste-frontend §9.G **vs** existing titles and Hebrew copy | **Logged as Low, not enforced.** | An English "AI tell" heuristic. In Hebrew copy and title separators it isn't a defect. Use it sparingly. |
| 8 | Reduced motion = collapse to static vs keep gentle opacity fades | design-taste-frontend, gpt-taste **vs** emil-design-eng | **Followed emil-design-eng.** Keep short opacity changes, remove movement. | Preserves state feedback without vestibular triggers. |
| 9 | Use shadcn/ui + Tailwind | ui-styling, design-taste-frontend §3 **vs** redesign-existing-projects ("don't migrate the stack") | **Stay on Emotion.** | Migration cost with no user benefit. Problems are structural, not about the styling library. |
| 10 | Full 3-layer token system (primitive, semantic, component) | design-system **vs** karpathy-guidelines / ponytail (no speculative abstraction) | **Thin semantic layer only** (~10 tokens). | A 4-page site doesn't need component tokens. |
| 11 | Portfolio = "Experience mode, artifact leads" vs "Persuade: decide and act" | impeccable (modes) **vs** cro, landing-page-copy | **Home and Contact = Persuade, Projects = Experience.** | The site's job is to win clients, but the work itself should lead on the Projects page. |
| 12 | "Wrap page in `overflow-x-hidden`" vs fix the cause | gpt-taste **vs** impeccable (adapt), ui-ux-pro-max | **Fix the root cause** (DES-03/DES-04). | Masking overflow leaves the off-canvas menu bug and broken widths in place. |
| 13 | Anti-center bias: asymmetric hero | design-taste-frontend §4.3 **vs** minimalist centered brand mark | **Not enforced.** Centered logo is fine. Fix copy and CTA first. | Low impact compared with CRO-01/02. Revisit in a redesign. |
| 14 | Value stack, guarantee, pricing reveal on the landing page | landing-page-copy (Hormozi) **vs** your decision to defer pricing | **Pricing parts deferred.** Proof, process and CTA parts kept (CRO-03). | Respects the recorded business decision (see also SEO-06). |

---

## 5. Skills: inventory, coverage, not installed or not applicable

**How skills were run.** Each skill's instructions were loaded and its checklist applied in a separate pass over the code, the SSR HTML, the screenshots and Lighthouse data. Bundled tooling was run where it exists and works offline: Impeccable's `context` and `detect` scripts. ui-ux-pro-max's Python search CLI and design-system's `validate-tokens.cjs` were **not** run; their quick-reference checklists were used instead.

| Requested skill | Installed name | Status |
|-----------------|----------------|--------|
| impeccable | `impeccable` (v4.5.0; v4.7.0 available) | Run: `context` + `detect` + audit checklist. No PRODUCT.md/DESIGN.md exist, so I used the existing visual system as authority. |
| ui-ux-pro-max | `ui-ux-pro-max` | Run (quick-reference checklist; the CLI search wasn't needed) |
| frontend-design | `frontend-design:frontend-design` | Run |
| design-taste-frontend | `design-taste-frontend` (v2) | Run (in "Redesign: Preserve" mode) |
| high-end-visual-design | `high-end-visual-design` | Run, mostly overridden (Conflicts 1, 5) |
| minimalist-ui | `minimalist-ui` | Run |
| emil-design-eng | `emil-design-eng` | Run |
| ui-styling | `ui-styling` | Run; its shadcn/Tailwind guidance isn't applicable (Conflict 9) |
| design-system | `design-system` | Run (token architecture only; slides part not applicable) |
| redesign-existing-projects | `redesign-existing-projects` | Run |
| gpt-taste | `gpt-taste` | Run, mostly overridden (Conflicts 1, 12) |
| seo-audit | `anthropic-skills:seo-audit` | Run |
| ai-seo | `anthropic-skills:ai-seo` | Run |
| programmatic-seo | `anthropic-skills:programmatic-seo` | **Not applicable:** 4 pages × 2 languages and 5 client projects. Hand-written case studies are the right tool (SEO-10). |
| cro | `anthropic-skills:cro` | Run |
| copywriting | `anthropic-skills:copywriting` | Run (review only, no rewrites) |
| copy-editing | `anthropic-skills:copy-editing` | Run (sweeps 1–4, 7) |
| landing-page-copy | `anthropic-skills:landing-page-copy` | Run (pricing parts deferred, Conflict 14) |
| analytics | `anthropic-skills:analytics` | Run |
| karpathy-guidelines | `anthropic-skills:karpathy-guidelines` | Run |
| /review | no built-in `/review`. Closest: `code-review` (diff-based) and `agent-skills:review` | Applied manually: the diff-based reviewers review *changes*, and this was an audit of the whole existing codebase with no pending diff. Its five-axis checklist (correctness, readability, architecture, security, performance) was applied to every file. |
| /security-review | `security-review` (diff-based) | Same reason. Checklist applied manually: secrets, input validation, injection, rate limiting, dependencies (CODE-10, CODE-14, DEP-01/02). |
| "…" | — | Your skill list contained a literal "…" (truncated), so only the names that appear in your prompt were matched. |

**Relevant extra skills that are installed but weren't run** (they overlap heavily with skills that were): `agent-skills:webperf` / `web-performance-auditor` (covered by Lighthouse + PERF), `improve-animations`, `find-animation-opportunities`, `animate`, `apple-design` (covered by emil-design-eng + DES-01/02), `agent-skills:frontend-ui-engineering`, `agent-skills:security-and-hardening` (checklist only, under CODE-10), `ponytail:ponytail-audit` (dead code covered in CODE-06), `anthropic-skills:directory-submissions` (useful for local SEO follow-up, SEO-11), `anthropic-skills:marketing-psychology`, `anthropic-skills:content-strategy`, `anthropic-skills:brand`.

**Skipped as unrelated to auditing a website:** audit-offer, offers, offer-angles, pricing, pricing-strategy, bonus-stack, value-accelerator, value-perception, hormozi-hooks / hormozi-offer / hormozi-pitch, objection-destroyer, cold-email, emails, prospecting, referrals, sales-enablement, churn-prevention, business-model, productize, dfy-dwy-diy, lead-magnets, launch, marketing-plan, marketing-ideas, social, brandkit, banner-design, algorithmic-art, canvas-design, slides, docx/pptx/xlsx/pdf, data:*, sanity-*, write-swift, animate-expo, imagegen-*, image-to-code, stitch-design-taste, industrial-brutalist-ui.

---

## 6. Proposed fix order

### Phase 0 — Safety net (before any change)
1. Work on a branch, not on the branch Vercel deploys from.

### Phase 1 — Quick wins (about 1 day, mostly S effort; biggest SEO gain)
1. **SEO-01**: un-wrap `SparkleTrail` and SSR `SideBar`. Verify with `curl` that title, description, canonical, OG and text are in the HTML.
2. **SEO-02**: `_document.tsx` with `lang` + `dir`.
3. **CODE-02 + CODE-04**: single `lang` source from page props, and nav dictionary on the server (needed so step 1 doesn't introduce hydration flashes).
4. **SEO-04 + SEO-08**: `getStaticProps`/`getStaticPaths` (he, en), `notFound` for other langs, static `404.tsx`, permanent redirects in `next.config.js`.
5. **SEO-03 / A11Y-03**: real `<h1>` per page, `aria-label` on split text.
6. **PERF-01 + PERF-02**: remove the opacity gate, and stop preloading decorative fonts.
7. **DES-02**: global reduced-motion handling.
8. **DES-06, A11Y-10, A11Y-11**: remove the tooltip, `aria-hidden` the deco tags, remove `user-select:none`.
9. **SEO-12, SEO-13, SEO-09**: add `llms.txt`, clean up meta, new 1200×630 OG images.
10. **SEO-06**: decide on pricing visibility, then align description and JSON-LD.
11. **DEP-02 + CODE-10**: upgrade nodemailer, add input limits and a honeypot.
12. **CRO-01**: WhatsApp/contact as primary hero CTA, plus contact text in a footer.

### Phase 2 — Structural (about 3–5 days)
1. **DES-04 + DES-03 + CODE-05 + PERF-08**: grid layout shell, one responsive nav, footer, no horizontal overflow, re-measure CLS.
2. **DES-05**: global RTL with logical properties, no Hebrew letter-spacing.
3. **SEO-05 + CRO-06**: copy pass in both languages (addressing strategy, standard Unicode, grammar).
4. **DES-01 + PERF-03/04/06 + DES-11 + CODE-12**: cut motion to one signature moment and feedback states.
5. **A11Y-02/05/06/07/09/12 + CODE-11 + CRO-05**: accessible form, language links, card focus, menu focus, contrast, dialog.
6. **DES-08 + DES-09 + CODE-06/07/08/13 + DEP-03**: typography and token cleanup, dead code, renames, dependency hygiene.
7. **CRO-07**: conversion events, GA double-count check, privacy page and consent if required.

### Phase 3 — Growth (ongoing)
1. **SEO-10 + CRO-03 + CRO-04 + DES-10**: services section, 5 client case-study pages with testimonials, Experiments list.
2. **SEO-07 + SEO-11**: full JSON-LD graph, NAP, Google Business Profile, Israeli directories.
3. **DEP-01**: Next.js 14 → 15.5.24+/16 upgrade on a preview deploy, then re-run Lighthouse and Rich Results Test, and submit the sitemap in Search Console.

---

## 7. Fix status (2026-10-21, branch `audit-fixes`)

All items were approved for fixing. Status per finding: ✅ done · ◐ partly done (what's left needs your input or content) · — not done (with reason).

**Verification after the fixes:** `tsc` 0 errors · `eslint .` 0 problems · `npm test` (contact validation) passes · `next build` passes, with all 10 language pages pre-rendered (SSG) and a static 404 · `npm audit --omit=dev`: 0 vulnerabilities (5 high remain in the *dev-only* lint chain `eslint-config-next` → `braces`, no upstream fix yet) · Playwright on 9 routes × 3 widths: `lang`/`dir` correct, one `h1` per page, no horizontal overflow, no unlabeled fields, no console or hydration errors, full content with JS disabled, static under reduced motion.

**Lighthouse after the fixes** (same machine and settings as section 2; before → after):

| Route | Device | Perf | A11y | Best Pr. | SEO | LCP | CLS |
|---|---|---:|---:|---:|---:|---:|---:|
| /he/home | mobile | 71 → **97** | 85 → **100** | 100 | 100 | 8.2 s → **2.4 s** | 0 → **0** |
| /he/home | desktop | 93 → **100** | 84 → **100** | 100 | 100 | 1.8 s → **0.5 s** | 0.026 → **0** |
| /en/home | mobile | 73 → **97** | 85 → **100** | 100 | 100 | 7.5 s → **2.4 s** | 0.007 → **0** |
| /en/home | desktop | 94 → **100** | 84 → **100** | 100 | 100 | 1.6 s → **0.5 s** | 0.032 → **0** |
| /he/about | mobile | 72 → **96** | 86 → **100** | 100 | 100 | 8.2 s → **2.6 s** | 0.079 → **0** |
| /he/about | desktop | 91 → **100** | 81 → **100** | 100 | 100 | 1.8 s → **0.5 s** | 0.094 → **0** |
| /en/about | mobile | 73 → **97** | 86 → **100** | 100 | 100 | 7.8 s → **2.5 s** | 0.079 → **0** |
| /en/about | desktop | 92 → **100** | 81 → **100** | 100 | 100 | 1.7 s → **0.5 s** | 0.085 → **0** |
| /he/projects | mobile | 64 → **95** | 86 → **100** | 100 | 100 | 8.5 s → **2.9 s** | 0.079 → **0** |
| /he/projects | desktop | 93 → **100** | 81 → **100** | 100 | 100 | 1.8 s → **0.6 s** | 0.027 → **0** |
| /en/projects | mobile | 71 → **94** | 86 → **100** | 100 | 100 | 8.3 s → **2.9 s** | 0.079 → **0** |
| /en/projects | desktop | 93 → **100** | 81 → **100** | 100 | 100 | 1.8 s → **0.6 s** | 0.028 → **0** |
| /he/contact | mobile | 63 → **95** | 85 → **100** | 100 | 100 | 8.1 s → **2.9 s** | 0.233 → **0** |
| /he/contact | desktop | 93 → **100** | 81 → **100** | 100 | 100 | 1.8 s → **0.6 s** | 0.027 → **0** |
| /en/contact | mobile | 65 → **96** | 85 → **100** | 100 | 100 | 7.7 s → **2.6 s** | 0.198 → **0** |
| /en/contact | desktop | 93 → **100** | 81 → **100** | 100 | 100 | 1.7 s → **0.6 s** | 0.028 → **0** |

Mobile LCP is now 2.4–2.9 s (target 2.5 s; was 7.5–8.5 s). The remaining Lighthouse notes are framework-level ("unused/legacy JavaScript" from the Next.js runtime, render-blocking CSS).

| ID | Status | What changed |
|----|--------|--------------|
| SEO-01 | ✅ | `SparkleTrail` and the client-only wrappers are gone. Raw HTML now contains title, description, canonical, hreflang, OG, JSON-LD, nav, `h1` and all text. |
| SEO-02 | ✅ | `pages/_document.tsx` sets `<html lang dir>` from the route. |
| SEO-03 | ✅ | One real `h1` per page with the page's intent. The logo is a separate element (visually hidden text + `aria-hidden` letters). |
| SEO-04 | ✅ | `getStaticPaths` with `fallback:false`: `/fr/home`, `/anything` → 404. `/`, `/he`, `/en` → 308 via `next.config.js`. `/llms.txt` → 200. |
| SEO-05 | ✅ | All U+05C9/05CA/05CC characters removed. UI labels use gender-neutral nouns ("צרו קשר", "שליחה", "שיחה בוואטסאפ"). The body copy keeps your feminine voice. |
| SEO-06 | ✅ | Prices removed from meta descriptions and JSON-LD, per the deferral recorded in CLAUDE.md. |
| SEO-07 | ◐ | New graph: Organization (square logo), Person (Julia), WebSite, ProfessionalService (phone, languages), per-page WebPage + BreadcrumbList, ItemList of CreativeWork on Projects. **Missing:** city or service area, which I don't know. |
| SEO-08 | ✅ | All pages SSG. bf-cache no longer blocked by `no-store`. |
| SEO-09 | ✅ | `og-he.jpg` / `og-en.jpg` at 1200×630 (43–52 KB) with width, height, alt and `og:locale:alternate`. |
| SEO-10 | ◐ | Home now has services, process, a client list and a closing CTA. **Not done:** case-study pages and FAQ. They need real facts (problem, result, quotes, timelines) and I didn't want to invent them. |
| SEO-11 | ◐ | Footer NAP with WhatsApp and phone, plus the phone in JSON-LD. **Needs you:** city or service area, and a Google Business Profile. |
| SEO-12 | ✅ | `public/llms.txt` added (no pricing). |
| SEO-13 | ✅ | Keywords and `language` meta removed. Titles shortened and gendered wording fixed. Sitemap `lastmod` updated (still a static file: update it when content changes). |
| SEO-14 | ◐ | CV kept, but `/pdf/` is disallowed in robots.txt. Delete or link it if you prefer. |
| PERF-01 | ✅ | Content visible from the first paint, no opacity gate. |
| PERF-02 | ✅ | 2 preloaded fonts (Alef WOFF2 + Roboto) instead of 14. The 3 logo display fonts load on hover only. |
| PERF-03/04/06 | ✅ | Particle canvas, per-second SplitText measuring and the sparkle trail are removed. |
| PERF-05 | ✅ | Copy comes from static dictionaries, with no client re-fetch. |
| PERF-07 | ✅ | Real image ratio (1518×721), `sizes`, priority on the first 2 cards only. |
| PERF-08 | ✅ | Contact layout is in normal flow, with no late-inserted tooltip. See CLS in the table above. |
| CODE-01 | ✅ | Webpack/SVGR config removed. Turbopack build. |
| CODE-02/04 | ✅ | One language source: the page's `lang` prop → `LangContext` (`useLang`/`useT`). |
| CODE-03 | ✅ | Shared `langStaticPaths`/`langStaticProps`. Shared UI primitives in `styles/ui.ts`. |
| CODE-05 | ✅ | One `<nav>` with one list, responsive with CSS. No duplicate IDs or social links. |
| CODE-06/07/08 | ✅ | Dead code, unused assets, duplicate theme typings and odd filenames removed. Components renamed to PascalCase. |
| CODE-09 | ✅ | No render-time randomness. No hydration warnings in the browser runs. |
| CODE-10 | ✅ | Type and length validation (`lib/contact.ts` + test), honeypot, per-IP rate limit (per-instance, marked in code), nodemailer 10. |
| CODE-11 | ✅ | Error dialog (native `<dialog>`) stays open until closed, honest error copy, live-region success message, native validation. |
| CODE-12 | ✅ | MagicButton replaced with real links and a 160 ms press feedback. |
| CODE-13 | ✅ | `en` dictionary typed from `he`, so missing keys fail the build. Unused props removed. |
| DES-01/02 | ✅ | One signature motion (logo letter-shuffle on hover, layout-stable). Everything else is feedback only. Global `prefers-reduced-motion` handling. |
| DES-03/04 | ✅ | Grid shell, `max-width` container, footer. No absolute page containers. |
| DES-05 | ✅ | Global `dir`, logical properties, no letter-spacing on Hebrew, mirrored arrows, start-aligned body copy, line-height 1.7 for Hebrew. |
| DES-06/07 | ✅ | Tooltip and the `</html>`-style code tags removed. |
| DES-08 | ◐ | Typography now runs on 2 text fonts plus a type scale in `styles/ui.ts`. **Kept Roboto** for English: replacing it is a brand decision (Conflict 2). |
| DES-09 | ✅ | CSS-variable tokens in `styles/global.ts`. Purple kept as the logo colour; borders use `#a06cd5` (4.5:1). |
| DES-10 | ✅ | 5 client projects first, with visible summaries. 6 experiments in a compact list. |
| DES-11 | ✅ | Photo shown immediately, without the mask. Note: the source photo is only 408×428, so it's displayed at ≤16rem. Upload a larger one if you want it bigger. |
| DES-12 | ✅ | Hover (pointer devices only), `:active`, `:disabled` and `:focus-visible` states. |
| DES-13 | ✅ | Emoji removed from UI and project copy. |
| DES-14 | ✅ | Static bilingual `404.tsx` using the site layout. |
| A11Y-01…12 | ✅ | `lang`/`dir`, visible labels with autocomplete, readable headings, language switch as real `hreflang` links, focusable cards, menu with Escape and focus handling (hidden when closed), valid lists, contrast fixes (dark text on WhatsApp green), decorative text removed, text selectable again, native dialog. Skip link added. |
| CRO-01 | ✅ | WhatsApp is the primary hero CTA, with WhatsApp/phone in the footer on every page and "Contact" in the nav. Email isn't shown as text, to keep the Gmail address off scrapers. The form covers email. |
| CRO-02 | ✅ | `h1` says what, for whom and where. 18–20 word lead. |
| CRO-03 | ◐ | Client list and process added. **No testimonials:** they need real, attributed quotes from your clients. |
| CRO-04 | — | Case studies need your content (see SEO-10). |
| CRO-05 | ✅ | 3 labeled fields (subject removed), clear CTA, WhatsApp alternative next to the form. No "reply within X hours" promise, since I don't know your real response time. |
| CRO-06 | ✅ | Unfinished English sentence completed, backtick apostrophes fixed, literal translations rewritten, hover-swapped CTA labels gone, plain headings ("Selected work", "About Julia"). |
| CRO-07 | ◐ | GA4 events: `generate_lead`, `contact_click` (whatsapp/phone + location), `outbound_project_click`, `language_switch`. Manual page views removed (GA4 Enhanced Measurement handles SPA navigation: **confirm "page changes based on browser history events" is on** in GA). Privacy page added in both languages. **No consent banner:** whether you need one is a legal question I can't answer. Mark `generate_lead` as a key event in GA. |
| DEP-01/02/03 | ✅ | Next 16.4.2, React 19.3, nodemailer 10.1, ESLint 9 flat config, TypeScript 5.9. Removed: framer-motion, TagCloud, @next/font, @svgr/webpack, @emotion/css, gh-pages, @types/gsap. Dev tooling moved to `devDependencies`. |

# WHIMSY_BACKLOG.md — interaction-craft upgrade

Goal: an Israeli woman freelancer lands here and leaves thinking *"she's skilled,
trustworthy, and fun to work with"* — then messages on WhatsApp.
Rule for every item below: **if it doesn't carry a message a client would pay for, it's dropped.**

---

## Phase 0 — baseline (2026-10-22)

**Stack:** Next.js 16.4.2 (Pages Router, Turbopack), React 19.3, TypeScript 5.9,
Emotion `styled`. 5 routes × 2 langs, all SSG. No animation library installed.

**Language/direction (the blank in the brief):** both — Hebrew RTL at `/he/*`
(default, `x-default`) and English LTR at `/en/*`. `<html lang dir>` set per route
in `_document.tsx`; layout already uses logical properties throughout.

**Build health:** `tsc --noEmit` clean · `eslint .` clean · `next build` clean
(one cosmetic warning: no fallback metrics for the `Fredericka the Great` display font).
Client chunks: 532 KB on disk, pre-compression.

**Existing tokens** (`styles/global.ts` `:root`) — keep, don't reinvent:
`--bg #1d1d1d` · `--surface #262626` · `--text #f2f2f2` · `--text-muted #b3b3b3` ·
`--accent #ffcc00` · `--on-accent #1d1d1d` · `--brand-purple #4b116f` · `--line #a06cd5` ·
`--divider` · `--danger` · `--whatsapp #25d366` · `--radius 4px` · `--maxw 64rem` ·
`--gutter clamp(1rem,4vw,3rem)` · `--ease-out cubic-bezier(.23,1,.32,1)`.
Type scale + buttons in `styles/ui.ts`. Fonts: Alef (he) + Roboto (en), 3 display
fonts loaded on hover only.
**Gap:** the motion layer is one easing curve and a hardcoded `160ms`. No duration,
spring or distance tokens. Item W0 fixes that — it's an *addition* to your set, not a redesign.

**Existing motion (all of it):** logo letter-shuffle on `mouseenter` (`Logo.tsx`),
`:active { scale(.97) }` on buttons, 160 ms colour transitions on nav links and card
borders. A global `prefers-reduced-motion` block already strips animation and limits
transitions to colour/opacity.

**Lighthouse baseline** — measured 2026-10-25, lighthouse 13.5.0, mobile preset,
against a production build served on localhost. Matches AUDIT.md's 2026-10-21 run.

| Route | Device | Perf | A11y | Best Pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| /he/home | mobile | **97** | 100 | 100 | 100 | 2.4 s | 0 | 140 ms |
| /en/home | mobile | **97** | 100 | 100 | 100 | 2.4 s | 0 | 100 ms |
| /he/about | mobile | **97** | 100 | 100 | 100 | 2.5 s | 0 | 70 ms |
| /he/projects | mobile | **96** | 100 | 100 | 100 | 2.7 s | 0 | 100 ms |
| /he/contact | mobile | **95** | 100 | 100 | 100 | 2.6 s | 0 | 160 ms |

**On "the site's SEO is currently weak":** that was true in July. The 2026-10-21 rework
fixed it — SEO is 100 across all 8 indexed routes, with canonical + hreflang + OG + a full
JSON-LD graph (Organization, Person, WebSite, ProfessionalService, per-page WebPage +
BreadcrumbList, ItemList on Projects), `robots.txt`, `sitemap.xml` and `llms.txt`.
What's actually left is S1–S5 below — small technical gaps, plus three things blocked
on content only you have.

---

## Observed on whimsy.joshwcomeau.com (verified by interacting, 2026-10-22)

Only what I actually triggered in the browser:

1. **Floating 3D object field** behind the hero, drifting continuously and reacting to a
   persistent **tool palette** (grabber / eraser / bomb / wand) pinned top-right that
   changes what the cursor does to the objects. Has an "Undo all edits to this page".
2. **Scroll-triggered text reveal** — paragraphs fade from ~0 to full opacity as they
   enter the viewport. Caught one mid-fade.
3. **Staggered entrance** in the hero: the author avatar + byline arrive after the
   headline and sub-copy, not with them.
4. **Click-to-burst "like" heart** — click fills the heart and throws ~20 coloured
   particles outward on an arc; click again un-fills and bursts again. A stateful toggle,
   not just an effect.
5. **Interactive demos with labelled controls.** Real named sliders on the page:
   `final-particle-demo_chaos`, `blog-like-button-demo_cursorResponse`, `bomb-radius`,
   `bomb-force`, `bomb-spin`, `universe-friction`. Each demo shows the effect *and* lets
   you drive its parameters — the demo is the proof of skill.
6. **A `Pause` control** on a running animation, and per-component "Toggle border
   animation" buttons — motion you can stop.
7. **Decorative SVG section dividers** (hand-drawn wave, "rainbow divider") separating
   long-form sections.
8. **Motion is systematically gated:** 34 separate `prefers-reduced-motion` rules in the
   loaded stylesheets.
9. **No audio anywhere on the page** — no sound, no mute toggle. (Noted because the brief
   asked: not present, so not borrowed.)

Borrowed below: the *patterns* — spring feedback, controllable demo, stateful burst,
staggered entrance, motion you can stop. Not borrowed: his colours, fonts, copy, 3D
illustrations, or any code.

---

## Backlog

Score = client impact (1–5, higher better) / perf cost (1–5, lower better) / effort (1–5, lower better).
Ordered by impact ÷ cost.

### Top priority — technical fixes found in the audit (no visual change, auto-fixable)

- [x] **S1 · `/he/privacy` and `/en/privacy` are missing from `sitemap.xml`** — 10 routes
      exist, 8 are listed. *(5/1/1)*
- [x] **S2 · `sitemap.xml` is a hand-maintained static file** with a frozen `lastmod`.
      Generate it from the route list at build time so it can't drift again. *(4/1/2)*
- [x] **S3 · `og:image:alt` is the homepage H1 on every page** (`PageSeo.tsx`) — should
      describe the page it's on. *(2/1/1)*
- [ ] **S4 · Logo shuffle fires on `mouseenter` only** (`Logo.tsx`) — unreachable by
      keyboard and by touch, so a third of visitors never see the site's one signature
      motion. Also an a11y gap. *(4/1/1)*
- [~] **S5 · `Fredericka the Great` build warning** — no fallback metrics. Harmless today
      (swapped glyphs are overlaid), but it's noise in every build log. *(1/1/1)* — **left alone.** `adjustFontFallback:false` is already set and the warning persists anyway; the only real fix is dropping Fredericka from the logo shuffle, which is a visible brand change for one line of log noise.

### Foundation

- [ ] **W0 · Motion token set + `useReducedMotion` hook.** Add `--spring-*` curves (CSS
      `linear()`), `--dur-fast/base/slow` and a `--lift` distance to `:root`, plus one hook
      so no component re-queries the media query. Everything below depends on it. Zero
      bundle cost, no new dependency. *(3/1/2)*

### Items that sell a skill

- [ ] **W1 · Spring "boop" on the primary CTAs.** WhatsApp + secondary buttons get a spring
      lift on hover and a real press compression, built from W0 tokens and applied once in
      `styles/ui.ts` so every button inherits it.
      *Sells:* the thing she most wants clicked feels expensive. *(5/1/2)*
- [ ] **W2 · Contact-form submit choreography.** Button → sending → success message springs
      in with a small accent burst from the button; the error dialog gets a spring entrance
      instead of appearing. *Sells:* the exact moment a client pictures *her own* customers
      in. Highest-intent screen on the site. *(5/2/3)*
- [ ] **W3 · Project cards: spring lift + gentle image parallax on hover**, as a reusable
      primitive, with `:focus-visible` getting the same treatment so keyboards see it too.
      *Sells:* the portfolio grid stops looking like a template. *(4/2/3)*
- [ ] **W4 · Staggered scroll entrance** for the services / process / client columns and the
      projects grid — IntersectionObserver + a CSS custom-property delay, transform and
      opacity only, never on the LCP element. *Sells:* pacing and restraint. *(4/2/2)*
- [ ] **W5 · RTL-aware language-switch transition.** Switching he↔en animates the direction
      flip instead of hard-cutting. *Sells:* RTL competence is literally her differentiator
      for Israeli clients, and nobody else demonstrates it. *(5/2/4)*
- [ ] **W6 · One interactive demo with real controls** (the Josh pattern, her content): a
      small embedded widget on About or Projects where the visitor drags a slider and
      watches an easing curve / card animation change live. Keyboard-operable, labelled,
      lazy-loaded below the fold. *Sells:* "she builds interactive things" — proven, not
      claimed. *(5/3/4)*
- [ ] **W7 · Nav active-page indicator that travels** between items (shared-element style),
      correct in both directions. *Sells:* polish on the component every visitor uses. *(3/2/3)*
- [ ] **W8 · Idle attention nudge on the WhatsApp CTA** — one subtle pulse after the visitor
      has been still a while, once per session, off under reduced motion. *Sells:* conversion
      thinking, not decoration. *(3/1/2)*
- [ ] **W9 · 404 delight** — the one page where playfulness costs nothing. *(2/1/2)*

### Blocked on you (content/design decisions I can't make)

- [ ] **B1 · Before/after demo of a real client site.** The strongest item on this list — a
      draggable before/after of a redesign *is* the sales pitch. Needs "before" screenshots
      and the client's permission. *(5/3/4)*
- [ ] **B2 · Testimonials** (AUDIT CRO-03) — needs real, attributed quotes.
- [ ] **B3 · Case-study pages + FAQ** (AUDIT SEO-10) — needs real problems, results, timelines.
- [ ] **B4 · City / service area** for the local-business schema and footer (AUDIT SEO-07, SEO-11).

### Dropped — decoration with no message

- **Cursor particle trail.** The 2026-10-21 audit deleted `SparkleTrail` for performance.
  Not re-adding it.
- **Floating 3D object field / tool palette.** Josh sells an animation course, so the toys
  *are* the product. Julia sells trust and delivery; a hero full of draggable junk reads as
  noise to a client deciding whether her site will ship on time.
- **Decorative wave / rainbow section dividers.** Pretty, says nothing, adds SVG weight.
- **Sound.** Not present on the reference either.

---

## Standing checks for every iteration

build + lint + typecheck clean · screenshots at 375 and 1440 reviewed · reduced-motion
reduces to an opacity fade or nothing · keyboard-reachable with visible focus, no traps ·
RTL verified in Hebrew (motion direction, offsets, mirrored glyphs) · Lighthouse mobile
Perf ≥ 90, SEO ≥ 95, A11y ≥ 95, CLS < 0.1, no regression · nothing animates the LCP
element · heavy effects lazy-loaded.

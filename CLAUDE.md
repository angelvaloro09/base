# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**BASE Studio** — official website of BASE Studio, a brand studio specializing in strategic
brand systems, visual identity, and web development for growing brands.

- **Target URL:** basestudio.com
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Sanity CMS · Framer Motion · Resend
- **Deploy:** Vercel
- **Language:** Spanish only (decision 2026-08-27)

---

## Roles & Workflow

- **Claude (this agent):** architect, director, auditor, and corrector. Claude drives new-ground
  implementation through Gemini via precise, staged prompts — but **corrections are Claude's own
  job, applied directly to the code**, not routed back through another Gemini prompt. Claude
  reviews Gemini's reports and diffs against `web-design/*.dc.html`, `CLAUDE.md`, `AGENTS.md`, and
  `.claude/rules/*`, then fixes deviations itself and re-verifies (lint/build/dev, browser check
  when relevant).
- **Gemini:** implementer for new work. Reads `AGENTS.md` + `.agents/rules/*` + `.agents/skills/*`
  for its own brief, and executes the prompts Claude hands it, one phase at a time.
- **Cadence:** Claude issues a scoped prompt → Gemini implements and reports back → Claude audits
  (code read + rule/design compliance check, browser check when relevant) → Claude fixes any
  deviations directly and confirms clean, then moves to the next step. A new prompt to Gemini is
  only for genuinely new scope, not for correcting the step just delivered. Keep phases small
  enough to audit in one pass.
- **Feedback loop:** even though Claude fixes issues directly rather than round-tripping them,
  every next prompt to Gemini must open with what the previous step got wrong and how Claude fixed
  it (concrete: file, mistake, fix) — not just silently move on. Gemini should accumulate this
  context across steps so it stops repeating the same mistakes, even though it never re-touches the
  fixed code itself.

---

## Repository Structure

```
/
├── app/
│   ├── (site)/
│   │   ├── page.tsx            # Home
│   │   ├── work/               # Portfolio index + [slug] case studies
│   │   ├── studio/             # About / manifesto / team
│   │   ├── services/           # Services detail
│   │   ├── blog/               # Editorial index + [slug]
│   │   ├── contact/            # Contact form
│   │   └── pricing/            # Pricing
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   └── api/
│       └── contact/route.ts    # Contact form handler (Resend)
├── components/
│   ├── ui/                     # Primitives: Button, Input, Tag…
│   ├── layout/                 # Nav, Footer, PageWrapper
│   ├── sections/               # Hero, Marquee, PhilosophyBlock, CtaBand…
│   └── work/                   # ProjectCard, CaseStudyHero, WorkGrid…
├── sanity/
│   ├── schemas/                # project, post, service, team
│   └── lib/                    # Typed GROQ queries + fetch helpers
├── lib/                        # cn(), formatDate(), etc.
├── styles/                     # globals.css (CSS custom properties)
├── public/                     # Shipped static assets only — everything here is deployed
│   ├── brand/                  # Derived assets (cropped wordmark + particles) — generated
│   ├── illustrations/          # Hand-drawn illustration PNGs — READ-ONLY source
│   └── icon.png                # Favicon (B.)
├── assets/                     # Design source, NOT deployed — logo/, particles/, illustrations/
├── visual_guide_BASE.pdf       # Canonical brand guide — READ-ONLY reference
└── web-design/                 # Older design comps (.dc.html) — READ-ONLY, superseded for home
```

**`public/` ships; `assets/` does not.** Anything placed under `public/` is served verbatim by
Vercel, so only derived, page-referenced files belong there. Raw sources — the 6000² logo JPGs, the
2160² particle canvases — live in `assets/` and are cropped into `public/brand/` by the `ffmpeg`
commands documented in `components/ui/Wordmark.tsx` and `lib/particles.ts`. Fonts are **not**
vendored at all: `next/font/google` fetches and self-hosts Merriweather and Space Grotesk at build
time.

---

## Design System

> **Source of truth:** the Figma file **`BASE-WEB`, frame `web` (1920 × 7103)** —
> <https://www.figma.com/design/81o7kMlpJZcTbszJuS0Cg6/BASE-WEB?node-id=0-1>
> Implement it faithfully. `web-design/*.dc.html` are **superseded for the home page** (stale
> fonts, palette and copy); they remain read-only reference for routes not yet redesigned.

### Color Tokens

| CSS Variable  | Value                | Role                                           |
| ------------- | -------------------- | ---------------------------------------------- |
| `--bg`        | `#F7F5F0`            | Default section surface (cream)                |
| `--surface`   | `#FFFFFF`            | Hero left panel, service cards, closing panel  |
| `--ink`       | `#212121`            | Dark section fill                              |
| `--ink-text`  | `#000000`            | Heading fill (Merriweather)                    |
| `--cream-ink` | `#F7F3EF`            | Body text on dark sections                     |
| `--ink-70`    | `rgba(33,33,33,.7)`  | Body copy on light                             |
| `--ink-55`    | `rgba(33,33,33,.55)` | Secondary text                                 |
| `--ink-15`    | `rgba(33,33,33,.15)` | Borders · dividers                             |
| `--ink-08`    | `rgba(33,33,33,.08)` | Subtle fills                                   |
| `--accent`    | `#F7A74F`            | Orange — section fills and copy, never buttons |
| `--btn`       | `#373333`            | Button fill (label `#FFFFFF`)                  |

Map these 1-to-1 in `tailwind.config.ts` under `colors`.

**Retired 2026-08-27 — must not appear in code:** `#F6F2EA`, `#1E1B18`, `#EFE9DD`,
`oklch(78% 0.15 55)`.

### Typography

| Font                                | Weights | Use                                                 |
| ----------------------------------- | ------- | --------------------------------------------------- |
| **Merriweather** (serif)            | 400–700 | h1, h2, h3, card titles, pull quotes, closing lines |
| **Space Grotesk** (sans, geometric) | 300–700 | Body copy, nav, labels, buttons, links, small print |

> **2026-08-27 decision:** the product typography is a **two-family pairing** — Merriweather for
> display, Space Grotesk for everything else. This retires the 2026-08-23 "Space Grotesk only"
> decision. Bitter, Public Sans and Embury Text remain retired; Merriweather is the serif that
> fills the display role Embury Text once held. Never put body copy in Merriweather or a heading in
> Space Grotesk. Both load through `next/font/google`; no font files are vendored in the repo.

**Size scale (1920 design reference).** These are **measured off 1:1 PNG exports of each Figma
node**, not read from the layer panel — the panel reports the unscaled text styles and the frame
renders them substantially larger. Always measure the export.

| Where                             | Family · size               | Line height |
| --------------------------------- | --------------------------- | ----------- |
| `Inicio` hero h1                  | Merriweather 600 · **65px** | 91          |
| `Frame 7` closing h2              | Merriweather 400 · **56px** | 77          |
| `Frame 5` services h2             | Merriweather 700 · **48px** | 62          |
| `banner_01` / `Frame 4` line      | Merriweather 400 · **48px** | 63 / 65     |
| `Solucióin` h2                    | Merriweather 700 · **50px** | 63          |
| `Frame 5` card title              | Merriweather 700 · **40px** | —           |
| `Solucióin` principle label       | Merriweather 700 · **36px** | —           |
| `Problemática` / `Solucióin` body | Space Grotesk · **34px**    | 35 / 45     |
| `Frame 5` card description        | Space Grotesk · **30px**    | 35          |
| `Frame 5` `Ver más...`            | Space Grotesk · **24px**    | —           |
| Hero button label                 | Space Grotesk · **24px**    | —           |
| Nav links                         | Space Grotesk · **22px**    | —           |
| `Inicio` hero lead                | Space Grotesk · **20px**    | 26          |
| `Frame 7` subline                 | Space Grotesk · **20px**    | 26          |

Body copy in the comps is filled **`#000000`**, not `--ink-70`. `--ink-70` stays available for
secondary text but is not what the home page uses.

### Layout

- **Design width:** `1920px`; container `max-w-site` centered
- **`3xl: 1920px` is the only breakpoint at which the comp's px values are 1:1.** `lg` / `xl` /
  `2xl` are scaled-down steps of the same numbers. Positional geometry (column widths, insets,
  splits, particle coordinates) is expressed as **percentages** so the composition holds at every
  width; only type sizes step.
- **Horizontal inset:** `135px` (desktop) → responsive down to `24px` (mobile). The nav's right
  inset is `70px`, not 135; the services cards inset `106px` with a `47px` gutter.
- **Two-panel splits:** hero splits **47.76%** — `#FFFFFF` left, `#F7F5F0` right. The closing
  section splits **41.88%** — `#FFFFFF` left, `#F7F5F0` right, and its illustration is cropped by
  the panel (`object-cover`), not contained.
- **Dark bands are full-bleed** and may deliberately overflow the frame (the `Servicios` divider
  node is 2225px wide against a 1920 frame)
- **Section heights (design):** 1076 hero · 530 problem · 1079 chaos · 100 divider · 1292 solution ·
  745 order · 1356 services · 927 closing

**Hero, measured:** the `Inicio` left panel is `#FFFFFF` and carries the wordmark (205 × 34 at
x135/y59), the h1 (Merriweather 600 · **65px** on a 91px line, wrapping to three lines, ink top at
y242), the lead (20px Space Grotesk on a 26px line, top at y517) and the `Comencemos` button
(183 × 53 at x135/y926 — `Botón 01` exactly). Add `65px` h1 to the size scale above.

> **Exports can lie.** The first 1:1 export of this node came back with the left panel filled black
> and the headline layers hidden. Both were artefacts of that export. Measure **type and geometry**
> off the exports; confirm **fills and layer visibility** against the live Figma or with the user.

### Home Page Sections (Figma order)

| #   | Figma node     | Size      | Component                              |
| --- | -------------- | --------- | -------------------------------------- |
| 1   | `Inicio`       | 1920×1076 | `layout/Nav.tsx` + `sections/Hero.tsx` |
| 2   | `Problemática` | 1920×530  | `sections/ProblemSection.tsx`          |
| 3   | `banner_01`    | 1920×1079 | `sections/ChaosSection.tsx`            |
| 4   | `Servicios`    | 1920×100  | `sections/DarkBand.tsx`                |
| 5   | `Solucióin`    | 1920×1292 | `sections/SolutionSection.tsx`         |
| 6   | `Frame 4`      | 1920×745  | `sections/OrderSection.tsx`            |
| 7   | `Frame 5`      | 1920×1356 | `sections/ServicesSection.tsx`         |
| 8   | `Frame 7`      | 1920×927  | `sections/CaseStudiesSection.tsx`      |

Sections 3 and 6 are a deliberate pair — chaos (particles scattered) answered by order (the same
marks in an even grid). Keep that contrast intact when editing either.

The Figma page has **no footer**; `layout/Footer.tsx` is designed to match this system rather than
ported from the old comps.

### Brand Rules (non-negotiable)

1. `--accent` **is** allowed as a full-bleed section background (the services band) and as body
   copy on `--ink`. It is never a button fill. (This reverses the pre-2026-08-27 rule.)
2. **Primary button:** `background: var(--btn)`, `color: #FFFFFF`, radius `0`, Space Grotesk,
   sentence case — no uppercase, no letter-spacing. Figma `Botón 01` is 183 × 53, padding 10.
3. **Outline button:** `background: transparent`, `border: 1px solid var(--ink)`.
4. **Inverted button (dark sections):** `background: var(--bg)`, `color: var(--ink)`.
5. **No eyebrow labels.** The `13px uppercase tracking-[0.14em]` pattern is retired — sections open
   on their heading, or on body copy alone.
6. Wordmark = `BASE` (bold) + `studio.` (light) — trailing period is part of the mark. Use the
   raster lockup in `assets/logo/` everywhere; on `--ink` sections apply a CSS `invert(1)` filter
   (Tailwind `invert`) rather than swapping to a coded text wordmark.
7. Icon mark = `B.` — used at favicon/icon scale only.
8. Clear space: minimum one square block module around the lockup. Never crowd it.
9. **No ghost `B.` hero mark** and **no `#EFE9DD` philosophy band** — both retired.
10. Messaging tone: **structured, editorial, confident**. Systems-thinking. No startup hyperbole.
11. Illustration PNGs carry their own colors (red bricks, blue documents, orange puzzle piece).
    That is intentional — never recolor them to the palette.

---

## Tech Stack

### Next.js 15 (App Router)

- **Default:** Server Components. Add `'use client'` only for event handlers, Framer Motion, or
  browser APIs.
- **Images:** always `next/image` with `alt`, `width`, `height`. Never raw `<img>`.
- **Metadata:** `export const metadata: Metadata` per route file.
- **Route group:** `(site)` for all public pages.
- **Data fetching:** fetch + Sanity at the RSC level; no client-side data fetching for content.

### Tailwind CSS

- Extend `tailwind.config.ts` with design tokens (colors, fonts, custom spacing).
- Use `cn()` helper (`clsx` + `tailwind-merge`) for conditional class merging.
- No arbitrary values unless truly one-off. Prefer extending the config.
- No inline `style={{}}` — use Tailwind classes or CSS variables from `globals.css`.

### Sanity CMS

- Embedded Studio at `app/studio/[[...tool]]/page.tsx`.
- Schemas: `project` · `post` · `service` · `teamMember`.
- All queries in `sanity/lib/queries.ts` (typed GROQ).
- Fetch helpers in `sanity/lib/fetch.ts` — use `draftMode()` for previews.
- Use `next-sanity` image URL builder for all Sanity images.

### Framer Motion

- All motion components must be in Client Components.
- Standard entrance: `y: 20 → 0, opacity: 0 → 1, duration: 0.5`.
- **Do not gate animations on `useReducedMotion()` / `prefers-reduced-motion` (retired
  2026-08-30).** That OS flag is frequently on involuntarily — Windows Battery Saver /
  power-efficiency mode disables "Animation effects" system-wide — and doing so was silently
  killing the intro loader and every other animation on the site for affected visitors. Animations
  always run. See `.claude/rules/accessibility.md`.
- Marquee: retired 2026-08-27 — not part of the current design. Do not reintroduce it.
- Wrap page sections in a reusable `<FadeInSection>` client component.
- Page transitions: `AnimatePresence` at layout level.

### Resend + React Email

- API route: `app/api/contact/route.ts` (POST only).
- Validate body with **Zod** before sending.
- Email template: `components/emails/ContactEmail.tsx`.
- Sender: `noreply@basestudio.com`. Reply-to: submitter's email.

### Code Quality

- **ESLint:** Next.js recommended + `@typescript-eslint/recommended`.
- **Prettier:** single quotes, 2-space indent, 100-char line width, trailing commas (all).
- **Husky + lint-staged:** runs ESLint + Prettier on staged files before every commit.
- **TypeScript:** `strict: true`. No `any`. Sanity queries must return fully typed data.
- **Imports:** absolute (`@/components/...`), configured in `tsconfig.json`.

---

## Content Guidelines

- **Language:** Spanish only (decision 2026-08-27). `<html lang="es">`.
- **Voice:** Precise, confident, editorial. Systems-thinking. Not promotional.
- **Core line:** _"No es sobre estética; es sobre sistemas."_ — never paraphrase it.
- Copy comes from the Figma file **verbatim**. Do not translate it to English, do not "improve"
  it. The earlier instruction to render the comps' Spanish copy as English is retired.

---

## What NOT to Modify

| Path                                                         | Reason                                                                                                                                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visual_guide_BASE.pdf`                                      | Canonical brand source                                                                                                                                                            |
| `assets/demo/`                                               | Marketing renders                                                                                                                                                                 |
| `assets/logo/`, `assets/particles/`, `public/illustrations/` | Source raster assets — import via `next/image`, never edit the files                                                                                                              |
| `web-design/*.dc.html`                                       | **Superseded for the home page** by the Figma file `BASE-WEB` (see Design System). Read-only reference for routes not yet redesigned; their fonts, palette and copy are all stale |

**Asset caveats to design around, not edit the source for:**

- `assets/logo/*.jpg` are flat JPGs: black wordmark on an opaque cream field, no alpha, no
  inverted variant, and the mark occupies only ~16% of a 6000 × 6000 square. Rendering one
  directly paints a visible cream box on the white hero panel, so they are **source only**.
  `components/ui/Wordmark.tsx` renders the derived `public/brand/wordmark.png` — the same lockup
  cropped to its glyph box with alpha taken from inverted luminance — and applies `invert`
  (Tailwind) on `--ink` grounds. The `ffmpeg` command that regenerates it is in that component.
- `assets/particles/*.png` are solid-black silhouettes on transparent backgrounds. In the current
  design they sit on **light** sections and render as-is via `next/image`. Only if one is placed on
  a `--ink` section must it be recolored (CSS `mask-image` + `background-color: var(--bg)`),
  otherwise it is invisible against the dark ground.
- The illustration PNGs are multi-color by design (red bricks, blue documents, orange puzzle
  piece). Never recolor them to the palette.

---

## Development Commands

The package manager is **pnpm** (pinned in `package.json` via `packageManager`). There is no
`package-lock.json` — `pnpm-lock.yaml` is the only lockfile, and Vercel keys its install off it.

```bash
pnpm install         # Install dependencies
pnpm dev             # Next.js dev server (localhost:3000)
pnpm build           # Production build
pnpm lint            # ESLint
pnpm format          # Prettier write
```

---

## Deployment

- **Host:** Vercel. **Repo:** <https://github.com/angelvaloro09/base> (branch `main`).
- **Framework preset:** Next.js, auto-detected. No `vercel.json` — the defaults are correct.
- **Build:** `pnpm build`; install resolved from `pnpm-lock.yaml`. `pnpm-workspace.yaml` allows the
  `unrs-resolver` postinstall, which pnpm 10+ otherwise blocks and which the ESLint TypeScript
  resolver needs.
- **Environment variables:** none. The home page is fully static (`○ Static`, 5 prerendered
  routes). Sanity and Resend are not wired in yet; when they land, the keys in
  `.claude/rules/typescript-standards.md` become required and must be added in the Vercel project
  before the first build that reads them.
- Pushing to `main` deploys to production; every other branch gets a preview URL.

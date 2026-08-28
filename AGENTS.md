# AGENTS.md

Context file for AI coding agents (Cursor, Copilot, Codex, etc.) working on this repository.
For Claude-specific guidance see `CLAUDE.md` and `.claude/`.

## Project

**BASE Studio** website — portfolio, services, blog, and contact for a brand studio.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Sanity CMS · Framer Motion · Resend
- **Deploy:** Vercel
- **Language:** **Spanish** (decision 2026-08-27 — see Critical Brand Rules #4)

## Critical Brand Rules

Apply these rules to every file you touch. They are non-negotiable.

1. **Palette (2026-08-27, sampled from the Figma `BASE-WEB` file):** surface `#F7F5F0`, panel/card
   `#FFFFFF`, dark fill `#212121`, heading ink `#000000`, text-on-dark `#F7F3EF`, accent orange
   `#F7A74F`, button fill `#373333`. These replace the retired `#F6F2EA` / `#1E1B18` /
   `oklch(78% 0.15 55)` set entirely.
2. **Accent orange `#F7A74F` IS allowed as a full-bleed section background** (the services section
   is a full orange band) and as body-copy color on `#212121`. This reverses the old
   "accent never a large fill" rule. It is still never a button fill.
3. **Two font families.** **Merriweather** (serif) for headings, section titles, card titles, pull
   quotes and the closing statements. **Space Grotesk** (sans) for body copy, nav, labels, buttons,
   links. Never mix the roles. This retires the 2026-08-23 "Space Grotesk only" decision, and
   Bitter / Public Sans / Embury Text remain retired.
4. **Copy is Spanish.** The Figma file is the copy source — use its strings verbatim. Do not
   translate to English. `<html lang="es">`.
5. **No eyebrow labels, no ghost `B.` mark.** The current design uses neither. Sections open
   directly on their heading (or, in the Problemática band, on body copy alone).
6. **Never modify** files in `visual_guide_BASE.pdf`, `assets/logo/`, `assets/particles/`,
   `public/illustrations/`, or `web-design/`.
7. **Logo:** `assets/logo/*.jpg` are flat JPG, black-on-cream, no alpha, no dark variant. On
   `#212121` sections apply a CSS `invert(1)` filter (Tailwind `invert`) rather than swapping to text.

## Design Source of Truth

The **Figma file `BASE-WEB`, frame `web` (1920 × 7103)** is the source of truth for the home page:
<https://www.figma.com/design/81o7kMlpJZcTbszJuS0Cg6/BASE-WEB?node-id=0-1>

`web-design/*.dc.html` are **superseded for the home page**. They remain read-only reference for
routes not yet redesigned (`/work`, `/studio`, `/contact`), but their fonts, palette, and copy are
all stale — never implement them literally.

Home page section order (Figma node → size at 1920 design width):

| #   | Figma node     | Size      | What it is                                                 |
| --- | -------------- | --------- | ---------------------------------------------------------- |
| 1   | `Inicio`       | 1920×1076 | Nav + hero, two-panel split (white left / `#F7F5F0` right) |
| 2   | `Problemática` | 1920×530  | Dark `#212121` band, 3 text columns                        |
| 3   | `banner_01`    | 1920×1079 | Scattered particles + centered serif line (chaos)          |
| 4   | `Servicios`    | 1920×100  | Empty full-bleed `#212121` divider band                    |
| 5   | `Solucióin`    | 1920×1292 | Grid image + serif H2 + 3 principle rows + CTA             |
| 6   | `Frame 4`      | 1920×745  | Particles in an even grid + centered serif line (order)    |
| 7   | `Frame 5`      | 1920×1356 | Full-bleed orange band, 3 illustrated service cards        |
| 8   | `Frame 7`      | 1920×927  | Split closing section, white panel + crowd illustration    |

## Architecture Rules

- **Server Components by default.** Add `'use client'` only when necessary.
- **All content data** comes from Sanity via typed GROQ queries in `sanity/lib/`. Phase 2 content is
  hardcoded from the Figma copy — Sanity wiring is a later phase.
- **Images** always use `next/image`. Never raw `<img>`.
- **Classes** via `cn()` (clsx + tailwind-merge). No inline `style={{}}`.
- **TypeScript strict.** No `any`. All Sanity responses must be typed.
- **Animation:** Framer Motion in client components. Always check `useReducedMotion()`.
- **Form submission:** Zod validation → `app/api/contact/route.ts` → Resend.
- **Pre-commit:** Husky runs ESLint + Prettier. Fix all errors before committing.

## File Organization

```
app/(site)/          Public pages (Home, Work, Studio, Services, Blog, Contact, Pricing)
components/ui/       Primitive UI components
components/layout/   Nav, Footer, PageWrapper
components/sections/ Page sections (Hero, ProblemSection, ChaosSection…)
components/work/     Portfolio-specific components
sanity/schemas/      Content schemas: project, post, service, teamMember
sanity/lib/          GROQ queries and typed fetch helpers
lib/                 Utilities (cn, formatDate…)
public/              Static assets — illustrations/, particles/, logo/, fonts/
```

## Design Tokens Reference

```
--bg:          #F7F5F0             Default section surface (cream)
--surface:     #FFFFFF             Hero left panel, service cards, Frame 7 panel
--ink:         #212121             Dark section fill
--ink-text:    #000000             Heading fill (Merriweather)
--cream-ink:   #F7F3EF             Body text on dark sections
--accent:      #F7A74F             Orange — section fills and copy, never buttons
--btn:         #373333             Button fill (text #FFFFFF)
--ink-70:      rgba(33,33,33,.70)  Body text on light
--ink-55:      rgba(33,33,33,.55)  Secondary text
--ink-15:      rgba(33,33,33,.15)  Borders / dividers
--ink-08:      rgba(33,33,33,.08)  Subtle fills

Headings: 'Merriweather', Georgia, serif
Body/UI:  'Space Grotesk', Helvetica, Arial, sans-serif
```

## Asset Sources

| Path                                          | Use                                                                                      |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `public/brand/wordmark.png`                   | **Derived** transparent lockup — use via `components/ui/Wordmark.tsx`, never the raw JPG |
| `public/illustrations/base.png`               | Hero — red bricks being laid (644×520 in the comp)                                       |
| `public/illustrations/01_auditoria.png`       | Services card 1 — Auditoría                                                              |
| `public/illustrations/02_sistema_visual.png`  | Services card 2 — Identidad Visual                                                       |
| `public/illustrations/03_implementacion.png`  | Services card 3 — Implementación                                                         |
| `public/illustrations/order_01.png`           | Solución — particles in a ruled grid                                                     |
| `public/illustrations/casos_de_estudio_1.png` | Frame 7 — crowd of heads                                                                 |
| `public/illustrations/banner.png`             | Flattened chaos band — **fallback only**, prefer particles                               |
| `assets/particles/01_Fig.png`…`12_Fig.png`    | Individual decorative marks (chaos + order sections)                                     |
| `assets/logo/Logo_final.jpg`                  | Wordmark lockup (horizontal); `_resp` is the stacked one                                 |

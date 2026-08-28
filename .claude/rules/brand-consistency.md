# Rule: Brand Consistency

**Always active.** Apply to every file, component, or piece of copy you generate or modify.

> **Replaced 2026-08-27.** Palette, typography and copy language were all rewritten to match the
> approved Figma file `BASE-WEB`. Everything marked "retired" below must not reappear in code, and
> `[[visual-guide]]` is historical context only.

---

## Color Rules

- ONLY these values. No exceptions, no "close enough" substitutes:

  | Token       | Value     | Tailwind                    | Role                                          |
  | ----------- | --------- | --------------------------- | --------------------------------------------- |
  | `bg`        | `#F7F5F0` | `bg-bg` / `text-bg`         | Default section surface                       |
  | `surface`   | `#FFFFFF` | `bg-surface`                | Hero left panel, service cards, closing panel |
  | `ink`       | `#212121` | `bg-ink`                    | Dark section fill                             |
  | `ink-text`  | `#000000` | `text-ink-text`             | Heading fill (Merriweather)                   |
  | `cream-ink` | `#F7F3EF` | `text-cream-ink`            | Body text on dark sections                    |
  | `accent`    | `#F7A74F` | `bg-accent` / `text-accent` | Orange                                        |
  | `btn`       | `#373333` | `bg-btn`                    | Button fill, label `#FFFFFF`                  |

- **The accent orange IS allowed as a full-bleed section background** (the services band) and as
  body-copy color on `#212121`. The old "accent is never a large fill" rule is retired.
- Accent is still never a button fill.
- Retired and forbidden in code: `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`.
- Never introduce new colors without explicit approval. The illustrations' own colors (red bricks,
  blue documents, orange puzzle piece) live inside the PNGs and are not tokens — don't recolor them.

## Typography Rules

- **Two families, fixed roles.** **Merriweather** (serif) for headings, card titles, pull quotes
  and closing statements. **Space Grotesk** (sans) for body copy, nav, labels, buttons, links.
  Never swap the roles.
- Supersedes the "Space Grotesk only" decision of 2026-08-23, and the older Bitter/Public Sans and
  Embury Text pairings — all retired. Merriweather is the serif now.
- Observed scale (1920 design width): hero h1 **70px** Merriweather 600, auto line-height, 0%
  tracking, `#000`; closing h2 **60px**; body **20px** Space Grotesk 400.
- **The eyebrow pattern is retired.** No `13px uppercase tracking-[0.14em]` label above section
  titles — sections open on their heading, or on body copy alone.

## Button Rules

Figma reference (`Botón 01`): 183 × 53, padding 10, **radius 0**, fill `#373333`, label `#FFFFFF`,
Space Grotesk, **sentence case** — no uppercase, no letter-spacing.

- `primary`: `bg-btn text-white border border-btn` — light sections.
- `outline`: `bg-transparent text-ink border border-ink` — secondary CTA.
- `inverted`: `bg-bg text-ink border border-bg` — inside `#212121` sections.
- Buttons are never accent-colored.

## Copy & Tone Rules

- Copy is **Spanish only** (decision 2026-08-27). Use the Figma strings verbatim — do not translate,
  paraphrase, or "improve" them.
- Tone: structured, editorial, confident. Not promotional or hyperbolic.
- Avoid: "increíble", "apasionados", "transforma tu marca", "vanguardia".
- The core line _"No es sobre estética; es sobre sistemas."_ must appear exactly as written.
- Trailing period in `studio.` and `B.` is mandatory. Never omit it.

## Logo & Wordmark Rules

- Wordmark renders as `BASE` (bold) immediately followed by `studio.` (light). Period mandatory.
- Icon mark is `B.` only — favicon scale.
- Never crowd the wordmark: at least one square block module of clear space.
- `assets/logo/*.jpg` are the source lockups: flat JPG, black text on solid cream, opaque, no
  dark-mode variant, and ~84% empty margin. **Never render one directly** — it paints a visible
  cream box on white. Render the wordmark through `components/ui/Wordmark.tsx`, which uses the
  derived `public/brand/wordmark.png` (cropped to the glyph box, alpha from inverted luminance)
  and applies `invert` for `#212121` grounds. The regeneration command is documented in that file.

## Structural Rules

- Never modify files in `visual_guide_BASE.pdf`, `assets/logo/`, `assets/particles/`, `public/illustrations/`,
  or `web-design/`.
- All new pages include Nav and Footer via the `(site)` layout. On the home page the Nav sits
  **inside** the hero (no border, no background of its own, no CTA button).
- **Retired:** eyebrow above every section · ghost `B.` hero mark · `#EFE9DD` philosophy band ·
  the marquee ribbon. None of these exist in the current design.
- The home page's chaos section (scattered particles) and order section (particles in an even grid)
  are deliberate mirrors — keep that contrast intact when editing either.

# Rule: Brand Consistency (All Agents)

**Always active.** Apply to every file you generate or modify.
Palette, typography and copy language were all replaced on **2026-08-27** to match the approved
Figma file `BASE-WEB`. Anything below marked "retired" must not reappear in code.

---

## Non-negotiable Color Rules

- Use ONLY these tokens — no substitutions, no "close enough" hexes:

  | Token       | Value     | Tailwind                  | Role                                          |
  | ----------- | --------- | ------------------------- | --------------------------------------------- |
  | `bg`        | `#F7F5F0` | `bg-bg` `text-bg`         | Default section surface                       |
  | `surface`   | `#FFFFFF` | `bg-surface`              | Hero left panel, service cards, Frame 7 panel |
  | `ink`       | `#212121` | `bg-ink`                  | Dark section fill                             |
  | `ink-text`  | `#000000` | `text-ink-text`           | Heading fill (Merriweather)                   |
  | `cream-ink` | `#F7F3EF` | `text-cream-ink`          | Body text on dark sections                    |
  | `accent`    | `#F7A74F` | `bg-accent` `text-accent` | Orange                                        |
  | `btn`       | `#373333` | `bg-btn`                  | Button fill, text `#FFFFFF`                   |

- **Accent orange IS a valid full-bleed section background** (services band) and a valid body-copy
  color on `#212121`. The old "accent never a large fill" rule is retired.
- Accent is still **never** a button fill.
- Retired and forbidden: `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`.
- No hardcoded hex/rgb outside the Tailwind config / CSS variable definitions.

## Typography Rules

- **Two families, fixed roles:**
  - **Merriweather** (serif) — h1/h2/h3, card titles, pull quotes, closing statements.
    Weights 400 / 600 / 700; the design uses SemiBold (600) for display.
  - **Space Grotesk** (sans) — body copy, nav links, labels, buttons, small print.
    Weights 300–700, body at 400.
- Never put body copy in Merriweather or a heading in Space Grotesk.
- Retired: "Space Grotesk only" (2026-08-23), Bitter, Public Sans, Embury Text.
- Observed scale (1920 design width): hero h1 **70px** Merriweather 600 / auto line-height /
  0% tracking / `#000`; closing h2 **60px**; body **20px** Space Grotesk 400.
- **No eyebrow labels.** The `13px uppercase tracking-[0.14em]` eyebrow pattern is retired —
  sections open on their heading, or on body copy alone.

## Button Rules

Figma reference (`Botón 01`): 183 × 53, padding 10, **corner radius 0**, fill `#373333`,
label `#FFFFFF`, Space Grotesk, **sentence case** — not uppercase, no letter-spacing.

- `primary`: `bg-btn text-white border border-btn` — light sections.
- `outline`: transparent, ink border and text.
- `inverted`: `bg-bg text-ink border-bg` — inside `#212121` sections.
- Never use accent as a button fill.

## Copy Rules

- **Spanish only.** Use the Figma strings verbatim; do not translate, paraphrase, or "improve" them.
- Tone: structured, editorial, systems-oriented. No marketing hyperbole.
- Trailing period in `studio.` and `B.` is mandatory.
- The core line in this design is _"No es sobre estética; es sobre sistemas."_ — never paraphrase it.

## Structural Rules

- No eyebrow labels. No ghost `B.` hero mark. No `#EFE9DD` philosophy band. All retired.
- Never modify: `visual_guide_BASE.pdf`, `assets/logo/`, `assets/particles/`, `public/illustrations/`,
  `web-design/`.
- Never use `<img>` — use `next/image` with proper `alt`. Decorative particles get
  `alt=""` + `role="presentation"`.
- `assets/logo/*.jpg` are flat, opaque, no-alpha JPG with ~84% empty margin. **Never render one
  directly.** Use `components/ui/Wordmark.tsx`, which renders the derived
  `public/brand/wordmark.png` (transparent) and applies `invert` on `#212121` grounds.
- `assets/particles/*.png` are solid-black silhouettes on transparent bg. They sit on **light**
  sections in this design and render as-is; only recolor (CSS mask) if placed on `#212121`.

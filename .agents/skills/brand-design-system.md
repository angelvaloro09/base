# Skill: BASE Brand & Design System (Agent Reference)

Quick-reference brand system for AI agents working on the BASE Studio website.
For full detail see `.claude/skills/brand-design-system.md`.
**Current as of 2026-08-27** — palette, typography and language all changed to match the approved
Figma file `BASE-WEB`.

---

## Core Identity

**Philosophy:** _"No es sobre estética; es sobre sistemas."_
**Symbol:** The block (bloque) — structure, support, construction.
**Narrative spine of the home page:** chaos (scattered particles) → order (particles in a grid).
The two particle sections are deliberate mirrors of each other; keep that contrast intact.

## Color Tokens

```
--bg:        #F7F5F0             Default section surface (cream)
--surface:   #FFFFFF             Hero left panel, service cards, closing panel
--ink:       #212121             Dark section fill
--ink-text:  #000000             Heading fill (Merriweather)
--cream-ink: #F7F3EF             Body text on dark sections
--accent:    #F7A74F             Orange
--btn:       #373333             Button fill (label #FFFFFF)
--ink-70:    rgba(33,33,33,0.70) Body text on light
--ink-55:    rgba(33,33,33,0.55) Secondary text
--ink-15:    rgba(33,33,33,0.15) Borders
--ink-08:    rgba(33,33,33,0.08) Subtle fills
```

### Accent Usage

✅ Full-bleed section background (services band) · body copy on `#212121` · small emphasis
❌ Button fills

Retired: `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`, and the
"accent is never a large fill" restriction.

## Typography

```
Merriweather  (serif) — 400/600/700 — h1, h2, h3, card titles, pull quotes, closing lines
Space Grotesk (sans)  — 300–700    — body, nav, labels, buttons, links, small print
```

Two-family decision (2026-08-27) replaces the single-family "Space Grotesk only" decision of
2026-08-23. Bitter, Public Sans and Embury Text stay retired — Merriweather is the serif now.

**Observed scale** (1920 design width):
70px hero h1 (Merriweather 600) → 60px closing h2 → section h2 ~44px → card title ~28px →
20px body (Space Grotesk 400) → 16px small → 14px fine print

**No eyebrow pattern.** Retired with the rest of the old system.

## Buttons

```
Figma `Botón 01`: 183×53 · padding 10 · radius 0 · fill #373333 · label #FFFFFF
                  Space Grotesk, sentence case, no uppercase, no tracking

primary:  bg-btn text-white border-btn
outline:  bg-transparent text-ink border-ink
inverted: bg-bg text-ink border-bg      (use on #212121 sections)
```

## Layout

- **Design width:** 1920. **Content inset:** 135px desktop → 24px mobile.
- **Two-panel splits:** hero and closing section both split ~48% / 52% (white left, cream right).
- **Dark bands are full-bleed** and may deliberately overflow the frame (`Servicios` divider is
  2225px wide against a 1920 frame).
- **Services grid:** 3 equal cards, no radius, on the orange band.

## Logo

- Full: `BASE` (bold) + `studio.` (light) — period mandatory. Use the raster lockup.
- Icon: `B.` — favicon/icon scale only.
- Source raster: `assets/logo/*.jpg` — flat JPG, black-on-cream, **opaque, no alpha**. Never render
  one directly: the file is a 6000 × 6000 square that is ~84% empty cream margin, so it paints a
  visible box on white. Use `components/ui/Wordmark.tsx`, which renders the derived
  `public/brand/wordmark.png` (cropped to the glyph box, alpha from inverted luminance) and
  applies `invert` on `#212121` grounds.
- **No ghost `B.` hero mark** — retired.

## Asset Sources

| Path                                          | Use                                           |
| --------------------------------------------- | --------------------------------------------- |
| `public/illustrations/base.png`               | Hero — red bricks (644×520 in the comp)       |
| `public/illustrations/01_auditoria.png`       | Services card — Auditoría                     |
| `public/illustrations/02_sistema_visual.png`  | Services card — Identidad Visual              |
| `public/illustrations/03_implementacion.png`  | Services card — Implementación                |
| `public/illustrations/order_01.png`           | Solución — particles in a ruled grid          |
| `public/illustrations/casos_de_estudio_1.png` | Closing section — crowd of heads              |
| `public/illustrations/banner.png`             | Flattened chaos band — fallback only          |
| `assets/particles/01_Fig.png`…`12_Fig.png`    | Individual marks — chaos scatter + order grid |

The illustrations are multi-color (red bricks, blue documents, orange puzzle piece). That is
intentional — do not recolor them to the palette.

## Content Voice

- **Spanish only** — Figma strings verbatim.
- Tone: structured, editorial, systems-oriented.
- Avoid: "increíble", "apasionados", "transforma tu marca", "vanguardia".
- Use: specific, confident, systems-framing language.

## Design Reference

**Figma `BASE-WEB`, frame `web` (1920 × 7103)** — source of truth for the home page:
<https://www.figma.com/design/81o7kMlpJZcTbszJuS0Cg6/BASE-WEB?node-id=0-1>

`web-design/*.dc.html` are superseded for the home page (stale fonts, palette and copy). They stay
read-only reference for routes not yet redesigned: `Work.dc.html`, `Studio.dc.html`,
`Contact.dc.html`, `ProjectCard.dc.html`.

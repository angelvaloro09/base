# Skill: BASE Brand & Design System

Complete reference for the BASE Studio visual identity system.
Load this skill whenever generating UI components, copy, or design tokens.

> **Rewritten 2026-08-27** against the approved Figma file `BASE-WEB` (frame `web`, 1920 × 7103):
> <https://www.figma.com/design/81o7kMlpJZcTbszJuS0Cg6/BASE-WEB?node-id=0-1>
> Palette, typography and copy language all changed. `web-design/*.dc.html` are superseded for the
> home page.

---

## Brand Philosophy

BASE Studio's core premise: **"No es sobre estética; es sobre sistemas."**
Identity is treated as a living, structured system — not isolated pieces. Every visual decision
must connect to a shared logic.

The home page dramatizes this: a **chaos** section (particles scattered at random) is answered a
few sections later by an **order** section (the same marks in an even grid). Those two are a pair —
never edit one without the other in mind.

## Symbol & Wordmark

- **Block (bloque):** the central motif. Structure, support, construction. Logo spacing derives
  from square block modules.
- **Full lockup:** `BASE` (bold, uppercase) + `studio.` (light). Trailing period is part of the
  mark — never omit it.
- **Reduced mark:** `B.` — icon and favicon scale only.
- **Source assets:** `assets/logo/{B,BASE,Logo_final,Logo_final_resp}.jpg` — flat JPG, black on
  solid cream, no alpha, no inverted variant. On `#212121` sections apply a CSS `invert(1)` filter
  (Tailwind `invert`).
- **No ghost `B.` hero mark** — retired 2026-08-27.

## Color System

```css
:root {
  /* Surfaces */
  --bg: #f7f5f0; /* Default section surface (cream) */
  --surface: #ffffff; /* Hero left panel, service cards, closing panel */
  --ink: #212121; /* Dark section fill */

  /* Text */
  --ink-text: #000000; /* Heading fill (Merriweather) */
  --cream-ink: #f7f3ef; /* Body text on dark sections */
  --ink-70: rgba(33, 33, 33, 0.7); /* Body copy on light */
  --ink-55: rgba(33, 33, 33, 0.55); /* Secondary text */
  --ink-15: rgba(33, 33, 33, 0.15); /* Borders, dividers */
  --ink-08: rgba(33, 33, 33, 0.08); /* Subtle fills */

  /* Accent + controls */
  --accent: #f7a74f; /* Orange */
  --btn: #373333; /* Button fill, label #FFFFFF */
}
```

**Accent usage rules (changed 2026-08-27):**

- ✅ **Full-bleed section background** — the services band is entirely orange
- ✅ Body copy on `#212121` (the Problemática columns)
- ✅ Small emphasis and decorative accents
- ❌ Button fills

Retired hexes — must not appear in code: `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`.

The illustrations carry their own colors (red bricks, blue documents, orange puzzle piece). Those
live inside the PNGs, are not tokens, and must not be recolored.

## Typography System

> **2026-08-27:** two-family pairing — **Merriweather** (serif) for display, **Space Grotesk**
> (sans) for everything else. Retires the 2026-08-23 "Space Grotesk only" decision. Bitter,
> Public Sans and Embury Text stay retired; Merriweather is the serif.

### Fonts

```
'Merriweather', Georgia, serif
  — Weights: 400, 600 (the display weight in the comp), 700
  — Use: h1, h2, h3, card titles, pull quotes, closing statements

'Space Grotesk', Helvetica, Arial, sans-serif
  — Weights: 300, 400, 500, 600, 700 — body at 400
  — Use: body copy, nav links, labels, buttons, links, small print
```

Never put body copy in Merriweather or a heading in Space Grotesk.

### Type Scale (1920 design width)

| Role                 | Size | Family / Weight       |
| -------------------- | ---- | --------------------- |
| Hero H1              | 70px | Merriweather 600      |
| Closing H2 (Frame 7) | 60px | Merriweather 600      |
| Section H2           | 44px | Merriweather 600      |
| Card title           | 28px | Merriweather 600      |
| Body / lead          | 20px | Space Grotesk 400     |
| Small                | 16px | Space Grotesk 400     |
| Fine print / links   | 14px | Space Grotesk 400–500 |

Hero H1 is measured: auto line-height, `0%` letter-spacing, fill `#000000`.

**No eyebrow pattern.** The `13px uppercase tracking-[0.14em]` label is retired.

## Layout System

- **Design width:** 1920. **Content inset:** 135px desktop → 24px mobile.
- **Two-panel splits:** hero (`Inicio`) and closing (`Frame 7`) both split ~48% / 52% —
  `#FFFFFF` left, `#F7F5F0` right.
- **Dark bands are full-bleed** and may deliberately overflow the frame — the `Servicios` divider
  node is 2225px wide against a 1920 frame.
- **Section heights** (design): 1076 hero · 530 problem · 1079 chaos · 100 divider · 1292 solution ·
  745 order · 1356 services · 927 closing.

### Grids

| Context                 | Columns                    | Gap                |
| ----------------------- | -------------------------- | ------------------ |
| Problemática columns    | 3                          | 170px              |
| Services cards          | 3                          | even, no radius    |
| Order section particles | 5 × 3                      | evenly distributed |
| Solución principle rows | label · rule · description | full width         |

## Component Patterns

### Buttons

Figma reference (`Botón 01`): 183 × 53, padding 10, radius **0**, fill `#373333`, label `#FFFFFF`,
Space Grotesk, **sentence case** — no uppercase, no letter-spacing.

```html
<!-- Primary (default, light sections) -->
<button class="border border-btn bg-btn px-6 py-3.5 text-[15px] text-white">Comencemos</button>

<!-- Outline -->
<button class="border border-ink bg-transparent px-6 py-3.5 text-[15px] text-ink">Ver más</button>

<!-- Inverted (inside #212121 sections) -->
<button class="border border-bg bg-bg px-6 py-3.5 text-[15px] text-ink">Comencemos</button>
```

### Section Header Pattern

No eyebrow. Sections open on the heading itself:

```tsx
<h2 className="font-serif text-[44px] font-semibold text-ink-text">Título de la sección.</h2>
<p className="mt-6 max-w-[640px] font-sans text-[20px] text-ink-70">Copy de apoyo.</p>
```

### Service Card

```
#FFFFFF card on the orange band · no radius · illustration top ·
Merriweather title · Space Grotesk description · right-aligned underlined "Ver más..." link
```

## Copy Voice

Spanish only. Figma strings verbatim.

| Do                                                | Don't                              |
| ------------------------------------------------- | ---------------------------------- |
| "La base sólida detrás de marcas en crecimiento"  | "¡Creamos marcas increíbles!"      |
| "No es sobre estética; es sobre sistemas."        | "Somos apasionados por el diseño." |
| "Tres formas de construir sobre una base sólida." | "Transforma tu marca hoy."         |
| Precise, specific, confident                      | Vague, promotional, fluffy         |

## Asset Library

| Path                                          | Use                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------- |
| `public/brand/wordmark.png`                   | **Derived** transparent lockup (see `components/ui/Wordmark.tsx`)     |
| `assets/logo/`                                | Source lockups. Flat JPG, opaque cream field — do not render directly |
| `assets/particles/01_Fig.png`…`12_Fig.png`    | Hand-drawn marks — chaos scatter + order grid                         |
| `public/illustrations/base.png`               | Hero — red bricks (644×520 in the comp)                               |
| `public/illustrations/01_auditoria.png`       | Services card — Auditoría                                             |
| `public/illustrations/02_sistema_visual.png`  | Services card — Identidad Visual                                      |
| `public/illustrations/03_implementacion.png`  | Services card — Implementación                                        |
| `public/illustrations/order_01.png`           | Solución — particles in a ruled grid                                  |
| `public/illustrations/casos_de_estudio_1.png` | Closing section — crowd of heads                                      |
| `public/illustrations/banner.png`             | Flattened chaos band — fallback only                                  |

---

_Reference: Figma `BASE-WEB` · `visual_guide_BASE.pdf`_

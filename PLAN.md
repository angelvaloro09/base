# PLAN.md — Phase 2: Home page rebuild on the Figma semifinal

**Owner (architect/director/auditor/corrector):** Claude
**Implementer:** Gemini by default — Claude for this session (see below)
**Scope:** Rebuild the home page (`/`) against the approved Figma design. Layout shell (Nav/Footer),
tokens, fonts, and all eight sections. No Sanity wiring (content hardcoded from the Figma copy).
No other routes — nav items are in-page anchors for now.

**Implementer for this session:** Claude, by explicit user direction (2026-08-27). The Gemini CLI
could not be driven headless (no auth env var, workspace untrusted), and the user chose to have
Claude write the code directly rather than hand prompts across. `PLAN-phase1.md`'s
architect/implementer split still describes the project's default mode.

**Phase 1 record:** archived in `PLAN-phase1.md` (shipped home page on the `web-design/*.dc.html`
comps). Read its §7 audit notes before writing prompts — the accumulated failure modes still apply.

Status: **Phase 2 built and verified.** All 8 sections implemented, lint + `tsc --noEmit` clean,
browser sweep done at 1536 / 768 / 375 with no horizontal overflow, contrast and heading structure
checked. Remaining calls for the user are listed in §9.

---

## 1. Source of truth

**Figma `BASE-WEB`, frame `web` — 1920 × 7103:**
<https://www.figma.com/design/81o7kMlpJZcTbszJuS0Cg6/BASE-WEB?node-id=0-1>

`web-design/*.dc.html` are **superseded for the home page**. They stay read-only reference for
routes not yet redesigned (`Work`, `Studio`, `Contact`, `ProjectCard`), but their fonts, palette
and copy are all stale.

### Decisions taken with the user (2026-08-27)

| Question           | Answer                                                                        |
| ------------------ | ----------------------------------------------------------------------------- |
| Copy language      | **Spanish**, Figma strings verbatim. `<html lang="es">`. English rule retired |
| Brand rule docs    | **Updated to match Figma** — done ahead of Prompt 1 (see §2)                  |
| Crowd illustration | Exported by the user → `public/illustrations/casos_de_estudio_1.png`          |
| Footer             | **Design a new one** on-brand; the Figma page has no footer                   |

## 2. Doc realignment (done — 2026-08-27, ahead of Prompt 1)

Gemini reads `AGENTS.md` + `.agents/*`; those files previously forbade what this design does
(accent as a large fill, serif headings, Spanish copy), so they were rewritten first:

- `AGENTS.md` — palette, two-family typography, Spanish, Figma as source of truth, section table,
  asset map (paths moved `assets/` → `public/`).
- `.agents/rules/brand-consistency.md`, `.agents/skills/brand-design-system.md`,
  `.agents/skills/implementation-workflow.md`.
- `CLAUDE.md` — Design System block rewritten (tokens, typography, layout, section table, brand
  rules), Content Guidelines → Spanish, repo structure, What-NOT-to-Modify.
- `.claude/rules/brand-consistency.md`, `.claude/skills/brand-design-system.md`,
  `.claude/skills/nextjs-patterns.md`, `.claude/skills/animation-system.md` (marquee marked
  retired), `.claude/rules/visual-guide.md` (Merriweather now fills the serif role),
  `.claude/commands/brand-audit.md` (checklist inverted where the rules flipped).

## 3. Tokens, fonts, layout

### Colors (sampled from Figma)

| Token            | Value              | Role                                          |
| ---------------- | ------------------ | --------------------------------------------- |
| `bg`             | `#F7F5F0`          | Default section surface                       |
| `surface`        | `#FFFFFF`          | Hero left panel, service cards, closing panel |
| `ink`            | `#212121`          | Dark section fill                             |
| `ink-text`       | `#000000`          | Heading fill                                  |
| `cream-ink`      | `#F7F3EF`          | Body text on dark sections                    |
| `accent`         | `#F7A74F`          | Orange — section fills + copy on dark         |
| `btn`            | `#373333`          | Button fill, label `#FFFFFF`                  |
| `ink-70/55/15/8` | `rgba(33,33,33,…)` | Body, secondary, borders, subtle fills        |

Retired, must not appear: `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`.

### Fonts

`next/font/google`: **Merriweather** (400/600/700) → `--font-merriweather`, `font-serif`;
**Space Grotesk** (300–700) → `--font-space-grotesk`, `font-sans`. Vendored TTFs stay in
`public/fonts/` as the offline source but are not wired in.

Measured: hero h1 Merriweather **600 / 70px** / auto line-height / 0% tracking / `#000`;
closing h2 **60px**; body Space Grotesk **400 / 20px**.

### Layout

Design width 1920, content inset 135px desktop → 24px mobile. `maxWidth.site: 1920px`.
Remove the `marquee` animation + `scroll` keyframe; keep `drift-a/b/c` for the particles.

## 4. Section-by-section spec (Figma order)

Copy below is transcribed from the Figma file — **use verbatim, do not translate**.

### 1 · `Inicio` — Nav + Hero (1920×1076)

Two-panel split: left `#FFFFFF`, right `#F7F5F0`, break at ~48%.

- **Nav** sits inside the hero. No border, no own background, **no CTA button**. Wordmark left
  (`public/logo/Logo_final.jpg` via `next/image`). Links right, Space Grotesk, sentence case, no
  uppercase/tracking: `Nuestra historia` · `Servicios` · `Casos de estudio` · `Contacto`.
- **h1** (Merriweather 600, 70px, max-w ≈ 671px): `La base sólida detrás de marcas en crecimiento.`
- **Lead** (Space Grotesk 400, 20px): `Diseñamos los sistemas visuales que sostienen una marca
cuando empieza a crecer — no solo cuando se ve bien en una presentación.`
- **Button:** `Comencemos`
- **Right panel:** `public/illustrations/base.png` (red bricks; 644×520 at x962/y256 in the comp).
  `01_construction.png` is retired.

### 2 · `Problemática` — dark band (1920×530)

`#212121`, three columns, gap 170px. Space Grotesk throughout, no heading, no eyebrow.

- **Col 1** — `#F7A74F`, **right-aligned**: `Muchas marcas crecen sin haber sentado base.`
  (the closing `sentado base.` is bold)
- **Col 2** — `#F7A74F`, **right-aligned**: `Un logo aquí, una plantilla allá, una decisión de
última hora antes de un lanzamiento. Funciona un tiempo.`
- **Col 3** — `#F7F3EF`, left-aligned: `Pero cuando el negocio crece, esas decisiones sueltas
empiezan a chocar entre sí: cada canal dice algo distinto, cada persona del equipo interpreta la
marca a su manera, y lo que debería ser una identidad se vuelve una colección de parches.`

### 3 · `banner_01` — chaos (1920×1079)

`#F7F5F0`. ~18 particle marks from `public/particles/*.png` at irregular positions, sizes and
rotations (the Figma node is a group of individual images — **not** the flattened
`public/illustrations/banner.png`, which is fallback only). Centered Merriweather line:
`Esto es lo que se siente por dentro.`

Implement as a data array of `{ src, size, top, left, rotate, drift }` driving `DecorativeMark`.
`DecorativeMark` currently hard-masks every mark to `bg` (built for dark sections) — it needs a
`tone: 'ink' | 'bg'` prop, since these marks are black on cream.

### 4 · `Servicios` — divider band (1920×100)

Solid `#212121`, 100px tall, **full-bleed** (the node is 2225px wide against a 1920 frame — it
deliberately overflows), **no content**. New `components/sections/DarkBand.tsx`.
`Marquee.tsx` and its keyframe are deleted.

> Open question for the user: this band reads as an unfinished marquee strip in the comp. Built
> literally for now.

### 5 · `Solucióin` — solution (1920×1292)

`#F7F5F0`.

- **Left:** `public/illustrations/order_01.png` (particles in a ruled grid).
- **Right h2** (Merriweather, **uppercase**): `Y ES POR ESO QUE EXISTIMOS NOSOTROS.`
- **Paragraph:** `En BASE construimos el sistema que ordena esa marca antes de que crezca más:
reglas claras, piezas que se sostienen entre sí, un criterio que cualquiera en el equipo puede
seguir sin tener que preguntar.`
- **Three principle rows** — Merriweather uppercase label · vertical rule · Space Grotesk description:
  - `CONSISTENCIA` | `la marca se ve como una sola cosa en cualquier canal.`
  - `ESCALABILIDAD` | `el sistema crece con el negocio, no se rompe con él.`
  - `AUTONOMÍA` | `el equipo aplica la marca sin depender de nosotros.`
- **Button** (centered): `Empecemos con un diagnóstico de marca`

### 6 · `Frame 4` — order (1920×745)

`#F7F5F0`. 15 particles in an **even 3 × 5 grid** — the deliberate answer to section 3's scatter.
Centered Merriweather line: `No es sobre estética; es sobre sistemas.`
New `components/sections/OrderSection.tsx`; `Banner.tsx` is deleted.

### 7 · `Frame 5` — services (1920×1356)

Full-bleed `#F7A74F`. Centered Merriweather h2:
`Tres formas de construir sobre una base sólida.`

Three `#F7F5F0` cards, no radius — illustration on top, Merriweather title, Space Grotesk
description, right-aligned underlined `Ver más...` link:

| Card | Illustration            | Title              | Description                                                             |
| ---- | ----------------------- | ------------------ | ----------------------------------------------------------------------- |
| 1    | `01_auditoria.png`      | `Auditoría`        | `Un diagnóstico a fondo antes de comprometerte a un rediseño completo.` |
| 2    | `02_sistema_visual.png` | `Identidad Visual` | `El sistema completo — el corazón de BASE aplicado a tu marca.`         |
| 3    | `03_implementacion.png` | `Implementación`   | `Todo el Paquete 2, llevado a producción completa y sistematizada.`     |

### 8 · `Frame 7` — closing (1920×927)

Split: left `#FFFFFF` panel, right `#F7F5F0`.

- **h2** (Merriweather 600, 60px): `La base sólida detrás de marcas en crecimiento`
- **Subline** (Space Grotesk, small): `No es una promesa — es lo que ya sostiene a otros negocios
en crecimiento.`
- **Right:** `public/illustrations/casos_de_estudio_1.png` (crowd of heads).

The 4-card project grid is gone. `components/work/ProjectCard.tsx` stays on disk, unused, for a
future `/work` route.

### Button component

Figma `Botón 01`: 183 × 53, padding 10, **radius 0**, fill `#373333`, label `#FFFFFF`,
Space Grotesk, **sentence case**. Keep the existing `primary | outline | inverted` API and the
`href`-discriminated union — only the class strings change.

### Footer (no Figma counterpart — design it)

`#212121` ground, inverted wordmark (`invert` on the JPG lockup), tagline in Merriweather,
Space Grotesk link columns in `#F7F3EF` — sitemap mirroring the nav, contact, social. Spanish
labels. Present to the user for approval before treating it as final.

### Nav link targets

Only `/` exists. Render the four nav items as in-page anchors and add matching `id`s:
`#nuestra-historia` → section 5, `#servicios` → section 7, `#casos-de-estudio` → section 8,
`#contacto` → footer. Real routes come in a later phase.

## 5. Animation direction

Unchanged from Phase 1 in spirit: `FadeInSection` wraps sections 2–8; particles use the
`drift-a/b/c` keyframes; hero illustration gets a fade/slide-in plus a subtle float. Every motion
path gated on `useReducedMotion()` / `motion-reduce:`.

## 6. Risks to watch when auditing

1. **Stale tokens creeping back** — `#F6F2EA` / `#1E1B18` / `oklch(78%…)` from muscle memory or
   from copying old components. Grep every diff.
2. **Font role inversion** — headings in `font-sans`, body in `font-serif`. Easy to miss visually.
3. **Eyebrows reappearing** — the retired `13px uppercase tracking-[0.14em]` pattern is all over
   the Phase 1 components being rewritten.
4. **English copy** — Phase 1 translated everything; the old strings are right there in the file
   being edited. Copy must be Spanish, verbatim.
5. **`DecorativeMark` masking** — if the `tone` prop is missed, black marks get masked to cream and
   vanish on the light chaos/order sections.
6. **Full-bleed vs. container** — dark bands and the orange services band must break out of
   `max-w-site`; the two split sections must reach both viewport edges.
7. **Deleted files still imported** — `Marquee.tsx`, `Banner.tsx` removal must be matched in
   `app/(site)/page.tsx`.
8. **Process rules from Phase 1 still bind:** never start a `next dev` server, never kill a
   `node`/`next` process, prefer `npx tsc --noEmit` over `npm run build` per step.

## 7. Prompt queue (small, audit-sized iterations)

| #   | Step                   | Contents                                                                                         | Status   |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| 0   | Doc realignment        | `AGENTS.md`, `.agents/*`, `CLAUDE.md`, `.claude/*` rewritten to the Figma system                 | **Done** |
| 1   | Tokens + fonts + shell | `tailwind.config.ts`, `styles/globals.css` (`.page-inset`), `app/layout.tsx`, `Button.tsx`       | **Done** |
| 2   | Nav + Hero             | `layout/Nav.tsx`, `sections/Hero.tsx`, new `ui/Wordmark.tsx`                                     | **Done** |
| 3   | Problem + Chaos        | `sections/ProblemSection.tsx`, new `sections/ChaosSection.tsx`, `ui/DecorativeMark.tsx` (`tone`) | **Done** |
| 4   | DarkBand + Solution    | new `sections/DarkBand.tsx`, `sections/SolutionSection.tsx`; `Marquee.tsx` deleted               | **Done** |
| 5   | Order + Services       | new `sections/OrderSection.tsx`, `sections/ServicesSection.tsx`; `Banner.tsx` deleted            | **Done** |
| 6   | Closing + Footer       | `sections/CaseStudiesSection.tsx`, `layout/Footer.tsx` (designed, no Figma counterpart)          | **Done** |
| 7   | Final self-check       | lint + `tsc --noEmit` clean; responsive/a11y browser sweep still pending                         | Blocked  |

### Deviations and findings from the build (2026-08-27)

1. **`animate-drift-${v}` never worked.** `DecorativeMark` built its animation class by template
   interpolation; Tailwind scans source text literally, so `animate-drift-a/b/c` was never emitted.
   The Phase 1 particle section had no drift at all. Fixed with an explicit `DRIFT_CLASS` map.
2. **Framer Motion caused hydration mismatches on every section.** `motion.div` with an `initial`
   state renders the hidden style during SSR but not on the client's first render — React 19 flags
   it. `FadeInSection` was rewritten on IntersectionObserver + a CSS transition, the hero float
   moved to a CSS keyframe, and `app/(site)/layout.tsx` dropped `AnimatePresence` (there is one
   route). **`framer-motion` is now unused in `app/`, `components/` and `lib/`** — still installed
   and still listed in the stack docs; removing the dependency is a separate call for the user.
3. **The logo JPG cannot be rendered directly.** `Logo_final.jpg` is 6000 × 6000, opaque cream,
   with the mark occupying ~16% of the frame — it paints a visible box on the white hero panel.
   Added the derived `public/brand/wordmark.png` (ffmpeg crop + alpha from inverted luminance) and
   `components/ui/Wordmark.tsx`; the regeneration command lives in that component's header.
4. **ESLint was broken before this work started.** `eslint-config-next@15.5.24` is a legacy config
   that loads `@rushstack/eslint-patch`, which does not recognise ESLint 9.39 — `npm run lint`
   failed at config load, so Phase 1's pre-commit hook could not have been running. `eslint.config.mjs`
   now composes the plugins directly (`@next/next`, `react`, `react-hooks`, `jsx-a11y`,
   `@typescript-eslint`) and `npm run lint` points at the ESLint CLI instead of deprecated
   `next lint`.

## 8. Verification (end of phase, coordinated with the user)

1. `npm run lint` and one coordinated `npm run build` — clean.
2. Walk `http://localhost:3000/` (the user's own dev server) at 1920 / 1440 / 768 / 375 and diff
   each section against its Figma frame.
3. Accessibility: one `<h1>`, `<h2>` per section, `alt` on illustrations, `alt="" role="presentation"`
   on particles, visible focus, skip link, `prefers-reduced-motion` kills drift + fades.
4. `grep -r "F6F2EA\|1E1B18\|oklch(78%" --include="*.ts*" .` → nothing outside `web-design/`.

## 9. Notes and open calls for the user

**Verified in the browser (2026-08-27):** all eight sections against their Figma frames; one `<h1>`
and a correct `h2`/`h3` order; descriptive `alt` on every illustration; `nav` / `main` / `footer`
landmarks present; no horizontal overflow at 1536, 768 or 375 (checked by measuring
`documentElement.scrollWidth` against `innerWidth` in same-origin iframes, since the automation
channel cannot resize the real viewport); a site-wide `:focus-visible` ring in `currentColor` so it
stays visible on cream, `#212121` and the orange band alike.

**Contrast (WCAG AA):** accent on ink 8.12 · cream-ink on ink 14.59 · cream-ink 55% on ink 5.34 ·
ink-70 on bg 5.70 · ink-text on accent 10.60 · white on btn 12.47. All text pairs pass. The only
sub-3:1 pair is the `cream-ink/15` footer divider, which is decorative rather than a UI control.

**Open calls for the user:**

1. **`framer-motion` is now unused.** Nothing in `app/`, `components/` or `lib/` imports it. It is
   still installed and still listed in the stack docs — removing the dependency is your call.
2. **Mobile nav.** The Figma has no mobile frame. The four links currently wrap onto two rows at
   375px, which works but is not a designed solution; a drawer/hamburger is the obvious next step.
3. **The `Servicios` divider band** is an empty 100px `#212121` strip, built literally from the
   comp. It reads like an unfinished marquee strip — worth confirming that is intended.
4. **Orphaned files kept on purpose:** `components/layout/PageWrapper.tsx` and
   `components/work/ProjectCard.tsx` are no longer imported anywhere (the home page uses
   `.page-inset` + `max-w-site` directly, and the project grid is gone). Kept for the future `/work`
   route. `public/illustrations/01_construction.png` is likewise unused now that `base.png` is the
   hero illustration.
5. **Nav and footer links are in-page anchors** (`#nuestra-historia`, `#servicios`,
   `#casos-de-estudio`, `#contacto`) because `/` is the only route. Real routes are a later phase.
6. **Generated assets** now live in `public/brand/` — `wordmark.png` and `particles/01…12.png`.
   Both are derived from the read-only sources with `ffmpeg`; the commands are documented in
   `components/ui/Wordmark.tsx` and `lib/particles.ts`. The sources were not modified.

---

## 10. Revisión de `SolutionSection` (2026-08-27, posterior)

La sección `Solucióin` se rehizo midiendo el export 1:1 del nodo (1920 × 1292 px) en vez de leer el
panel de capas de Figma. Los dos no coinciden: el panel da los estilos de texto sin escalar, y el
frame los renderiza más grandes.

**Medido sobre el export (px de diseño @1920):**

| Elemento               | Medida                                                     |
| ---------------------- | ---------------------------------------------------------- |
| h2                     | altura de mayúscula 39 → **50px** Merriweather bold, lh 63 |
| Cuerpo y descripciones | **34px** Space Grotesk, lh 45, relleno **#000000**         |
| Etiquetas              | altura de mayúscula 28 → **36px** Merriweather bold        |
| Columna de etiqueta    | alineada a la derecha en x496 (25.8%)                      |
| Barra vertical         | x549, 3 × 38, negra                                        |
| Descripciones          | empiezan en x700 (36.5%)                                   |
| Ritmo de filas         | 125px entre líneas base                                    |
| Botón                  | 762 × 65, etiqueta ~34px bold                              |
| Ilustración            | tinta de x210 a x791, y98 a y561                           |

**Consecuencias:**

1. Se añadió el breakpoint **`3xl: 1920px`** a `tailwind.config.ts`. Es el único ancho en el que los
   px del comp valen 1:1; `lg` / `xl` / `2xl` son escalones reducidos de esos mismos valores.
2. Las columnas de la sección son **porcentajes**, no px fijos, para que las proporciones del comp
   (25.8% / 36.5%) se mantengan a cualquier ancho.
3. El cuerpo de esta sección es **`text-ink-text` (#000)**, no `--ink-70`. Es lo que muestra el
   export. El resto de la página sigue en `--ink-70`.

**Pendiente de decisión:** si el panel de Figma miente en este nodo, probablemente miente en los
demás — es decir, el resto de la página podría estar subdimensionada en tipografía por un factor
parecido (~1.7× en cuerpo de texto). Confirmar antes de re-escalar las otras siete secciones.

---

## 11. Reconstrucción sobre exports 1:1 (2026-08-27)

El usuario exportó los seis nodos restantes a PNG 1:1. Cada uno mide exactamente lo que dice el
frame (1920 × 1076 / 530 / 1079 / 745 / 1356 / 927), así que todas las cifras siguientes están
**medidas en píxeles del export**, no leídas del panel de Figma. Regla nueva: **el panel miente,
mide el export.**

### Lo que cambió respecto a lo construido antes

| Sección        | Estaba                                            | Es                                                              |
| -------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| `Inicio`       | Panel izquierdo blanco, h1 70px + bajada          | Panel **negro**, **sin titular**: solo wordmark y botón         |
| `Inicio`       | Split 48%                                         | Split **47.76%** (costura en x917)                              |
| `Inicio`       | Nav 15px, inset simétrico                         | Nav **22px**, inset derecho **70px**                            |
| `Problemática` | Columnas por grid, cuerpo 17–20px                 | Anchos de envoltura del comp, cuerpo **34px / interlínea 35**   |
| `banner_01`    | 24 marcas inventadas                              | **23 marcas** con las coordenadas medidas del comp              |
| `Frame 4`      | 12 marcas en rejilla 10/30/50/70/90               | Las **12 posiciones reales** (5 / 2 / 5)                        |
| `Frame 5`      | Tarjetas con padding uniforme                     | Tarjetas **538 × 795**, inset 106, canal 47, título **40px**    |
| `Frame 7`      | h2 centrado a la izquierda, ilustración contenida | h2 **alineado a la derecha** en x670, ilustración **recortada** |

### Cifras clave por nodo

- **`Inicio`** — panel izquierdo `#FFFFFF` · wordmark 205 × 34 en x135/y59 · h1 Merriweather 600
  **65px** / interlínea 91, tres líneas, tinta arriba en y242 · bajada 20px / interlínea 26 en y517
  · botón `Botón 01` exacto, 183 × 53 en x135/y926, relleno `#373333`, etiqueta 24px · ilustración
  de ladrillos, tinta 441 × 430 en x1214/y292.
- **`Problemática`** — tres bloques con el borde superior en y104; anchos de envoltura 278 / 306 /
  506 con canales de 177 / 173; columnas 1–2 en `--accent` alineadas a la derecha, columna 3 en
  `--cream-ink` a la izquierda.
- **`banner_01`** y **`Frame 4`** — cada marca es la caja de tinta medida del nodo, convertida a
  porcentaje del frame; por eso ambas secciones llevan el `aspect-ratio` del frame.
- **`Frame 5`** — ilustración a 12.1% del alto de tarjeta, título a 9.7% bajo ella, `Ver más...`
  anclado abajo a la derecha con 72px de margen inferior.
- **`Frame 7`** — costura en x805; ambos bloques de texto alineados a la derecha en x670.

### Decisiones tomadas (no estaban en el comp)

1. ~~**`<h1>` invisible.**~~ Resuelto 2026-08-27: el hero **sí** tiene titular. El primer export
   llegó con el panel en negro y las capas del h1 ocultas; ambas cosas eran del export, no del
   diseño. **Del export se miden tipografía y geometría; los rellenos y la visibilidad de capas se
   confirman contra el Figma o contigo.**
2. ~~**Wordmark invertido.**~~ Resuelto 2026-08-27: el panel izquierdo del hero es **blanco**, no
   negro. El export lo renderiza negro pero no es el diseño, así que el lockup negro se lee tal
   cual, sin invertir. **Del export se miden tipografía y geometría, no ese relleno.**
3. **Cuerpo en `#000`.** Es lo que muestran los exports; `--ink-70` deja de usarse en el home.

### Pendiente

El nodo divisor `Servicios` (1920 × 100) es el único sin export. Sigue implementado como banda
`#212121` vacía a partir del comp anterior.

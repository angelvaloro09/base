# Rule: Visual Guide (visual_guide_BASE.pdf)

**Always active.** Source: `/visual_guide_BASE.pdf` (reviewed once, do not re-open — this rule is
the working reference). Read-only reference doc, same tier as `web-design/*.dc.html` — never edit
the PDF itself.

> **Superseded twice — read this first (2026-08-27):** product typography is a **two-family
> pairing, Merriweather (serif) for headings + Space Grotesk (sans) for body**, taken from the
> approved Figma file `BASE-WEB`. Merriweather now fills the display role the guide's Embury Text
> once held; both families load through `next/font/google` — no font files are vendored.
>
> History: the Embury Text / Space Grotesk pairing documented below was retired on 2026-08-23 in
> favour of "Space Grotesk only", and that single-family decision was itself retired on 2026-08-27
> by the Figma design. **Everything in the "Typography" subsection below is historical context
> only — do not implement it.** The palette and logotype notes in this file still hold in spirit,
> but the authoritative numbers are in `CLAUDE.md` and `.claude/rules/brand-consistency.md`, which
> also carry the new hexes (`#F7F5F0` / `#212121` / `#F7A74F`) replacing the ones named here.

---

## Status vs. other sources

- This guide is the **newest brand-truth doc** for typography. It supersedes the font pairing
  previously implemented in `web-design/*.dc.html` (which hardcode Bitter + Public Sans via
  Google Fonts import) and previously documented in CLAUDE.md / `brand-consistency.md`.
- `web-design/*.dc.html` remain **read-only UI source of truth for layout, spacing, and
  composition** — implement structure faithfully from them. Their font choice is stale; swap in
  the fonts below when implementing, do not swap layout/structure.
- Color palette and logo lockups in the guide match existing tokens (`--bg`, `--ink`, `--accent`)
  and existing wordmark rules — no change needed there, confirmed only.

## Typography

| Font                                | Role                                                 | Weight seen in guide |
| ----------------------------------- | ---------------------------------------------------- | -------------------- |
| **Embury Text** (serif)             | Headings, wordmark "BASE", display/editorial moments | Medium               |
| **Space Grotesk** (sans, geometric) | Body copy, "studio." wordmark suffix, UI, labels     | Medium               |

- Replaces Bitter (headings) and Public Sans (body) everywhere in code and rules.
- Load both via `next/font/google` (or self-hosted equivalent) — do not link Google Fonts CDN
  `<link>` tags in App Router pages.
- Keep the same usage split as before: display font never on body copy, body font never on
  headings — see `brand-consistency.md`.

## Color palette

Three swatches shown, matching current tokens 1:1 by role — guide prints no numeric hex/oklch
values, so keep the existing token definitions as the authoritative numbers:

- Orange → `--accent`
- Dark charcoal/near-black → `--ink`
- Cream → `--bg`

No new colors introduced. Accent-usage restrictions in `brand-consistency.md` still apply
(never a button/nav background or large fill).

## Logotype

Matches existing wordmark rules exactly:

- `BASEstudio.` — full lockup, `BASE` in display font + `studio.` in body font, trailing period
  mandatory.
- `BASE` — wordmark alone.
- `B.` — icon mark, favicon/small-scale only.
- Each lockup shown on both light (`--bg`) and dark (`--ink`) backgrounds — confirms the inverted
  wordmark rule already in `brand-consistency.md`.

## Visual assets (new — not yet in codebase)

The guide adds a library of hand-drawn/organic decorative marks, ink-colored, line-art or grain-
textured, meant as scattered brand texture (seen behind the logo lockup in the guide's cover
grid):

- Grain/noise blobs (soft airbrush-textured circles, two sizes)
- Freeform blob/kidney outline
- Squiggle / wavy line
- Offset rectangle outline (two overlapping rects, slightly skewed)
- Diamond outline
- Small oval outline
- Scribble tangle (loose loop scrawl)
- Rough polygon (filled mid-gray, hand-drawn edge)
- Asterisk / sparkle mark
- Solid gray dot
- Looped infinity-style scribble

**Usage guidance** (extrapolated from placement in the guide — treat as decorative accents, same
spirit as the existing ghost `B.` mark rule):

- Use as scattered background texture in hero/section corners, never as content-bearing icons.
- Render as inline SVG, stroke/fill in `--ink` (or `--ink` at low opacity for the grain blobs),
  never as raster imports.
- Sparse placement only — a handful per page max, echoing the guide's loose cluster-in-a-corner
  arrangement, not evenly repeated as a pattern/tile.
- Do not recolor with `--accent` — these stay ink/gray, consistent with accent's "small
  emphasis only" rule.
- No component exists for these yet — when first implemented, add as SVG assets under
  `components/ui/` (e.g. `DecorativeMark.tsx`) rather than inline per-page SVG duplication.

## Open follow-up (not in this task's scope)

`web-design/*.dc.html` still hardcode Bitter/Public Sans. They were not edited as part of this
change (per CLAUDE.md, they're read-only). Font swap happens at implementation time in
`app/`/`components/`, using this guide's pairing instead of what's linked in the `.dc.html` files.

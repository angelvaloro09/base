# Command: /brand-audit

Audit any component, page, or piece of copy for BASE Studio brand consistency.
Returns a structured report of issues and fixes.

> **Updated 2026-08-27** to the Figma `BASE-WEB` system. Palette, fonts and copy language all
> changed — see `.claude/rules/brand-consistency.md`.

## Usage

```
/brand-audit [file-or-component]
```

**Examples:**

```
/brand-audit components/sections/Hero.tsx
/brand-audit app/(site)/services/page.tsx
/brand-audit "texto a revisar"
```

---

## Audit Checklist

Run each check against the target file/text and report the result.

### 🎨 Colors

- [ ] Only uses the current tokens: `bg` (#F7F5F0), `surface` (#FFFFFF), `ink` (#212121),
      `ink-text` (#000000), `cream-ink` (#F7F3EF), `accent` (#F7A74F), `btn` (#373333), and the
      `ink-70/55/15/08` opacity steps.
- [ ] **No retired hexes:** `#F6F2EA`, `#1E1B18`, `#EFE9DD`, `oklch(78% 0.15 55)`.
- [ ] No hardcoded hex/rgb outside the Tailwind config.
- [ ] Accent is not used as a button fill. (A full-bleed accent **section background is allowed** —
      do not flag it.)
- [ ] Dark (`#212121`) sections use `cream-ink` for body copy.
- [ ] Illustration PNGs are not recolored — their red/blue/orange is intentional.

### 🔤 Typography

- [ ] Headings use `font-serif` (Merriweather); body/nav/labels/buttons use `font-sans`
      (Space Grotesk). Roles are never swapped.
- [ ] No stale `font-display`, and no claim that a single family is used everywhere.
- [ ] Sizes track the design scale (70 hero · 60 closing · 44 section · 28 card · 20 body · 16 · 14).
- [ ] **No eyebrow labels** — the `13px uppercase tracking-[0.14em]` pattern is retired. Flag any
      that reappear.

### 🔘 Buttons

- [ ] Primary: `bg-btn text-white border-btn`, radius 0, sentence case, Space Grotesk.
- [ ] Outline: `bg-transparent border-ink text-ink`.
- [ ] Inverted (dark sections): `bg-bg text-ink border-bg`.
- [ ] No uppercase / letter-spacing on button labels.
- [ ] No accent-colored buttons.

### 📝 Copy & Tone

- [ ] Copy is in **Spanish**, matching the Figma strings verbatim — flag any English copy.
- [ ] Tone is structured, editorial, systems-oriented.
- [ ] No hyperbolic or promotional language.
- [ ] Core line (if present) is verbatim: "No es sobre estética; es sobre sistemas."
- [ ] `studio.` includes trailing period. `B.` includes trailing period.

### 🏗️ Structure

- [ ] H1 is present and unique on the page; sections use `<h2>`, cards `<h3>`.
- [ ] Section opens directly on its heading (or on body copy) — **no eyebrow**.
- [ ] **No ghost `B.` hero mark** and **no `#EFE9DD` philosophy band** — both retired.
- [ ] Chaos and order particle sections still read as a contrasting pair.
- [ ] Clear space around the wordmark is respected; `invert` applied on dark grounds.

### ⚙️ Code Quality

- [ ] No inline `style={{}}` (documented one-off exceptions only, e.g. CSS-variable plumbing).
- [ ] Uses `cn()` for class composition.
- [ ] No raw `<img>` (uses `next/image`); decorative marks use `alt="" role="presentation"`.
- [ ] No `any` TypeScript type.
- [ ] Client components have `'use client'` only if truly needed.
- [ ] Animations do NOT check `useReducedMotion()` / `prefers-reduced-motion` (retired 2026-08-30).

---

## Output Format

For each failed check, provide:

```
❌ [Check name]
   Issue: [What is wrong]
   Fix: [Exact code change needed]
```

For passed checks, summarize with:

```
✅ Colors: all tokens correct
✅ Typography: correct fonts and scale
...
```

End the audit with a **Priority Fix List** ordered by severity (brand-critical first).

---

## Common Patterns to Flag

```tsx
// ❌ Wrong — retired token
<div className="bg-[#1E1B18]">

// ✅ Correct
<div className="bg-ink">

// ❌ Wrong — accent as button
<button className="bg-accent text-white">

// ✅ Correct — primary button
<button className="border border-btn bg-btn text-white">

// ❌ Wrong — heading in the body family
<h2 className="font-sans text-[44px] font-semibold">

// ✅ Correct — serif carries display
<h2 className="font-serif text-[44px] font-semibold text-ink-text">

// ❌ Wrong — retired eyebrow reappearing
<section>
  <p className="text-[13px] uppercase tracking-[0.14em] text-ink-55">Nuestros servicios</p>
  <h2>Tres formas de construir sobre una base sólida.</h2>

// ✅ Correct — heading only
<section>
  <h2 className="font-serif text-[44px] font-semibold text-ink-text">
    Tres formas de construir sobre una base sólida.
  </h2>
```

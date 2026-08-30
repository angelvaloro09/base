# Rule: Accessibility

**Always active.** Every component must meet WCAG 2.1 AA as a minimum.

---

## Core Requirements

- All images: meaningful `alt` text. Decorative images: `alt=""` + `role="presentation"`.
- All interactive elements: keyboard navigable and focusable.
- Focus styles: visible, never `outline: none` without an accessible replacement.
- Color contrast: text on `--bg` meets 4.5:1 minimum (ink on cream is ~14:1 ✅).
  - Check accent color on white/cream — it's borderline, never use for small text.
- Semantic HTML first. Use `<button>` for buttons, `<a>` for links, `<nav>` for navigation.
- Never use `<div onClick={...}>` for interactive elements.

## Navigation

```tsx
// ✅ Correct nav markup
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a href="/work" aria-current={isActive ? 'page' : undefined}>
        Work
      </a>
    </li>
  </ul>
</nav>
```

## Buttons

```tsx
// ✅ Always a real button or anchor
<button type="button" onClick={handleClick}>
  View project
</button>

// ✅ Link that looks like a button
<a href="/contact" className="btn-primary">
  Start a project →
</a>

// ❌ Never
<div onClick={handleClick} className="btn-primary">Click me</div>
```

## Form Accessibility

```tsx
// ✅ Explicit label association
<div>
  <label htmlFor="name" className="field-label">
    Name
  </label>
  <input
    id="name"
    name="name"
    type="text"
    aria-required="true"
    aria-describedby={error ? 'name-error' : undefined}
    placeholder="Your name"
    className="field-input"
  />
  {error && (
    <p id="name-error" role="alert" className="text-sm text-red-600">
      {error}
    </p>
  )}
</div>
```

## Animations & Motion

> **Changed 2026-08-30.** Previously this rule required gating every animation on
> `prefers-reduced-motion` (`useReducedMotion()`, `motion-reduce:*`, the CSS media query). Retired:
> that OS flag was found to be frequently on involuntarily — Windows Battery Saver / power-efficiency
> mode disables "Animation effects" system-wide on many laptops without the user asking for it —
> which was silently killing the intro loader and every other site animation for affected visitors,
> with no way for them to notice or undo it. Do not reintroduce a `prefers-reduced-motion` /
> `useReducedMotion()` / `motion-reduce:` gate on any animation, transition, or the intro loader.
> Animations always run.

- The marquee pattern is retired site-wide (see `CLAUDE.md`) — not part of the current design
  regardless of motion preference.

## Heading Hierarchy

- One `<h1>` per page — always the main page title.
- Section titles are `<h2>`. Card titles inside sections are `<h3>`.
- Never skip heading levels.

## Skip Link

The root layout must include a skip link:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
>
  Skip to main content
</a>
```

## ARIA

- Use ARIA only when semantic HTML is insufficient.
- `aria-label` on icon-only buttons: `<button aria-label="Close menu"><Icon /></button>`.
- `role="status"` or `aria-live="polite"` for form submission feedback.
- Never use `aria-hidden="true"` on focusable elements.

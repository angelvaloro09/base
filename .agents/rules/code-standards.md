# Rule: Code Standards (All Agents)

**Always active.** TypeScript, component, and quality standards for all agents.

---

## TypeScript

- `strict: true` — no exceptions.
- No `any`. Use proper types or `unknown` with narrowing.
- No `as` type casts without a comment explaining why.
- Sanity query return types must be explicit. Use types from `sanity/lib/queries.ts`.
- Absolute imports only: `@/components/...`, `@/lib/...`, `@/sanity/...`.

## React / Next.js

- Server Components by default. Add `'use client'` only for:
  - Event handlers (`onClick`, `onChange`, etc.)
  - React hooks (`useState`, `useEffect`, etc.)
  - Framer Motion components
  - Browser-only APIs
- Never use raw `<img>` — always `next/image`.
- Never fetch data in client components for page content.
- All dynamic routes must handle missing data with `notFound()`.
- Every route must have `export const metadata` (or `generateMetadata`).

## Styles

- No inline `style={{}}`.
- Use `cn()` (clsx + tailwind-merge) for conditional class composition.
- Only use design token classes (see brand-consistency.md).
- No arbitrary Tailwind values unless extending the config is impractical.

## Animation (Framer Motion)

- All Framer Motion in `'use client'` components.
- Do not gate animations on `useReducedMotion()` / `prefers-reduced-motion` (retired
  2026-08-30 — killed the intro loader and every animation for visitors whose OS had the flag on
  involuntarily, e.g. Windows Battery Saver). Animations always run.
- Marquee is retired site-wide — do not reintroduce it, with or without a motion query.

## Forms

- Validate all form input server-side with Zod before processing.
- API routes must return typed `NextResponse.json()`.
- Never expose API keys to the client. All secrets are server-side only.

## Pre-commit

- Husky + lint-staged runs ESLint and Prettier on staged files.
- All committed code must pass `npm run lint` and `npm run build`.
- Fix lint errors in the same response as the generated code — don't leave broken code.

## Accessibility (minimum)

- All `<img>` / `<Image>` must have descriptive `alt` text (empty string only for decorative).
- All interactive elements must be keyboard accessible.
- Use semantic HTML: `<button>` for actions, `<a>` for navigation.
- Never `<div onClick={...}>`.
- Forms: explicit `<label htmlFor>` associations.

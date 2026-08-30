# Command: /new-component

Scaffold a new UI component following BASE Studio conventions.

## Usage

```
/new-component [ComponentName] [category] [description]
```

**Categories:** `ui` | `layout` | `sections` | `work` | `blog`

**Examples:**

```
/new-component ServiceCard work "Card displaying a service offering"
/new-component PricingTier ui "Pricing tier card with feature list"
/new-component TestimonialSlider sections "Client testimonial carousel"
```

---

## Steps

1. **Determine** if the component needs `'use client'` (events, animation, state) or can be a Server Component.
2. **Create** the file at `components/[category]/[ComponentName].tsx`.
3. **Define** the props type with all required and optional properties.
4. **Implement** the component using Tailwind classes from the design system.
5. **Export** a named type and default the component.
6. **Add** Framer Motion animation if the component is visible on scroll (wrap in `<FadeInSection>` or animate internally).

---

## Server Component Template

```tsx
// components/[category]/[ComponentName].tsx
import { cn } from '@/lib/utils'

type Props = {
  // define all props
  className?: string
}

export default function [ComponentName]({ className, ...props }: Props) {
  return (
    <div className={cn('base-classes', className)}>
      {/* implementation */}
    </div>
  )
}
```

## Client Component Template

```tsx
// components/[category]/[ComponentName].tsx
'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  // define all props
  className?: string
}

export default function [ComponentName]({ className, ...props }: Props) {
  return (
    <motion.div
      className={cn('base-classes', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* implementation */}
    </motion.div>
  )
}
```

---

## Category Guidelines

### `ui/` — Primitives

Small, reusable, no layout concerns. No data fetching.
Examples: `Button`, `Input`, `Tag`, `Divider`, `Badge`

```tsx
// Example: Button component
type ButtonVariant = 'primary' | 'outline' | 'inverted'

type Props = {
  variant?: ButtonVariant
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-bg border border-ink hover:bg-ink/90',
  outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-bg',
  inverted: 'bg-bg text-ink border border-bg hover:bg-bg/90',
}

export default function Button({ variant = 'primary', children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        'px-8 py-4 font-sans text-[13px] uppercase tracking-[0.06em] transition-colors',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### `sections/` — Page Sections

Full-width sections that compose pages. May accept data props from parent Server Component.
Must include `FadeInSection` for scroll animation.

### `work/` — Portfolio Components

Specific to case studies and project grid. Receive `Project` type from Sanity.

### `blog/` — Editorial Components

Specific to blog index and post pages. Receive `Post` type from Sanity.

---

## Design Token Classes Reference

```
bg-bg        bg-ink        bg-accent      bg-bg-alt
text-ink      text-ink/70   text-ink/55    text-bg
border-ink    border-ink/15 border-ink/8
font-display  font-sans
```

## Checklist

- [ ] File at correct path `components/[category]/[ComponentName].tsx`
- [ ] Props type defined inline with JSDoc if complex
- [ ] `className?: string` accepted and merged with `cn()`
- [ ] No inline `style={{}}`
- [ ] No raw `<img>` (use `next/image`)
- [ ] `'use client'` only if strictly needed
- [ ] Animation does NOT gate on `useReducedMotion()` / `prefers-reduced-motion` (retired 2026-08-30)
- [ ] Color values use design tokens only
- [ ] Copy/labels are English and editorial in tone

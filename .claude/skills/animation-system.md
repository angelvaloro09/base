# Skill: Animation System (BASE Studio)

Framer Motion patterns for BASE Studio. All animations must respect the brand's editorial register:
purposeful, subtle, never decorative noise.

---

## Core Principles

1. **Purposeful only:** animations guide attention, not distract.
2. **Subtle defaults:** short durations (0.4–0.6s), ease-out or ease-in-out.
3. **Reduced motion:** always check `useReducedMotion()` and disable if true.
4. **Client boundary:** all Framer Motion components need `'use client'`.

---

## Standard Entrance Animation

```ts
// Reuse this across the project
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}
```

---

## `<FadeInSection>` — Reusable Scroll-Triggered Wrapper

```tsx
// components/sections/FadeInSection.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function FadeInSection({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## Staggered Children (e.g. Services Grid)

```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp } from '@/lib/motion'

export default function ServicesGrid({ services }: { services: Service[] }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="services-row"
      variants={reduced ? {} : stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {services.map((s) => (
        <motion.div key={s.id} variants={reduced ? {} : fadeUp}>
          {/* service content */}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## Marquee (CSS — No JS) — RETIRED from the home page

> **2026-08-27:** the marquee ribbon is not part of the Figma `BASE-WEB` design and
> `components/sections/Marquee.tsx` plus the `animate-marquee` keyframe have been removed.
> Kept below only as a reusable pattern for a future route — do not reintroduce it on the home
> page, and re-add the keyframe to `tailwind.config.ts` if a page ever needs it again.

```tsx
// components/sections/Marquee.tsx
// Pure CSS animation — no Framer Motion needed
export default function Marquee() {
  const items = [
    'Strategy',
    'Brand Identity',
    'Digital Design',
    'Web Development',
    'Visual Systems',
  ]
  const doubled = [...items, ...items] // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden bg-ink py-5">
      <div className="animate-marquee flex w-max gap-[26px] whitespace-nowrap text-sm font-medium uppercase tracking-[0.1em] text-bg">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            {i < doubled.length - 1 && <span className="ml-[26px] text-accent">·</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
```

```ts
// tailwind.config.ts — add keyframe
extend: {
  animation: {
    marquee: 'scroll 26s linear infinite',
  },
  keyframes: {
    scroll: {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(-50%)' },
    },
  },
}
```

---

## Page Transitions

```tsx
// app/layout.tsx or app/(site)/layout.tsx
'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## ProjectCard Hover Reveal

```tsx
'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export default function ProjectCard({ project }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      className="group cursor-pointer"
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative overflow-hidden">
        {/* thumbnail */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm uppercase tracking-[0.1em] text-bg">View project →</span>
        </motion.div>
      </div>
      {/* meta */}
    </motion.article>
  )
}
```

---

## Custom Cursor (Optional)

```tsx
// components/ui/CustomCursor.tsx
'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 30 })
  const springY = useSpring(y, { stiffness: 400, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-accent mix-blend-multiply"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    />
  )
}
```

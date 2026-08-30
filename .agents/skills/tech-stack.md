# Skill: Tech Stack Reference (BASE Studio)

Stack context for AI agents working on the BASE Studio website.
For full detail see `.claude/skills/nextjs-patterns.md` and `.claude/skills/sanity-cms.md`.

---

## Stack

| Layer     | Technology                | Notes                            |
| --------- | ------------------------- | -------------------------------- |
| Framework | Next.js 15 (App Router)   | Server Components by default     |
| Language  | TypeScript (strict)       | No `any`, no `as` casts          |
| Styles    | Tailwind CSS              | Design tokens extended in config |
| CMS       | Sanity v3                 | Embedded studio at `/studio`     |
| Animation | Framer Motion             | Client components only           |
| Email     | Resend + React Email      | API route at `/api/contact`      |
| Deploy    | Vercel                    | ISR + draft mode for previews    |
| Lint      | ESLint + Prettier + Husky | Pre-commit hooks enforced        |

---

## Key Conventions

### Server vs Client

```tsx
// Server (default) — no directive
export default async function Page() { const data = await fetch() ... }

// Client — only for events, hooks, Framer Motion
'use client'
export default function Interactive() { ... }
```

### Class Merging

```ts
import { cn } from '@/lib/utils'  // clsx + tailwind-merge
<div className={cn('base', condition && 'extra', className)} />
```

### Data Layer

```ts
// All content from Sanity — typed GROQ in sanity/lib/queries.ts
const projects = await getAllProjects() // returns Project[]
```

### Images

```tsx
import Image from 'next/image' // always next/image, never <img>
import { urlFor } from '@/sanity/lib/image' // for Sanity images
```

### Animation

Do not gate animations on `useReducedMotion()` / `prefers-reduced-motion` (retired 2026-08-30 —
see `CLAUDE.md`). Animations always run.

### Forms

```ts
// Zod validation → app/api/contact/route.ts → Resend
const schema = z.object({ name: z.string(), email: z.string().email(), message: z.string() })
```

---

## Folder Map

```
app/(site)/         Public pages
app/studio/         Embedded Sanity Studio
app/api/contact/    Contact form API (POST)
components/ui/      Primitives (Button, Input…)
components/layout/  Nav, Footer, PageWrapper
components/sections/ Page sections
components/work/    Portfolio components
components/blog/    Blog components
sanity/schemas/     project, post, service, teamMember
sanity/lib/         GROQ queries + typed fetch + image builder
lib/                cn(), formatDate()
styles/             globals.css
public/             Static assets, OG images, favicon
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=      # production
SANITY_API_TOKEN=                # server-only read token
SANITY_PREVIEW_SECRET=           # draft mode secret
RESEND_API_KEY=                  # email sending
```

---

## Scripts

```bash
npm run dev          # localhost:3000
npm run build        # production
npm run lint         # ESLint
npm run format       # Prettier
npm run sanity:dev   # Sanity Studio standalone (port 3333)
```

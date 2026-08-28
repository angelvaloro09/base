# Skill: Next.js App Router Patterns (BASE Studio)

Project-specific patterns for Next.js 15 with App Router, TypeScript, and Tailwind CSS.

---

## Project Architecture

```
app/
  layout.tsx              # Root layout (fonts, global meta, AnimatePresence)
  (site)/
    layout.tsx            # Site layout (Nav + Footer wrapper)
    page.tsx              # / Home
    work/
      page.tsx            # /work — portfolio grid (RSC, fetches from Sanity)
      [slug]/page.tsx     # /work/[slug] — case study (RSC + generateStaticParams)
    studio/page.tsx       # /studio — about + manifesto
    services/page.tsx     # /services
    blog/
      page.tsx            # /blog
      [slug]/page.tsx     # /blog/[slug]
    contact/page.tsx      # /contact
    pricing/page.tsx      # /pricing
  studio/[[...tool]]/
    page.tsx              # Embedded Sanity Studio (client component)
  api/
    contact/route.ts      # POST — Zod validation + Resend
```

## Server vs Client Components

```tsx
// ✅ Server Component (default) — fetches data at build/request time
// app/(site)/work/page.tsx
import { getAllProjects } from '@/sanity/lib/queries'

export default async function WorkPage() {
  const projects = await getAllProjects()
  return <WorkGrid projects={projects} />
}

// ✅ Client Component — only when needed
// components/sections/ChaosSection.tsx
;('use client')
export default function ChaosSection() {
  /* drifting particle marks — useReducedMotion() gated */
}
```

## Metadata Pattern

```tsx
// app/(site)/work/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work — BASE Studio',
  description: 'Brand systems built to last. Selected projects from BASE Studio.',
  openGraph: {
    title: 'Work — BASE Studio',
    description: 'Brand systems built to last.',
    images: ['/og/work.jpg'],
  },
}
```

## Dynamic Routes + Static Params

```tsx
// app/(site)/work/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  return {
    title: `${project.title} — BASE Studio`,
    description: project.summary,
  }
}
```

## Image Handling

```tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

// From Sanity
<Image
  src={urlFor(project.coverImage).width(1200).url()}
  alt={project.coverImage.alt ?? project.title}
  width={1200}
  height={800}
  className="w-full h-auto object-cover"
  priority // only for above-the-fold hero images
/>

// Static asset
<Image
  src="/logo/base-studio.svg"
  alt="BASE Studio"
  width={120}
  height={24}
/>
```

## `cn()` Utility

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// Usage
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'dark' && 'dark-classes',
)}>
```

## Tailwind Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F5F0',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#212121',
          text: '#000000',
          70: 'rgba(33,33,33,0.7)',
          55: 'rgba(33,33,33,0.55)',
          15: 'rgba(33,33,33,0.15)',
          8: 'rgba(33,33,33,0.08)',
        },
        'cream-ink': '#F7F3EF',
        accent: '#F7A74F',
        btn: '#373333',
      },
      fontFamily: {
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
        sans: ['var(--font-space-grotesk)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '1920px',
      },
    },
  },
}
export default config
```

## API Route Pattern (Contact Form)

```ts
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import ContactEmail from '@/components/emails/ContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, message } = parsed.data

  await resend.emails.send({
    from: 'BASE Studio <noreply@basestudio.com>',
    to: 'hola@basestudio.com',
    replyTo: email,
    subject: `New inquiry from ${name}`,
    react: ContactEmail({ name, email, message }),
  })

  return NextResponse.json({ success: true })
}
```

## Component File Structure

```
components/
  ui/
    Button.tsx            # variant: 'primary' | 'outline' | 'inverted'
    Input.tsx             # text, email, textarea
    Tag.tsx               # category badge
  layout/
    Nav.tsx               # client (active link state)
    Footer.tsx            # server
    PageWrapper.tsx       # max-w-site mx-auto
  sections/
    Hero.tsx              # homepage hero — two-panel split, red-brick illustration
    ProblemSection.tsx    # dark #212121 band, 3 text columns
    ChaosSection.tsx      # client — particles scattered
    DarkBand.tsx          # empty full-bleed #212121 divider
    SolutionSection.tsx   # grid image + serif H2 + principle rows + CTA
    OrderSection.tsx      # client — particles in an even grid
    ServicesSection.tsx   # full-bleed accent band, 3 illustrated cards
    CaseStudiesSection.tsx # split closing section
    FadeInSection.tsx     # client motion wrapper
  work/
    ProjectCard.tsx       # tone variant: ink | accent | cream
    WorkGrid.tsx          # 2-col or 3-col grid
    CaseStudyHero.tsx     # project page hero
  emails/
    ContactEmail.tsx      # React Email template
```

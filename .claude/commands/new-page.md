# Command: /new-page

Scaffold a complete new page for the BASE Studio website following all project conventions.

## Usage

```
/new-page [route] [title] [description]
```

**Examples:**

- `/new-page services "Services" "What we offer"`
- `/new-page blog "Blog" "Editorial and insights"`

---

## Steps

1. **Read** `CLAUDE.md` and `web-design/*.dc.html` to confirm design patterns.
2. **Create** the page file at `app/(site)/[route]/page.tsx`.
3. **Create** `app/(site)/[route]/loading.tsx` with a skeleton.
4. **Create** `app/(site)/[route]/error.tsx` with an error boundary.
5. **Generate** all components the page needs in `components/sections/` or `components/[route]/`.
6. **Add** metadata export.
7. **Wire** data fetching from Sanity if the page requires dynamic content.

## Template

```tsx
// app/(site)/[route]/page.tsx
import type { Metadata } from 'next'
import Nav from '@/components/layout/Nav'
import FadeInSection from '@/components/sections/FadeInSection'

export const metadata: Metadata = {
  title: '[Page Title] — BASE Studio',
  description: '[Page description]',
  openGraph: {
    title: '[Page Title] — BASE Studio',
    description: '[Page description]',
    images: ['/og/[route].jpg'],
  },
}

export default async function [Route]Page() {
  return (
    <>
      {/* Hero / Header */}
      <section className="px-16 pt-[150px] pb-[90px]">
        <FadeInSection>
          <p className="text-[13px] uppercase tracking-[0.14em] text-ink-55 mb-[26px]">
            [Eyebrow label]
          </p>
          <h1 className="font-display font-extrabold text-[64px] leading-[1.08] tracking-[-0.01em] max-w-[900px]">
            [Page headline.]
          </h1>
          <p className="text-[18px] leading-[1.6] text-ink-70 max-w-[560px] mt-7">
            [Supporting copy.]
          </p>
        </FadeInSection>
      </section>

      {/* Main content sections */}
      <FadeInSection delay={0.1}>
        <section className="px-16 py-[120px]">
          {/* content */}
        </section>
      </FadeInSection>
    </>
  )
}
```

## Checklist

- [ ] `metadata` export with `title`, `description`, `openGraph`
- [ ] Page uses `(site)` layout (Nav + Footer inherited)
- [ ] `<h1>` present and unique on the page
- [ ] Eyebrow label above the H1
- [ ] All sections wrapped in `<FadeInSection>`
- [ ] `loading.tsx` and `error.tsx` created
- [ ] Copy is English, editorial tone
- [ ] No inline `style={{}}` — Tailwind classes only
- [ ] If data needed: typed GROQ query added to `sanity/lib/queries.ts`

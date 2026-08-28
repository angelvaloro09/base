# Command: /new-project

Add a new portfolio project to the BASE Studio website: Sanity schema entry + case study page.

## Usage

```
/new-project [client-name] [category] [tone] [slug]
```

**Categories:** `Brand Identity` | `Web Design` | `Strategy + System` | `Web Development` | `Digital Design`
**Tones:** `ink` | `accent` | `cream`

**Example:**

```
/new-project "Meridian Brewing" "Brand Identity" ink meridian-brewing
```

---

## Steps

1. **Confirm** the Sanity `project` schema exists in `sanity/schemas/project.ts`.
2. **Add** a typed GROQ query for the new project slug in `sanity/lib/queries.ts` (if missing).
3. **Scaffold** the case study page at `app/(site)/work/[slug]/page.tsx`.
4. **Add** `generateStaticParams` to pre-render the route.
5. **Add** `generateMetadata` using the project's Sanity data.
6. **Create** the case study layout with: hero, overview, gallery, next project link.
7. **Update** `getFeaturedProjects` if needed to include this project.

## Case Study Page Template

```tsx
// app/(site)/work/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProjectBySlug, getAllProjectSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeInSection from '@/components/sections/FadeInSection'
import CtaBand from '@/components/sections/CtaBand'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — BASE Studio`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — BASE Studio`,
      description: project.summary,
      images: [urlFor(project.coverImage).width(1200).url()],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <>
      {/* Hero */}
      <section className="px-16 pb-[90px] pt-[150px]">
        <FadeInSection>
          <p className="mb-[26px] text-[13px] uppercase tracking-[0.14em] text-ink-55">
            {project.category}
          </p>
          <h1 className="font-display max-w-[900px] text-[64px] font-extrabold leading-[1.08] tracking-[-0.01em]">
            {project.title}
          </h1>
          <p className="mt-7 max-w-[560px] text-[18px] leading-[1.6] text-ink-70">
            {project.summary}
          </p>
        </FadeInSection>
      </section>

      {/* Cover image */}
      <FadeInSection delay={0.1}>
        <div className="px-16 pb-[120px]">
          <Image
            src={urlFor(project.coverImage).width(1312).url()}
            alt={project.coverImage.alt ?? project.title}
            width={1312}
            height={820}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </FadeInSection>

      {/* Overview */}
      <section className="grid grid-cols-[1fr_1.5fr] gap-[80px] px-16 py-[120px]">
        <div>
          <p className="mb-[26px] text-[13px] uppercase tracking-[0.14em] text-ink-55">Overview</p>
          <div className="space-y-4">
            {project.services?.map((s) => (
              <div key={s} className="flex justify-between border-t border-ink-15 pt-4">
                <span className="text-[13px] uppercase tracking-[0.08em] text-ink-55">Service</span>
                <span className="font-display text-[17px] font-semibold">{s}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-ink-15 pt-4">
              <span className="text-[13px] uppercase tracking-[0.08em] text-ink-55">Year</span>
              <span className="font-display text-[17px] font-semibold">{project.year}</span>
            </div>
          </div>
        </div>
        <div>{/* Portable text body goes here */}</div>
      </section>

      {/* CTA */}
      <CtaBand />
    </>
  )
}
```

## Checklist

- [ ] Sanity schema accommodates all needed fields
- [ ] GROQ query typed and exported from `sanity/lib/queries.ts`
- [ ] `generateStaticParams` added
- [ ] `generateMetadata` returns full OG data
- [ ] `notFound()` called when project is missing
- [ ] Cover image uses `urlFor()` builder
- [ ] Case study hero has eyebrow (category), H1 (title), sub (summary)
- [ ] Page ends with `<CtaBand />`
- [ ] `loading.tsx` and `error.tsx` present in `app/(site)/work/[slug]/`

# Skill: Sanity CMS Integration (BASE Studio)

Patterns for Sanity v3 with Next.js App Router, typed GROQ queries, and live preview.

---

## Setup

```ts
// sanity/config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
})
```

```ts
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

---

## Schemas

### project

```ts
// sanity/schemas/project.ts
import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'client', type: 'string' }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          'Brand Identity',
          'Web Design',
          'Strategy + System',
          'Web Development',
          'Digital Design',
        ],
      },
    }),
    defineField({
      name: 'tone',
      type: 'string',
      options: { list: ['ink', 'accent', 'cream'] },
      initialValue: 'ink',
    }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({ name: 'year', type: 'number' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'services', type: 'array', of: [{ type: 'string' }] }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
```

### post

```ts
// sanity/schemas/post.ts
export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ],
})
```

### teamMember

```ts
export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
```

---

## Typed GROQ Queries

```ts
// sanity/lib/queries.ts
import { client } from './client'
import { groq } from 'next-sanity'

// --- Types ---
export type Project = {
  _id: string
  title: string
  slug: { current: string }
  client: string
  category: string
  tone: 'ink' | 'accent' | 'cream'
  summary: string
  coverImage: { asset: { url: string }; alt: string }
  year: number
  featured: boolean
  order: number
}

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  coverImage: { asset: { url: string }; alt: string }
}

// --- Queries ---
const projectFields = groq`
  _id, title, "slug": slug.current, client, category, tone,
  summary, year, featured, order,
  coverImage { alt, asset->{ url } }
`

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project"] | order(order asc) { ${projectFields} }`)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(order asc)[0...4] { ${projectFields} }`,
  )
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
    { slug },
  )
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results = await client.fetch<Array<{ slug: string }>>(
    groq`*[_type == "project"]{ "slug": slug.current }`,
  )
  return results.map((r) => r.slug)
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt,
    coverImage { alt, asset->{ url } }
  }`)
}
```

---

## Image URL Builder

```ts
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

```tsx
// Usage in component
<Image
  src={urlFor(project.coverImage).width(800).height(600).auto('format').url()}
  alt={project.coverImage.alt}
  width={800}
  height={600}
/>
```

---

## Draft Mode / Live Preview

```ts
// app/api/draft-mode/enable/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }
  draftMode().enable()
  redirect(searchParams.get('redirect') ?? '/')
}
```

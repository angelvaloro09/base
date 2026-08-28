# Rule: Component Architecture

**Always active.** Standards for React component structure, props, and patterns.

---

## File & Naming

- Component files: `PascalCase.tsx` (e.g., `ProjectCard.tsx`).
- One component per file. Default export = the component.
- Co-locate component-specific types in the same file.
- Utility functions in `lib/`. Shared types in `types/`.

## Server vs Client

```tsx
// ✅ Default — no directive needed
export default function StaticSection() { ... }

// ✅ Only when using hooks, events, or Framer Motion
'use client'
export default function InteractiveSection() { ... }
```

- Never add `'use client'` to a file unless it directly uses browser APIs, event handlers, or
  Framer Motion. Push `'use client'` as deep as possible in the tree.

## Props Pattern

```tsx
// ✅ Always define props type in the same file
type Props = {
  title: string
  category: string
  tone?: 'ink' | 'accent' | 'cream'
  className?: string
}

export default function ProjectCard({ title, category, tone = 'ink', className }: Props) {
  return <article className={cn('card-base', className)}>...</article>
}
```

- Always accept `className?: string` on layout/container components to allow composition.
- Use `cn()` for class merging, never string concatenation.
- No inline `style={{}}` — use Tailwind or CSS variables.

## No `any`

```tsx
// ❌
const data: any = await fetch(...)

// ✅
const data: Project = await getProjectBySlug(slug)
```

## Children Pattern

```tsx
// ✅ Use React.ReactNode for children
type Props = {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

export default function PageWrapper({ children, as: Tag = 'main' }: Props) {
  return <Tag className="mx-auto max-w-site">{children}</Tag>
}
```

## Data Fetching

```tsx
// ✅ Fetch in Server Component, pass data as props to client components
// app/(site)/work/page.tsx
export default async function WorkPage() {
  const projects = await getAllProjects()      // typed, from sanity/lib
  return <WorkGrid projects={projects} />      // client if interactive
}

// ❌ Never fetch inside a client component for page-level content
'use client'
export default function WorkPage() {
  const [projects, setProjects] = useState([])
  useEffect(() => fetch('/api/projects').then(...), []) // ❌
}
```

## Image Component

```tsx
// ✅ Always next/image
import Image from 'next/image'

<Image
  src={url}
  alt={description}   // never empty string for meaningful images
  width={800}
  height={600}
  className="w-full h-auto object-cover"
/>

// ❌ Never
<img src={url} alt={description} />
```

## Error States

- All async Server Components should have a co-located `error.tsx`.
- All dynamic routes should handle missing data with `notFound()`.

```tsx
import { notFound } from 'next/navigation'

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()
  ...
}
```

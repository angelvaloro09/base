# Command: /new-post

Scaffold a new blog post page and its Sanity schema entry for the BASE Studio editorial.

## Usage

```
/new-post [slug] [title]
```

**Example:**

```
/new-post why-brand-systems-outlast-trends "Why Brand Systems Outlast Trends"
```

---

## Steps

1. **Confirm** the Sanity `post` schema in `sanity/schemas/post.ts`.
2. **Add or confirm** typed GROQ queries in `sanity/lib/queries.ts` (`getAllPosts`, `getPostBySlug`).
3. **Scaffold** the blog index at `app/(site)/blog/page.tsx` if missing.
4. **Scaffold** the post route at `app/(site)/blog/[slug]/page.tsx`.
5. **Add** `generateStaticParams` and `generateMetadata`.
6. **Create** the blog post layout with: eyebrow, H1, date, cover image, portable text body.

## Blog Index Template

```tsx
// app/(site)/blog/page.tsx
import type { Metadata } from 'next'
import { getAllPosts } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/PostCard'
import FadeInSection from '@/components/sections/FadeInSection'

export const metadata: Metadata = {
  title: 'Blog — BASE Studio',
  description: 'Editorial on brand systems, identity, and design thinking.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return (
    <>
      <section className="px-16 pb-[90px] pt-[150px]">
        <FadeInSection>
          <p className="mb-[26px] text-[13px] uppercase tracking-[0.14em] text-ink-55">Editorial</p>
          <h1 className="font-display max-w-[900px] text-[64px] font-extrabold leading-[1.08] tracking-[-0.01em]">
            On systems, identity, and growth.
          </h1>
        </FadeInSection>
      </section>
      <section className="px-16 py-[120px]">
        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-3 gap-[48px_32px]">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </FadeInSection>
      </section>
    </>
  )
}
```

## Post Page Template

```tsx
// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'
import FadeInSection from '@/components/sections/FadeInSection'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — BASE Studio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [urlFor(post.coverImage).width(1200).url()],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <article className="mx-auto max-w-[800px] px-16 pb-[160px] pt-[150px]">
        <FadeInSection>
          <p className="mb-[26px] text-[13px] uppercase tracking-[0.14em] text-ink-55">
            {formatDate(post.publishedAt)}
          </p>
          <h1 className="font-display mb-8 text-[52px] font-extrabold leading-[1.15] tracking-[-0.01em]">
            {post.title}
          </h1>
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(800).url()}
              alt={post.coverImage.alt ?? post.title}
              width={800}
              height={500}
              className="mb-12 h-auto w-full object-cover"
              priority
            />
          )}
          {/* Portable text renderer */}
          <div className="prose-base prose-ink max-w-none">
            {/* <PortableText value={post.body} /> */}
          </div>
        </FadeInSection>
      </article>
    </>
  )
}
```

## PostCard Component Template

```tsx
// components/blog/PostCard.tsx
import type { Post } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { formatDate } from '@/lib/utils'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      {post.coverImage && (
        <div className="mb-5 aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(600).url()}
            alt={post.coverImage.alt ?? post.title}
            width={600}
            height={450}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <p className="mb-2 text-[12px] uppercase tracking-[0.08em] text-ink-55">
        {formatDate(post.publishedAt)}
      </p>
      <h3 className="font-display text-[22px] font-bold leading-[1.3]">{post.title}</h3>
      {post.excerpt && (
        <p className="mt-2 line-clamp-2 text-[15px] leading-[1.6] text-ink-70">{post.excerpt}</p>
      )}
    </Link>
  )
}
```

## Checklist

- [ ] `post` Sanity schema confirmed
- [ ] `getAllPosts`, `getPostBySlug`, `getAllPostSlugs` typed and exported
- [ ] Blog index page exists and renders PostCard grid
- [ ] Post page has `generateStaticParams` and `generateMetadata`
- [ ] `notFound()` called when post missing
- [ ] Eyebrow shows formatted date, H1 is post title
- [ ] `loading.tsx` and `error.tsx` in `app/(site)/blog/[slug]/`
- [ ] `formatDate` utility exists in `lib/utils.ts`

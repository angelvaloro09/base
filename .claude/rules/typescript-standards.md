# Rule: TypeScript & Code Quality

**Always active.** TypeScript standards, ESLint, Prettier, and pre-commit configuration.

---

## TypeScript

- `tsconfig.json` must have `"strict": true`.
- **No `any`.** Use `unknown` and narrow with type guards, or define proper types.
- **No `as` casting** unless absolutely unavoidable and documented with a comment.
- Sanity GROQ query return types must always be explicitly typed (see `sanity/lib/queries.ts`).
- Use `type` for object shapes, `interface` when extension/implementation is needed.
- Prefer `const` over `let`. No `var`.

```ts
// ❌
const data: any = await client.fetch(query)
const slug = (params as any).slug

// ✅
const data: Project[] = await client.fetch<Project[]>(query)
const slug = params.slug // typed via Next.js PageProps
```

## Imports

- Always use absolute imports via the `@/` alias:
  ```ts
  import { cn } from '@/lib/utils'
  import ProjectCard from '@/components/work/ProjectCard'
  ```
- Order: external packages → internal `@/` imports → relative imports → types.
- No unused imports. ESLint enforces this.

## Prettier Config

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

All generated code must conform to this format. Run `npm run format` if unsure.

## ESLint Rules

Key enforced rules (from `.eslintrc.json`):

- `@typescript-eslint/no-explicit-any` — error
- `@typescript-eslint/no-unused-vars` — error
- `react/no-unescaped-entities` — error
- `@next/next/no-img-element` — error (use `next/image`)
- `jsx-a11y/alt-text` — error
- `jsx-a11y/aria-props` — error

## Pre-commit (Husky + lint-staged)

These run automatically on `git commit`. Your code must pass before committing:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

If Claude generates code that would fail lint, fix the issues in the same response.

## Environment Variables

- All env vars must be declared in `.env.local` (not committed) and documented in `.env.example`.
- Server-only vars: no `NEXT_PUBLIC_` prefix.
- Client-safe vars: must have `NEXT_PUBLIC_` prefix.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=
RESEND_API_KEY=
```

## Git Conventions

- Branch naming: `feature/description`, `fix/description`, `chore/description`.
- Commit messages: `feat:`, `fix:`, `chore:`, `style:`, `docs:` prefixes (conventional commits).
- No direct commits to `main`. Always use a branch + PR.

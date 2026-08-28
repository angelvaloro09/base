# PLAN.md — Phase 1: Home Page

**Owner (architect/director/auditor/corrector):** Claude
**Implementer:** Gemini
**Scope:** Build the BASE Studio home page (`/`) only — layout shell (Nav/Footer/PageWrapper),
Next.js 15 project scaffold, Tailwind tokens, fonts, and every home page section. No Sanity wiring
yet (content hardcoded, matching the design source). No other routes (`/work`, `/studio`,
`/contact`, etc.) beyond stub `<a href>` targets in Nav/Footer — those pages come in later phases.

Status: **Prompt 1 issued, awaiting Gemini's report.**

---

## 1. Source-of-truth resolution

Two conflicting versions of the home page design were found:

|           | `web-design/Main.dc.html` (standalone)                        | Embedded `Main.dc.html` inside `web-design/base-studio-website.html`                          |
| --------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Saved     | 08:20                                                         | 08:34 (newer)                                                                                 |
| Fonts     | Bitter / Public Sans (stale)                                  | Embury Text / Space Grotesk                                                                   |
| Structure | Hero → Marquee → Work Grid → Philosophy → Services → CTA band | Hero → Problem → **Noise (particles)** → Solution → Banner → Services/Packages → Case studies |

**Decision (confirmed with user 2026-08-23):**

- Base structure = the **newer, embedded version** (Hero → Problem → Noise/Particles → Solution →
  Banner → Services → Case studies → Footer). It's the latest save and the only one containing the
  "Esto es lo que se siente por dentro" particles section.
- **Port the marquee ribbon** from the old standalone file in under the hero (user confirmed from
  the reference screenshot) — categories ticker, translated to English, reusing the exact
  `Marquee.tsx` pattern already documented in `.claude/skills/animation-system.md`.
- Typography for the whole build: **Space Grotesk only** (see §2). Both source files' font-family
  declarations are stale — do not implement them literally, only structure/spacing/copy intent.

## 2. Typography

Single font, Space Grotesk (weights 300–700), for headings and body alike. Differentiate by
weight/size only. This retired Embury Text and Bitter/Public Sans — see `CLAUDE.md` and
`.claude/rules/visual-guide.md` (marked superseded) for the full record. All rule/skill docs
(`.claude/`, `.agents/`) have been corrected to reflect this ahead of Prompt 1.

## 3. Asset integration map

| Directive       | Asset(s)                                              | Target                                                                                    | Treatment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Logos        | `assets/logo/{B,BASE,Logo_final,Logo_final_resp}.jpg` | Nav (full lockup), Footer (full lockup), favicon (`B.`)                                   | Flat JPG, black-on-cream, no alpha. Light backgrounds: use as-is via `next/image`. `--ink` backgrounds (Footer): apply CSS `invert(1)` (Tailwind `invert`) — user's explicit choice over an inverted-asset request or a text-wordmark fallback. `Logo_final_resp.jpg` (stacked) for narrow/mobile nav if needed, `Logo_final.jpg` (horizontal) desktop.                                                                                                                                             |
| 2. Particles    | `assets/particles/01_Fig.png`…`12_Fig.png`            | "Noise" section (renamed in English: the "this is what it feels like on the inside" band) | Solid-black silhouettes, transparent bg. Section bg is `--ink` (dark) — raw black PNGs would be invisible. Recolor to `--bg` (cream) via CSS mask (`mask-image`/`-webkit-mask-image` + `background-color: var(--bg)`), not `next/image` directly. Reuse the existing inline SVG marks' scatter positions/sizes/drift keyframes (`drift1`/`drift2`/`drift3`, ~7s–8.5s ease-in-out alternate, opacity ~0.5) as the placement/animation spec, swapping the shape source. Gate on `useReducedMotion()`. |
| 3. Typography   | —                                                     | Whole site                                                                                | Space Grotesk only, see §2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 4. Illustration | `assets/illustrations/01_construction.png`            | Hero, right side                                                                          | Transparent PNG, used as-is via `next/image`. Replaces the ghost `B.` mark on the home hero specifically (illustration occupies that visual role now). Framer Motion: fade/slide-in on load + subtle looping float (translateY), respecting `useReducedMotion()` — matches the noho.ink-style micro-motion the project is inspired by.                                                                                                                                                              |

## 4. Section-by-section spec (home page, in order)

1. **Nav** — sticky/static bar, logo (image, light bg), links: Studio · Work · Services · Contact
   (English; ports the embedded Nav.dc.html's 3 links + adds Services per the reference screenshot),
   plus a right-aligned primary CTA button ("Start a project →"). Active-state underline in accent
   color per existing Nav.dc.html logic.
2. **Hero** — eyebrow "Brand systems & web development", H1 "The solid foundation behind growing
   brands.", sub copy (translated), two CTAs: primary "View work →" + secondary text link "Start
   the transformation" (per reference screenshot). Illustration right side, animated per §3.
3. **Marquee** — ported from the old file, translated: Strategy · Brand Identity · Digital Design ·
   Web Development · Visual Systems. Pure CSS, `prefers-reduced-motion` disables it.
4. **Problem** — eyebrow "The problem", title "Many brands grow without ever laying a foundation.",
   body copy + closing line with the word "foundation" highlighted in accent (translated).
5. **Noise / Particles** — dark `--ink` band, decorative particle marks (see §3), caption "This is
   what it feels like on the inside."
6. **Solution** — eyebrow "Our solution", title "That's why BASE exists.", copy, 3-column benefits
   (Consistency / Scalability / Autonomy, translated), CTA "Start with a brand diagnostic".
7. **Banner** — dark `--ink` band. Text must include the **exact, unparaphrased** canonical tagline
   "Consistency isn't about aesthetics. It's about systems." (accent-highlighted on "systems"),
   optionally extended with "And every system starts with order." (accent-highlighted on "order")
   per the source copy's intent.
8. **Services / Packages** — eyebrow "Our services", title "Three ways to build on solid ground.",
   3 package cards, placeholder names/descriptions in English (content is hardcoded for Phase 1).
9. **Case studies (Work grid)** — eyebrow "Case studies", title "Brands that already built their
   base.", sub copy, "View all case studies →" link, 4 `ProjectCard`s (tone ink/accent/cream/ink),
   placeholder titles.
10. **Footer** — wordmark (image, inverted per §3) + exact tagline, Sitemap column, Contact column
    (placeholder email, Follow us: Facebook/LinkedIn/TikTok), bottom bar copyright + "Brand design &
    web development".

## 5. Animation direction (noho.ink inspiration)

- Every section wrapped in `<FadeInSection>` (already speced in `.claude/skills/animation-system.md`)
  for scroll-triggered fade+rise entrances.
- Hero illustration: entrance + subtle infinite float loop (per user's choice).
- Marquee + particles: pure CSS looping motion, paused/disabled under `prefers-reduced-motion`.
- ProjectCard hover reveal, button micro-interactions: per existing animation-system.md patterns.
- Nothing decorative-only; every motion should either draw the eye to new content on scroll or
  reinforce a hover/interactive affordance — no gratuitous noise.

## 6. Known open risks to watch when auditing Gemini's report

- Particle mask-image approach may need Tailwind arbitrary-value classes (`[mask-image:url(...)]`)
  rather than inline `style={{}}` to respect the no-inline-style rule — confirm Gemini used the
  arbitrary-value/class route, not `style`.
- `invert(1)` on the logo JPG will not be pixel-exact brand cream (inverts to a slightly different
  near-white/near-black than `--bg`/`--ink`) — acceptable per user's explicit choice, but verify it
  doesn't clash badly against the footer's `--ink` background in an actual screenshot.
- Confirm no accidental serif fallback rendering (Google Fonts network failure, missing `font-sans`
  application) — Space Grotesk must load via `next/font/google`, not a CDN `<link>`.
- Confirm canonical tagline is verbatim, not paraphrased, in the Banner section.
- Confirm English-only copy throughout (translation intent preserved, no leftover Spanish strings).

## 7. Prompt queue (small, audit-sized iterations)

Switched from one mega-prompt to one prompt per step — smaller diffs, easier to audit/correct.

| #   | Step                      | Contents                                                                                                       | Status                                                                                                                    |
| --- | ------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | Scaffold                  | Next.js 15 init, TS strict, Tailwind, ESLint/Prettier/Husky, scripts                                           | **Done** — audited, corrected directly by Claude, verified clean                                                          |
| 2   | Tokens + fonts + utils    | tailwind.config tokens/keyframes, Space Grotesk via next/font, globals.css, cn(), lib/motion.ts, FadeInSection | **Done** — audited, clean, no corrections needed                                                                          |
| 3   | Assets                    | Copy assets/logo, assets/particles, assets/illustrations → public/, favicon                                    | **Done** — audited (checksums verified byte-identical), clean, no corrections                                             |
| 4   | Layout shell              | Button, PageWrapper, Nav, Footer, app/layout.tsx, app/(site)/layout.tsx                                        | **Done** — audited in-browser, corrected directly by Claude, verified clean                                               |
| 5   | Hero + Marquee            | components/sections/Hero.tsx, Marquee.tsx                                                                      | **Done** — critical bug found + fixed by Claude, verified clean and in-browser                                            |
| 6   | Problem + Noise/Particles | ProblemSection.tsx, NoiseSection.tsx, DecorativeMark.tsx                                                       | **Done** — 2 real bugs found + fixed by Claude, verified clean and in-browser                                             |
| 7   | Solution + Banner         | SolutionSection.tsx, Banner.tsx                                                                                | **Done** — clean, no code corrections (but see process correction above)                                                  |
| 8   | Services + Case studies   | ServicesSection.tsx, ProjectCard.tsx, CaseStudiesSection.tsx                                                   | **Done** — clean, no corrections, process rules respected                                                                 |
| 9   | Final self-check          | Full-page pass: lint/build/dev, brand-audit + accessibility checklist, report                                  | **Done** — Gemini's self-check was clean; Claude's own full audit found 2 more items, 1 fixed, 1 flagged open (see notes) |

Full per-step copy/spec detail lives in §3 and §4 above — each prompt below just scopes a slice of
it plus the exact files to touch. After each Gemini report: audit against §6 risks + the relevant
slice of §3/§4, sign off or send a correction prompt (same slot), then send the next slot's prompt.

### Step 1 audit notes (2026-08-23)

Verified independently (read every file, re-ran `lint`/`build` myself — both genuinely pass).
Structure, tooling choices (Tailwind v3 pin, `@/*` alias, deferred deps) all correct.

Found 3 things the report didn't surface:

1. **No git repo existed** → the Husky hook it configured was inert (can't wire `core.hooksPath`
   without `.git`). Not really Gemini's miss — my Step 1 prompt never asked for `git init`. **Fixed
   directly by me** (infra, not app code): ran `git init` + `npm run prepare`; confirmed
   `git config core.hooksPath` → `.husky/_` and the shim correctly delegates to `.husky/pre-commit`.
   No commit made — that stays the user's call.
2. `app/layout.tsx` imports `styles/globals.css` via a relative path, not the `@/` alias required
   by `.claude/rules/typescript-standards.md`. → sent back to Gemini to fix.
3. `next build`/`next lint` both warn about a stray, unrelated `package-lock.json` in the user's
   home directory (`C:\Users\adanl\package-lock.json`, predates this project) confusing Next's
   workspace-root detection. Not Gemini's fault, but cheap to silence → sent back to Gemini to add
   `outputFileTracingRoot`.

Noted for later, not a Step 1 blocker: `next lint` is deprecated as of Next 15 and removed in
Next 16 — plan to migrate to the ESLint CLI directly in a later infra pass, not now.

### Step 1 corrections (applied directly by Claude, 2026-08-23)

Per updated `CLAUDE.md` Roles & Workflow: corrections are Claude's job now, applied directly, not
routed back through a Gemini prompt. Applied and re-verified (lint + build + a real pre-commit
hook run via `git hook run pre-commit`, no commit created):

1. `app/layout.tsx` → `import '@/styles/globals.css'` (was relative).
2. `next.config.ts` → added `outputFileTracingRoot` (silences the stray-lockfile warning).
3. **New finding, not in the original correction list:** the pre-commit hook was fully broken, not
   just untested. `eslint --fix` (what lint-staged actually invokes) failed outright — ESLint 9
   requires flat config (`eslint.config.js`), and `.eslintrc.json` (legacy format) isn't picked up
   by the plain `eslint` CLI, only by `next lint`'s internal compat shim. That's why Gemini's
   `npm run lint` (`next lint`) reported clean while the hook itself would have failed on every
   real commit. Fixed: replaced `.eslintrc.json` with `eslint.config.mjs` (`FlatCompat`, extends
   `next/core-web-vitals` + `next/typescript`), added `next-env.d.ts` to its ignores (generated
   file, was failing `@typescript-eslint/triple-slash-reference`).
4. **Second finding:** with ESLint fixed, `prettier --write` then broke on `styles/globals.css` —
   `prettier-plugin-tailwindcss@0.8.1` auto-probes for a Tailwind v4 `theme.css` file that doesn't
   exist in a v3 install (`ENOENT`). Downgraded to `prettier-plugin-tailwindcss@0.6.14` (last
   release before v4 auto-detection was added) to match our deliberate Tailwind v3 pin.
5. `git hook run pre-commit` now exits 0 cleanly with all files staged. No commit was made — that
   stays the user's call.

**Known, accepted, not fixed now:** `npm audit` reports 3 high-severity advisories, all transitive
from `next@15.5.23`'s own bundled `postcss`/`sharp` (pre-existing since the original scaffold, not
introduced by the corrections above). The only fix is a Next 16 major bump — out of scope for a
Step 1 tooling correction. Revisit when the project is ready for that upgrade.

**Step 1 status: closed.** Proceeding to Step 2.

### Step 4 audit notes (2026-08-23)

Read every new file, then actually ran the app in-browser (Chrome, via the browser tools) to check
Nav + Footer visually — code review alone would have missed all three real bugs found:

1. **Footer tagline was completely invisible.** `Footer.tsx` had both `text-bg/55` and `text-ink-55`
   on the same `<p>` (conflicting text-color utilities — a leftover from iterating on the class
   list). `ink-55` (near-black) on the `--ink` (near-black) footer background rendered the
   mandatory canonical tagline unreadable. Confirmed visually before and after. **Fixed directly**:
   removed `text-ink-55`, kept `text-bg/55`.
2. **`gap-15` is not a valid Tailwind v3 spacing value** (the default scale has no `15` — it jumps
   12→14→16), so the footer's 3-column grid had zero computed gap. Not obviously visible at this
   viewport because column 1's content is narrower than its track, but still wrong. **Fixed
   directly**: `gap-[60px]` (matches the 60px gap in the original Footer.dc.html spec).
3. **`border-ink-15/20`** used a dark ink-family border color on a dark background (wrong color
   _and_ a confused double-opacity: `ink-15` is already a pre-baked `rgba(...,0.15)` string in
   `tailwind.config.ts`, and Tailwind's `/` opacity modifier can't reliably re-derive alpha from an
   already-rgba value). The original design uses a light `cream-15`-equivalent divider on dark
   sections. **Fixed directly**: `border-bg/15` (`bg` is a plain hex in the config, so the opacity
   modifier works correctly here).
4. **`app/(site)/layout.tsx`'s page-transition `AnimatePresence`/`motion.main` had no
   `useReducedMotion()` gate** — violates the unconditional "always check `useReducedMotion()`" rule
   in `CLAUDE.md`/`accessibility.md`. This one's on Claude, not Gemini: the reference snippet in
   `.claude/skills/animation-system.md` that Prompt 4 pointed to also omits the check. **Fixed
   directly**: added a `reduced` branch that renders a plain `<main>` with no motion. Should also
   patch the skill doc itself so future prompts don't propagate the same gap — noted, not done yet.
5. Everything else (Button, PageWrapper, Nav — including the logo's `object-contain` sizing, which
   looked risky on paper but rendered correctly in-browser, single `<main>`, skip-link
   focus-visibility) checked out clean, code and visually.

Re-verified after fixes: `npm run lint` + `npm run build` clean, footer tagline visible in-browser.

**Step 4 status: closed.** Proceeding to Step 5.

### Step 5 audit notes (2026-08-23) — critical bug, found live by the user

Before Gemini's formal report arrived, the user hit a runtime error running the app themselves:
`Cannot find module './vendor-chunks/motion-dom.js'`. Investigated and fixed directly:

1. **Root cause: two `next dev` servers were running concurrently against the same project**
   (Claude's own verification server from Step 4's audit, left running, plus one Gemini had
   started for its own testing). Two Next.js dev processes racing to write the same `.next`
   webpack chunks on Windows corrupted the build cache, producing the missing-module error. Fixed:
   killed all stray `node` processes for this project, deleted `.next`, started exactly one fresh
   dev server.
2. **That surfaced a second, real bug once the corruption was cleared**: the page loaded with a
   200 but rendered **completely blank** below the Nav — Hero and Marquee content was present in
   the DOM (confirmed via page text extraction) but invisible. Root cause: `app/(site)/layout.tsx`'s
   `<AnimatePresence mode="wait">` wrapping `motion.main` was animating `opacity: 0 → 1` on the
   very first page load, and a client/server hydration mismatch on that same element meant React
   never applied the client update — the `<main>` stayed frozen at its SSR `opacity: 0` forever
   ("this won't be patched up," per React's own hydration warning). **Fixed directly**: added
   `initial={false}` to `<AnimatePresence>` — the standard Framer Motion + Next.js fix for this
   exact class of bug. It tells Framer Motion not to play the enter animation for whatever's
   already mounted on first load (avoiding the SSR/hydration risk entirely), while still animating
   real client-side route transitions afterward. Verified in-browser: Hero, illustration animation,
   and Marquee all render and animate correctly now.
3. A residual **cosmetic-only** hydration console warning remains (`style={{opacity:"1"}}` flagged
   as a mismatch even though the value is correct both sides) — this is a well-known, benign Framer
   Motion + Next SSR artifact with no visual or functional impact. Not chasing further; flagging so
   it's not mistaken for a new bug in a future step's audit.
4. Code-level review of `Hero.tsx` and `Marquee.tsx` (copy, `useReducedMotion` gating, semantic
   markup, the marquee's hover-to-pause bonus behavior) was clean — no Gemini-side corrections
   needed. This was purely a process/infra bug (concurrent dev servers) compounded by a genuine but
   narrow Framer Motion/Next.js SSR pitfall.

**Process lesson (superseded — see correction below):** ~~Claude must not leave its own
verification `npm run dev` running across turns while Gemini may also be running one for its own
testing — stop it after each audit's browser check completes, before handing off the next
prompt.~~

### Process correction (2026-08-23, after Step 7): port 3000 is the user's, never touch it

The user runs their own persistent `next dev` on port 3000 to watch progress live — it must never
be killed or restarted by Claude or Gemini. The Step 5-7 "kill stray node processes" guidance above
was wrong in a dangerous way: both Claude (repeatedly) and Gemini (Step 7, via `Stop-Process -Name
node -Force`, an indiscriminate kill-everything-named-node command) were almost certainly killing
the user's actual viewing server while chasing what was assumed to be duplicate/stray dev servers.
Port 3000 survived by luck (still alive when checked after Step 7), not by correct process.

**Corrected rules, effective immediately:**

- **Never kill any `node`/`next` process, ever, for either Claude or Gemini.** Not `Stop-Process
-Name node`, not targeted PIDs, nothing. The user's port-3000 server is off-limits, full stop —
  and killing "everything named node" (Gemini's Step 7 approach) is exactly how you take it out by
  accident.
- **Never start a second `next dev`.** Two `next dev` processes (any ports) writing to the same
  `.next/` cache is what caused the Step 5 corruption in the first place — starting a fresh one
  "just to check" is never safe while the user's is running.
- **Verification going forward:** `npm run lint` (safe, doesn't touch `.next`) always. For type
  safety without touching `.next`, prefer `npx tsc --noEmit` over `npm run build` — running `next
build` concurrently with a live `next dev` risks the same `.next` corruption. Skip `next build`
  for individual steps; it can run once, coordinated with the user, at the real end of Phase 1.
- **Visual verification:** navigate to the user's already-running `http://localhost:3000/` (Fast
  Refresh keeps it current automatically) — read-only, screenshot/inspect only, never restart it.
  If for some reason it's not reachable, ask the user rather than starting a replacement.

**Step 5 status: closed.** Proceeding to Step 6.

### Step 6 audit notes (2026-08-23)

`ProblemSection`, `NoiseSection`, `DecorativeMark` code review was solid (correct copy, correct
particle positions ported from the original design's inline SVG marks, correct 8-of-12 image
selection with no back-to-back repeats). But the report's claim of "no dev server running" was
**false** — a second stray `next dev` (port 3000) was found still alive from Gemini's own testing
alongside Claude's, the same class of problem flagged as a hard rule after Step 5. Killed all node
processes, cleared `.next`, re-verified clean.

In-browser audit then found 2 real issues, both fixed directly:

1. **`DecorativeMark.tsx` had a genuine hydration bug**, not the cosmetic one from Step 5. It
   gated the `animate-drift-*` class through `useReducedMotion()` in JS (`!reduced &&
'animate-drift-...'`). `useReducedMotion()` is `null` during SSR (always renders the class) but
   resolves to a real boolean on the client — and the test browser had
   `prefers-reduced-motion: reduce` on, so the client dropped the class while the server had baked
   it in. React's hydration diff flagged all 8 marks and refused to patch it up. **Fixed directly**:
   dropped `useReducedMotion()`/`'use client'` entirely from this component and switched to
   `motion-reduce:animate-none` (Tailwind's pure-CSS `prefers-reduced-motion` variant) — the same
   safe pattern `Marquee.tsx` already used correctly. No JS, no hydration risk, works identically
   for every visitor's actual OS setting.
   **General lesson to carry forward**: gating a Framer Motion className/style through
   `useReducedMotion()` in a Server-rendered Client Component is only safe when the _value itself_
   doesn't change what's rendered before vs. after the `null → boolean` resolution in a way that
   produces different DOM output. Prefer Tailwind's `motion-reduce:` CSS variant wherever the
   animation is expressible in pure CSS (as marquee/drift both are) — reserve the JS hook for cases
   that truly need it (branching between two different Framer Motion prop objects, as Hero's
   illustration does — checked, that one isn't currently broken, but carries the same latent risk;
   not touched this round since it isn't manifesting, worth a follow-up hardening pass later, e.g.
   wrapping the app in Framer Motion's `<MotionConfig reducedMotion="user">` instead of manual
   per-component hooks).
2. **`ProblemSection.tsx` was centered** (`flex flex-col items-center text-center`) — breaks the
   left-aligned rhythm every other section on the page uses (Hero above it, and the established
   `section-head` pattern in `brand-design-system.md`). Not explicitly specified as "left-aligned"
   in Claude's prompt (a gap in the prompt, not really Gemini's error), but it's the page's
   established convention. **Fixed directly**: removed the centering classes.

Re-verified: `npm run lint` + `npm run build` clean, particles render in cream (confirmed visually,
including one very small mark that looked like a stray "0" glyph at low res — zoomed in, it's just
a small ring-shaped particle rendering correctly), Problem section now left-aligned matching Hero.

**Step 6 status: closed.** Proceeding to Step 7.

### Process change: assemble progressively, not all at the end (2026-08-23)

Originally Step 9 was going to be the only place `app/(site)/page.tsx` gets built out. Changing
that: from Step 5 onward, **each step also wires its new section(s) into `page.tsx`**, appended
below what's already there, replacing the placeholder once Step 5 lands. Reason: Claude's audit
process requires an actual in-browser look at anything visible (see Step 4's findings — all 3 real
bugs were only caught by rendering, not code review), which is only possible if sections are
live on the page as they're built. Step 9 becomes a final full-page pass, not first assembly.

### Step 9 audit notes (2026-08-23) — Phase 1 close-out

Gemini's self-check report was thorough and its claims held up under independent re-verification
(re-ran `lint`/`tsc` myself, grepped for `<img`, `: any`, `style={{`, `<h1` independently — all
matched what it reported: zero raw `<img>`, zero `any`, exactly one `style={{}}` — the justified
`DecorativeMark` exception — exactly one `<h1>`, in `Hero.tsx`).

Claude's own full-project pass (all components read, plus a visual walkthrough on the user's
`localhost:3000`) found 2 more things beyond Gemini's self-check:

1. **`Footer.tsx` used `<h2>` for its three column labels** ("Sitemap", "Contact", "Follow us") —
   same heading level as real page section titles ("That's why BASE exists.", etc.), which pollutes
   the document's heading outline for screen-reader "jump to heading" navigation with three generic
   nav-group labels competing against actual content headings. **Fixed directly**: downgraded all
   three to `<h3>`, matching the tier already used for sub-items within a section (benefit titles,
   package titles, card titles) — footer nav groups fit that tier better than page-section tier.
2. **`Nav.tsx` has no mobile treatment at all** — fixed `px-16` (no `px-6` mobile fallback, unlike
   every section component, which all correctly do `px-6 md:px-16`), and the logo + 4 links +
   button render in one non-wrapping flex row with no hamburger/collapse. On a narrow viewport this
   will overflow or squeeze illegibly. `Footer.tsx` also fixes `px-16` without a mobile fallback,
   though its grid does collapse to 1 column so it's cramped rather than broken.
   **Not fixed directly** — a proper mobile nav (toggle button, collapse/drawer pattern, focus
   handling) is real new scope, not a small correction, so it doesn't fit "Claude corrects
   directly." Flagged as an open item — see status note below for the resolution path.

Confirmed via independent visual pass: full page flows correctly top to bottom (Hero → Marquee →
Problem → Noise → Solution → Banner → Services → Case Studies → Footer) on the user's live server,
no new console errors beyond the known-benign cosmetic hydration warning (documented at Step 5,
still present, still harmless — `style={{opacity:"1"}}` formatting artifact from Framer Motion SSR).

**Phase 1 status: code-complete, one open item (Nav/Footer mobile responsiveness) before final
sign-off.** Production `npm run build` intentionally not run yet — needs to be coordinated with the
user since it can't safely run alongside their live `next dev` (see process correction above).

## 8. Looking ahead — Phase 2 (not started, captured for later planning)

User direction (2026-08-23): Phase 2 focuses on animation/transition polish across the home page
already built in Phase 1 — modern scroll-driven effects. Specifically called out: the Noise/
particles section ("This is what it feels like on the inside.") as a good candidate for an
infinite-scroll-style treatment. Full Phase 2 plan gets written once Phase 1 closes (Step 9 report
audited, final build coordinated with the user) — not scoping it mid-Phase-1.

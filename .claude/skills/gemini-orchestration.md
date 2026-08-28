# Skill: Gemini Orchestration (Claude's role — architect/director/auditor/corrector)

How Claude runs this project. Claude does not write application code here — Gemini does. Claude
scopes the work, writes Gemini's prompts, reads what Gemini produced, and corrects it. Load this
whenever picking up BASE Studio work: writing the next prompt, auditing a report, or updating
`PLAN.md`.

---

## The loop

1. **Scope one small step.** One prompt = one audit-sized unit (roughly: one component family, one
   config layer, one section group). Never bundle "and also do the next three steps" into a prompt
   — see `PLAN.md` §7 for the current queue and its granularity.
2. **Write the prompt.** Self-contained: tell Gemini what to read first (`AGENTS.md` +
   the specific `.agents/rules/*` and `.agents/skills/*` files relevant to this step), state the
   task precisely (exact copy, exact file paths, exact component names when it matters), state what
   is explicitly OUT of scope for this step, and request a specific report format (files touched,
   verification results, judgment calls, blockers). End with: don't proceed past this step without
   the next prompt.
   - **Every prompt after the first opens with a "corrections from last step" section** (explicit
     user direction, 2026-08-23): what Gemini got wrong, the file it was in, and exactly how Claude
     fixed it — even though Claude fixed it directly and Gemini doesn't need to touch that code
     again. This is how Gemini accumulates the project's actual failure modes instead of repeating
     them; skipping this section defeats the point even when there's nothing left to _do_ about the
     old mistake. If a step had zero corrections, say so explicitly rather than omitting the
     section ("Step N had no corrections — clean.").
3. **Send it, wait for the report.**
4. **Audit — read the actual code, not just the report.** A report describes intent, not
   necessarily what happened (same caution applies to any agent's self-report). For each audit:
   - Read every file Gemini says it touched (and `git diff`/`git status` for anything it didn't
     mention).
   - Cross-check against: the relevant slice of `PLAN.md` (§3 asset map, §4 section specs), the
     brand/typography/accessibility rules (`.claude/rules/*`), and run `/brand-audit` mentally or
     literally against new components.
   - For anything visible in the browser (a section, a page, a component with real markup),
     actually look at it — golden path and at least one edge case (mobile width,
     `prefers-reduced-motion`, missing image). Don't sign off a UI step from code-reading alone.
     **Never start a `next dev` server to do this.** The user runs their own persistent one on
     port 3000 to watch progress live — navigate to `http://localhost:3000/` (read-only:
     screenshot, click, inspect) and let its own Fast Refresh serve the current code. Starting a
     second `next dev` (any port) is what corrupted `.next` once already (Step 5) — never do it,
     even "just to check something."
   - Run `npm run lint` yourself if Gemini's report doesn't show clean output; prefer `npx tsc
--noEmit` over `npm run build` for a type-check, since `next build` run concurrently with the
     user's live `next dev` risks the same `.next` corruption. Don't run `next build` per-step —
     it happens once, coordinated with the user, at the real end of the phase.
   - **Never kill any `node`/`next` process, under any circumstance** — not by name, not by PID,
     not "to clean up stray processes." There is no safe way to distinguish the user's server from
     the command line alone with enough confidence, and killing it breaks their ability to watch
     progress. If something seems stuck or duplicated, say so to the user and let them decide.
5. **Decide:**
   - **Sign off** — update `PLAN.md` §7's status for that row to done, note any deviations worth
     remembering, then send the next queued prompt.
   - **Correct** — **fix it directly, yourself.** This is the default, not the exception (explicit
     user direction, 2026-08-23 — see `CLAUDE.md` Roles & Workflow). Edit the code, re-run
     lint/build/dev, re-check against the rule/spec it violated, and record what you changed and
     why in `PLAN.md`. Gemini is the implementer for new scope; Claude is the one who corrects.
     Don't route a fix back through a Gemini prompt — that's a round-trip the user has explicitly
     said they don't want. Only fall back to a Gemini prompt when the correction is genuinely
     beyond what's safe/sane to do directly (e.g. it reveals the step's whole approach needs
     rethinking, not just fixing) — and say so explicitly when that's why.

## Keeping PLAN.md current

`PLAN.md` is the durable spec + state tracker across this whole phase — treat it as such, not as a
one-time planning doc:

- Update the §7 queue table's status column after every round.
- If a Gemini report surfaces a real decision (e.g., a breakpoint choice, a fallback for a missing
  asset variant) that future steps depend on, fold it into §3/§4 so the next prompt you write
  reflects it — don't leave it stranded in old chat history.
- If user direction changes something structural (new asset, new section, reordered flow), this is
  the file to amend first, before writing the next prompt.

## What NOT to do

- Don't write React/Tailwind/Next.js application code yourself as the default path — that's
  Gemini's job. This project's whole point is testing the architect/implementer split.
- Don't let prompts balloon back into multi-step mega-prompts because "it'd save a round trip" —
  the user explicitly asked for small, audit-sized iterations.
- Don't sign off on brand/accessibility/typography compliance from the report's word alone — verify
  against the actual files and rules every time.

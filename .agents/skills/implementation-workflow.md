# Skill: Implementation Workflow (Gemini's role — implementer)

How work reaches you on BASE Studio. Claude acts as architect/director/auditor/corrector: it scopes
the work, writes your prompts, reviews what you build, and either signs off or sends a correction.
You are the implementer — you write the actual application code.

---

## What you receive

One prompt per small, audit-sized step (a component family, a config layer, a section group) —
never the whole home page at once. Each prompt tells you:

- What to read first (this file, `AGENTS.md`, and the specific `.agents/rules/*` /
  `.agents/skills/*` files relevant to that step).
- The exact task — file paths, component names, copy text when it matters.
- What's explicitly out of scope for that step.
- What to verify and what format to report back in.

## Rules while implementing

- **Stay inside the scoped step.** Even if `PLAN.md` shows later steps you can see coming, don't
  pre-build them — a smaller diff is easier for Claude to audit and correct. If a later step's
  content is genuinely required to make the current step compile (e.g., a component that must
  import something not built yet), stub the minimum and say so in your report rather than building
  ahead unprompted.
- **Follow the brand/code rules exactly** — `.agents/rules/brand-consistency.md` and
  `.agents/rules/code-standards.md` are non-negotiable, not style suggestions. When a prompt's
  instructions and a rule file conflict, the rule file wins; flag the conflict in your report.
- **Use exact copy when given.** Prompts hand you literal **Spanish** copy taken from the Figma
  file (headlines, body text, button labels). Use it verbatim — don't "improve" it, don't
  paraphrase it, and never translate it to English. The core line
  _"No es sobre estética; es sobre sistemas."_ must never be paraphrased.
- **Self-check before reporting**, against whatever the prompt names (typically: colors only from
  tokens, Merriweather headings + Space Grotesk body, buttons match the three variants,
  accessibility basics —
  alt text, semantic elements, focus states — no `any`, no inline
  `style={{}}` outside a documented one-off exception, `next/image` not `<img>`).
- **Run the verification commands the prompt asks for** and only report success if they actually
  pass — don't assume.
- **Critical, non-negotiable process rule: never kill any `node`/`next` process, by name or by
  PID, ever — and never start your own `next dev` server.** The user runs a persistent `next dev`
  on port 3000 to watch progress live. A command like `Stop-Process -Name node -Force` kills
  _everything_ named node, including that server, with no way to tell them apart — this actually
  happened once already and could have taken down the user's view of the site. If you need to
  check the running app, navigate to the user's already-running `http://localhost:3000/`
  read-only — never restart it, never start a second instance (two `next dev`/`next build`
  processes sharing the same `.next/` cache corrupts it, which is what caused an earlier
  step's critical bug). For type/build safety, prefer `npx tsc --noEmit` over `npm run build`,
  since a full build run concurrently with the user's live dev server risks that same corruption.

## Report format

Every report should include:

1. Files created/modified (paths).
2. Verification results — actual pass/fail, not assumed.
3. Judgment calls you made unprompted (exact positions/sizes not specified, a breakpoint choice, a
   fallback for something ambiguous) — call these out explicitly, they're what gets audited hardest.
4. Blockers, ambiguities, or places where this prompt conflicted with `PLAN.md` or the rule files.

## After reporting

Wait for the next prompt. Claude audits what you built and, by default, **fixes any deviations
directly** rather than sending them back to you as a correction prompt — so don't assume silence
or a jump straight to the next step means your work was flawless; Claude may have patched small
issues itself. You'll only get a correction prompt for something substantial enough that Claude
judges it needs your hand on it again (e.g. the whole approach for that step needs rethinking).

**Every prompt you receive after the first opens with what you got wrong last step and how it was
fixed** — read that section even though you won't be the one touching that code again. It's there
so you stop repeating the same mistake in the next step, not as a formality. If a past correction
generalizes (e.g. "don't use relative imports," "check package version compatibility before
pinning"), apply that lesson proactively in the current step too, not just avoid the literal file
that was fixed before.

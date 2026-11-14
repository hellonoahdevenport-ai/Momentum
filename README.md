# Momentum (working title)

A medical and nursing education product: practice clinical reasoning in fictional, interactive cases. **For education and simulation only — not a clinical decision-support tool, and not a substitute for supervision, local policy, clinical judgment, or professional care.**

## Status

This is an early build, not a finished product. Read this before assuming anything beyond it is true:

- **One fully authored, playable case per track** (Medicine: Maya Chen / iron-deficiency anemia; Nursing: Jordan Alvarez / post-op safety, explicitly marked "sample"). Every other unit on the curriculum map is honestly shown as **planned**, not built.
- **No case has completed a real clinical review.** Every case carries a `needs_clinical_review` status, visible in the product (brief stage, library, content-review page). Treat case content as unverified until a licensed clinician or nursing faculty member reviews it and that review is recorded.
- **No real accounts, database, or payment system exist.** Learner progress lives only in the browser's `localStorage`. The "Previewing as" role switch (Settings) is a **client-settable demo convenience, not authentication** — see `src/lib/role.ts`.
- **No AI provider is required.** The patient/assessment dialogue is fully scripted (keyword-matched against authored facts) by default. If `ANTHROPIC_API_KEY` is set, replies are optionally rephrased by Claude — but the model may only paraphrase the fixed fact text, never invent new facts, and it silently falls back to the scripted line on any error.

## Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No environment variables are required — the demo runs fully on seeded data.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Environment variables

See `.env.local.example`.

| Variable | Required | Effect when unset |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | No | Patient/assessment dialogue stays fully scripted. Nothing in the app is blocked by its absence. |

## Architecture

- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.** No database, no ORM — case content is authored TypeScript data (`src/lib/cases/`), and learner progress is `localStorage`-only (`src/lib/progress.ts`).
- **Route groups:**
  - `src/app/(marketing)/*` — the public site (home, how-it-works, tracks, curriculum, pricing, about, privacy, terms, accessibility). Wrapped in its own nav/footer shell.
  - `src/app/app/*` — the learner product (`/app`, `/app/tracks/[track]`, `/app/learn/[track]/[unit]`, `/app/case/[caseId]`, `/app/quiz/[quizId]`, `/app/progress`, `/app/review`, `/app/library`, `/app/settings`). Its own persistent nav shell with a mobile bottom tab bar.
  - `src/app/educator/*` and `src/app/admin/page.tsx` — role-gated surfaces (see below).
- **The case engine (`src/lib/cases/`)** keeps the hidden answer key server-side. `registry.ts` holds full `CaseFile` objects (never import this from a `"use client"` file). `publicView.ts` strips every answer-bearing field before a server page hands data to a client component. `actions.ts` is a `"use server"` module: grading, evidence ordering, and quiz checks all run there, so the answer key never reaches the browser before the debrief.
- **Role gating (`src/lib/role.ts`, `src/lib/getServerRole.ts`)** reads a client-settable cookie server-side to gate `/educator` and `/admin`. This is a demo convenience for previewing all three surfaces locally — it is **not real authorization** and must be replaced with real accounts and server-enforced roles before this product stores any real learner or institutional data.
- **Design tokens** live in `src/app/globals.css` (`:root` custom properties + Tailwind `@theme inline`). Fixed light theme by design — see the comment in that file before adding a dark-mode media query.

## Adding a new case

1. Add a `CaseFile` object under `src/lib/cases/` (see `mayaChen.ts` for the full shape: metadata, interview topics, evidence catalog, question types, plan prompt, optional unfolding event, and debrief content).
2. Register it in `src/lib/cases/registry.ts`.
3. Leave `meta.reviewStatus: "needs_clinical_review"` until an actual qualified reviewer has checked it — then record their name/credentials and the review date in `meta.reviewers` / `meta.reviewDate` and flip the status.

## What's gated on further work (not provisioned by this build)

- **Clinical/nursing-faculty content review** of both authored cases — required before either can be called validated.
- **Real authentication and a database** — needed before storing any real learner, educator, or institutional data; before that, keep progress local-only and the role switch demo-only.
- **Legal review** of `/privacy` and `/terms` (both are clearly marked drafts) before any commercial launch.
- **Independent accessibility audit** beyond the WCAG 2.2 AA engineering target already in place (see `/accessibility`).
- **Hosting, domain, and billing** — none of this exists yet; running the dev server locally is the only "deployment" today.

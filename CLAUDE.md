# CLAUDE.md — Asadullah Karim Cinematic Portfolio

Rules for any Claude session working on this repo. Read before editing.

## What this is
A cinematic film-experience portfolio for a Saudi documentary filmmaker and
creative producer — not a CV site, not a Behance grid. Dark, editorial,
large-type, motion-driven. Canonical domain: https://asadullahkarim.com
(deployed on Vercel from `main`).

## Stack
Next.js 14 (App Router) · TypeScript strict · Tailwind CSS · GSAP +
ScrollTrigger · Framer Motion (route transitions) · Lenis (smooth scroll).
Node 20 (`.nvmrc`). Path alias `@/` → `src/`.

## Commands
- `npm run dev` — local dev
- `npm run build` — must pass with 0 errors before any commit
- `npm run lint` — ESLint (`next/core-web-vitals`)
- `npx tsc --noEmit` — type check

## Hard rules

### 1. Credibility — never invent content
All copy and project data in `src/data/projects.ts` and `src/data/site.ts`
come from Asad's real portfolio or from him directly.
- Never invent or embellish job descriptions, achievements, awards, client
  relationships, locations, camera/lens specs, dates, or quotes.
- Missing information stays a neutral placeholder (`— add —` or `"#"`),
  never plausible-sounding filler.
- Rewriting for tone/grammar is fine; changing facts is not.

### 2. Keep the design language — no new visual styles
Reuse what exists; don't introduce new colors, fonts, radii, shadows or
easing curves.
- Colors: `void`, `ink`, `surface*`, `paper`, `crimson*`, `accent*`, `mist*`,
  `hairline*` (see `tailwind.config.ts`). No bright/saturated reds.
- Type: `text-hero`, `text-display-*`, `text-lead`, `font-display` /
  `font-body` / `font-mono`. Fraunces serif (`font-serif`) is used once,
  deliberately — don't spread it.
- Motion: `ease-cinematic`, `ease-smooth`, `ease-expensive`; durations
  900/1100/1400ms. Motion should feel deliberate, not snappy.
- Shared pieces: `.btn-cinematic`, `.section-divider`, `shadow-card`,
  `rounded-card` / `rounded-panel`, section rhythm `py-32 md:py-44`.

### 3. Accessibility and motion safety are non-negotiable
- Every animation must respect `prefers-reduced-motion` (helper in
  `src/lib/utils.ts`). Custom cursor and hover effects only on
  `(hover: hover) and (pointer: fine)`.
- Keep keyboard parity for every hover interaction, visible
  `:focus-visible`, and real headings tied to sections via
  `aria-labelledby`.
- After route changes, GSAP ScrollTrigger is refreshed in
  `app/template.tsx` — keep that when touching transitions.

### 4. Don't over-engineer
- Edit existing files before creating new ones.
- No new abstractions, config systems, data models or utility files until a
  pattern repeats across several real uses.
- Refactor only after a feature works end to end.
- New dependencies need a clear reason.

### 5. Real media
- Images go in `public/images/projects/<slug>.jpg` (slug from
  `projects.ts`); swap the tone-gradient placeholder for `next/image`.
- Long-form or series videos are hosted on YouTube and referenced by URL /
  ID in project data — don't commit large video files.

## Workflow
- GitHub is the single source of truth. Work on a branch, open a PR,
  merge to `main` → Vercel deploys.
- Before committing: `npx tsc --noEmit && npm run lint && npm run build`.
- For visual/motion changes, check mobile and desktop widths before calling
  a change done.
- Keep updates short: report only milestones, real blockers, or when real
  assets/information are needed.

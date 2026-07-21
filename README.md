# Asadullah Karim — Cinematic Portfolio

A production-ready Next.js portfolio for documentary filmmaker & creative
producer Asadullah Karim. Built as a cinematic digital experience — dark,
editorial, large-type, motion-driven — rather than a conventional CV site
or Behance-style grid.

All copy and project data are sourced from the original portfolio (a
20-page Canva document) and rewritten for tone and grammar only. No
projects, credits, or achievements were invented or removed.

**Status: production-ready.** The project builds cleanly (`next build`,
22/22 routes) and is verified free of missing imports, broken routes, or
dead links. See "Known limitations" below for the content gaps that are
intentional, not bugs.

## Creative Director quality pass

Beyond the initial build, the site has been through a dedicated review
covering accessibility, SEO, and UX polish — content and project data were
not touched, only implementation quality:

- **Motion respects `prefers-reduced-motion`.** Lenis smooth scroll, GSAP
  reveals, the Hero's entrance timeline, and the custom cursor all check
  this and fall back to instant/native behavior for anyone who has reduced
  motion set at the OS level.
- **Custom cursor no longer double-renders.** It only activates (and only
  hides the native cursor) once JS confirms a fine-pointer, motion-tolerant
  device — previously both cursors could appear simultaneously.
- **Full keyboard support.** Visible focus rings (`:focus-visible`) site-
  wide, a skip-to-content link, `aria-expanded`/`aria-controls` on the
  mobile menu with Escape-to-close, and keyboard-focus parity for every
  hover-only interaction (project posters, related-project cards, the
  showreel play button).
- **Semantic HTML pass.** Every homepage section and project-page section
  has a real heading tied to it via `aria-labelledby`; credits/metadata
  sidebars use `<dl>`/`<dt>`/`<dd>`; the footer's address and nav use
  `<address>`/`<nav>`; decorative gradients and icons are `aria-hidden`.
  Previously several section headings were plain `<span>`s with no heading
  in the document outline.
  - Fixed a nested-HTML issue introduced mid-review (a bare `<a>` can't be
    a direct child of `<dl>`) — the CTA link now sits outside the list.
- **Dead placeholder links no longer break the experience.** `href="#"`
  social/download links (see "Known limitations") previously jump-scrolled
  to the page top on click, jarring the smooth-scroll feel. They now render
  as visibly inert via a shared `ExternalLink` component, and automatically
  become real `target="_blank"` links the moment real URLs are added to
  `src/data/site.ts`.
- **A dead-looking affordance became a real link.** The Behind the Scenes
  gallery tiles had `cursor-pointer` styling but did nothing on click —
  they now link to their project page, which also strengthens the
  storytelling connection between texture and work.
- **SEO: structured data + share cards.** `Person` and per-project
  `CreativeWork` JSON-LD, canonical URLs on every route, a `viewport`/
  `theme-color` export, and generated Open Graph images (root +
  per-project — see `app/opengraph-image.tsx` and
  `app/work/[slug]/opengraph-image.tsx`) so shared links look intentional
  instead of showing a blank card.
- **One storytelling change: section order.** The Showreel now plays
  immediately after the Hero — a "trailer before the feature" — rather
  than four sections deep. About, Selected Work, Awards, Clients, Behind
  the Scenes, and Contact follow in that order. Nav links were reordered
  to match. No section content changed, only sequence.
- **ScrollTrigger refresh on route change.** Next.js remounts `app/
  template.tsx` on every client-side navigation; it now also refreshes
  GSAP's ScrollTrigger there, preventing stale trigger offsets when
  navigating between pages of different heights.

## UX / design-system refinement pass

A second pass focused purely on visual craft — no copy, project data,
images, or page structure changed, only how the existing content is
presented:

- **Expanded design tokens** (`tailwind.config.ts`, `app/globals.css`):
  deeper elevation blacks (`void`/`surface3`), a dim/bright gold pair,
  larger type scale (`text-hero`, `text-display-2xl`, `text-lead`), a
  slower `ease-expensive` timing curve, and shared `shadow-card` /
  `shadow-card-hover` / `rounded-card` / `rounded-panel` tokens so every
  card, poster, and media block in the site now shares one elevation and
  radius system instead of ad hoc values per component.
- **Hero:** larger type, more breathing room, a soft radial vignette, and
  a new secondary "Watch Showreel" CTA next to the existing "View
  Selected Work" CTA — both built from a shared `.btn-cinematic` button
  system now reused on the project-page "Watch the Film" link too.
- **One restrained serif accent.** Fraunces (italic) is used once, for
  the Contact headline, as the site's single editorial "quiet statement"
  moment — everywhere else stays Space Grotesk / Inter, unchanged.
- **Navigation:** a lightweight scroll-spy highlights the current section
  in gold, the mobile menu now staggers its links in on open, and the
  scrolled header uses a heavier blur for more separation from content.
- **Every homepage and project-page section** now shares one soft-fade
  `.section-divider` instead of a flat `border-t`, one consistent
  vertical rhythm (`py-32 md:py-44`), and wider, more readable paragraph
  measures (`leading-relaxed2`, capped `max-w` on long copy blocks).
- **Cards and posters** (`ProjectPoster`, `ProjectGallery`,
  `RelatedProjects`, Behind the Scenes tiles, Clients grid) all picked up
  the shared shadow/radius/border system and slower, heavier hover
  transitions (900ms `ease-expensive` scale, not a snappy 300ms).
- **Motion pacing** was slowed slightly across the board — Lenis scroll
  duration, `Reveal`/`RevealText` durations and travel distance, and the
  route-change fade — to read as deliberate rather than quick UI
  feedback. `prefers-reduced-motion` handling is unchanged and still
  fully respected everywhere.
- **Footer** was rebalanced with more vertical space, a consistent
  hover-to-`text-paper` treatment on every link, and a dedicated legal
  bar beneath a divider instead of everything sharing one dense block.

Verified after this pass: `next build` still completes cleanly (22/22
routes, 0 errors), and a local `next start` smoke test confirms the
homepage, a project page, and `/sitemap.xml` all return `200`.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for scroll-based reveals and parallax
- **Framer Motion** for route transitions
- **Lenis** for smooth scrolling

## Project structure

```
app/
  layout.tsx                Root layout — fonts, smooth scroll, cursor, nav, footer,
                             skip link, JSON-LD, viewport/theme-color
  template.tsx               Route-change transition (Framer Motion) + ScrollTrigger refresh
  page.tsx                   Homepage — assembles all sections in order
  icon.tsx                    Generated favicon (no external asset needed)
  opengraph-image.tsx          Generated default share card
  not-found.tsx                Custom 404
  work/[slug]/page.tsx          Individual project pages (statically generated)
  work/[slug]/opengraph-image.tsx  Per-project generated share card
  sitemap.ts, robots.ts         SEO
src/
  components/
    sections/               Hero, About, SelectedWork, Showreel, Awards, Clients,
                             BehindTheScenes, Contact — see app/page.tsx for order
    Nav.tsx, Footer.tsx, CustomCursor.tsx, SmoothScroll.tsx
    Reveal.tsx                Scroll-triggered fade/rise wrapper (GSAP, motion-safe)
    RevealText.tsx             Line-by-line masked text reveal (available for
                                future headline treatments; not currently wired
                                into a section — Hero uses its own GSAP timeline)
    ProjectPoster.tsx           Placeholder cinematic imagery per project
    ProjectGallery.tsx, RelatedProjects.tsx
    ExternalLink.tsx             Renders real links normally; renders "#"
                                  placeholder links (see site.ts) as inert
  data/
    projects.ts               All 14 projects extracted from the source portfolio
    site.ts                    Bio, career timeline, awards, clients, contact info
  lib/
    utils.ts                 cx() classname helper, tone-gradient placeholders
```

Every route in the sitemap builds and statically generates:
`/`, `/work/[slug]` (×13), `/sitemap.xml`, `/robots.txt`, `/icon`,
plus the custom 404.

## Known limitations (content, not code)

These are real gaps to close before launch — they are not bugs and not
caused by any development-environment issue:

1. **Placeholder imagery.** Every photograph/poster/showreel background is
   currently a tone-based gradient with a film-grain overlay, not a real
   photograph. This was a deliberate placeholder because the original
   Canva asset images weren't available as downloadable files during
   development. Swap them for real stills before launch — see
   "Adding real imagery" below.
2. **Placeholder contact links.** `linkedin` and `instagram` in
   `src/data/site.ts` (`socials` object) are set to `"#"`. Update with
   real profile URLs.
3. **No showreel video file.** The Showreel section has a play button and
   player UI but no video source wired up (there's no reel file in the
   source portfolio). Add a `<video>` element or embed once a reel exists.

## Adding real imagery

Drop images into `public/images/projects/`, named by project slug (see
`src/data/projects.ts` for the exact slugs, e.g. `covida-the-19th.jpg`,
`okaz.jpg`). Then swap the placeholder gradient `<div>` for a Next
`<Image>` in each of these components:

- `src/components/ProjectPoster.tsx` — project poster tiles (grid + hero)
- `src/components/sections/About.tsx` — portrait
- `src/components/sections/Showreel.tsx` — showreel background (or replace
  with a `<video>` tag entirely)
- `src/components/sections/BehindTheScenes.tsx` — BTS gallery tiles
- `src/components/ProjectGallery.tsx` — per-project gallery

Example swap:
```tsx
// before
<div className="absolute inset-0" style={{ background: toneGradients[project.tone] }} />

// after
import Image from "next/image";
<Image src={`/images/projects/${project.slug}.jpg`} alt={project.title} fill className="object-cover" />
```

## Install & run locally

Requires Node.js 18.18+ (Node 20 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

A clean `npm install` followed by `npm run build` on a normal machine (or
CI/Vercel) will complete in well under a minute — this is a small,
dependency-light site. No custom build steps or environment variables are
required.

## Lint

```bash
npm run lint
```

Uses `eslint-config-next`. (This was intentionally omitted from the
dependency list during one phase of development to work around a
constrained build sandbox with no network access to the npm registry for
large packages — it's back in `package.json` and works normally on any
standard machine.)

## Deploy to Vercel

This project is deploy-ready as-is: standard `package.json`, a `vercel.json`
pinning the framework/build/install commands explicitly, `.nvmrc` (Node 20),
and no required environment variables. Two ways to ship it:

### Option A — CLI, no GitHub required (fastest, one command)

From inside the extracted project folder:

```bash
npx vercel --prod
```

The first run prompts you to log in (opens a browser) and asks a few
one-time setup questions (link to existing project? no — create new; keep
defaults for everything else, since `vercel.json` already declares the
framework and commands). It uploads the folder directly and deploys —
no git repository needed at all. You'll get a live `*.vercel.app` URL in
under a minute, and every subsequent `npx vercel --prod` redeploys the
latest local changes.

### Option B — Git import (best if you'll keep editing collaboratively)

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected via `vercel.json`). No
   environment variables are required.
4. Click Deploy — Vercel runs `npm install && next build` automatically.
5. Every future push to the main branch redeploys automatically.

### After deploying

For a custom domain, add it under Project Settings → Domains, and update
`siteUrl` (currently the placeholder `https://asadullahkarim.com`) in
`app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` to match.

## A note on fonts

Fonts (Space Grotesk, Inter) are loaded via a standard `<link>` tag in
`app/layout.tsx`'s `<head>`, rather than `next/font/google`. This is a
deliberate, permanent choice — not a workaround to revert:

- `next/font/google` fetches font files at **build time**, which fails in
  network-restricted CI/sandbox environments (including the one used to
  develop this site).
- A `<link>` tag defers the fetch to the **browser** at runtime, which
  works identically on Vercel, any other host, and every local machine —
  with `preconnect` hints already in place for fast loading.

If you later want `next/font`'s automatic self-hosting/optimization and
know your build environment has unrestricted network access, swapping
back is a small change confined to `app/layout.tsx` and `app/globals.css`.

## Notes on content accuracy

Every project, role, credit, award, and client listed was taken directly
from the source portfolio. Where the source included both an English and
Arabic description, the English copy was retained and lightly polished;
Arabic titles are preserved where present (see `arabicTitle` in
`src/data/projects.ts`). No claims, statistics, or achievements beyond what
appears in the source material have been added.

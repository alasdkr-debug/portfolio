import type Lenis from "@studio-freight/lenis";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Central check for the user's reduced-motion preference. Used by
// SmoothScroll, Reveal, RevealText, CustomCursor, and Hero so that anyone
// with "reduce motion" set at the OS level gets instant, static content
// instead of parallax/scroll-hijack/cursor-follow animation.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// A handful of contact links in src/data/site.ts are placeholders ("#")
// until real profile URLs are supplied. Rendering them as normal <a href="#">
// tags would jump-scroll to the top of the page on click, jarring the
// smooth-scroll experience — components should check this and render a
// disabled-looking, non-navigating element instead. See ExternalLink.tsx.
export function isPlaceholderHref(href: string): boolean {
  return href.trim() === "#";
}

// Deterministic gradient treatments used as placeholder cinematic imagery
// until real project stills/video are supplied. Swap these out by replacing
// the relevant <div className="poster-*"> block with a Next <Image>/<video>.
// Restyled around the deep crimson identity — every tone still reads as
// near-black first, with only a whisper of hue at the edges.
export const toneGradients: Record<string, string> = {
  warm: "radial-gradient(ellipse 120% 90% at 30% 0%, rgba(177,60,30,0.28) 0%, transparent 55%), linear-gradient(165deg, #1c0f0a 0%, #0d0806 55%, #070707 100%)",
  cool: "radial-gradient(ellipse 120% 90% at 70% 0%, rgba(30,90,110,0.22) 0%, transparent 55%), linear-gradient(165deg, #0a1416 0%, #080d0e 55%, #070707 100%)",
  crimson: "radial-gradient(ellipse 120% 90% at 50% 0%, rgba(177,18,38,0.38) 0%, transparent 58%), linear-gradient(165deg, #22070b 0%, #100507 55%, #070707 100%)",
  mono: "radial-gradient(ellipse 120% 90% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 55%), linear-gradient(165deg, #1a1a1a 0%, #0e0e0e 55%, #070707 100%)",
};

// Extracts a YouTube video ID from watch/short/embed URL shapes. Ignores
// trailing params (e.g. a &list= playlist param on a shared link) — only
// the single video is ever embedded.
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,15})/
  );
  return match ? match[1] : null;
}

// Extracts a status (tweet) ID from an x.com/twitter.com link so it can be
// rendered via Twitter's lightweight iframe embed.
export function getTweetId(url: string): string | null {
  const match = url.match(/(?:x|twitter)\.com\/[^/]+\/status\/(\d+)/);
  return match ? match[1] : null;
}

// Smooth-scrolls to an in-page section, accounting for the fixed nav
// header height so the section title doesn't land underneath it. Falls
// back to nothing if Lenis isn't mounted (reduced-motion visitors) —
// callers should skip preventDefault in that case and let the browser's
// native anchor jump handle it instead.
export function scrollToId(lenis: Lenis, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = typeof window !== "undefined" && window.innerWidth >= 768 ? -96 : -80;
  lenis.scrollTo(el, { offset, duration: 1.3 });
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, scrollToId } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Exposes the live Lenis instance to the rest of the tree (Nav, Hero,
// Footer) so in-page anchor links can scroll through Lenis instead of the
// browser's native jump — otherwise Lenis's virtual scroll position and a
// native hash jump fight each other, which is what made the nav links feel
// unreliable. Null while Lenis hasn't mounted yet, or for reduced-motion
// visitors who never get an instance — callers should treat null as "let
// the native anchor behavior handle it."
const LenisContext = createContext<Lenis | null>(null);
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wires Lenis smooth scroll into GSAP's ticker so ScrollTrigger stays in
 * sync with the custom scroll implementation across the whole site.
 *
 * If the user has "reduce motion" set at the OS level, Lenis is skipped
 * entirely and the browser's native scroll takes over — scroll-triggered
 * reveals still fire (see Reveal.tsx), just without the eased inertia.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Deep links from another page (e.g. a project page's "Selected Work"
  // link pointing at /#work) land here with a hash already in the URL.
  // Once Lenis is ready, scroll to it smoothly instead of relying on the
  // browser's instant native jump that already happened on page load.
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const id = requestAnimationFrame(() => scrollToId(lenis, hash));
    return () => cancelAnimationFrame(id);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

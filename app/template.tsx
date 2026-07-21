"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Applied to every route change: a soft cinematic fade/rise, consistent
// with the reveal language used throughout the site.
//
// Next.js remounts this component on every client-side navigation (the App
// Router's per-route template), so it also doubles as the right place to
// refresh GSAP's ScrollTrigger — otherwise trigger positions calculated on
// the previous page can be stale on a new page of different height,
// causing Reveal animations to fire at the wrong scroll offset.
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

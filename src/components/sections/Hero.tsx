"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "@/components/SmoothScroll";
import { useVideoModal } from "@/components/VideoModal";
import { person, showreelUrl } from "@/data/site";
import { prefersReducedMotion, scrollToId } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { openVideo } = useVideoModal();
  const reduced = useRef(false);

  // Mouse parallax — the whole hero stack drifts a few pixels against the
  // cursor, simulating a camera holding focus while gently repositioning.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 60, damping: 20 });
  const springY = useSpring(py, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(springX, [0, 1], [-14, 14]);
  const parallaxY = useTransform(springY, [0, 1], [-10, 10]);
  const glowLeft = useTransform(springX, [0, 1], ["35%", "65%"]);
  const glowTop = useTransform(springY, [0, 1], ["20%", "40%"]);
  const glowBg = useMotionTemplate`radial-gradient(ellipse 55% 45% at ${glowLeft} ${glowTop}, rgba(177,18,38,0.16), transparent 65%)`;

  // Scroll-linked depth-of-field: the hero softly recedes (scale up,
  // fades, gains blur) as the viewer scrolls past it — a cinematic focus
  // pull rather than a hard cut to the next section.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  useEffect(() => {
    reduced.current = prefersReducedMotion();
  }, []);

  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced.current) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleWorkClick(e: React.MouseEvent) {
    if (!lenis) return;
    e.preventDefault();
    scrollToId(lenis, "work");
    window.history.pushState(null, "", "#work");
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden grain vignette"
    >
      {/* Hero-local intensified atmosphere, layered above the global
          CinematicBackground for extra depth on the first screen only */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: glowBg }} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(110,13,24,0.22), transparent 60%), linear-gradient(180deg, transparent 0%, #070707 92%)",
        }}
      />

      <motion.div
        style={{ scale, opacity, filter }}
        className="max-w-content mx-auto w-full px-6 md:px-10 pb-28 md:pb-36 pt-48 md:pt-56"
      >
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="eyebrow mb-8"
        >
          Award-Winning Documentary Filmmaker
        </motion.div>

        <h1 className="font-display font-medium text-hero uppercase tracking-tight2">
          <div className="overflow-hidden">
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, y: "110%", filter: "blur(18px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            >
              {person.name.split(" ")[0]}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, y: "110%", filter: "blur(18px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-br from-accent-bright via-crimson to-crimson-deep"
            >
              {person.name.split(" ").slice(1).join(" ")}
            </motion.div>
          </div>
        </h1>

        <div className="mt-14 md:mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
            className="text-mist text-lead max-w-lg"
          >
            Creative Producer &amp; Storyteller — from a lockdown bedroom to Netflix, from Souq
            Okaz to national ministries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.95 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <button
              type="button"
              onClick={() => openVideo(showreelUrl, "Showreel — Covida the 19th")}
              className="btn-cinematic btn-cinematic--ghost group"
            >
              <span
                aria-hidden="true"
                className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-current transition-transform duration-500 group-hover:scale-110"
              />
              <span>Watch Showreel</span>
            </button>

            <Link href="#work" onClick={handleWorkClick} className="btn-cinematic btn-cinematic--primary group">
              <span>View Selected Work</span>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-white/12 text-paper flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 ease-expensive"
              >
                &#8599;
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-mist-dim"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-[10px] tracking-widest2 uppercase"
        >
          Scroll
        </motion.span>
        <span className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Global atmosphere layer — mounted once in the root layout, fixed behind
 * all page content (z-index 0, page content sits at z-index 10+). Builds
 * the site's "real film studio" depth with pure CSS/SVG, no image requests:
 *
 *   Background layer — animated crimson/black gradient wash
 *   Middle layer      — slow-drifting light beams + floating particles
 *   Foreground        — handled per-section by .glass-card / .glass-panel
 *
 * Respects prefers-reduced-motion by freezing every animated layer to a
 * single static frame instead of unmounting it, so the atmosphere/mood is
 * preserved for reduced-motion visitors — only the motion is removed.
 */
export default function CinematicBackground() {
  const [reduced, setReduced] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  // Mouse-reactive ambient glow — a very soft light that trails the cursor
  // across the whole page, simulating a real light source moving in front
  // of the camera. Skipped entirely for reduced-motion / touch devices.
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX;
    let curY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${curX - 320}px, ${curY - 320}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.round((i * 37) % 100),
        size: 1 + ((i * 13) % 3),
        duration: 18 + ((i * 7) % 14),
        delay: -((i * 5) % 20),
        drift: ((i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8)) + "px",
      })),
    []
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background layer — deep radial wash, near-black with a whisper of
          crimson at the core, never bright/saturated */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(110,13,24,0.16), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 100%, rgba(177,18,38,0.09), transparent 65%), #070707",
        }}
      />

      {/* Middle layer — slow light beams */}
      <div
        className="light-beam"
        style={{
          top: "-10%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(177,18,38,0.16), transparent 70%)",
          animation: reduced ? "none" : "beam-drift-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="light-beam"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(230,57,70,0.1), transparent 72%)",
          animation: reduced ? "none" : "beam-drift-b 32s ease-in-out infinite",
        }}
      />
      <div
        className="light-beam"
        style={{
          top: "35%",
          left: "40%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.03), transparent 70%)",
          animation: reduced ? "none" : "beam-drift-c 22s ease-in-out infinite",
        }}
      />

      {/* Mouse-reactive ambient glow */}
      {!reduced && (
        <div
          ref={glowRef}
          className="absolute w-[640px] h-[640px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(230,57,70,0.08), transparent 68%)",
            filter: "blur(10px)",
            willChange: "transform",
          }}
        />
      )}

      {/* Floating atmosphere particles — dust in the light */}
      {!reduced &&
        particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              bottom: "-5%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              // @ts-expect-error -- CSS custom property
              "--drift": p.drift,
              animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}

      {/* Film grain + edge vignette on top of everything */}
      <div className="grain absolute inset-0" />
      <div className="screen-vignette" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cx, prefersReducedMotion } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Masked line-by-line text reveal for cinematic headlines. Splits on line
 * breaks provided as an array of strings — kept simple and dependency-free
 * (no SplitText plugin) so the whole build stays free/open-source.
 */
export default function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-line]");

    if (prefersReducedMotion()) {
      gsap.set(items, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.35,
          ease: "power4.out",
          stagger: 0.1,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={cx(className)}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div data-line className={cx(lineClassName)}>
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

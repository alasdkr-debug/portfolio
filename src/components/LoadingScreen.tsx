"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

const SESSION_KEY = "ak-loading-shown";

/**
 * Opening title-sequence for the site — black screen, a slow spotlight
 * fade, the initials revealing letter by letter, then a smooth dissolve
 * into the Hero. Shown once per browser session (sessionStorage) so
 * repeat in-session navigation never re-triggers it. Reduced-motion
 * visitors and first paint skip straight past it via a near-instant
 * variant so nothing blocks content.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"spotlight" | "logo" | "done">("spotlight");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyShown = window.sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    window.sessionStorage.setItem(SESSION_KEY, "1");

    if (prefersReducedMotion()) {
      // Skip the sequence but still briefly acknowledge load for parity.
      setPhase("done");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setPhase("logo"), 500);
    const t2 = window.setTimeout(() => setPhase("done"), 2200);
    const t3 = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#040404] grain"
          aria-hidden="true"
        >
          {/* Slow spotlight bloom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: phase === "spotlight" ? 0.5 : 0.28, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[60vw] h-[60vw] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(177,18,38,0.35), transparent 68%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{
                opacity: phase === "spotlight" ? 0 : 1,
                letterSpacing: "0.3em",
              }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="loading-logo text-2xl md:text-3xl text-paper"
            >
              A. KARIM
            </motion.div>

            <div className="w-40 h-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase === "done" ? 1 : 0.75 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-crimson to-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

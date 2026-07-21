"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextValue>({ enabled: false, toggle: () => {} });

export function useSound() {
  return useContext(SoundContext);
}

/**
 * Architecture for optional ambient sound. Muted by default and respects
 * prefers-reduced-motion (sound stays off and the toggle is hidden for
 * those visitors, matching the spirit of reduced-motion — no unexpected
 * sensory input). No audio files ship yet; `enabled` is exposed via
 * useSound() for any future <audio> element (soft ambience, section
 * whooshes, hover ticks) to key off, so wiring real sound later is a
 * one-file change here rather than a site-wide rewrite.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  return (
    <SoundContext.Provider value={{ enabled: enabled && !reduced, toggle: () => setEnabled((v) => !v) }}>
      {children}
    </SoundContext.Provider>
  );
}

export default function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  if (reduced) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      className={className ?? "glass-chip w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 hover:border-accent/50"}
    >
      <span aria-hidden="true" className="text-xs">
        {enabled ? "🔊" : "🔈"}
      </span>
    </button>
  );
}

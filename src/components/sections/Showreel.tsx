"use client";

import Reveal from "@/components/Reveal";
import { useVideoModal } from "@/components/VideoModal";
import { showreelUrl } from "@/data/site";

export default function Showreel() {
  const { openVideo } = useVideoModal();

  return (
    <section id="showreel" aria-labelledby="showreel-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 text-center">
          <span className="eyebrow">Showreel</span>
          <h2 id="showreel-heading" className="font-display text-display-xl mt-5">In Motion</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-video rounded-panel overflow-hidden grain group border border-white/5 shadow-card-hover">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1c1710 0%, #0d0b08 45%, #050505 100%)",
              }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <button
              onClick={() => openVideo(showreelUrl, "Showreel — Covida the 19th")}
              className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
              aria-label="Play showreel"
            >
              <span
                aria-hidden="true"
                className="glass-chip w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-accent group-focus-visible:scale-110 group-focus-visible:border-accent transition-all duration-700 ease-expensive"
              >
                <span className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-accent ml-1" />
              </span>
            </button>

            <div aria-hidden="true" className="glass-chip absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-full px-5 py-3">
              <span className="text-sm tracking-wide">Selected Work Reel</span>
              <span className="text-xs text-mist-dim font-mono">2018 — 2025</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

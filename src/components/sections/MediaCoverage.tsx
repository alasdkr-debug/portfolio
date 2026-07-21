"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// No press/media coverage has been collected yet — intentionally a labeled
// placeholder rather than invented outlet names or headlines. Replace each
// slot with a real mention ({ outlet, headline, url, date }) as available.
export default function MediaCoverage() {
  return (
    <section id="media" aria-labelledby="media-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-14 md:mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="eyebrow">Media Coverage</span>
          <h2 id="media-heading" className="font-display text-display-lg mt-5">
            In the Press
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="glass-panel rounded-panel p-10 md:p-14 flex flex-col items-center text-center gap-3"
        >
          <span aria-hidden="true" className="w-10 h-10 rounded-full glass-chip flex items-center justify-center text-mist-dim text-sm mb-2">
            i
          </span>
          <p className="text-sm text-mist-dim max-w-md">
            Press mentions and media coverage will be listed here as they&rsquo;re published.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

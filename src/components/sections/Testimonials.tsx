"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// No client testimonials have been collected yet — this is intentionally a
// labeled placeholder rather than invented quotes attributed to real
// people or institutions. Replace each slot with a real testimonial
// ({ quote, name, role }) as they come in.
export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 md:mb-20 text-center max-w-2xl mx-auto"
        >
          <span className="eyebrow">Testimonials</span>
          <h2 id="testimonials-heading" className="font-display text-display-xl mt-5">
            What Collaborators Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="glass-card rounded-panel p-8 flex flex-col gap-6 items-start"
            >
              <span aria-hidden="true" className="font-serif text-5xl text-accent-dim leading-none">
                &ldquo;
              </span>
              <p className="text-sm text-mist-dim leading-relaxed italic">
                Client testimonial coming soon.
              </p>
              <div className="w-full pt-4 border-t border-hairline">
                <div className="h-3 w-24 rounded-full bg-white/8" />
                <div className="h-2.5 w-32 rounded-full bg-white/5 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-mist-dim mt-10">
          Testimonials from clients and collaborators will appear here as they&rsquo;re collected.
        </p>
      </div>
    </section>
  );
}

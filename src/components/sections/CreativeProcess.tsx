"use client";

import { motion } from "framer-motion";
import { creativeProcess } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CreativeProcess() {
  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 md:mb-20 text-center max-w-2xl mx-auto"
        >
          <span className="eyebrow">Creative Process</span>
          <h2 id="process-heading" className="font-display text-display-xl mt-5">
            How a Story Gets Made
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5">
          {creativeProcess.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="glass-card rounded-panel p-6 md:p-7 flex flex-col gap-4"
            >
              <span className="font-display text-3xl text-transparent bg-clip-text bg-gradient-to-br from-accent-bright to-crimson-deep">
                {step.index}
              </span>
              <h3 className="font-display text-lg">{step.title}</h3>
              <p className="text-sm text-mist leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

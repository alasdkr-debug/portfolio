"use client";

import { motion } from "framer-motion";
import ExternalLink from "@/components/ExternalLink";
import TiltCard from "@/components/TiltCard";
import { person, socials } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  { key: "linkedin", href: socials.linkedin, label: "LinkedIn" },
  { key: "instagram", href: socials.instagram, label: "Instagram" },
  { key: "portfolio", href: "#", label: "Portfolio PDF" },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-36 md:py-52 vignette">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <TiltCard maxTilt={2.5} className="glass-panel rounded-panel px-6 py-16 md:px-20 md:py-24 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="eyebrow">Contact</span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="lede-serif text-display-2xl mt-7 max-w-4xl mx-auto"
          >
            Let&rsquo;s tell a story worth remembering.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={`mailto:${socials.email}`} className="btn-cinematic btn-cinematic--primary text-base">
              <span>{person.email}</span>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-white/12 flex items-center justify-center"
              >
                &#8599;
              </span>
            </a>
            <span className="btn-cinematic btn-cinematic--ghost text-base cursor-default">
              <span>{person.phone}</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            className="mt-16 flex items-center justify-center gap-5"
          >
            {socialLinks.map((s) => (
              <ExternalLink key={s.key} href={s.href} className="group">
                <span
                  className="glass-chip w-14 h-14 rounded-full flex items-center justify-center text-xs font-mono tracking-wide transition-all duration-500 ease-cinematic group-hover:border-accent/60 group-hover:-translate-y-1 group-hover:shadow-glow"
                  title={s.label}
                >
                  {s.label
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="sr-only">{s.label}</span>
              </ExternalLink>
            ))}
          </motion.div>
        </TiltCard>
      </div>
    </section>
  );
}

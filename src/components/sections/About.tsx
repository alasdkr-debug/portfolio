"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { person, timeline, awards, clients } from "@/data/site";
import { projects } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: projects.length, suffix: "+", label: "Documentary Films & Campaigns" },
  { value: awards.length, suffix: "", label: "Award-Winning Selections" },
  { value: clients.length, suffix: "", label: "Government & Institutional Clients" },
  { value: 8, suffix: "+", label: "Years Behind the Lens" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-14 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <span className="eyebrow">About</span>
              <h2 id="about-heading" className="font-display text-display-lg mt-5">
                A Storyteller
                <br />
                Behind the Lens
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <TiltCard className="group aspect-[4/5] rounded-panel overflow-hidden grain glass-card">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(177,18,38,0.22), transparent 60%), linear-gradient(165deg, #140507 0%, #0a0404 60%, #070707 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-7">
                  <span className="text-xs text-mist tracking-widest2 uppercase">{person.born}</span>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6 flex flex-col justify-center gap-9">
            {person.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-xl md:text-2xl leading-relaxed2 text-mist font-light max-w-[42rem]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Animated statistics — counted from the real project/award/client
            data below, never hand-typed numbers that can drift out of sync. */}
        <Reveal delay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline rounded-panel overflow-hidden mt-24 md:mt-32">
          {stats.map((s) => (
            <div key={s.label} className="glass-card !border-0 !rounded-none p-8 md:p-10 flex flex-col gap-3">
              <div className="counter-figure">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-mist leading-snug">{s.label}</div>
            </div>
          ))}
        </Reveal>

        {/* Career timeline — vertical glass rail */}
        <div className="mt-28 md:mt-36">
          <Reveal>
            <span className="eyebrow">Career</span>
            <h3 className="font-display text-display-md mt-5">Professional Timeline</h3>
          </Reveal>

          <div className="relative mt-14 pl-8 md:pl-12">
            <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-hairline-strong to-transparent" />
            <ol className="flex flex-col gap-10">
              {timeline.map((t, i) => (
                <motion.li
                  key={t.role + t.period}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.06 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 md:-left-12 top-1.5 w-2.5 h-2.5 rounded-full bg-accent shadow-glow-soft"
                  />
                  <div className="glass-card rounded-card p-6 md:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="font-display text-lg">{t.role}</div>
                      <span className="text-xs text-mist-dim font-mono whitespace-nowrap">{t.period}</span>
                    </div>
                    <div className="text-sm text-accent-bright mt-1.5">{t.org}</div>
                    <p className="text-sm text-mist mt-2.5 leading-relaxed max-w-lg">{t.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

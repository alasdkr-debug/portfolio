import Reveal from "@/components/Reveal";
import { awards } from "@/data/site";

// The full career timeline now lives in About.tsx alongside the animated
// stats; Awards focuses purely on recognition/milestones, presented as a
// row of glass cards for a more "trophy shelf" feel.
export default function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="eyebrow">Awards &amp; Recognition</span>
          <h2 id="awards-heading" className="font-display text-display-xl mt-5">Milestones</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="glass-card rounded-panel p-7 md:p-8 flex gap-6 h-full">
                <span className="text-xs text-accent-bright font-mono pt-1 shrink-0">{a.year}</span>
                <div>
                  <div className="font-display text-lg">{a.title}</div>
                  <p className="text-sm text-mist mt-1.5 leading-relaxed">{a.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

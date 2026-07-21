import Reveal from "@/components/Reveal";
import { clients } from "@/data/site";

export default function Clients() {
  return (
    <section id="clients" aria-labelledby="clients-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20 text-center">
          <span className="eyebrow">Clients &amp; Collaborations</span>
          <h2 id="clients-heading" className="font-display text-display-lg mt-5">Trusted By</h2>
        </Reveal>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 list-none p-0 m-0">
          {clients.map((c, i) => (
            <Reveal
              key={c}
              as="li"
              delay={0.03 * i}
              className="group glass-card rounded-card flex items-center justify-center text-center px-6 py-14 md:py-16 transition-colors duration-500 hover:border-accent/40"
            >
              <span className="text-sm md:text-base text-mist tracking-wide transition-colors duration-500 group-hover:text-paper">
                {c}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

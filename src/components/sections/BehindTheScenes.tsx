import Link from "next/link";
import Reveal from "@/components/Reveal";
import { toneGradients } from "@/lib/utils";
import { projects } from "@/data/projects";

// A masonry-style editorial gallery built from project tones as placeholder
// imagery. Replace each tile's background with a real BTS photograph.
// Each tile links back to its project page — real behind-the-scenes
// texture should stay connected to the work it came from, not float free.
const tiles = projects.slice(0, 8);

export default function BehindTheScenes() {
  return (
    <section id="behind-the-scenes" aria-labelledby="bts-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal className="mb-16 md:mb-20">
          <span className="eyebrow">Behind the Scenes</span>
          <h2 id="bts-heading" className="font-display text-display-lg mt-5">On Location</h2>
        </Reveal>

        <div className="columns-2 md:columns-3 gap-5 space-y-5">
          {tiles.map((p, i) => (
            <Reveal key={p.slug} delay={0.04 * i} className="break-inside-avoid">
              <Link
                href={`/work/${p.slug}`}
                className="group relative block overflow-hidden rounded-card grain glass-card shadow-card transition-shadow duration-700 ease-cinematic hover:shadow-card-hover"
                aria-label={`View project: ${p.title}`}
              >
                <div
                  aria-hidden="true"
                  className={`w-full transition-transform duration-900 ease-expensive group-hover:scale-105 group-focus-visible:scale-105 ${
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                  style={{ background: toneGradients[p.tone] }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 flex items-end p-5"
                >
                  <span className="text-xs tracking-wide">{p.title}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

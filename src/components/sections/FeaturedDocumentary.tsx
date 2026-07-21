"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectPoster from "@/components/ProjectPoster";
import { useVideoModal } from "@/components/VideoModal";
import { getProject } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

// Spotlights the single most award-recognised existing film — real data
// only (Netflix selection + Red Sea IFF official selection), no new claims.
export default function FeaturedDocumentary() {
  const project = getProject("covida-the-19th");
  const { openVideo } = useVideoModal();
  if (!project) return null;

  return (
    <section
      id="featured-documentary"
      aria-labelledby="featured-heading"
      className="relative py-32 md:py-44"
    >
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <span className="eyebrow">Featured Documentary</span>
          <h2 id="featured-heading" className="font-display text-display-xl mt-5 max-w-2xl">
            From a Bedroom to Netflix
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="glass-card rounded-panel overflow-hidden grid md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] md:aspect-auto">
            <ProjectPoster project={project} className="absolute inset-0" />
          </div>

          <div className="p-8 md:p-14 flex flex-col justify-center gap-7">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{project.category}</span>
              <span className="text-xs text-mist-dim font-mono">{project.duration}</span>
            </div>

            <h3 className="font-display text-display-md">{project.title}</h3>

            <p className="text-mist leading-relaxed max-w-lg">{project.overview}</p>

            {project.awards && (
              <ul className="flex flex-col gap-2">
                {project.awards.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-accent-bright">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow-soft" />
                    {a}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.watchUrl && (
                <button
                  type="button"
                  onClick={() => openVideo(project.watchUrl!, project.title)}
                  className="btn-cinematic btn-cinematic--primary"
                >
                  <span
                    aria-hidden="true"
                    className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current"
                  />
                  <span>Watch Trailer</span>
                </button>
              )}
              <Link href={`/work/${project.slug}`} className="btn-cinematic btn-cinematic--ghost">
                <span>Full Story</span>
                <span aria-hidden="true">&#8599;</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

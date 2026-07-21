"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectPoster from "@/components/ProjectPoster";
import { useVideoModal } from "@/components/VideoModal";
import { projects, type Project } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SelectedWork() {
  const { openVideo } = useVideoModal();

  function handleTrailerClick(e: React.MouseEvent, project: Project) {
    e.preventDefault();
    if (project.watchUrl) openVideo(project.watchUrl, project.title);
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-32 md:py-44">
      <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-end justify-between mb-16 md:mb-24"
        >
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 id="work-heading" className="font-display text-display-xl mt-5">Films &amp; Campaigns</h2>
          </div>
          <span className="hidden md:block text-mist-dim text-sm font-mono">
            {String(projects.length).padStart(2, "0")} Productions
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group relative"
            >
              <div className="relative rounded-panel overflow-hidden shadow-card transition-shadow duration-700 ease-cinematic group-hover:shadow-card-hover">
                {/* Base layer: poster art + full-card link (SEO/keyboard
                    navigation to the project page). Sits behind the
                    interactive overlay so the explicit buttons above it
                    remain independently clickable. */}
                <ProjectPoster project={project} index={i} className="aspect-[2/3]" />
                <Link
                  href={`/work/${project.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View details for ${project.title}`}
                />

                {/* Overlay: title always visible, full detail rises on
                    hover/focus with explicit Watch Trailer / View Details
                    CTAs — deliberately above the base link in the stacking
                    order (relative + z-10) so both buttons work. */}
                <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none p-5 md:p-6 flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow !text-[10px]">{project.category}</span>
                    {project.duration && (
                      <span className="text-[11px] text-mist-dim font-mono">{project.duration}</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl leading-tight mt-1">{project.title}</h3>

                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-cinematic">
                    <div className="overflow-hidden">
                      <p className="text-sm text-mist leading-relaxed pt-3 pb-1 line-clamp-3">
                        {project.synopsis}
                      </p>
                      <p className="text-xs text-accent-bright tracking-wide pb-4">{project.role}</p>

                      <div className="flex items-center gap-3 pb-1 pointer-events-auto">
                        {project.watchUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleTrailerClick(e, project)}
                            className="glass-chip px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 hover:border-accent/60 transition-colors duration-500"
                          >
                            <span
                              aria-hidden="true"
                              className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-current"
                            />
                            Watch Trailer
                          </button>
                        )}
                        <Link
                          href={`/work/${project.slug}`}
                          className="px-4 py-2 rounded-full text-xs font-medium border border-hairline hover:border-white/40 transition-colors duration-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import ProjectPoster from "@/components/ProjectPoster";
import { useVideoModal } from "@/components/VideoModal";
import { projects, type Project } from "@/data/projects";

export default function RelatedProjects({ current }: { current: Project }) {
  const related = projects.filter((p) => p.slug !== current.slug).slice(0, 3);
  const { openVideo } = useVideoModal();

  function handleTrailerClick(e: React.MouseEvent, project: Project) {
    e.preventDefault();
    if (project.watchUrl) openVideo(project.watchUrl, project.title);
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {related.map((p, i) => (
        <div key={p.slug} className="group relative">
          <div className="relative rounded-card overflow-hidden mb-5 border border-white/10 shadow-card transition-shadow duration-700 ease-cinematic group-hover:shadow-card-hover">
            <ProjectPoster project={p} index={i} className="aspect-[4/5]" />
            <Link href={`/work/${p.slug}`} className="absolute inset-0 z-0" aria-label={`View details for ${p.title}`} />
            {p.watchUrl && (
              <button
                type="button"
                onClick={(e) => handleTrailerClick(e, p)}
                className="glass-chip absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <span
                  aria-hidden="true"
                  className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-current"
                />
                Trailer
              </button>
            )}
          </div>
          <span className="eyebrow">{p.category}</span>
          <h3 className="font-display text-xl mt-3">
            <Link
              href={`/work/${p.slug}`}
              className="link-underline group-hover:text-accent-bright transition-colors duration-700 ease-cinematic"
            >
              {p.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
}

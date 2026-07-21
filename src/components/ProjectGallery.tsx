import { toneGradients } from "@/lib/utils";
import type { Project } from "@/data/projects";

// Simple 3-up editorial gallery placeholder for a project detail page.
// Replace each tile with a real production still.
export default function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="grid md:grid-cols-3 gap-5" role="group" aria-label={`Gallery images for ${project.title}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="group aspect-[3/4] rounded-card overflow-hidden grain relative glass-card transition-shadow duration-700 ease-cinematic hover:shadow-card-hover"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-[1200ms] ease-expensive group-hover:scale-[1.06]"
            style={{
              background: toneGradients[project.tone],
              filter: `brightness(${0.85 + i * 0.08})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

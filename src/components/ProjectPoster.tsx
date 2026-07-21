import { toneGradients } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { cx } from "@/lib/utils";

/**
 * Cinematic "poster" treatment for a project — a tone-based gradient plus
 * grain, a diagonal light-sweep on hover, and a subtle zoom. Replace the
 * background div with a Next <Image> once real stills are available:
 *   <Image src={`/images/projects/${project.slug}.jpg`} fill className="object-cover" alt="" />
 *
 * Radius/border/shadow are left to the caller's `className` since the
 * project-page hero usage needs a full-bleed, unrounded treatment.
 */
export default function ProjectPoster({
  project,
  className,
  index,
}: {
  project: Project;
  className?: string;
  index?: number;
}) {
  return (
    <div className={cx("relative overflow-hidden grain isolate", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-[1400ms] ease-expensive group-hover:scale-[1.08]"
        style={{ background: toneGradients[project.tone] }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Diagonal light sweep on hover — the poster's own glossy highlight,
          independent of .glass-card so it also works on full-bleed heroes. */}
      <div
        aria-hidden="true"
        className="absolute top-0 -left-2/3 w-1/2 h-full pointer-events-none transition-[left] duration-[1100ms] ease-expensive group-hover:left-[140%]"
        style={{
          background: "linear-gradient(75deg, transparent, rgba(255,255,255,0.12), transparent)",
          transform: "skewX(-18deg)",
        }}
      />

      {typeof index === "number" && (
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 text-[11px] text-mist font-mono tracking-wide px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div aria-hidden="true" className="absolute top-4 right-4">
        <span className="w-2 h-2 rounded-full bg-accent/80 inline-block shadow-glow" />
      </div>
    </div>
  );
}

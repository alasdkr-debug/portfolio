import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ProjectPoster from "@/components/ProjectPoster";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectWatchButton from "@/components/ProjectWatchButton";
import RelatedProjects from "@/components/RelatedProjects";
import { projects, getProject } from "@/data/projects";
import { person } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.synopsis,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${person.name}`,
      description: project.synopsis,
      type: "video.other",
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  // CreativeWork structured data for this project — built entirely from
  // src/data/projects.ts, no new claims asserted.
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    creator: { "@type": "Person", name: person.name },
    description: project.synopsis,
    genre: project.category,
    ...(project.duration ? { duration: project.duration } : {}),
    ...(project.client ? { provider: project.client } : {}),
    ...(project.awards ? { award: project.awards } : {}),
    ...(project.watchUrl ? { url: project.watchUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      {/* Hero — IMDb-style title block: full-bleed poster, category/runtime
          strip, large title, and (if available) an instant-watch CTA. */}
      <section className="relative min-h-[92svh] flex flex-col justify-end overflow-hidden grain pt-40">
        <ProjectPoster project={project} className="absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="relative max-w-content mx-auto w-full px-6 md:px-10 pb-20 md:pb-24">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs text-mist-dim hover:text-paper transition-colors duration-500"
          >
            <span aria-hidden="true" className="transition-transform duration-500 ease-cinematic group-hover:-translate-x-1">&larr;</span>
            <span className="link-underline">Back to Selected Work</span>
          </Link>
          <div className="flex items-center gap-4 mt-8 mb-5">
            <span className="eyebrow">{project.category}</span>
            {project.duration && (
              <span className="text-xs text-mist-dim font-mono">{project.duration}</span>
            )}
            {project.awards && project.awards.length > 0 && (
              <span className="text-xs text-accent-bright font-mono">
                {project.awards.length} {project.awards.length === 1 ? "Recognition" : "Recognitions"}
              </span>
            )}
          </div>
          <h1 className="font-display text-display-2xl max-w-4xl">{project.title}</h1>
          {project.arabicTitle && (
            <p className="text-mist mt-4 text-lg" lang="ar" dir="rtl">{project.arabicTitle}</p>
          )}

          {project.watchUrl && (
            <div className="mt-10">
              <ProjectWatchButton url={project.watchUrl} title={project.title} />
            </div>
          )}
        </div>
      </section>

      {/* Overview + Details */}
      <section aria-labelledby="overview-heading" className="relative py-32 md:py-44">
        <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
        <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <h2 id="overview-heading" className="eyebrow">Overview</h2>
              <p className="text-xl md:text-2xl leading-relaxed2 text-mist font-light mt-7 max-w-[42rem]">
                {project.overview}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal className="glass-card rounded-panel p-8 flex flex-col gap-9">
              <dl className="flex flex-col gap-9">
                <div>
                  <dt className="eyebrow">My Role</dt>
                  <dd className="mt-2.5 text-lg">{project.role}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="eyebrow">Client</dt>
                    <dd className="mt-2.5 text-lg">{project.client}</dd>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <dt className="eyebrow">Runtime</dt>
                    <dd className="mt-2.5 text-lg">{project.duration}</dd>
                  </div>
                )}
                {project.awards && (
                  <div>
                    <dt className="eyebrow">Recognition</dt>
                    <dd className="mt-2.5">
                      <ul className="flex flex-col gap-1.5">
                        {project.awards.map((a) => (
                          <li key={a} className="text-sm text-accent-bright">{a}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
              {project.watchUrl && (
                <a
                  href={project.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cinematic btn-cinematic--ghost w-fit"
                >
                  <span>Open on Source</span>
                  <span aria-hidden="true">&#8599;</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-heading" className="relative py-32 md:py-44">
        <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
        <div className="max-w-content mx-auto px-6 md:px-10">
          <Reveal className="mb-14">
            <span className="eyebrow">Gallery</span>
            <h2 id="gallery-heading" className="font-display text-display-md mt-5">Frames from the Field</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectGallery project={project} />
          </Reveal>
        </div>
      </section>

      {/* Production Credits */}
      <section aria-labelledby="credits-heading" className="relative py-32 md:py-44">
        <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
        <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14">
          <Reveal className="glass-card rounded-panel p-8 md:p-10">
            <h2 id="credits-heading" className="eyebrow">Production Credits</h2>
            <dl className="mt-7 flex flex-col gap-5">
              <div className="flex justify-between border-b border-hairline pb-5 transition-colors duration-500 hover:border-hairline-strong">
                <dt className="text-mist text-sm">Creative</dt>
                <dd className="text-sm text-right">{project.role}</dd>
              </div>
              {project.client && (
                <div className="flex justify-between border-b border-hairline pb-5 transition-colors duration-500 hover:border-hairline-strong">
                  <dt className="text-mist text-sm">Commissioned by</dt>
                  <dd className="text-sm text-right">{project.client}</dd>
                </div>
              )}
              <div className="flex justify-between pb-1">
                <dt className="text-mist text-sm">Category</dt>
                <dd className="text-sm text-right">{project.category}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-heading" className="relative py-32 md:py-44">
        <div aria-hidden="true" className="section-divider absolute top-0 left-0" />
        <div className="max-w-content mx-auto px-6 md:px-10">
          <Reveal className="mb-14">
            <span className="eyebrow">Continue Watching</span>
            <h2 id="related-heading" className="font-display text-display-md mt-5">Related Projects</h2>
          </Reveal>
          <RelatedProjects current={project} />
        </div>
      </section>
    </>
  );
}

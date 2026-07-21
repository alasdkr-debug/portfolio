"use client";

import { useVideoModal } from "@/components/VideoModal";

/**
 * Small client-only island so the (server) project detail page can trigger
 * the global instant-play video modal without becoming a client component
 * itself — generateStaticParams/generateMetadata must stay server exports.
 */
export default function ProjectWatchButton({ url, title }: { url: string; title: string }) {
  const { openVideo } = useVideoModal();

  return (
    <button
      type="button"
      onClick={() => openVideo(url, title)}
      className="btn-cinematic btn-cinematic--primary w-fit"
    >
      <span
        aria-hidden="true"
        className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current"
      />
      <span>Watch Trailer</span>
    </button>
  );
}

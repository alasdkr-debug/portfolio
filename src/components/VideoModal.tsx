"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/SmoothScroll";
import { getTweetId, getYouTubeId } from "@/lib/utils";

type VideoModalState = {
  url: string;
  title: string;
} | null;

type VideoModalContextValue = {
  openVideo: (url: string, title?: string) => void;
  closeVideo: () => void;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

/**
 * Global "watch instantly" modal. Any component can call useVideoModal()
 * and openVideo(url, title) to play a project's video (or the showreel)
 * inline, without leaving the page. Understands two link shapes present
 * in the project data — YouTube and X/Twitter status links — and embeds
 * each appropriately; anything else falls back to an "open in new tab"
 * card instead of a broken embed.
 */
export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) {
    throw new Error("useVideoModal must be used within VideoModalProvider");
  }
  return ctx;
}

export default function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<VideoModalState>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  const openVideo = useCallback((url: string, title = "Watch") => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setState({ url, title });
  }, []);

  const closeVideo = useCallback(() => {
    setState(null);
  }, []);

  // Lock scrolling (via Lenis if it's mounted, plus a body-overflow
  // fallback for reduced-motion visitors) while the modal is open, and
  // restore focus to whatever opened it on close.
  useEffect(() => {
    if (!state) return;

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      lastFocusedRef.current?.focus();
    };
  }, [state, lenis, closeVideo]);

  return (
    <VideoModalContext.Provider value={{ openVideo, closeVideo }}>
      {children}
      {state && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={state.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={closeVideo}
          />

          <div className="relative w-full max-w-5xl">
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow text-mist truncate pr-4">{state.title}</span>
              <button
                ref={closeButtonRef}
                onClick={closeVideo}
                aria-label="Close video"
                className="glass-chip w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-paper hover:border-accent/60 transition-colors duration-500"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  &#10005;
                </span>
              </button>
            </div>

            <div className="glass-panel rounded-panel overflow-hidden aspect-video">
              <VideoEmbed url={state.url} title={state.title} />
            </div>
          </div>
        </div>
      )}
    </VideoModalContext.Provider>
  );
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const youTubeId = getYouTubeId(url);
  if (youTubeId) {
    return (
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const tweetId = getTweetId(url);
  if (tweetId) {
    return (
      <iframe
        className="w-full h-full bg-white"
        src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&dnt=true`}
        title={title}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-mist text-sm">This film opens on its original platform.</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cinematic btn-cinematic--primary"
      >
        <span>Watch the Film</span>
        <span aria-hidden="true">&#8599;</span>
      </a>
    </div>
  );
}

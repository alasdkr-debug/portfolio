import { cx, isPlaceholderHref } from "@/lib/utils";

/**
 * Wraps an external link (LinkedIn, Instagram, downloadable PDF, etc.).
 * If the href is still the "#" placeholder (see src/data/site.ts), it
 * renders as a visibly inert label instead of a real link — clicking a
 * bare "#" anchor would otherwise jump-scroll to the top of the page,
 * which is jarring on a smooth-scroll cinematic site. Once real URLs are
 * added to src/data/site.ts, this automatically becomes a real link with
 * target="_blank" and proper rel attributes.
 */
export default function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (isPlaceholderHref(href)) {
    return (
      <span
        className={cx("cursor-not-allowed opacity-50", className)}
        aria-disabled="true"
        title="Link coming soon"
      >
        {children}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ExternalLink from "@/components/ExternalLink";
import { useLenis } from "@/components/SmoothScroll";
import { person, socials } from "@/data/site";
import { scrollToId } from "@/lib/utils";

export default function Footer() {
  const lenis = useLenis();
  const pathname = usePathname();

  function handleNavClick(e: React.MouseEvent, id: string) {
    if (pathname !== "/" || !lenis) return;
    e.preventDefault();
    scrollToId(lenis, id);
    window.history.pushState(null, "", `#${id}`);
  }

  return (
    <footer className="relative">
      <div aria-hidden="true" className="section-divider" />

      <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24 grid gap-14 md:grid-cols-3 md:gap-10">
        <div>
          <div className="font-display text-2xl">{person.name}</div>
          <p className="text-mist text-sm mt-3 max-w-xs leading-relaxed">{person.title}</p>
        </div>

        <address className="flex flex-col gap-3 text-sm not-italic">
          <span className="eyebrow mb-1">Contact</span>
          <a href={`mailto:${socials.email}`} className="link-underline w-fit text-base">
            {socials.email}
          </a>
          <ExternalLink
            href={socials.linkedin}
            className="link-underline w-fit text-mist hover:text-paper transition-colors duration-500"
          >
            LinkedIn
          </ExternalLink>
          <ExternalLink
            href={socials.instagram}
            className="link-underline w-fit text-mist hover:text-paper transition-colors duration-500"
          >
            Instagram
          </ExternalLink>
        </address>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm md:items-end">
          <span className="eyebrow mb-1">Navigate</span>
          <Link
            href="/#work"
            onClick={(e) => handleNavClick(e, "work")}
            className="link-underline w-fit md:text-right text-mist hover:text-paper transition-colors duration-500"
          >
            Selected Work
          </Link>
          <Link
            href="/#awards"
            onClick={(e) => handleNavClick(e, "awards")}
            className="link-underline w-fit md:text-right text-mist hover:text-paper transition-colors duration-500"
          >
            Awards
          </Link>
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="link-underline w-fit md:text-right text-mist hover:text-paper transition-colors duration-500"
          >
            Get in Touch
          </Link>
        </nav>
      </div>

      <div className="border-t border-hairline">
        <div className="max-w-content mx-auto px-6 md:px-10 pt-8 pb-10 flex flex-col md:flex-row justify-between text-xs text-mist-dim gap-2 tracking-wide">
          <span>&copy; {new Date().getFullYear()} {person.name}. All rights reserved.</span>
          <span>Documentary Film &amp; Creative Direction</span>
        </div>
      </div>
    </footer>
  );
}

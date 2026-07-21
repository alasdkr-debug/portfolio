"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/SmoothScroll";
import SoundToggle from "@/components/SoundToggle";
import { cx, scrollToId } from "@/lib/utils";

// Order mirrors the homepage's actual section order — see app/page.tsx.
const links = [
  { href: "/#featured-documentary", label: "Featured", id: "featured-documentary" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#process", label: "Process", id: "process" },
  { href: "/#awards", label: "Awards", id: "awards" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lightweight scroll-spy: highlight whichever nav section currently owns
  // the vertical center of the viewport. Purely additive — no effect on
  // routing, content, or markup order.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Routes the nav links through Lenis instead of the browser's native
  // anchor jump, and accounts for the fixed header's height so a section
  // title never lands hidden behind it. Only intercepts on the homepage —
  // from any other route the <Link> just does a normal navigation to
  // "/#id", which SmoothScroll's hash-on-mount effect then picks up.
  function handleNavClick(e: React.MouseEvent, id: string) {
    if (pathname !== "/" || !lenis) return;
    e.preventDefault();
    scrollToId(lenis, id);
    window.history.pushState(null, "", `#${id}`);
  }

  return (
    <header
      className={cx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-cinematic",
        scrolled ? "glass-bar" : "bg-transparent"
      )}
    >
      <nav aria-label="Primary" className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 h-20 md:h-24">
        <Link href="/" className="font-display text-sm tracking-widest2 uppercase transition-opacity hover:opacity-70">
          A. Karim
        </Link>

        <ul className="hidden md:flex items-center gap-12 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={(e) => handleNavClick(e, l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={cx(
                  "link-underline transition-colors duration-500",
                  active === l.id ? "text-accent-bright" : "text-mist hover:text-paper"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SoundToggle className="hidden md:flex glass-chip w-10 h-10 rounded-full items-center justify-center transition-colors duration-500 hover:border-accent/50" />
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 w-8 p-2 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" className={cx("h-px bg-white transition-transform duration-500 ease-cinematic", open && "translate-y-2 rotate-45")} />
            <span aria-hidden="true" className={cx("h-px bg-white transition-opacity duration-300", open && "opacity-0")} />
            <span aria-hidden="true" className={cx("h-px bg-white transition-transform duration-500 ease-cinematic", open && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cx(
          "md:hidden glass-panel border-x-0 border-t-0 rounded-none overflow-hidden transition-[grid-template-rows] duration-500 ease-cinematic grid",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        )}
      >
        <ul className="flex flex-col px-6 py-8 gap-7 min-h-0 overflow-hidden">
          {links.map((l, i) => (
            <li
              key={l.href}
              className="transition-all duration-500 ease-cinematic"
              style={{
                transitionDelay: open ? `${80 + i * 55}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <Link
                href={l.href}
                onClick={(e) => {
                  handleNavClick(e, l.id);
                  setOpen(false);
                }}
                tabIndex={open ? 0 : -1}
                className={cx(
                  "text-2xl font-display transition-colors",
                  active === l.id ? "text-accent-bright" : "text-mist hover:text-paper"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

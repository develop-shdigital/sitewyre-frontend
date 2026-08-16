"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { site } from "@/lib/site";
import { motionTokens } from "@/lib/motion-tokens";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const magnetic = useMagnetic(0.25);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 transition-colors"
        animate={{
          backgroundColor: scrolled ? "rgba(255,254,252,0.75)" : "rgba(255,254,252,0)",
          borderBottomColor: scrolled ? "var(--color-border)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <nav className="container-page flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-h2 font-medium tracking-tight" data-cursor="interactive">
            {site.name}
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-label uppercase text-fg-muted transition-colors hover:text-fg"
                  data-cursor="interactive"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <motion.span
            ref={magnetic.ref as React.RefObject<HTMLSpanElement>}
            style={magnetic.style}
            onPointerMove={magnetic.onPointerMove}
            onPointerLeave={magnetic.onPointerLeave}
            className="hidden md:inline-block"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 font-mono text-label uppercase text-bg-elevated transition-colors hover:bg-accent"
              data-cursor="open"
              data-cursor-label="OPEN"
            >
              Start a project <span aria-hidden>→</span>
            </Link>
          </motion.span>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="h-px w-7 bg-fg" />
            <span className="h-px w-7 bg-fg" />
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

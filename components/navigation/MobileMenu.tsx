"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
import { motionTokens, springs } from "@/lib/motion-tokens";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.lg },
  visible: { opacity: 1, y: 0, transition: springs.gentle },
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80] flex flex-col bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.duration.fast }}
        >
          <div className="container-page flex h-20 items-center justify-between">
            <span className="font-display text-h2 font-medium">{site.name}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-mono text-label uppercase text-fg-muted"
            >
              Close
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="container-page flex flex-1 flex-col justify-center gap-2"
          >
            {site.nav.map((item) => (
              <motion.li key={item.href} variants={itemVariants} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 font-display text-display-2 tracking-tight text-fg"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={itemVariants} className="mt-6 overflow-hidden">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-block rounded-full border border-accent px-6 py-3 font-mono text-label uppercase text-accent-ink"
              >
                Start a project
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

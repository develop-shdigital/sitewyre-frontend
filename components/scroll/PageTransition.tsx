"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { motionTokens } from "@/lib/motion-tokens";

const variants = {
  initial: { opacity: 0, y: motionTokens.distance.sm },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -motionTokens.distance.sm },
};

/** Fast, directional cross-fade between routes — no loading spinners. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

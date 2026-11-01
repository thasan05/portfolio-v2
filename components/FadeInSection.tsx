"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "none";
  className?: string;
}

export default function FadeInSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      // opacity:1 on purpose (same reasoning as Hero.tsx): Framer writes `initial`
      // into the SSR HTML, so opacity:0 hid ~20 sections until their client
      // components hydrated, and it stacked with each child's own opacity:0.
      // The children own the fade; the card owns the rise.
      initial={{ opacity: 1, y: direction === "up" ? 20 : 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 0.7,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

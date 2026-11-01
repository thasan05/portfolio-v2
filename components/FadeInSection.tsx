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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.01, y: direction === "up" ? 16 : 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.01, y: direction === "up" ? 16 : 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

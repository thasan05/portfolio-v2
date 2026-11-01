"use client";

import { MotionConfig } from "framer-motion";

/**
 * The prefers-reduced-motion block in globals.css can only zero animation- and
 * transition-duration; it cannot touch the inline transforms Framer writes from
 * rAF. Wrapping the tree in MotionConfig makes every descendant animation —
 * section reveals, per-item staggers, hovers, the Beyond lightbox — respect the
 * OS setting.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

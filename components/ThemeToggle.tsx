"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="grid size-9 place-items-center text-muted" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid size-9 place-items-center rounded-full text-muted transition-transform hover:text-fg hover:scale-105 active:scale-95"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -40, opacity: 0, scale: 0.75 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 40, opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Sun className="size-[18px] text-amber-300" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Moon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

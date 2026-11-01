"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CommandPalette from "./CommandPalette";

export default function SiteHeader({ showBlog = true }: { showBlog?: boolean }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar
        showBlog={showBlog}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}

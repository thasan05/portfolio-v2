"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  showBlog?: boolean;
}

export default function Navbar({ showBlog = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <header className="container-wide flex items-center justify-between gap-4 py-6 border-b border-line/40">
      <Link
        href="/"
        className="font-serif text-xl font-semibold tracking-tight transition-opacity hover:opacity-90"
        aria-label="Tanvir Hasan, home"
      >
        Tanvir<span className="text-accent">.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav aria-label="Main" className="hidden sm:flex items-center gap-1 text-sm sm:gap-2">
        <Link
          href="/#about"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          About
        </Link>
        <Link
          href="/#projects"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          Projects
        </Link>
        <Link
          href="/#experience"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          Experience
        </Link>
        <Link
          href="/#research"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          Research
        </Link>
        {showBlog && (
          <Link
            href="/blog"
            className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
          >
            Blog
          </Link>
        )}
        <Link
          href="/#beyond"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          Beyond
        </Link>
        <Link
          href="/#contact"
          className="rounded-full px-2.5 py-1.5 transition-colors hover:text-fg sm:px-3 text-muted hover:bg-line/40"
        >
          Contact
        </Link>
        <div className="ml-1 pl-1 border-l border-line">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile controls */}
      <div className="flex sm:hidden items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-full text-muted hover:text-fg hover:bg-line/50 transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden absolute top-16 left-0 right-0 z-50 bg-bg border-b border-line px-5 py-4 shadow-lg space-y-1"
        >
          <Link
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/#experience"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/#research"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            Research
          </Link>
          {showBlog && (
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
            >
              Blog
            </Link>
          )}
          <Link
            href="/#beyond"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            Beyond
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}

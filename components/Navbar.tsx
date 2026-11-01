"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Command } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  showBlog?: boolean;
  onOpenCommandPalette?: () => void;
}

const NAV_ITEMS = [
  { href: "/#about", id: "about", label: "About" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#research", id: "research", label: "Research" },
  { href: "/#beyond", id: "beyond", label: "Beyond" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function Navbar({ showBlog = true, onOpenCommandPalette }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line/40 bg-bg/85 backdrop-blur-md transition-colors">
      <div className="container-wide flex items-center justify-between gap-4 py-3.5">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight transition-opacity hover:opacity-90"
          aria-label="Tanvir Hasan, home"
        >
          Tanvir<span className="text-accent">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden sm:flex items-center gap-1 text-sm sm:gap-1.5">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition-all text-xs font-medium ${
                  isActive
                    ? "text-fg bg-line/60"
                    : "text-muted hover:text-fg hover:bg-line/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {showBlog && (
            <Link
              href="/blog"
              className="rounded-full px-3 py-1.5 transition-all text-xs font-medium text-muted hover:text-fg hover:bg-line/40"
            >
              Blog
            </Link>
          )}

          {NAV_ITEMS.slice(4).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition-all text-xs font-medium ${
                  isActive
                    ? "text-fg bg-line/60"
                    : "text-muted hover:text-fg hover:bg-line/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="ml-1 pl-1.5 border-l border-line/60 flex items-center gap-1">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="grid size-8 place-items-center rounded-full text-muted hover:text-fg hover:bg-line/40 transition-colors"
                aria-label="Search and quick jump (Ctrl+K)"
                title="Search and quick jump (Ctrl+K)"
              >
                <Command className="size-3.5" />
              </button>
            )}
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="grid size-9 place-items-center rounded-full text-muted hover:text-fg hover:bg-line/40 transition-colors"
              aria-label="Search"
            >
              <Command className="size-4" />
            </button>
          )}
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
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden border-t border-line/60 bg-bg/95 backdrop-blur-md px-5 py-4 shadow-lg space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-fg bg-line/60 font-medium"
                    : "text-muted hover:text-fg hover:bg-line/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {showBlog && (
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-line/40 transition-colors"
            >
              Blog
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

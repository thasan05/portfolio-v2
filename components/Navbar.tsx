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
    <header className="sticky top-0 z-40 w-full h-11 sm:h-12 border-b border-black/[0.08] dark:border-white/[0.12] bg-[#f5f5f7]/80 dark:bg-black/80 backdrop-blur-xl transition-colors">
      <div className="container-wide h-full flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-sans text-[15px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-75 flex items-center gap-1"
          aria-label="Tanvir Hasan, home"
        >
          <span>Tanvir</span>
          <span className="size-1.5 rounded-full bg-accent inline-block" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden sm:flex items-center gap-0.5 md:gap-1 text-xs">
          {NAV_ITEMS.slice(0, 4).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-full px-2.5 py-1 text-[12px] transition-all duration-200 ${
                  isActive
                    ? "text-fg bg-black/[0.06] dark:bg-white/[0.12] font-medium"
                    : "text-muted hover:text-fg hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {showBlog && (
            <Link
              href="/blog"
              className="rounded-full px-2.5 py-1 text-[12px] transition-all duration-200 text-muted hover:text-fg hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
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
                className={`rounded-full px-2.5 py-1 text-[12px] transition-all duration-200 ${
                  isActive
                    ? "text-fg bg-black/[0.06] dark:bg-white/[0.12] font-medium"
                    : "text-muted hover:text-fg hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="ml-1.5 pl-2 border-l border-line/60 flex items-center gap-1">
            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="grid size-7 place-items-center rounded-full text-muted hover:text-fg hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
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
        <div className="flex sm:hidden items-center gap-1">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="grid size-8 place-items-center rounded-full text-muted hover:text-fg hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
              aria-label="Search"
            >
              <Command className="size-3.5" />
            </button>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="grid size-8 place-items-center rounded-full text-muted hover:text-fg hover:bg-black/[0.04] dark:hover:bg-white/[0.08] transition-colors"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown sheet */}
      {menuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="sm:hidden border-b border-black/[0.08] dark:border-white/[0.12] bg-[#f5f5f7]/95 dark:bg-black/95 backdrop-blur-2xl px-5 py-4 shadow-xl space-y-1 transition-all"
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
                    ? "text-fg bg-black/[0.06] dark:bg-white/[0.12] font-medium"
                    : "text-muted hover:text-fg hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
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
              className="block rounded-lg px-3 py-2 text-sm text-muted hover:text-fg hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-colors"
            >
              Blog
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

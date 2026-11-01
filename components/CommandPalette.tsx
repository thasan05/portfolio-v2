"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, ArrowRight, User, Briefcase,
  GraduationCap, BookOpen, Heart, Mail,
  Github, Linkedin, ExternalLink, X, FileText,
} from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import { FaResearchgate } from "react-icons/fa";

interface CommandItem {
  id: string;
  title: string;
  category: "Sections" | "Profiles & Links" | "Pages";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  external?: boolean;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const items: CommandItem[] = [
    // Sections
    {
      id: "sec-about",
      title: "About — Narrative & Focus",
      category: "Sections",
      icon: User,
      action: () => { router.push("/#about"); handleClose(); },
    },
    {
      id: "sec-projects",
      title: "Selected Work & Projects",
      category: "Sections",
      icon: Briefcase,
      action: () => { router.push("/#projects"); handleClose(); },
    },
    {
      id: "sec-experience",
      title: "Career & Leadership Experience",
      category: "Sections",
      icon: Briefcase,
      action: () => { router.push("/#experience"); handleClose(); },
    },
    {
      id: "sec-research",
      title: "Academic Research & Publications",
      category: "Sections",
      icon: BookOpen,
      action: () => { router.push("/#research"); handleClose(); },
    },
    {
      id: "sec-education",
      title: "Academic Background & Qualifications",
      category: "Sections",
      icon: GraduationCap,
      action: () => { router.push("/#education"); handleClose(); },
    },
    {
      id: "sec-beyond",
      title: "Beyond Academics (Milestones & Gallery)",
      category: "Sections",
      icon: Heart,
      action: () => { router.push("/#beyond"); handleClose(); },
    },
    {
      id: "sec-contact",
      title: "Get in Touch (Direct Message)",
      category: "Sections",
      icon: Mail,
      action: () => { router.push("/#contact"); handleClose(); },
    },

    // Pages
    {
      id: "page-blog",
      title: "Blog Archive (Notes & Articles)",
      category: "Pages",
      icon: FileText,
      action: () => { router.push("/blog"); handleClose(); },
    },
    {
      id: "page-admin",
      title: "Headless CMS (/admin)",
      category: "Pages",
      icon: ExternalLink,
      action: () => { router.push("/admin"); handleClose(); },
    },

    // Profiles
    {
      id: "ext-github",
      title: "GitHub (@thasan05)",
      category: "Profiles & Links",
      icon: Github,
      action: () => { window.open("https://github.com/thasan05", "_blank"); handleClose(); },
      external: true,
    },
    {
      id: "ext-scholar",
      title: "Google Scholar Profile",
      category: "Profiles & Links",
      icon: SiGooglescholar as unknown as React.ComponentType<{ className?: string }>,
      action: () => {
        window.open("https://scholar.google.com/citations?hl=en&authuser=6&user=m3SKoUgAAAAJ", "_blank");
        handleClose();
      },
      external: true,
    },
    {
      id: "ext-rg",
      title: "ResearchGate Profile",
      category: "Profiles & Links",
      icon: FaResearchgate as unknown as React.ComponentType<{ className?: string }>,
      action: () => {
        window.open("https://www.researchgate.net/profile/Md-Hasan-1149", "_blank");
        handleClose();
      },
      external: true,
    },
    {
      id: "ext-linkedin",
      title: "LinkedIn Profile",
      category: "Profiles & Links",
      icon: Linkedin,
      action: () => { window.open("https://linkedin.com/in/thasan05", "_blank"); handleClose(); },
      external: true,
    },
  ];

  const filtered = query.trim()
    ? items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-line bg-surface shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line/60">
          <Search className="size-4 text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a section, project, or link…"
            className="w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={handleClose}
            className="grid size-7 place-items-center rounded-lg text-muted hover:text-fg hover:bg-line/40 transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted">
              No matching destinations found.
            </div>
          ) : (
            <ul className="space-y-0.5" role="listbox">
              {filtered.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm ${
                      isSelected
                        ? "bg-line/60 text-fg"
                        : "text-muted hover:text-fg hover:bg-line/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="size-4 shrink-0 text-muted" />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-medium text-muted/80 bg-line/40 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      {item.external ? (
                        <ExternalLink className="size-3 text-muted" />
                      ) : (
                        <ArrowRight className="size-3 text-muted" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-line/60 text-[11px] text-muted bg-surface/50">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="opacity-70 font-mono">tanvirh.vercel.app</span>
        </div>
      </div>
    </div>
  );
}

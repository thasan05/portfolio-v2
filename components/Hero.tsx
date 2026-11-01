"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Mail, Linkedin, Github, Facebook,
  Instagram, Copy, Check, FileText,
} from "lucide-react";
import { FaMedium, FaDev, FaResearchgate } from "react-icons/fa";
import { SiBluesky, SiX, SiGooglescholar } from "react-icons/si";
import type { HeroData } from "../lib/content";
import { safeHref } from "../lib/safe-href";

function getSocialIcon(platform: string) {
  switch (platform) {
    case "linkedin":
      return <Linkedin className="size-4" />;
    case "github":
      return <Github className="size-4" />;
    case "researchgate":
      return <FaResearchgate className="size-4" />;
    case "google-scholar":
      return <SiGooglescholar className="size-4" />;
    case "medium":
      return <FaMedium className="size-4" />;
    case "devto":
      return <FaDev className="size-4" />;
    case "bluesky":
      return <SiBluesky className="size-4" />;
    case "x":
      return <SiX className="size-3.5" />;
    case "facebook":
      return <Facebook className="size-4" />;
    case "instagram":
      return <Instagram className="size-4" />;
    default:
      return <Mail className="size-4" />;
  }
}

export default function Hero({ data }: { data: HeroData }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="about" className="container-wide pt-12 pb-16 sm:pt-20 sm:pb-24 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12">
      {/* Profile portrait */}
      <div className="fade-up mb-8 md:order-2 md:mb-0 flex justify-start md:justify-end">
        <div className="relative group p-1.5 rounded-full border border-line bg-surface/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
          <Image
            src={data.profileImage || "/profile.jpg"}
            alt={`Portrait of ${data.name}`}
            width={384}
            height={384}
            priority
            className="size-32 sm:size-40 md:size-48 rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {data.status && (
            <span
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex size-4"
              title={data.status}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-4 bg-emerald-500 border-2 border-surface" />
            </span>
          )}
        </div>
      </div>

      {/* Keynote reveal narrative */}
      <div className="md:order-1 max-w-2xl">
        {/* Apple Status Pill */}
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1 text-xs font-medium text-muted mb-4 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>{data.status || "Available for Internships 2026"}</span>
          {data.location && (
            <>
              <span className="opacity-40">·</span>
              <span>{data.location}</span>
            </>
          )}
        </div>

        <h1 className="fade-up stagger-1 font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-fg leading-[1.04]">
          {data.name}
        </h1>

        <p className="fade-up stagger-2 mt-2.5 text-xl sm:text-2xl font-medium tracking-tight text-accent">
          {data.title || "Networking & Systems Focused CSE Undergraduate"}
        </p>

        <p className="fade-up stagger-2 mt-4 text-base sm:text-lg leading-relaxed text-muted font-normal max-w-2xl">
          {data.bio}
        </p>

        {data.openTo && (
          <p className="fade-up stagger-3 mt-3 text-sm text-muted">
            {data.openTo}
          </p>
        )}

        {/* Focus tags */}
        {data.focusTags && data.focusTags.length > 0 && (
          <div className="fade-up stagger-4 mt-5 flex flex-wrap gap-1.5" aria-label="Core focus areas">
            {data.focusTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="fade-up stagger-5 mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn btn-primary px-6 py-2.5">
            See Projects
          </a>
          <a href="#contact" className="btn px-6 py-2.5">
            Get in touch
          </a>
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-4 py-2.5"
            >
              <FileText className="size-3.5" />
              <span>Resume</span>
            </a>
          )}
          <button
            type="button"
            onClick={copyEmail}
            className="btn text-muted hover:text-fg px-4 py-2.5"
            aria-label="Copy email address"
          >
            {copiedEmail ? (
              <>
                <Check className="size-3.5 text-accent" />
                <span className="text-accent">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        {/* Verified Social links */}
        {data.socials && data.socials.length > 0 && (
          <div className="fade-up stagger-6 mt-7 flex flex-wrap items-center gap-2 text-muted">
            {data.socials.map((s) => (
              <a
                key={s.platform}
                href={safeHref(s.url)}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="grid size-8 place-items-center rounded-full border border-line bg-surface/80 text-muted transition-all duration-150 hover:text-fg hover:border-fg/40 hover:bg-surface hover:scale-105 active:scale-95 shadow-sm"
                aria-label={s.label}
              >
                {getSocialIcon(s.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

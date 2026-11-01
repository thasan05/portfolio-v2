"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Mail, Linkedin, Github, Facebook,
  Instagram, Copy, Check, FileText, MapPin,
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
    <section id="about" className="container-wide pt-10 pb-16 sm:pt-16 sm:pb-20 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-12">
      {/* Profile portrait */}
      <div className="fade-up mb-6 md:order-2 md:mb-0 flex justify-start md:justify-end">
        <div className="relative">
          <Image
            src={data.profileImage || "/profile.jpg"}
            alt={`Portrait of ${data.name}`}
            width={384}
            height={384}
            priority
            className="size-28 sm:size-36 md:size-48 rounded-full border border-line object-cover"
          />
          {data.status && (
            <span
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex size-3.5 sm:size-4"
              title={data.status}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-3.5 sm:size-4 bg-emerald-500 border-2 border-bg" />
            </span>
          )}
        </div>
      </div>

      {/* Narrative content */}
      <div className="md:order-1 max-w-2xl">
        <h1 className="fade-up font-serif text-[2.75rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl text-fg">
          {data.name}
        </h1>

        <p className="fade-up mt-2 font-serif italic text-lg sm:text-xl text-accent font-normal">
          {data.title || "Networking & Systems Focused CSE Undergraduate"}
        </p>

        <p className="fade-up mt-5 font-serif text-xl sm:text-2xl leading-snug text-muted">
          {data.bio}
        </p>

        <div className="fade-up mt-4 text-[15px] text-muted space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-muted" />
            <span>Based in {data.location} · {data.status}</span>
          </div>
          {data.openTo && (
            <p className="text-[14px] text-muted">
              {data.openTo}
            </p>
          )}
        </div>

        {/* Focus tags */}
        {data.focusTags && data.focusTags.length > 0 && (
          <div className="fade-up mt-4 flex flex-wrap gap-1.5" aria-label="Core focus areas">
            {data.focusTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="fade-up mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn btn-primary">
            See Projects
          </a>
          <a href="#contact" className="btn">
            Get in touch
          </a>
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <FileText className="size-3.5" />
              <span>Resume</span>
            </a>
          )}
          <button
            type="button"
            onClick={copyEmail}
            className="btn text-muted hover:text-fg"
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
          <div className="fade-up mt-6 flex flex-wrap items-center gap-2 text-muted">
            {data.socials.map((s) => (
              <a
                key={s.platform}
                href={safeHref(s.url)}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className="grid size-8 place-items-center rounded-full border border-line text-muted transition-all duration-150 hover:text-fg hover:border-fg hover:scale-105 active:scale-95"
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

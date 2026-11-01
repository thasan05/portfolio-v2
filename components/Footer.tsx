"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HeroData } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Footer({ hero }: { hero: HeroData }) {
  const [visits, setVisits] = useState<number>(0);
  const [countryCount, setCountryCount] = useState<number>(0);
  const [countryList, setCountryList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const res = await fetch("/api/visitor");
        const data = await res.json();
        if (data?.visits) setVisits(data.visits);
        if (data?.countryCount) setCountryCount(data.countryCount);
        if (data?.countryList) setCountryList(data.countryList);
      } catch {
        // silent fail
      }
    }
    fetchVisitors();
  }, []);

  const currentYear = 2026;

  const githubSocial = hero?.socials?.find((s) => s.platform === "github");
  const linkedinSocial = hero?.socials?.find((s) => s.platform === "linkedin");
  const scholarSocial = hero?.socials?.find((s) => s.platform === "google-scholar");
  const rgSocial = hero?.socials?.find((s) => s.platform === "researchgate");

  return (
    <footer className="container-wide mt-24 sm:mt-32 border-t border-line/70 pt-10 pb-16 text-xs text-muted">
      {/* Apple Notes & Disclaimers */}
      <div className="border-b border-line/60 pb-6 mb-8 text-[11.5px] leading-relaxed text-muted/80 space-y-2">
        <p>
          1. Designed and engineered with precision in Dhaka, Bangladesh. Built with Next.js, React, and Tailwind CSS.
        </p>
        <p>
          2. Academic publications and research artifacts are indexed via DOI and peer-reviewed venues. Project source code is licensed under permissive open-source terms where indicated.
        </p>
      </div>

      {/* Apple Directory Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-8 text-[12px]">
        {/* Column 1: Explore */}
        <div>
          <h4 className="font-semibold text-fg mb-3 tracking-tight">Explore</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/#about" className="hover:text-fg transition-colors">
                About &amp; Overview
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="hover:text-fg transition-colors">
                Selected Work
              </Link>
            </li>
            <li>
              <Link href="/#experience" className="hover:text-fg transition-colors">
                Experience &amp; Leadership
              </Link>
            </li>
            <li>
              <Link href="/#education" className="hover:text-fg transition-colors">
                Academic Background
              </Link>
            </li>
            <li>
              <Link href="/#beyond" className="hover:text-fg transition-colors">
                Beyond Academics
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Research & Code */}
        <div>
          <h4 className="font-semibold text-fg mb-3 tracking-tight">Research &amp; Code</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/#research" className="hover:text-fg transition-colors">
                Publications &amp; Papers
              </Link>
            </li>
            <li>
              <Link href="/#research-interests" className="hover:text-fg transition-colors">
                Research Interests
              </Link>
            </li>
            <li>
              <Link href="/#github" className="hover:text-fg transition-colors">
                GitHub Repositories
              </Link>
            </li>
            <li>
              <Link href="/#coding" className="hover:text-fg transition-colors">
                Coding Profiles
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="hover:text-fg transition-colors">
                Technical Skills
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Writing & Media */}
        <div>
          <h4 className="font-semibold text-fg mb-3 tracking-tight">Writing &amp; Media</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="hover:text-fg transition-colors">
                Technical Blog
              </Link>
            </li>
            <li>
              <Link href="/#books" className="hover:text-fg transition-colors">
                Bookshelf
              </Link>
            </li>
            <li>
              <Link href="/#sessions" className="hover:text-fg transition-colors">
                Sessions &amp; Workshops
              </Link>
            </li>
            <li>
              <Link href="/#certifications" className="hover:text-fg transition-colors">
                Verified Credentials
              </Link>
            </li>
            <li>
              <Link href="/#testimonials" className="hover:text-fg transition-colors">
                Endorsements
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Connect */}
        <div>
          <h4 className="font-semibold text-fg mb-3 tracking-tight">Connect</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/#contact" className="hover:text-fg transition-colors">
                Get in Touch
              </Link>
            </li>
            {githubSocial && (
              <li>
                <a
                  href={safeHref(githubSocial.url)}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  GitHub
                </a>
              </li>
            )}
            {linkedinSocial && (
              <li>
                <a
                  href={safeHref(linkedinSocial.url)}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {scholarSocial && (
              <li>
                <a
                  href={safeHref(scholarSocial.url)}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  Google Scholar
                </a>
              </li>
            )}
            {rgSocial && (
              <li>
                <a
                  href={safeHref(rgSocial.url)}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  ResearchGate
                </a>
              </li>
            )}
            {hero?.resumeUrl && (
              <li>
                <a
                  href={hero.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  Resume
                </a>
              </li>
            )}
            <li>
              <a
                href="/admin"
                className="text-muted/60 hover:text-fg transition-colors"
                title="Admin Headless CMS"
              >
                Admin CMS
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Apple Legal & Locale Bottom Bar */}
      <div className="pt-6 border-t border-line/60 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            Copyright © {currentYear} {hero?.name || "Tanvir Hasan"}. All rights reserved.
          </p>
          {visits > 0 && (
            <p className="text-[11px] text-muted tabular-nums">
              {visits.toLocaleString()} visits across {countryCount > 0 ? countryCount : 1} {countryCount === 1 ? "country" : "countries"}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-muted">
            Dhaka, Bangladesh · English
          </span>
        </div>
      </div>

      {/* Visitor Country Flags */}
      {countryList.length > 0 && (
        <div className="mt-4 pt-3 border-t border-line/40 flex flex-wrap items-center gap-1.5 opacity-70">
          {countryList.map((code) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={code}
              src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`}
              alt={code}
              width={16}
              height={12}
              loading="lazy"
              title={code}
              className="rounded-[2px]"
            />
          ))}
        </div>
      )}
    </footer>
  );
}

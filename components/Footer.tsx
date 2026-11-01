"use client";

import { useEffect, useState } from "react";
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
    <footer className="container-wide mt-24 border-t border-line py-10 text-sm text-muted">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>© {currentYear} {hero?.name || "Tanvir Hasan"} · Dhaka, Bangladesh</p>
          {visits > 0 && (
            <p className="text-xs text-muted tabular-nums">
              {visits.toLocaleString()} visits across {countryCount > 0 ? countryCount : 1} {countryCount === 1 ? "country" : "countries"}
            </p>
          )}
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
                Scholar
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
          {hero?.email && (
            <li>
              <a
                href={`mailto:${hero.email}`}
                className="hover:text-fg transition-colors"
              >
                Email
              </a>
            </li>
          )}
          <li>
            <a
              href="/admin"
              className="text-xs text-muted/60 hover:text-fg transition-colors"
              title="Admin CMS"
            >
              CMS
            </a>
          </li>
        </ul>
      </div>

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

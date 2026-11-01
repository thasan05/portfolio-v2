"use client";

import { ExternalLink } from "lucide-react";
import type { CertItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Certifications({ data }: { data: CertItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="certifications-heading">
      <div className="flex flex-col gap-2">
        <h2 id="certifications-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Verified Credentials
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Industry certifications, technical qualifications, and verified competency assessments.
        </p>
      </div>

      <ul className="mt-7 divide-y divide-line/70 border-y border-line/70">
        {data.map((cert) => (
          <li key={cert.id} className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="text-[14.5px]">
              <span className="font-semibold text-fg">{cert.name}</span>
              <span className="text-muted"> · {cert.issuer}</span>
              {cert.credentialUrl && (
                <a
                  href={safeHref(cert.credentialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                >
                  Verify <ExternalLink className="size-3 opacity-70" />
                </a>
              )}
            </div>
            <span className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
              {cert.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { ExternalLink } from "lucide-react";
import type { CertItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Certifications({ data }: { data: CertItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="certifications-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Certifications</p>
        <h2 id="certifications-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Verified Credentials
        </h2>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {data.map((cert) => (
          <li key={cert.id} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="text-[15px]">
              <span className="font-medium text-fg">{cert.name}</span>
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
            <span className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
              {cert.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { Trophy, Award, Medal, Star, Rocket } from "lucide-react";
import type { AchievementItem } from "../lib/content";

function renderCategoryIcon(category: string) {
  switch (category) {
    case "scholarship":
      return <Star className="size-3.5" />;
    case "competition":
      return <Medal className="size-3.5" />;
    case "hackathon":
      return <Rocket className="size-3.5" />;
    case "award":
      return <Trophy className="size-3.5" />;
    default:
      return <Award className="size-3.5" />;
  }
}

export default function Achievements({ data }: { data: AchievementItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="achievements" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="achievements-heading">
      <div className="flex flex-col gap-2">
        <h2 id="achievements-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Achievements &amp; Awards
        </h2>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {data.map((item) => (
          <li key={item.id} className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-accent">
                  {renderCategoryIcon(item.category)}
                </span>
                <h3 className="font-serif text-lg font-semibold text-fg">
                  {item.title}
                </h3>
              </div>
              {item.org && (
                <p className="text-sm text-muted">
                  {item.org}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-muted leading-relaxed whitespace-pre-line mt-1">
                  {item.description}
                </p>
              )}
            </div>
            {item.date && (
              <span className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                {item.date}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

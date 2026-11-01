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
    <section id="achievements" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="achievements-heading">
      <div className="flex flex-col gap-2">
        <h2 id="achievements-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Achievements &amp; Honors
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Academic scholarships, competition podiums, and recognized excellence.
        </p>
      </div>

      <ul className="mt-7 divide-y divide-line/70 border-y border-line/70">
        {data.map((item) => (
          <li key={item.id} className="py-5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-accent">
                  {renderCategoryIcon(item.category)}
                </span>
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
              </div>
              {item.org && (
                <p className="text-[14px] text-muted font-medium">
                  {item.org}
                </p>
              )}
              {item.description && (
                <p className="text-[14px] text-muted leading-relaxed whitespace-pre-line mt-1 font-normal">
                  {item.description}
                </p>
              )}
            </div>
            {item.date && (
              <span className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
                {item.date}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

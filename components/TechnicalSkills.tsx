"use client";

import type { SkillGroup } from "../lib/content";

export default function TechnicalSkills({ data }: { data: SkillGroup[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="skills-heading">
      <div className="flex flex-col gap-2">
        <h2 id="skills-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Technical Skills
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Core competencies across systems engineering, networking protocols, and software foundations.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map(({ id, title, skills }) => (
          <div
            key={id}
            className="card rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg mb-4">
              {title}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label={title}>
              {skills.map((skill) => (
                <li key={skill} className="tag text-xs font-medium px-3 py-1 bg-black/[0.03] dark:bg-white/[0.06] border-line/80">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

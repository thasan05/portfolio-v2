"use client";

import type { SkillGroup } from "../lib/content";

export default function TechnicalSkills({ data }: { data: SkillGroup[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="skills-heading">
      <div className="flex flex-col gap-2">
        <h2 id="skills-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Technical Skills
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          Core competencies across systems engineering, networking protocols, and software foundations.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {data.map(({ id, title, skills }) => (
          <div key={id} className="card">
            <h3 className="font-serif text-base font-semibold text-fg mb-3">
              {title}
            </h3>
            <ul className="flex flex-wrap gap-1.5" aria-label={title}>
              {skills.map((skill) => (
                <li key={skill} className="tag text-xs">
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

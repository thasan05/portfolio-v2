import { redis } from "./redis";

import defaultHero from "../content/hero.json";
import defaultCareer from "../content/career.json";
import defaultExperience from "../content/experience.json";
import defaultEducation from "../content/education.json";
import defaultSkills from "../content/skills.json";
import defaultPublications from "../content/publications.json";
import defaultReferences from "../content/references.json";
import defaultAffiliations from "../content/affiliations.json";
import defaultBeyond from "../content/beyond.json";
import defaultSite from "../content/site.json";
import defaultProjects from "../content/projects.json";
import defaultCertifications from "../content/certifications.json";
import defaultBooks from "../content/books.json";
import defaultVideo from "../content/video.json";
import defaultTestimonials from "../content/testimonials.json";
import defaultNow from "../content/now.json";
import defaultResearch from "../content/research.json";
import defaultCoding from "../content/coding.json";
import defaultAchievements from "../content/achievements.json";
import defaultBlog from "../content/blog.json";
import defaultSessions from "../content/sessions.json";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Social {
  platform: string;
  url: string;
  label: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroData {
  name: string;
  initials: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  status: string;
  openTo: string;
  bio: string;
  focusTags: string[];
  resumeUrl: string;
  profileImage: string;
  socials: Social[];
  stats?: HeroStat[];
  languages?: string[];        // e.g. ["English (fluent)", "Bengali (native)"]
  availability?: string;       // e.g. "Open to relocation & visa sponsorship · GMT+6"
}

export interface CareerItem {
  id: string;
  company: string;
  companyUrl: string;
  role: string;
  employmentType: string;
  startMonth: string;
  endMonth: string;
  location: string;
  locationType: string;
  description: string;
  color: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  orgUrl: string;
  period: string;
  location: string;
  description: string;
  dotColor: string;
  glowColor: string;
  badgeTheme: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  schoolUrl: string;
  period: string;
  subtitle?: string;
  gpa?: string;
  description?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  theme: "amber" | "blue" | "emerald" | "indigo" | "violet" | "rose";
  skills: string[];
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  location?: string;
  date?: string;
  doi?: string;
  paperUrl?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  journal: string;
  date?: string;
  doi?: string;
  paperUrl?: string;
}

export interface PublicationsData {
  conferences: Publication[];
  journals: JournalArticle[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  nameLink?: string;
  title: string;
  institution: string;
  email: string;
}

export interface AffiliationItem {
  id: string;
  role: string;
  org: string;
  orgUrl: string;
  period: string;
  institution: string;
  color: string;
}

export interface BeyondItem {
  id: number;
  category: string;
  iconType: string;
  images: string[];
  title: string;
  date: string;
  description: string;
}

export interface SiteData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;          // local path (/books/…) or external URL
  coverLink: string;           // where clicking the cover goes (Goodreads/Amazon/…)
  status: "reading" | "completed";
  note: string;
}

export interface VideoData {
  enabled: boolean;
  title: string;
  description: string;
  videoUrl: string;            // YouTube URL (auto-embedded) or direct video file URL
  posterImage: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
  avatar: string;              // optional image path/URL
  link: string;                // optional profile URL
}

export interface NowData {
  enabled: boolean;
  updated: string;
  items: string[];
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
}

export interface ResearchData {
  enabled: boolean;
  statement: string;
  areas: ResearchArea[];
}

export interface CodingProfile {
  id: string;
  platform: string;            // LeetCode, Codeforces, HackerRank, …
  username: string;
  url: string;
  stat: string;                // optional, e.g. "1500 rating" or "300+ solved"
}

export interface AchievementItem {
  id: string;
  title: string;
  org: string;
  date: string;
  description: string;
  category: string;            // award | scholarship | competition | hackathon | honor
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;                // markdown
  published: boolean;
}

export interface SessionItem {
  id: string;
  title: string;
  role: string;                // Facilitator | Speaker | Instructor | Attendee | …
  host: string;                // organization / event
  date: string;
  location: string;
  description: string;
  url: string;                 // recording / materials / event page
}

// ── Storage helpers ───────────────────────────────────────────────────────────
// Content persists to the shared Upstash Redis client (see lib/redis.ts). When
// no credentials are present (local dev) `redis` is null and we fall back to a
// gitignored `.localdata/` folder.

function kvKey(section: string) {
  return `portfolio:${section}`;
}

// ── Local filesystem fallback (dev without Redis) ──────────────────────────────

async function readLocal<T>(section: string): Promise<T | null> {
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const file = path.join(process.cwd(), ".localdata", `${section}.json`);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeLocal<T>(section: string, data: T): Promise<void> {
  const { promises: fs } = await import("fs");
  const path = await import("path");
  const dir = path.join(process.cwd(), ".localdata");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, `${section}.json`),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

async function getFromKV<T>(key: string): Promise<T | null> {
  const section = key.replace("portfolio:", "");
  if (!redis) return readLocal<T>(section);
  try {
    return await redis.get<T>(key);
  } catch {
    return null;
  }
}

async function setToKV<T>(key: string, data: T): Promise<void> {
  const section = key.replace("portfolio:", "");
  if (!redis) {
    await writeLocal(section, data);
    return;
  }
  await redis.set(key, data);
}

// ── Public getters ─────────────────────────────────────────────────────────────

export async function getHero(): Promise<HeroData> {
  const kd = await getFromKV<HeroData>(kvKey("hero"));
  return kd ?? (defaultHero as HeroData);
}

export async function getCareer(): Promise<CareerItem[]> {
  const kd = await getFromKV<CareerItem[]>(kvKey("career"));
  return kd ?? (defaultCareer as CareerItem[]);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const kd = await getFromKV<ExperienceItem[]>(kvKey("experience"));
  return kd ?? (defaultExperience as ExperienceItem[]);
}

export async function getEducation(): Promise<EducationItem[]> {
  const kd = await getFromKV<EducationItem[]>(kvKey("education"));
  return kd ?? (defaultEducation as EducationItem[]);
}

export async function getSkills(): Promise<SkillGroup[]> {
  const kd = await getFromKV<SkillGroup[]>(kvKey("skills"));
  return kd ?? (defaultSkills as SkillGroup[]);
}

export async function getPublications(): Promise<PublicationsData> {
  const kd = await getFromKV<PublicationsData>(kvKey("publications"));
  return kd ?? (defaultPublications as PublicationsData);
}

export async function getReferences(): Promise<ReferenceItem[]> {
  const kd = await getFromKV<ReferenceItem[]>(kvKey("references"));
  return kd ?? (defaultReferences as ReferenceItem[]);
}

export async function getAffiliations(): Promise<AffiliationItem[]> {
  const kd = await getFromKV<AffiliationItem[]>(kvKey("affiliations"));
  return kd ?? (defaultAffiliations as AffiliationItem[]);
}

export async function getBeyond(): Promise<BeyondItem[]> {
  const kd = await getFromKV<BeyondItem[]>(kvKey("beyond"));
  return kd ?? (defaultBeyond as BeyondItem[]);
}

export async function getSite(): Promise<SiteData> {
  const kd = await getFromKV<SiteData>(kvKey("site"));
  return kd ?? (defaultSite as SiteData);
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  status: string;
  date: string;
  color: string;
  slug?: string;               // optional custom URL slug
  body?: string;               // optional long-form case study (markdown)
}

export interface CertItem {
  id: string;
  name: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  credentialUrl: string;
  color: string;
}

export async function getProjects(): Promise<ProjectItem[]> {
  const kd = await getFromKV<ProjectItem[]>(kvKey("projects"));
  return kd ?? (defaultProjects as ProjectItem[]);
}

export async function getCertifications(): Promise<CertItem[]> {
  const kd = await getFromKV<CertItem[]>(kvKey("certifications"));
  return kd ?? (defaultCertifications as CertItem[]);
}

export async function getBooks(): Promise<BookItem[]> {
  const kd = await getFromKV<BookItem[]>(kvKey("books"));
  return kd ?? (defaultBooks as BookItem[]);
}

export async function getVideo(): Promise<VideoData> {
  const kd = await getFromKV<VideoData>(kvKey("video"));
  return kd ?? (defaultVideo as VideoData);
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const kd = await getFromKV<TestimonialItem[]>(kvKey("testimonials"));
  return kd ?? (defaultTestimonials as TestimonialItem[]);
}

export async function getNow(): Promise<NowData> {
  const kd = await getFromKV<NowData>(kvKey("now"));
  return kd ?? (defaultNow as NowData);
}

export async function getResearch(): Promise<ResearchData> {
  const kd = await getFromKV<ResearchData>(kvKey("research"));
  return kd ?? (defaultResearch as ResearchData);
}

export async function getCoding(): Promise<CodingProfile[]> {
  const kd = await getFromKV<CodingProfile[]>(kvKey("coding"));
  return kd ?? (defaultCoding as CodingProfile[]);
}

export async function getAchievements(): Promise<AchievementItem[]> {
  const kd = await getFromKV<AchievementItem[]>(kvKey("achievements"));
  return kd ?? (defaultAchievements as AchievementItem[]);
}

export async function getBlog(): Promise<BlogPost[]> {
  const kd = await getFromKV<BlogPost[]>(kvKey("blog"));
  return kd ?? (defaultBlog as BlogPost[]);
}

export async function getSessions(): Promise<SessionItem[]> {
  const kd = await getFromKV<SessionItem[]>(kvKey("sessions"));
  return kd ?? (defaultSessions as SessionItem[]);
}

// ── Public setters ─────────────────────────────────────────────────────────────

export async function setContent(section: string, data: unknown): Promise<void> {
  await setToKV(kvKey(section), data);
}

// Generic getter used by the content API route — KV-or-local, then bundled default.
export async function getRawSection(section: string): Promise<unknown> {
  const stored = await getFromKV<unknown>(kvKey(section));
  return stored ?? defaults[section];
}

// ── Default map (for API route fallback) ──────────────────────────────────────

export const defaults: Record<string, unknown> = {
  hero: defaultHero,
  career: defaultCareer,
  experience: defaultExperience,
  education: defaultEducation,
  skills: defaultSkills,
  publications: defaultPublications,
  references: defaultReferences,
  affiliations: defaultAffiliations,
  beyond: defaultBeyond,
  site: defaultSite,
  projects: defaultProjects,
  certifications: defaultCertifications,
  books: defaultBooks,
  video: defaultVideo,
  testimonials: defaultTestimonials,
  now: defaultNow,
  research: defaultResearch,
  coding: defaultCoding,
  achievements: defaultAchievements,
  blog: defaultBlog,
  sessions: defaultSessions,
};

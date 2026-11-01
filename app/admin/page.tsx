"use client";

import { useState, useEffect, useCallback } from "react";
import { Reorder, useDragControls } from "framer-motion";
import {
  Lock, LogOut, ExternalLink, Save, Plus, Trash2,
  User, Briefcase, GraduationCap, Code2, BookOpen,
  Users, Image, Globe, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Loader2, Eye, EyeOff,
  GripVertical, Award, Library, Video, Quote, Inbox, Radio, FolderGit2, FlaskConical,
  Terminal, Trophy, PenLine, Presentation,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Social { platform: string; url: string; label: string; }
interface HeroStat { label: string; value: string; }
interface HeroData {
  name: string; initials: string; email: string; phone: string;
  location: string; title: string; status: string; openTo: string;
  bio: string; focusTags: string[]; resumeUrl: string; profileImage: string;
  socials: Social[]; stats?: HeroStat[]; languages?: string[]; availability?: string;
}
interface CareerItem {
  id: string; company: string; companyUrl: string; role: string;
  employmentType: string; startMonth: string; endMonth: string;
  location: string; locationType: string; description: string; color: string;
}
interface ExperienceItem { id: string; title: string; org: string; orgUrl: string; period: string; location: string; description: string; dotColor: string; glowColor: string; badgeTheme: string; }
interface EducationItem  { id: string; degree: string; school: string; schoolUrl: string; period: string; subtitle: string; gpa: string; description: string; }
interface SkillGroup     { id: string; title: string; theme: string; skills: string[]; }
interface Publication    { id: string; title: string; venue: string; location: string; date: string; doi: string; paperUrl: string; }
interface JournalArticle { id: string; title: string; journal: string; date: string; doi: string; paperUrl: string; }
interface PublicationsData { conferences: Publication[]; journals: JournalArticle[]; }
interface ReferenceItem  { id: string; name: string; nameLink: string; title: string; institution: string; email: string; }
interface AffiliationItem{ id: string; role: string; org: string; orgUrl: string; period: string; institution: string; color: string; }
interface BeyondItem     { id: number; category: string; iconType: string; images: string[]; title: string; date: string; description: string; }
interface SiteData       { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string; twitterTitle: string; twitterDescription: string; }
interface BookItem       { id: string; title: string; author: string; coverImage: string; coverLink: string; status: string; note: string; }
interface VideoData      { enabled: boolean; title: string; description: string; videoUrl: string; posterImage: string; }
interface TestimonialItem{ id: string; quote: string; name: string; role: string; org: string; avatar: string; link: string; }
interface NowData        { enabled: boolean; updated: string; items: string[]; }
interface ResearchArea   { id: string; title: string; description: string; }
interface ResearchData   { enabled: boolean; statement: string; areas: ResearchArea[]; }
interface CodingProfile  { id: string; platform: string; username: string; url: string; stat: string; }
interface AchievementItem{ id: string; title: string; org: string; date: string; description: string; category: string; }
interface BlogPost       { id: string; slug: string; title: string; date: string; excerpt: string; tags: string[]; body: string; published: boolean; }
interface SessionItem    { id: string; title: string; role: string; host: string; date: string; location: string; description: string; url: string; }
interface ProjectItem    { id: string; title: string; description: string; tags: string[]; repoUrl: string; liveUrl: string; status: string; date: string; color: string; slug: string; body: string; }
interface CertItem       { id: string; name: string; issuer: string; issuerLogo: string; date: string; credentialUrl: string; color: string; }

type SaveState = "idle" | "saving" | "saved" | "error";

// ── Helpers ────────────────────────────────────────────────────────────────

function uid() { return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

const BADGE_THEMES = ["blue","violet","emerald","amber","indigo","rose"];
const SKILL_THEMES = ["amber","blue","emerald","indigo","violet","rose"];
const AFF_COLORS   = ["indigo","blue","emerald","violet","amber","rose"];
const ICON_TYPES   = ["mic","award","music","heart"];
const SOCIAL_PLATFORMS = ["linkedin","github","facebook","instagram","x","medium","devto","bluesky","researchgate","youtube","twitter","email"];
const EMPLOYMENT_TYPES = ["Full-time","Part-time","Internship","Contract","Freelance","Volunteer"];
const LOCATION_TYPES   = ["On-site","Remote","Hybrid"];
const CAREER_COLORS    = ["blue","violet","emerald","amber","indigo","rose"];
const BOOK_STATUSES    = ["reading","completed"];
const PROJECT_STATUSES = ["Live","Completed","Published","In Progress"];
const PROJECT_COLORS   = ["blue","violet","emerald","amber","indigo","rose"];
const CODING_PLATFORMS = ["LeetCode","Codeforces","HackerRank","CodeChef","Kaggle","GeeksforGeeks","HackerEarth","AtCoder"];
const ACHIEVEMENT_CATEGORIES = ["award","scholarship","competition","hackathon","honor"];
const SESSION_ROLES = ["Facilitator","Speaker","Instructor","Panelist","Organizer","Attendee"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wide">{children}</label>;
}

function Field({ label, value, onChange, textarea, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  textarea?: boolean; placeholder?: string;
}) {
  const cls = "w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition";
  return (
    <div>
      <Label>{label}</Label>
      {textarea
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-y`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <Label>{label}</Label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function TagInput({ label, tags, onChange }: { label: string; tags: string[]; onChange: (tags: string[]) => void; }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) { onChange([...tags, v]); setInput(""); }
  };
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map(t => (
          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
            {t}
            <button onClick={() => onChange(tags.filter(x => x !== t))} className="text-indigo-400 hover:text-red-500 transition-colors"><XCircle size={11} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); }}}
          placeholder="Add item, press Enter"
          className="flex-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition" />
        <button onClick={add} className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition">Add</button>
      </div>
    </div>
  );
}

function SaveBtn({ state, onClick, label = "Save" }: { state: SaveState; onClick: () => void; label?: string; }) {
  return (
    <button onClick={onClick} disabled={state === "saving"}
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all
        ${state === "saved"  ? "bg-emerald-600 text-white" :
          state === "error"  ? "bg-red-600 text-white" :
          state === "saving" ? "bg-zinc-400 text-white cursor-not-allowed" :
                               "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20"}`}>
      {state === "saving" ? <Loader2 size={14} className="animate-spin" /> :
       state === "saved"  ? <CheckCircle size={14} /> :
       state === "error"  ? <XCircle size={14} /> :
                            <Save size={14} />}
      {state === "saved" ? "Saved!" : state === "error" ? "Error" : state === "saving" ? "Saving…" : label}
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40 p-4 ${className}`}>
      {children}
    </div>
  );
}

function CollapsibleCard({ title, badge, children, defaultOpen = false }: {
  title: string; badge?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card>
      <button className="w-full flex items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</span>
          {badge && <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{badge}</span>}
        </div>
        {open ? <ChevronUp size={15} className="text-zinc-400" /> : <ChevronDown size={15} className="text-zinc-400" />}
      </button>
      {open && <div className="mt-4 space-y-3">{children}</div>}
    </Card>
  );
}

// ── Draggable card wrapper for reorderable lists ───────────────────────────

function DraggableCard({ value, children }: { value: unknown; children: React.ReactNode }) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={value} dragListener={false} dragControls={controls} as="div">
      <div className="flex items-start gap-1.5">
        <button
          className="mt-3.5 cursor-grab active:cursor-grabbing touch-none shrink-0
            text-zinc-300 dark:text-zinc-700 hover:text-zinc-400 dark:hover:text-zinc-500 transition-colors"
          onPointerDown={(e) => controls.start(e)}
        >
          <GripVertical size={14} />
        </button>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </Reorder.Item>
  );
}

// ── Section editors ────────────────────────────────────────────────────────

function HeroEditor({ token }: { token: string }) {
  const [data, setData]     = useState<HeroData | null>(null);
  const [state, setState]   = useState<SaveState>("idle");

  useEffect(() => {
    fetch("/api/content/hero").then(r => r.json()).then(setData);
  }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/hero", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const set = (field: keyof HeroData, value: unknown) =>
    setData(d => d ? ({ ...d, [field]: value }) : d);

  const updateSocial = (i: number, field: keyof Social, value: string) =>
    setData(d => {
      if (!d) return d;
      const s = [...d.socials];
      s[i] = { ...s[i], [field]: value };
      return { ...d, socials: s };
    });

  const addSocial    = () => setData(d => d ? ({ ...d, socials: [...d.socials, { platform: "linkedin", url: "", label: "" }] }) : d);
  const removeSocial = (i: number) => setData(d => d ? ({ ...d, socials: d.socials.filter((_, j) => j !== i) }) : d);

  const updateStat = (i: number, field: keyof HeroStat, value: string) =>
    setData(d => {
      if (!d) return d;
      const s = [...(d.stats ?? [])];
      s[i] = { ...s[i], [field]: value };
      return { ...d, stats: s };
    });
  const addStat    = () => setData(d => d ? ({ ...d, stats: [...(d.stats ?? []), { value: "", label: "" }] }) : d);
  const removeStat = (i: number) => setData(d => d ? ({ ...d, stats: (d.stats ?? []).filter((_, j) => j !== i) }) : d);

  if (!data) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full Name"    value={data.name}         onChange={v => set("name", v)} />
        <Field label="Initials"     value={data.initials}     onChange={v => set("initials", v)} placeholder="TH" />
        <Field label="Email"        value={data.email}        onChange={v => set("email", v)} />
        <Field label="Phone"        value={data.phone}        onChange={v => set("phone", v)} />
        <Field label="Location"     value={data.location}     onChange={v => set("location", v)} />
        <Field label="Resume URL"   value={data.resumeUrl}    onChange={v => set("resumeUrl", v)} />
        <Field label="Profile Image Path" value={data.profileImage} onChange={v => set("profileImage", v)} />
      </div>
      <Field label="Title / Headline" value={data.title}   onChange={v => set("title", v)} />
      <Field label="Status Badge"     value={data.status}  onChange={v => set("status", v)} placeholder="Future MS Candidate" />
      <Field label="Open To Badge"    value={data.openTo}  onChange={v => set("openTo", v)} placeholder="Open to Internships 2026" />
      <Field label="Footer Bio"       value={data.bio}     onChange={v => set("bio", v)} textarea />
      <TagInput label="Focus Tags" tags={data.focusTags} onChange={v => set("focusTags", v)} />

      <Field label="Availability (international-recruiter signal)" value={data.availability ?? ""} onChange={v => set("availability", v)} placeholder="Open to relocation & visa sponsorship · GMT+6 (Dhaka)" />
      <TagInput label="Languages" tags={data.languages ?? []} onChange={v => set("languages", v)} />

      {/* Impact stats */}
      <div>
        <Label>Impact Stats (shown as a band in the hero)</Label>
        <div className="space-y-2">
          {(data.stats ?? []).map((s, i) => (
            <div key={i} className="grid grid-cols-[130px_1fr_36px] gap-2 items-end">
              <div>
                {i === 0 && <Label>Value</Label>}
                <input value={s.value} onChange={e => updateStat(i, "value", e.target.value)} placeholder="Top 8 / 84"
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition" />
              </div>
              <div>
                {i === 0 && <Label>Label</Label>}
                <input value={s.label} onChange={e => updateStat(i, "label", e.target.value)} placeholder="Presentation Champs 2026"
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition" />
              </div>
              <button onClick={() => removeStat(i)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addStat} className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
          <Plus size={12} /> Add stat
        </button>
      </div>

      {/* Socials */}
      <div>
        <Label>Social Links</Label>
        <div className="space-y-2">
          {data.socials.map((s, i) => (
            <div key={i} className="grid grid-cols-[120px_1fr_130px_36px] gap-2 items-end">
              <div>
                {i === 0 && <Label>Platform</Label>}
                <select value={s.platform} onChange={e => updateSocial(i, "platform", e.target.value)}
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition">
                  {SOCIAL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                {i === 0 && <Label>URL</Label>}
                <input value={s.url} onChange={e => updateSocial(i, "url", e.target.value)} placeholder="https://..."
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition" />
              </div>
              <div>
                {i === 0 && <Label>Label</Label>}
                <input value={s.label} onChange={e => updateSocial(i, "label", e.target.value)} placeholder="LinkedIn"
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition" />
              </div>
              <button onClick={() => removeSocial(i)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addSocial} className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
          <Plus size={12} /> Add social link
        </button>
      </div>

      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function CareerEditor({ token }: { token: string }) {
  const [items, setItems] = useState<CareerItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/career").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/career", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof CareerItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), company: "Company Name", companyUrl: "", role: "Position Title",
    employmentType: "Full-time", startMonth: "", endMonth: "Present",
    location: "", locationType: "On-site", description: "", color: "indigo",
  }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.role || "Untitled"} badge={item.employmentType} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Position / Role"  value={item.role}            onChange={v => update(item.id, "role", v)} />
                <SelectField label="Employment Type" value={item.employmentType} onChange={v => update(item.id, "employmentType", v)} options={EMPLOYMENT_TYPES} />
                <Field label="Company Name"     value={item.company}         onChange={v => update(item.id, "company", v)} />
                <Field label="Company URL"      value={item.companyUrl}      onChange={v => update(item.id, "companyUrl", v)} placeholder="https://..." />
                <Field label="Start Month"      value={item.startMonth}      onChange={v => update(item.id, "startMonth", v)} placeholder="Jul 2026" />
                <Field label="End Month"        value={item.endMonth}        onChange={v => update(item.id, "endMonth", v)} placeholder="Present" />
                <Field label="Location"         value={item.location}        onChange={v => update(item.id, "location", v)} placeholder="Dhaka, Bangladesh" />
                <SelectField label="Location Type" value={item.locationType} onChange={v => update(item.id, "locationType", v)} options={LOCATION_TYPES} />
                <SelectField label="Accent Color"  value={item.color}        onChange={v => update(item.id, "color", v)} options={CAREER_COLORS} />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Position
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function ExperienceEditor({ token }: { token: string }) {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/experience").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/experience", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, field: keyof ExperienceItem, value: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), title: "New Activity", org: "", orgUrl: "", period: "",
    location: "", description: "", dotColor: "bg-indigo-500", glowColor: "bg-indigo-500", badgeTheme: "indigo",
  }]);

  const remove = (id: string) => setItems(prev => prev.filter(it => it.id !== id));

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.period} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title"       value={item.title}    onChange={v => update(item.id, "title", v)} />
                <Field label="Period"      value={item.period}   onChange={v => update(item.id, "period", v)} placeholder="Jan 2026" />
                <Field label="Org Name"    value={item.org}      onChange={v => update(item.id, "org", v)} />
                <Field label="Org URL"     value={item.orgUrl}   onChange={v => update(item.id, "orgUrl", v)} placeholder="https://..." />
                <Field label="Location"    value={item.location} onChange={v => update(item.id, "location", v)} />
                <SelectField label="Badge Theme" value={item.badgeTheme} onChange={v => { update(item.id, "badgeTheme", v); update(item.id, "dotColor", `bg-${v}-500`); update(item.id, "glowColor", `bg-${v}-500`); }} options={BADGE_THEMES} />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <button onClick={() => remove(item.id)} className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove this item
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Activity
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function EducationEditor({ token }: { token: string }) {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/education").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/education", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, field: keyof EducationItem, value: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), degree: "New Degree", school: "", schoolUrl: "", period: "", subtitle: "", gpa: "", description: "",
  }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.degree || "Untitled"} badge={item.period} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Degree"     value={item.degree}    onChange={v => update(item.id, "degree", v)} />
                <Field label="Period"     value={item.period}    onChange={v => update(item.id, "period", v)} />
                <Field label="School"     value={item.school}    onChange={v => update(item.id, "school", v)} />
                <Field label="School URL" value={item.schoolUrl} onChange={v => update(item.id, "schoolUrl", v)} />
                <Field label="Subtitle"   value={item.subtitle}  onChange={v => update(item.id, "subtitle", v)} placeholder="3rd Year Undergraduate" />
                <Field label="GPA"        value={item.gpa}       onChange={v => update(item.id, "gpa", v)} placeholder="5.00 / 5.00" />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Education
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function SkillsEditor({ token }: { token: string }) {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [state, setState]   = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/skills").then(r => r.json()).then(setGroups); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/skills", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(groups),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const updateGroup = (id: string, field: keyof SkillGroup, value: unknown) =>
    setGroups(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));

  const addGroup = () => setGroups(prev => [...prev, { id: uid(), title: "New Group", theme: "indigo", skills: [] }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={groups} onReorder={setGroups} as="div" className="space-y-4">
        {groups.map((group) => (
          <DraggableCard key={group.id} value={group}>
            <CollapsibleCard title={group.title} badge={`${group.skills.length} skills`} defaultOpen>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Group Title" value={group.title} onChange={v => updateGroup(group.id, "title", v)} />
                <SelectField label="Color Theme" value={group.theme} onChange={v => updateGroup(group.id, "theme", v)} options={SKILL_THEMES} />
              </div>
              <TagInput label="Skills" tags={group.skills} onChange={v => updateGroup(group.id, "skills", v)} />
              <button onClick={() => setGroups(prev => prev.filter(g => g.id !== group.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove group
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={addGroup} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Skill Group
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function PublicationsEditor({ token }: { token: string }) {
  const [data, setData]   = useState<PublicationsData>({ conferences: [], journals: [] });
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/publications").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/publications", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const updateConf = (id: string, f: keyof Publication, v: string) =>
    setData(d => ({ ...d, conferences: d.conferences.map(p => p.id === id ? { ...p, [f]: v } : p) }));

  const updateJour = (id: string, f: keyof JournalArticle, v: string) =>
    setData(d => ({ ...d, journals: d.journals.map(p => p.id === id ? { ...p, [f]: v } : p) }));

  const addConf = () => setData(d => ({ ...d, conferences: [...d.conferences, { id: uid(), title: "", venue: "", location: "", date: "", doi: "", paperUrl: "" }] }));
  const addJour = () => setData(d => ({ ...d, journals: [...d.journals, { id: uid(), title: "", journal: "", date: "", doi: "", paperUrl: "" }] }));

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">Conference Papers</h4>
        <div className="space-y-3">
          <Reorder.Group axis="y" values={data.conferences} onReorder={(newConfs) => setData(d => ({ ...d, conferences: newConfs }))} as="div" className="space-y-3">
            {data.conferences.map((p, i) => (
              <DraggableCard key={p.id} value={p}>
                <CollapsibleCard title={p.title || "Untitled"} badge={p.date} defaultOpen={i === 0}>
                  <Field label="Title"    value={p.title}    onChange={v => updateConf(p.id, "title", v)} />
                  <Field label="Venue"    value={p.venue}    onChange={v => updateConf(p.id, "venue", v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Location" value={p.location} onChange={v => updateConf(p.id, "location", v)} />
                    <Field label="Date"     value={p.date}     onChange={v => updateConf(p.id, "date", v)} />
                    <Field label="DOI"      value={p.doi}      onChange={v => updateConf(p.id, "doi", v)} />
                    <Field label="Paper URL" value={p.paperUrl} onChange={v => updateConf(p.id, "paperUrl", v)} />
                  </div>
                  <button onClick={() => setData(d => ({ ...d, conferences: d.conferences.filter(x => x.id !== p.id) }))}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </CollapsibleCard>
              </DraggableCard>
            ))}
          </Reorder.Group>
          <button onClick={addConf} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            <Plus size={14} /> Add Conference Paper
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3">Journal Articles</h4>
        <div className="space-y-3">
          <Reorder.Group axis="y" values={data.journals} onReorder={(newJours) => setData(d => ({ ...d, journals: newJours }))} as="div" className="space-y-3">
            {data.journals.map((p, i) => (
              <DraggableCard key={p.id} value={p}>
                <CollapsibleCard title={p.title || "Untitled"} badge={p.date} defaultOpen={i === 0}>
                  <Field label="Title"    value={p.title}    onChange={v => updateJour(p.id, "title", v)} />
                  <Field label="Journal"  value={p.journal}  onChange={v => updateJour(p.id, "journal", v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Date"      value={p.date}     onChange={v => updateJour(p.id, "date", v)} />
                    <Field label="DOI"       value={p.doi}      onChange={v => updateJour(p.id, "doi", v)} />
                    <Field label="Paper URL" value={p.paperUrl} onChange={v => updateJour(p.id, "paperUrl", v)} />
                  </div>
                  <button onClick={() => setData(d => ({ ...d, journals: d.journals.filter(x => x.id !== p.id) }))}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </CollapsibleCard>
              </DraggableCard>
            ))}
          </Reorder.Group>
          <button onClick={addJour} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            <Plus size={14} /> Add Journal Article
          </button>
        </div>
      </div>

      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function ReferencesEditor({ token }: { token: string }) {
  const [items, setItems] = useState<ReferenceItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/references").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/references", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof ReferenceItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, { id: uid(), name: "", nameLink: "", title: "", institution: "", email: "" }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.name || "Untitled"} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Name"        value={item.name}        onChange={v => update(item.id, "name", v)} />
                <Field label="Profile URL" value={item.nameLink}    onChange={v => update(item.id, "nameLink", v)} />
                <Field label="Title"       value={item.title}       onChange={v => update(item.id, "title", v)} placeholder="Lecturer" />
                <Field label="Email"       value={item.email}       onChange={v => update(item.id, "email", v)} />
              </div>
              <Field label="Institution" value={item.institution} onChange={v => update(item.id, "institution", v)} />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Reference
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function AffiliationsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<AffiliationItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/affiliations").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/affiliations", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof AffiliationItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), role: "Member", org: "", orgUrl: "", period: "", institution: "", color: "indigo",
  }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.org || "Untitled"} badge={item.role} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Role"        value={item.role}        onChange={v => update(item.id, "role", v)} />
                <Field label="Org Name"    value={item.org}         onChange={v => update(item.id, "org", v)} />
                <Field label="Org URL"     value={item.orgUrl}      onChange={v => update(item.id, "orgUrl", v)} />
                <Field label="Period"      value={item.period}      onChange={v => update(item.id, "period", v)} />
                <Field label="Institution" value={item.institution} onChange={v => update(item.id, "institution", v)} />
                <SelectField label="Color" value={item.color}       onChange={v => update(item.id, "color", v)} options={AFF_COLORS} />
              </div>
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Affiliation
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function BeyondEditor({ token }: { token: string }) {
  const [items, setItems] = useState<BeyondItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/beyond").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/beyond", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: number, f: keyof BeyondItem, v: unknown) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const updateImages = (id: number, raw: string) =>
    update(id, "images", raw.split("\n").map(s => s.trim()).filter(Boolean));

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Edit titles, descriptions and metadata. To manage photos, update the <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">public/photos/</code> folder and update image paths below.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.date} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title"    value={item.title}    onChange={v => update(item.id, "title", v)} />
                <Field label="Date"     value={item.date}     onChange={v => update(item.id, "date", v)} />
                <Field label="Category" value={item.category} onChange={v => update(item.id, "category", v)} />
                <SelectField label="Icon" value={item.iconType} onChange={v => update(item.id, "iconType", v)} options={ICON_TYPES} />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <div>
                <Label>Image Paths (one per line)</Label>
                <textarea
                  rows={4}
                  value={item.images.join("\n")}
                  onChange={e => updateImages(item.id, e.target.value)}
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-xs font-mono text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition resize-y"
                />
              </div>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function SiteEditor({ token }: { token: string }) {
  const [data, setData]   = useState<SiteData | null>(null);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/site").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/site", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const set = (f: keyof SiteData, v: unknown) => setData(d => d ? { ...d, [f]: v } : d);

  if (!data) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-4">
      <Field label="Page Title"       value={data.title}              onChange={v => set("title", v)} />
      <Field label="Meta Description" value={data.description}        onChange={v => set("description", v)} textarea />
      <div className="grid grid-cols-2 gap-3">
        <Field label="OG Title"            value={data.ogTitle}            onChange={v => set("ogTitle", v)} />
        <Field label="OG Description"      value={data.ogDescription}      onChange={v => set("ogDescription", v)} />
        <Field label="Twitter Title"       value={data.twitterTitle}       onChange={v => set("twitterTitle", v)} />
        <Field label="Twitter Description" value={data.twitterDescription} onChange={v => set("twitterDescription", v)} />
      </div>
      <TagInput label="Keywords" tags={data.keywords} onChange={v => set("keywords", v)} />
      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function BooksEditor({ token }: { token: string }) {
  const [items, setItems] = useState<BookItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/books").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/books", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof BookItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), title: "New Book", author: "", coverImage: "", coverLink: "", status: "reading", note: "",
  }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Cover image can be a URL or a local path (drop files in <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">public/books/</code> and use <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/books/name.jpg</code>). Cover Link is where clicking the cover goes. Set status to move a book between “Currently Reading” and “Previously Read”. Drag the handle to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.status} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title"       value={item.title}      onChange={v => update(item.id, "title", v)} />
                <Field label="Author"      value={item.author}     onChange={v => update(item.id, "author", v)} />
                <Field label="Cover Image (URL or /books/…)" value={item.coverImage} onChange={v => update(item.id, "coverImage", v)} placeholder="https://… or /books/name.jpg" />
                <Field label="Cover Link"  value={item.coverLink}  onChange={v => update(item.id, "coverLink", v)} placeholder="https://goodreads.com/…" />
                <SelectField label="Status" value={item.status}    onChange={v => update(item.id, "status", v)} options={BOOK_STATUSES} />
                <Field label="Note (optional)" value={item.note}   onChange={v => update(item.id, "note", v)} placeholder="Short thought / rating" />
              </div>
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Book
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function VideoEditor({ token }: { token: string }) {
  const [data, setData]   = useState<VideoData | null>(null);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/video").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/video", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const set = (f: keyof VideoData, v: unknown) => setData(d => d ? { ...d, [f]: v } : d);

  if (!data) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-4">
      {/* Enable toggle */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40 p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Show video section</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            When off, the entire video block disappears from your site.
          </p>
        </div>
        <button
          onClick={() => set("enabled", !data.enabled)}
          role="switch"
          aria-checked={data.enabled}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${data.enabled ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.enabled ? "translate-x-6" : ""}`} />
        </button>
      </div>

      <div className={data.enabled ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
        <Field label="Section Title"   value={data.title}       onChange={v => set("title", v)} placeholder="Video Introduction" />
        <Field label="Description"     value={data.description} onChange={v => set("description", v)} textarea placeholder="A short intro / video resume" />
        <Field label="Video URL"       value={data.videoUrl}    onChange={v => set("videoUrl", v)} placeholder="YouTube link or direct .mp4 URL" />
        <Field label="Poster Image (optional, for direct video)" value={data.posterImage} onChange={v => set("posterImage", v)} placeholder="/video/poster.jpg" />
        <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
          Paste a YouTube link (auto-embedded) or a direct video file URL (.mp4/.webm — host anywhere over https, or drop in <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">public/video/</code> and use <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/video/intro.mp4</code>).
        </p>
      </div>

      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function ProjectsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/projects").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/projects", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof ProjectItem, v: unknown) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), title: "New Project", description: "", tags: [], repoUrl: "", liveUrl: "",
    status: "Completed", date: "", color: "indigo", slug: "", body: "",
  }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Add a Case Study (markdown) to give a project its own detail page at <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/projects/&lt;slug&gt;</code>. Leave Case Study empty for a card-only project. Drag to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.status} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title"  value={item.title} onChange={v => update(item.id, "title", v)} />
                <SelectField label="Status" value={item.status} onChange={v => update(item.id, "status", v)} options={PROJECT_STATUSES} />
                <Field label="Date"   value={item.date}  onChange={v => update(item.id, "date", v)} placeholder="2026" />
                <SelectField label="Accent Color" value={item.color} onChange={v => update(item.id, "color", v)} options={PROJECT_COLORS} />
                <Field label="Repo URL" value={item.repoUrl} onChange={v => update(item.id, "repoUrl", v)} placeholder="https://github.com/…" />
                <Field label="Live URL" value={item.liveUrl} onChange={v => update(item.id, "liveUrl", v)} placeholder="https://…" />
              </div>
              <Field label="Short Description (card)" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <TagInput label="Tags" tags={item.tags} onChange={v => update(item.id, "tags", v)} />
              <Field label="Custom Slug (optional — defaults to title)" value={item.slug} onChange={v => update(item.id, "slug", v)} placeholder="campus-network-design" />
              <Field label="Case Study (markdown — enables a detail page)" value={item.body} onChange={v => update(item.id, "body", v)} textarea />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Project
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function CertificationsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<CertItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/certifications").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/certifications", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof CertItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), name: "New Certification", issuer: "", issuerLogo: "", date: "", credentialUrl: "", color: "indigo",
  }]);

  return (
    <div className="space-y-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.name || "Untitled"} badge={item.date} defaultOpen={i === 0}>
              <Field label="Name" value={item.name} onChange={v => update(item.id, "name", v)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Issuer"       value={item.issuer}     onChange={v => update(item.id, "issuer", v)} placeholder="Cisco" />
                <Field label="Issuer Logo Text" value={item.issuerLogo} onChange={v => update(item.id, "issuerLogo", v)} placeholder="cisco (2-letter badge)" />
                <Field label="Date"         value={item.date}       onChange={v => update(item.id, "date", v)} placeholder="2024" />
                <Field label="Credential URL" value={item.credentialUrl} onChange={v => update(item.id, "credentialUrl", v)} placeholder="https://…" />
                <SelectField label="Accent Color" value={item.color} onChange={v => update(item.id, "color", v)} options={PROJECT_COLORS} />
              </div>
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Certification
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function TestimonialsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/testimonials").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/testimonials", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof TestimonialItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [...prev, {
    id: uid(), quote: "", name: "", role: "", org: "", avatar: "", link: "",
  }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Short recommendations from professors, mentors or colleagues. Avatar is optional (URL or /path). Drag the handle to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.name || "Untitled"} badge={item.org} defaultOpen={i === 0}>
              <Field label="Quote" value={item.quote} onChange={v => update(item.id, "quote", v)} textarea />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Name"        value={item.name}   onChange={v => update(item.id, "name", v)} />
                <Field label="Role"        value={item.role}   onChange={v => update(item.id, "role", v)} placeholder="Assistant Professor" />
                <Field label="Organization" value={item.org}   onChange={v => update(item.id, "org", v)} placeholder="AIUB" />
                <Field label="Profile Link" value={item.link}  onChange={v => update(item.id, "link", v)} placeholder="https://…" />
                <Field label="Avatar (optional)" value={item.avatar} onChange={v => update(item.id, "avatar", v)} placeholder="URL or /path.jpg" />
              </div>
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Testimonial
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function BlogEditor({ token }: { token: string }) {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/blog").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/blog", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof BlogPost, v: unknown) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));

  const add = () => setItems(prev => [{
    id: uid(), slug: "", title: "New Post", date: new Date().toISOString().slice(0, 10),
    excerpt: "", tags: [], body: "", published: false,
  }, ...prev]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Posts are written in <strong>Markdown</strong> (## headings, - bullets, [links](url), **bold**). Leave slug blank to auto-derive from the title. Toggle Published to show a post on <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">/blog</code>. Drag to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => {
          const effSlug = item.slug?.trim() || slugify(item.title);
          return (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.published ? "published" : "draft"} defaultOpen={i === 0}>
              <div className="flex items-center justify-between rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/30 px-3 py-2">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Published (visible on /blog)</span>
                <button
                  onClick={() => update(item.id, "published", !item.published)}
                  role="switch" aria-checked={item.published}
                  className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${item.published ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.published ? "translate-x-5" : ""}`} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title" value={item.title} onChange={v => update(item.id, "title", v)} />
                <Field label="Date"  value={item.date}  onChange={v => update(item.id, "date", v)} placeholder="2026-07-08" />
              </div>
              <Field label={`Slug (URL) — /blog/${effSlug || "…"}`} value={item.slug} onChange={v => update(item.id, "slug", v)} placeholder="auto from title" />
              <Field label="Excerpt (shown in the list)" value={item.excerpt} onChange={v => update(item.id, "excerpt", v)} textarea />
              <TagInput label="Tags" tags={item.tags} onChange={v => update(item.id, "tags", v)} />
              <div>
                <Label>Body (Markdown)</Label>
                <textarea
                  rows={12}
                  value={item.body}
                  onChange={e => update(item.id, "body", e.target.value)}
                  placeholder={"## Heading\n\nWrite your post in markdown…\n\n- point one\n- point two"}
                  className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-sm font-mono text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition resize-y"
                />
              </div>
              <div className="flex items-center gap-3">
                <a href={`/blog/${effSlug}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Preview ↗</a>
                <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:underline">
                  <Trash2 size={12} /> Delete post
                </button>
              </div>
            </CollapsibleCard>
          </DraggableCard>
          );
        })}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> New Post
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function SessionsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<SessionItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/sessions").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/sessions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof SessionItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));
  const add = () => setItems(prev => [...prev, {
    id: uid(), title: "New Session", role: "Facilitator", host: "", date: "", location: "", description: "", url: "",
  }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Talks, workshops, or training sessions you deliver or attend. Hidden on the site until you add one. Drag to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.role} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title" value={item.title} onChange={v => update(item.id, "title", v)} />
                <SelectField label="Role" value={item.role} onChange={v => update(item.id, "role", v)} options={SESSION_ROLES} />
                <Field label="Host / Event" value={item.host} onChange={v => update(item.id, "host", v)} placeholder="MSA-AIUB / GDG / …" />
                <Field label="Date" value={item.date} onChange={v => update(item.id, "date", v)} placeholder="Aug 2026" />
                <Field label="Location" value={item.location} onChange={v => update(item.id, "location", v)} placeholder="AIUB / Online" />
                <Field label="Link (materials / recording)" value={item.url} onChange={v => update(item.id, "url", v)} placeholder="https://…" />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Session
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function CodingEditor({ token }: { token: string }) {
  const [items, setItems] = useState<CodingProfile[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/coding").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/coding", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof CodingProfile, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));
  const add = () => setItems(prev => [...prev, { id: uid(), platform: "LeetCode", username: "", url: "", stat: "" }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Link your competitive-programming profiles. “Stat” is optional (e.g. “1500 rating”, “300+ solved”). Drag to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.platform || "Untitled"} badge={item.username} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectField label="Platform" value={item.platform} onChange={v => update(item.id, "platform", v)} options={CODING_PLATFORMS} />
                <Field label="Username"  value={item.username} onChange={v => update(item.id, "username", v)} />
                <Field label="Profile URL" value={item.url}    onChange={v => update(item.id, "url", v)} placeholder="https://leetcode.com/u/…" />
                <Field label="Stat (optional)" value={item.stat} onChange={v => update(item.id, "stat", v)} placeholder="1500 rating / 300+ solved" />
              </div>
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Profile
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function AchievementsEditor({ token }: { token: string }) {
  const [items, setItems] = useState<AchievementItem[]>([]);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/achievements").then(r => r.json()).then(setItems); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/achievements", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const update = (id: string, f: keyof AchievementItem, v: string) =>
    setItems(prev => prev.map(it => it.id === id ? { ...it, [f]: v } : it));
  const add = () => setItems(prev => [...prev, { id: uid(), title: "New Achievement", org: "", date: "", description: "", category: "award" }]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
        Awards, scholarships, competition placements, hackathon wins. Category picks the icon. Drag to reorder.
      </p>
      <Reorder.Group axis="y" values={items} onReorder={setItems} as="div" className="space-y-4">
        {items.map((item, i) => (
          <DraggableCard key={item.id} value={item}>
            <CollapsibleCard title={item.title || "Untitled"} badge={item.date} defaultOpen={i === 0}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Title" value={item.title} onChange={v => update(item.id, "title", v)} />
                <SelectField label="Category" value={item.category} onChange={v => update(item.id, "category", v)} options={ACHIEVEMENT_CATEGORIES} />
                <Field label="Organization" value={item.org} onChange={v => update(item.id, "org", v)} placeholder="UIU / IEOM / …" />
                <Field label="Date" value={item.date} onChange={v => update(item.id, "date", v)} placeholder="2026" />
              </div>
              <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea />
              <button onClick={() => setItems(prev => prev.filter(it => it.id !== item.id))}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                <Trash2 size={12} /> Remove
              </button>
            </CollapsibleCard>
          </DraggableCard>
        ))}
      </Reorder.Group>
      <div className="flex flex-wrap gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          <Plus size={14} /> Add Achievement
        </button>
        <SaveBtn state={state} onClick={save} />
      </div>
    </div>
  );
}

function ResearchEditor({ token }: { token: string }) {
  const [data, setData]   = useState<ResearchData | null>(null);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/research").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/research", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const set = (f: keyof ResearchData, v: unknown) => setData(d => d ? { ...d, [f]: v } : d);
  const updateArea = (id: string, f: keyof ResearchArea, v: string) =>
    setData(d => d ? { ...d, areas: d.areas.map(a => a.id === id ? { ...a, [f]: v } : a) } : d);
  const addArea = () => setData(d => d ? { ...d, areas: [...d.areas, { id: uid(), title: "New Area", description: "" }] } : d);
  const setAreas = (areas: ResearchArea[]) => setData(d => d ? { ...d, areas } : d);

  if (!data) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40 p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Show Research section</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">A research statement + interest areas. Off (or empty) = hidden.</p>
        </div>
        <button
          onClick={() => set("enabled", !data.enabled)}
          role="switch" aria-checked={data.enabled}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${data.enabled ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.enabled ? "translate-x-6" : ""}`} />
        </button>
      </div>

      <div className={data.enabled ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
        <Field label="Research Statement" value={data.statement} onChange={v => set("statement", v)} textarea placeholder="A short narrative on your research direction, questions, and methods." />
        <div>
          <Label>Research Areas</Label>
          <Reorder.Group axis="y" values={data.areas} onReorder={setAreas} as="div" className="space-y-3">
            {data.areas.map((a, i) => (
              <DraggableCard key={a.id} value={a}>
                <CollapsibleCard title={a.title || "Untitled"} defaultOpen={i === 0}>
                  <Field label="Title" value={a.title} onChange={v => updateArea(a.id, "title", v)} placeholder="Distributed Systems" />
                  <Field label="Description" value={a.description} onChange={v => updateArea(a.id, "description", v)} textarea />
                  <button onClick={() => setAreas(data.areas.filter(x => x.id !== a.id))}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:underline mt-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </CollapsibleCard>
              </DraggableCard>
            ))}
          </Reorder.Group>
          <button onClick={addArea} className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm text-zinc-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            <Plus size={14} /> Add Research Area
          </button>
        </div>
      </div>

      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function NowEditor({ token }: { token: string }) {
  const [data, setData]   = useState<NowData | null>(null);
  const [state, setState] = useState<SaveState>("idle");

  useEffect(() => { fetch("/api/content/now").then(r => r.json()).then(setData); }, []);

  const save = async () => {
    setState("saving");
    try {
      const r = await fetch("/api/content/now", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setState(r.ok ? "saved" : "error");
    } catch { setState("error"); }
    setTimeout(() => setState("idle"), 2500);
  };

  const set = (f: keyof NowData, v: unknown) => setData(d => d ? { ...d, [f]: v } : d);

  if (!data) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40 p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Show “Now” section</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">What you&apos;re currently focused on. Off = hidden.</p>
        </div>
        <button
          onClick={() => set("enabled", !data.enabled)}
          role="switch" aria-checked={data.enabled}
          className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${data.enabled ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.enabled ? "translate-x-6" : ""}`} />
        </button>
      </div>

      <div className={data.enabled ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
        <Field label="Last Updated" value={data.updated} onChange={v => set("updated", v)} placeholder="Jul 2026" />
        <TagInput label="Current focuses (one per entry)" tags={data.items} onChange={v => set("items", v)} />
      </div>

      <SaveBtn state={state} onClick={save} />
    </div>
  );
}

function MessagesEditor({ token }: { token: string }) {
  interface Msg { name: string; email: string; message: string; ts: number; }
  const [msgs, setMsgs] = useState<Msg[] | null>(null);

  useEffect(() => {
    fetch("/api/contact", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : []))
      .then(setMsgs)
      .catch(() => setMsgs([]));
  }, [token]);

  if (!msgs) return <div className="flex items-center gap-2 text-zinc-400 text-sm"><Loader2 size={14} className="animate-spin" /> Loading…</div>;
  if (msgs.length === 0) return <p className="text-sm text-zinc-400 dark:text-zinc-500">No messages yet. Submissions from the site contact form appear here.</p>;

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">{msgs.length} message{msgs.length === 1 ? "" : "s"} · newest first</p>
      {msgs.map((m, i) => (
        <Card key={i}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">{m.name}</span>
              <a href={`mailto:${m.email}`} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">{m.email}</a>
            </div>
            <span className="text-[11px] text-zinc-400">{new Date(m.ts).toLocaleString()}</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">{m.message}</p>
        </Card>
      ))}
    </div>
  );
}

// ── Tabs config ────────────────────────────────────────────────────────────

const TABS = [
  { id: "hero",         label: "Profile",      icon: User,          component: HeroEditor         },
  { id: "video",        label: "Video Intro",  icon: Video,         component: VideoEditor        },
  { id: "career",       label: "Career",       icon: Briefcase,     component: CareerEditor       },
  { id: "experience",   label: "Activities",   icon: Award,         component: ExperienceEditor   },
  { id: "projects",     label: "Projects",     icon: FolderGit2,    component: ProjectsEditor     },
  { id: "coding",       label: "Coding",       icon: Terminal,      component: CodingEditor       },
  { id: "achievements", label: "Achievements", icon: Trophy,        component: AchievementsEditor },
  { id: "education",    label: "Education",    icon: GraduationCap, component: EducationEditor    },
  { id: "skills",       label: "Skills",       icon: Code2,         component: SkillsEditor       },
  { id: "certifications", label: "Certifications", icon: Award,     component: CertificationsEditor },
  { id: "publications", label: "Publications", icon: BookOpen,      component: PublicationsEditor },
  { id: "research",     label: "Research",     icon: FlaskConical,  component: ResearchEditor     },
  { id: "sessions",     label: "Sessions",     icon: Presentation,  component: SessionsEditor     },
  { id: "books",        label: "Bookshelf",    icon: Library,       component: BooksEditor        },
  { id: "references",   label: "References",   icon: Users,         component: ReferencesEditor   },
  { id: "affiliations", label: "Affiliations", icon: Users,         component: AffiliationsEditor },
  { id: "now",          label: "Now",          icon: Radio,         component: NowEditor          },
  { id: "testimonials", label: "Testimonials", icon: Quote,         component: TestimonialsEditor },
  { id: "beyond",       label: "Beyond",       icon: Image,         component: BeyondEditor       },
  { id: "blog",         label: "Blog",         icon: PenLine,       component: BlogEditor         },
  { id: "site",         label: "Site Meta",    icon: Globe,         component: SiteEditor         },
  { id: "messages",     label: "Messages",     icon: Inbox,         component: MessagesEditor     },
] as const;

type TabId = typeof TABS[number]["id"];

// ── Main admin panel ───────────────────────────────────────────────────────

export default function AdminPage() {
  const [token,     setToken]     = useState<string | null>(() => (typeof window !== "undefined" ? sessionStorage.getItem("admin_token") : null));
  const [password,  setPassword]  = useState("");
  const [showPw,    setShowPw]    = useState(false);
  const [loginErr,  setLoginErr]  = useState("");
  const [logging,   setLogging]   = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // token initialized synchronously from sessionStorage via useState initializer

  const login = useCallback(async () => {
    if (!password.trim()) return;
    setLogging(true); setLoginErr("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await r.json();
      if (r.ok && json.token) {
        sessionStorage.setItem("admin_token", json.token);
        setToken(json.token);
      } else {
        setLoginErr(json.error ?? "Login failed");
      }
    } catch { setLoginErr("Network error"); }
    setLogging(false);
  }, [password]);

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null); setPassword("");
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-50 via-indigo-50/30 to-violet-50/20 dark:from-zinc-950 dark:via-indigo-950/20 dark:to-violet-950/10">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="glass-card rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Admin Panel</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Portfolio CMS — Tanvir Hasan</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") login(); }}
                    placeholder="Enter admin password"
                    className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition"
                  />
                  <button onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {loginErr && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm">
                  <XCircle size={14} className="shrink-0" />
                  {loginErr}
                </div>
              )}

              <button
                onClick={login}
                disabled={logging || !password.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                {logging ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                {logging ? "Signing in…" : "Sign In"}
              </button>
            </div>

            <p className="text-center text-xs text-zinc-400 mt-6">
              Set <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">ADMIN_PASSWORD</code> env var to enable login
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Main CMS ───────────────────────────────────────────────────────────────
  const ActiveEditor = TABS.find(t => t.id === activeTab)!.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-violet-50/10 dark:from-zinc-950 dark:via-indigo-950/10 dark:to-violet-950/5">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="glass-nav border-b border-zinc-200/50 dark:border-zinc-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-colors text-zinc-500">
              <div className="w-4 h-0.5 bg-current mb-1" />
              <div className="w-4 h-0.5 bg-current mb-1" />
              <div className="w-4 h-0.5 bg-current" />
            </button>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Lock size={13} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-zinc-900 dark:text-white">Portfolio CMS</span>
              <span className="hidden sm:inline text-xs text-zinc-400 ml-2">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href="/" target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-colors">
              <ExternalLink size={12} />
              <span className="hidden sm:inline">Live Site</span>
            </a>
            <button onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-colors">
              <LogOut size={12} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-3.5rem)]">

        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-14 left-0 z-40 w-56 shrink-0
          glass-card rounded-none md:rounded-none border-r border-zinc-200/50 dark:border-zinc-800/50
          transform transition-transform duration-300 md:transform-none
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
        `}>
          <nav className="p-3 space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${activeTab === id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white"}`}
              >
                <Icon size={15} className="shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
              {TABS.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Edit content below and click Save to update your portfolio.</p>
          </div>

          <ActiveEditor token={token} />
        </main>
      </div>
    </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, ImagePlus, Loader2, LogOut, Plus, Save, Trash2, Upload, X } from "lucide-react";

interface BeyondItem {
  id: number;
  category: string;
  iconType: string;
  images: string[];
  title: string;
  date: string;
  description: string;
}

type SaveState = "idle" | "saving" | "saved" | "error";

const ICONS = ["mic", "award", "music", "heart"];

function blankItem(id: number): BeyondItem {
  return {
    id,
    category: "New Category",
    iconType: "heart",
    images: [],
    title: "New Memory",
    date: "",
    description: "",
  };
}

function Field({ label, value, onChange, textarea = false, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string }) {
  const cls = "w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50";
  return <div><label className="block text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>{textarea ? <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-y`} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />}</div>;
}

export default function BeyondAdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<BeyondItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) { window.location.href = "/admin"; return; }
    setToken(t);
    fetch("/api/content/beyond")
      .then(async r => { if (!r.ok) throw new Error("Could not load Beyond content"); return r.json(); })
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const nextId = useMemo(() => items.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) + 1, [items]);

  const update = (id: number, field: keyof BeyondItem, value: string | string[]) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const add = () => {
    const item = blankItem(nextId);
    setItems(prev => [...prev, item]);
    setOpen(item.id);
  };

  const remove = (id: number) => {
    if (!window.confirm("Remove this Beyond item? Click Save to make the removal live.")) return;
    setItems(prev => prev.filter(x => x.id !== id));
    if (open === id) setOpen(null);
  };

  const uploadFiles = async (id: number, files: FileList | null) => {
    if (!files || !token) return;
    setUploading(id);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const r = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Upload failed");
        urls.push(data.url);
      }
      setItems(prev => prev.map(item => item.id === id ? { ...item, images: [...item.images, ...urls] } : item));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Image upload failed");
    } finally {
      setUploading(null);
    }
  };

  const removeImage = (id: number, index: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, images: item.images.filter((_, i) => i !== index) } : item));
  };

  const save = async () => {
    if (!token) return;
    setSaveState("saving");
    setError("");
    try {
      const r = await fetch("/api/content/beyond", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(items),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Save failed");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (e) {
      setSaveState("error");
      setError(e instanceof Error ? e.message : "Save failed");
      setTimeout(() => setSaveState("idle"), 2500);
    }
  };

  const logout = () => { sessionStorage.removeItem("admin_token"); window.location.href = "/admin"; };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400"><Loader2 className="animate-spin" size={18} /></div>;

  return <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-violet-50/10 dark:from-zinc-950 dark:via-indigo-950/10 dark:to-violet-950/5 text-zinc-900 dark:text-white">
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto h-14 px-4 flex items-center justify-between">
        <div><p className="font-bold text-sm">Portfolio CMS <span className="font-normal text-zinc-400">/ Beyond</span></p><p className="text-[11px] text-zinc-400">Create memories, upload photos and publish them live.</p></div>
        <div className="flex items-center gap-2"><a href="/" target="_blank" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><ExternalLink size={13}/> Live Site</a><button onClick={logout} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"><LogOut size={13}/> Logout</button></div>
      </div>
    </header>

    <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div><h1 className="text-2xl font-black tracking-tight">Beyond</h1><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Everything outside the classroom — events, hobbies, milestones and memories.</p></div>
        <div className="flex gap-2"><button onClick={add} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"><Plus size={15}/> Add Beyond Item</button><button onClick={save} disabled={saveState === "saving"} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white ${saveState === "saved" ? "bg-emerald-600" : saveState === "error" ? "bg-red-600" : "bg-indigo-600 hover:bg-indigo-500"}`}>{saveState === "saving" ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>} {saveState === "saved" ? "Saved!" : saveState === "error" ? "Error" : "Save"}</button></div>
      </div>

      {error && <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-3 text-sm">{error}</div>}

      <div className="space-y-3">
        {items.map(item => <section key={item.id} className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/40 overflow-hidden">
          <button onClick={() => setOpen(open === item.id ? null : item.id)} className="w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0"><ImagePlus size={17}/></div>
            <div className="min-w-0 flex-1"><p className="font-semibold truncate">{item.title || "Untitled"}</p><p className="text-xs text-zinc-400 mt-0.5">{item.category || "No category"}{item.date ? ` · ${item.date}` : ""} · {item.images.length} photo{item.images.length === 1 ? "" : "s"}</p></div>
            {open === item.id ? <ChevronUp size={17} className="text-zinc-400"/> : <ChevronDown size={17} className="text-zinc-400"/>}
          </button>
          {open === item.id && <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Field label="Title" value={item.title} onChange={v => update(item.id, "title", v)} placeholder="My new memory"/><Field label="Date" value={item.date} onChange={v => update(item.id, "date", v)} placeholder="Sep 2026"/><Field label="Category / Eyebrow" value={item.category} onChange={v => update(item.id, "category", v)} placeholder="Conference, Drumming, Travel…"/><div><label className="block text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">Icon</label><select value={item.iconType} onChange={e => update(item.id, "iconType", e.target.value)} className="w-full rounded-xl border border-zinc-200/70 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50">{ICONS.map(x => <option key={x}>{x}</option>)}</select></div></div>
            <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea placeholder="Tell the story behind this memory…"/>

            <div><div className="flex items-center justify-between mb-2"><label className="block text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Photos</label><span className="text-[11px] text-zinc-400">JPG, PNG, WebP or GIF · max 10 MB each</span></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">{item.images.map((url, i) => <div key={`${url}-${i}`} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"><img src={url} alt="" className="w-full h-full object-cover"/><button onClick={() => removeImage(item.id, i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600"><X size={13}/></button></div>)}</div>
              <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer ${uploading === item.id ? "opacity-60 pointer-events-none" : ""}`}>{uploading === item.id ? <Loader2 size={15} className="animate-spin"/> : <Upload size={15}/>} {uploading === item.id ? "Uploading…" : "Upload photos"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={e => { uploadFiles(item.id, e.target.files); e.currentTarget.value = ""; }}/></label>
              <p className="text-[11px] text-zinc-400 mt-2">Uploaded photos are stored in Vercel Blob, so they remain available after deployment. Their public URLs are saved with this item.</p>
            </div>
            <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:underline"><Trash2 size={13}/> Remove this item</button>
          </div>}
        </section>)}
        {!items.length && <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center"><ImagePlus size={28} className="mx-auto text-zinc-400 mb-3"/><p className="font-semibold">No Beyond items yet</p><p className="text-sm text-zinc-400 mt-1">Click “Add Beyond Item” to create your first one.</p></div>}
      </div>

      <div className="sticky bottom-4 flex justify-end"><button onClick={save} disabled={saveState === "saving"} className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-xl ${saveState === "saved" ? "bg-emerald-600" : saveState === "error" ? "bg-red-600" : "bg-indigo-600 hover:bg-indigo-500"}`}>{saveState === "saving" ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>} {saveState === "saved" ? "Changes Published" : "Save & Publish"}</button></div>
    </main>
  </div>;
}

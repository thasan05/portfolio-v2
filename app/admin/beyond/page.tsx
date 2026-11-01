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
  const cls = "w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wide text-muted mb-1">{label}</label>
      {textarea ? (
        <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-y`} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
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
    const fresh = blankItem(nextId);
    setItems(prev => [fresh, ...prev]);
    setOpen(fresh.id);
  };

  const remove = (id: number) => {
    if (!window.confirm("Delete this memory?")) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const removeImage = (itemId: number, imgIndex: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      return { ...item, images: item.images.filter((_, i) => i !== imgIndex) };
    }));
  };

  const uploadFiles = async (itemId: number, files: FileList | null) => {
    if (!files || files.length === 0 || !token) return;
    setUploading(itemId);
    setError("");

    const uploadedUrls: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Upload failed (${res.status})`);
        }
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
      }

      setItems(prev => prev.map(item => {
        if (item.id !== itemId) return item;
        return { ...item, images: [...item.images, ...uploadedUrls] };
      }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload one or more images");
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    if (!token) return;
    setSaveState("saving");
    setError("");
    try {
      const res = await fetch("/api/content/beyond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(items),
      });
      if (!res.ok) throw new Error("Could not save Beyond content");
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaveState("error");
    }
  };

  const logout = () => { sessionStorage.removeItem("admin_token"); window.location.href = "/admin"; };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bg text-muted"><Loader2 className="animate-spin" size={18} /></div>;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/85 backdrop-blur-md">
        <div className="max-w-5xl mx-auto h-14 px-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm">Portfolio CMS <span className="font-normal text-muted">/ Beyond</span></p>
            <p className="text-[11px] text-muted">Create memories, upload photos and publish them live.</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-fg hover:bg-line/40 transition-colors">
              <ExternalLink size={13}/> Live Site
            </a>
            <button onClick={logout} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-fg hover:bg-line/40 transition-colors">
              <LogOut size={13}/> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">Beyond</h1>
            <p className="text-sm text-muted mt-1">Everything outside the classroom — events, hobbies, milestones and memories.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={add}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-accent/40 text-sm font-semibold text-accent hover:bg-accent/10 transition-colors"
            >
              <Plus size={15}/> Add Beyond Item
            </button>
            <button
              onClick={save}
              disabled={saveState === "saving"}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
                saveState === "saved" ? "bg-emerald-600" : saveState === "error" ? "bg-red-600" : "bg-accent hover:opacity-90 shadow-md"
              }`}
            >
              {saveState === "saving" ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>}
              {saveState === "saved" ? "Saved!" : saveState === "error" ? "Error" : "Save"}
            </button>
          </div>
        </div>

        {error && <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-3 text-sm">{error}</div>}

        <div className="space-y-3">
          {items.map(item => (
            <section key={item.id} className="card p-0 overflow-hidden">
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-line/20 transition-colors"
              >
                <div className="size-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <ImagePlus size={17}/>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{item.title || "Untitled"}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {item.category || "No category"}{item.date ? ` · ${item.date}` : ""} · {item.images.length} photo{item.images.length === 1 ? "" : "s"}
                  </p>
                </div>
                {open === item.id ? <ChevronUp size={17} className="text-muted"/> : <ChevronDown size={17} className="text-muted"/>}
              </button>
              {open === item.id && (
                <div className="border-t border-line/60 p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Title" value={item.title} onChange={v => update(item.id, "title", v)} placeholder="My new memory"/>
                    <Field label="Date" value={item.date} onChange={v => update(item.id, "date", v)} placeholder="Sep 2026"/>
                    <Field label="Category" value={item.category} onChange={v => update(item.id, "category", v)} placeholder="Conference, Drumming, Travel…"/>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wide text-muted mb-1">Icon</label>
                      <select
                        value={item.iconType}
                        onChange={e => update(item.id, "iconType", e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                      >
                        {ICONS.map(x => <option key={x}>{x}</option>)}
                      </select>
                    </div>
                  </div>
                  <Field label="Description" value={item.description} onChange={v => update(item.id, "description", v)} textarea placeholder="Tell the story behind this memory…"/>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wide text-muted">Photos</label>
                      <span className="text-[11px] text-muted">JPG, PNG, WebP or GIF · max 10 MB each</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {item.images.map((url, i) => (
                        <div key={`${url}-${i}`} className="relative aspect-video rounded-xl overflow-hidden border border-line bg-line/20">
                          <img src={url} alt="" className="w-full h-full object-cover"/>
                          <button
                            onClick={() => removeImage(item.id, i)}
                            className="absolute top-1.5 right-1.5 size-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X size={13}/>
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-line text-sm font-medium text-muted hover:border-accent hover:text-accent cursor-pointer transition-colors ${uploading === item.id ? "opacity-60 pointer-events-none" : ""}`}>
                      {uploading === item.id ? <Loader2 size={15} className="animate-spin"/> : <Upload size={15}/>}
                      {uploading === item.id ? "Uploading…" : "Upload photos"}
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" onChange={e => { uploadFiles(item.id, e.target.files); e.currentTarget.value = ""; }}/>
                    </label>
                    <p className="text-[11px] text-muted mt-2">Uploaded photos are stored in Vercel Blob, so they remain available after deployment. Their public URLs are saved with this item.</p>
                  </div>
                  <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:underline">
                    <Trash2 size={13}/> Remove this item
                  </button>
                </div>
              )}
            </section>
          ))}
          {!items.length && (
            <div className="rounded-2xl border border-dashed border-line p-12 text-center">
              <ImagePlus size={28} className="mx-auto text-muted mb-3"/>
              <p className="font-semibold">No Beyond items yet</p>
              <p className="text-sm text-muted mt-1">Click “Add Beyond Item” to create your first one.</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-4 flex justify-end">
          <button
            onClick={save}
            disabled={saveState === "saving"}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-xl transition-all ${
              saveState === "saved" ? "bg-emerald-600" : saveState === "error" ? "bg-red-600" : "bg-accent hover:opacity-90"
            }`}
          >
            {saveState === "saving" ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>}
            {saveState === "saved" ? "Changes Published" : "Save & Publish"}
          </button>
        </div>
      </main>
    </div>
  );
}

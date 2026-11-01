"use client";

import { useEffect, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import {
  Music, Award, Mic, Heart, Calendar,
  X, Maximize2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { BeyondItem } from "../lib/content";

function getIcon(iconType: string) {
  switch (iconType) {
    case "mic":   return Mic;
    case "award": return Award;
    case "music": return Music;
    default:      return Heart;
  }
}

// ─── CARD SLIDER ───────────────────────────────────────────────────────────
function MemorySlider({
  images,
  title,
  onExpand,
}: {
  images: string[];
  title: string;
  onExpand: (idx: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((p) => (p + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/9] rounded-2xl mb-3.5 bg-line/20 flex items-center justify-center text-xs text-muted">
        No Preview
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3.5 group/slider bg-line/20 cursor-zoom-in"
      onClick={() => onExpand(current)}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative min-w-full h-full">
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label={`${title} — previous photo`}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 transition-all hover:scale-105 z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label={`${title} — next photo`}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 transition-all hover:scale-105 z-10"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md z-10">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-3 bg-white" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Zoom hint */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-center">
        <div className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 scale-90 group-hover/slider:scale-100 transition-transform">
          <Maximize2 className="text-white" size={16} />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Beyond({ data }: { data: BeyondItem[] }) {
  const [selectedState, setSelectedState] = useState<{ item: BeyondItem; index: number } | null>(null);
  const [youtubeViews, setYoutubeViews] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleExpand = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Fetch YouTube views
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch("/api/youtube-views");
        const json = await res.json();
        if (json?.totalViews) {
          setYoutubeViews(json.totalViews);
        }
      } catch {
        // silent fail
      }
    };
    fetchViews();
  }, []);

  // Lightbox navigation
  const lightboxNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedState) return;
    setSelectedState((s) => s && ({
      ...s,
      index: (s.index + 1) % s.item.images.length,
    }));
  }, [selectedState]);

  const lightboxPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedState) return;
    setSelectedState((s) => s && ({
      ...s,
      index: (s.index - 1 + s.item.images.length) % s.item.images.length,
    }));
  }, [selectedState]);

  const closeLightbox = useCallback(() => setSelectedState(null), []);

  // Keyboard navigation + body scroll lock while lightbox is open
  useEffect(() => {
    if (!selectedState) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setSelectedState((s) => s && ({ ...s, index: (s.index + 1) % s.item.images.length }));
      if (e.key === "ArrowLeft") setSelectedState((s) => s && ({ ...s, index: (s.index - 1 + s.item.images.length) % s.item.images.length }));
    };
    window.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedState, closeLightbox]);

  // Swipe support in lightbox
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setSelectedState((s) => s && ({ ...s, index: (s.index + 1) % s.item.images.length })),
    onSwipedRight: () => setSelectedState((s) => s && ({ ...s, index: (s.index - 1 + s.item.images.length) % s.item.images.length })),
    preventScrollOnSwipe: true,
  });

  if (!data || data.length === 0) return null;

  return (
    <section id="beyond" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="beyond-heading">
      <div className="flex flex-col gap-2">
        <h2 id="beyond-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Beyond Academics
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Cadet discipline, public speaking championships, community building, drumming, and voluntary CS teaching.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map((item) => {
          const Icon = getIcon(item.iconType);
          const isExpanded = expandedCards.has(item.id);
          const isLong = item.description.length > 120;

          return (
            <div
              key={item.id}
              className="card flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
            >
              <div>
                <MemorySlider
                  images={item.images}
                  title={item.title}
                  onExpand={(idx) => setSelectedState({ item, index: idx })}
                />

                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={12} className="text-accent shrink-0" />
                  <span className="text-[12px] font-medium text-muted">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg leading-snug">
                  {item.title}
                </h3>

                <p className={`mt-2 text-sm text-muted leading-relaxed font-normal ${isExpanded ? "" : "line-clamp-3"}`}>
                  {item.description.includes("{{views}}")
                    ? youtubeViews !== null
                      ? <>
                          {item.description.split("{{views}}")[0]}
                          <span className="text-fg font-semibold">{youtubeViews.toLocaleString()}</span>
                          {item.description.split("{{views}}")[1]}
                        </>
                      : "Loading…"
                    : item.description}
                </p>

                {isLong && (
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(item.id, e)}
                    className="mt-1 text-xs font-medium text-accent hover:underline"
                  >
                    {isExpanded ? "Show less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>

              <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                <span className="tabular-nums flex items-center gap-1 font-medium">
                  <Calendar size={11} /> {item.date}
                </span>
                {item.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedState({ item, index: 0 })}
                    className="font-medium text-accent hover:underline"
                  >
                    Gallery ({item.images.length}) →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-[110] p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              {...swipeHandlers}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedState.item.id}-${selectedState.index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedState.item.images[selectedState.index]}
                      alt={selectedState.item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 896px"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {selectedState.item.images.length > 1 && (
                <>
                  <button
                    onClick={lightboxPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all hover:scale-105"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={lightboxNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all hover:scale-105"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="mt-3.5 text-center text-white">
                <p className="font-sans text-base font-semibold tracking-tight">{selectedState.item.title}</p>
                {selectedState.item.images.length > 1 && (
                  <p className="text-white/60 text-xs mt-0.5 tabular-nums">
                    {selectedState.index + 1} / {selectedState.item.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

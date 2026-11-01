"use client";

import type { VideoData } from "../lib/content";
import { youTubeId } from "../lib/youtube";

export default function VideoIntro({ data }: { data: VideoData }) {
  if (!data || !data.enabled || !data.videoUrl?.trim()) return null;

  const ytId = youTubeId(data.videoUrl);

  return (
    <section id="video-intro" className="container-wide mt-12 sm:mt-16 scroll-mt-20" aria-labelledby="video-heading">
      <div className="card">
        <div className="mb-4">
          <h2 id="video-heading" className="font-serif text-2xl font-semibold tracking-tight text-fg">
            {data.title || "Introduction"}
          </h2>
          {data.description && (
            <p className="text-sm text-muted mt-1">{data.description}</p>
          )}
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-line">
          {ytId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}`}
              title={data.title || "Video Introduction"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <video
              src={data.videoUrl}
              poster={data.posterImage || undefined}
              controls
              preload="metadata"
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

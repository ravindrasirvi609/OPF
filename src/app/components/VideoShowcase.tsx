"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";

type VideoShowcaseProps = {
  title: string;
  description: string;
  embedUrl: string;
  youtubeUrl: string;
  eyebrow?: string;
};

export default function VideoShowcase({
  title,
  description,
  embedUrl,
  youtubeUrl,
  eyebrow = "Featured Video",
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const autoplayUrl = useMemo(() => {
    const separator = embedUrl.includes("?") ? "&" : "?";
    return `${embedUrl}${separator}autoplay=1&rel=0`;
  }, [embedUrl]);

  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/85 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="relative lg:col-span-3">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group relative block h-full min-h-[240px] w-full text-left sm:min-h-[320px] lg:min-h-[420px]"
                  aria-label="Play OPF featured video"
                >
                  <Image
                    src="/opf-main.webp"
                    alt="OPF featured video thumbnail"
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#041a34]/70 via-[#0a2a52]/30 to-[#1095c1]/30 transition group-hover:from-[#041a34]/60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition group-hover:scale-[1.03]">
                      <Play size={16} />
                      Play Video
                    </span>
                  </div>
                </button>
              ) : (
                <div className="relative h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[420px]">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={autoplayUrl}
                    title="OPF featured video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div className="relative bg-[linear-gradient(160deg,#f8fbff_0%,#ffffff_55%,#eff6ff_100%)] p-6 sm:p-8 lg:col-span-2">
              <span className="pill-tag">{eyebrow}</span>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
              <div className="mt-8">
                <Link
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Watch on YouTube
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

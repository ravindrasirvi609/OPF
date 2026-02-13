"use client";

import Image from "next/image";
import Link from "next/link";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

interface PageHeroProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  actions?: HeroAction[];
}

export default function PageHero({
  tag,
  title,
  description,
  image,
  alt,
  actions,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-20">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#041a34]/88 via-[#0b2d53]/78 to-[#0f172a]/70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(16,149,193,0.28),transparent_45%),radial-gradient(circle_at_78%_76%,rgba(235,106,42,0.24),transparent_40%)]" />

      <div className="section-shell">
        <div className="max-w-4xl">
          <span className="pill-tag border-white/30 bg-white/10 text-white">{tag}</span>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-100 md:text-lg">{description}</p>

          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                    action.variant === "secondary"
                      ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                      : "bg-white text-slate-900 hover:-translate-y-0.5 hover:bg-slate-100"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

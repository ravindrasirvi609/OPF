"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Microscope, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const heroImage = "/opf-main.webp";
const supportImageOne =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1400";
const supportImageTwo =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1400";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="relative isolate min-h-[95vh] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20">
        <Image
          src={heroImage}
          alt="Scientists discussing pharmaceutical research outcomes in a modern laboratory"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#041a34]/90 via-[#06284b]/80 to-[#0f172a]/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(16,149,193,0.3),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(235,106,42,0.26),transparent_35%)]" />

      <div className="section-shell relative flex min-h-[95vh] items-center py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="pill-tag border-white/30 bg-white/10 text-white">Global Pharmacy Innovation Network</span>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Bridging Research,
              <span className="text-gradient"> Education,</span>
              <br />
              and Real-World Healthcare Impact.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-slate-200 sm:text-lg">
              Operant Pharmacy Federation connects scholars, clinicians, and institutions to accelerate high-impact discoveries and professional growth in pharmaceutical sciences.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/membershipForm"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Join the Network
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/impact-stories"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/70 hover:bg-white/15"
              >
                Explore Impact Stories
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
              <Metric value="50+" label="Research Programs" icon={<Microscope size={15} />} />
              <Metric value="15+" label="Countries Reached" icon={<Globe2 size={15} />} />
              <Metric value="120+" label="Academic Partners" icon={<Sparkles size={15} />} />
            </div>
          </motion.div>

          <motion.div style={{ y: cardsY }} className="hidden lg:col-span-5 lg:block">
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="surface-card rounded-[2rem] p-4"
            >
              <div className="relative h-[340px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={supportImageOne}
                  alt="Research team inspecting pharmaceutical formulations"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent p-5">
                  <p className="font-display text-2xl text-white">Clinical-to-Industry Translation</p>
                  <p className="mt-1 text-sm text-slate-200">Turning scholarly evidence into practical healthcare systems.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
              className="surface-card mt-5 rounded-[2rem] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-28 overflow-hidden rounded-2xl">
                  <Image
                    src={supportImageTwo}
                    alt="Pharmacy students collaborating with scientific mentors"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">2026 Cohort Open</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Global Internship Pathways</p>
                  <p className="text-sm text-slate-600">Build publication-ready skills with experts and institutions.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/10 px-3 py-4 backdrop-blur-lg sm:px-4">
      <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
        {icon}
      </div>
      <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-200 sm:text-xs">{label}</p>
    </div>
  );
}

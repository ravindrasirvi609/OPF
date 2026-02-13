"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Handshake, Globe2, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const aboutImage =
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1600";

const pillars = [
  {
    icon: GraduationCap,
    title: "Academic Elevation",
    text: "Structured opportunities for students and professionals to build advanced pharmaceutical skills.",
  },
  {
    icon: Handshake,
    title: "Global Mentorship",
    text: "A trusted network of advisers and institutions spanning research, clinical, and industrial pathways.",
  },
  {
    icon: FlaskConical,
    title: "Publication Support",
    text: "Guidance from idea validation to publication-ready output and conference visibility.",
  },
  {
    icon: Globe2,
    title: "Healthcare Impact",
    text: "Programs designed to translate scientific discoveries into meaningful patient outcomes.",
  },
];

export default function AboutOpf() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <span className="pill-tag">About OPF</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold text-slate-900 md:text-5xl">
              Built for Researchers,
              <span className="text-gradient"> Trusted by Institutions.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Operant Pharmacy Federation is a research-first professional community helping pharmacy scholars and practitioners grow through collaboration, publication, and strategic mentorship.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We are an academic and professional platform, not a manufacturing company. Our focus is advancing evidence-based learning and innovation across the healthcare ecosystem.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900"
            >
              Learn More About OPF
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="surface-card relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
              <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] sm:h-[430px]">
                <Image
                  src={aboutImage}
                  alt="Pharmacy professionals analyzing experimental data in an advanced laboratory"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 max-w-sm rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Mission</p>
                  <p className="mt-1 text-sm text-white">Create a connected, publication-driven ecosystem for pharmacy education and research excellence.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.05 }}
                className="surface-card group rounded-3xl p-6 transition hover:-translate-y-1"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition group-hover:bg-[#0a4ea3]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, UsersRound, Microscope } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    title: "Community-Led Learning",
    description:
      "A dynamic ecosystem where students, faculty, and practitioners exchange insights and build long-term professional collaborations.",
    href: "/members",
    icon: UsersRound,
    accent: "from-[#0a4ea3]/20 to-transparent",
  },
  {
    title: "Evidence-Centered Research",
    description:
      "Rigorous research support from conceptualization to publication, enabling high-impact outcomes in pharmaceutical science.",
    href: "/innovations",
    icon: Microscope,
    accent: "from-[#1095c1]/25 to-transparent",
  },
  {
    title: "Future-Focused Innovation",
    description:
      "Mentorship and collaboration pathways that help transform ideas into practical healthcare applications.",
    href: "/impact-stories",
    icon: Brain,
    accent: "from-[#eb6a2a]/20 to-transparent",
  },
];

export default function Pillars() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mb-10 md:mb-14"
        >
          <span className="pill-tag">Core Pillars</span>
          <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
            The Foundation Behind
            <span className="text-gradient"> OPF Excellence</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.07 }}
                className={`surface-card group rounded-[2rem] bg-gradient-to-br ${pillar.accent} p-7 sm:p-8`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition group-hover:scale-105 group-hover:bg-[#0a4ea3]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-3xl font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                <Link
                  href={pillar.href}
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:gap-2 group-hover:text-[#0a4ea3]"
                >
                  Discover More
                  <ArrowUpRight size={16} />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

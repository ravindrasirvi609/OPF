"use client";

import { motion } from "framer-motion";
import { BookOpenText, Zap, Microscope, PenSquare } from "lucide-react";

const values = [
  {
    title: "Clarity",
    description: "Accurate, practice-ready information designed for healthcare professionals and learners.",
    icon: BookOpenText,
    color: "bg-[#0a4ea3]",
  },
  {
    title: "Efficiency",
    description: "Focused systems and workflows that help researchers spend more time on meaningful outcomes.",
    icon: Zap,
    color: "bg-[#1095c1]",
  },
  {
    title: "Research Integrity",
    description: "High standards for methodology, validation, and reproducibility across all initiatives.",
    icon: Microscope,
    color: "bg-[#0b1324]",
  },
  {
    title: "Publication Culture",
    description: "Strong support for writing, reviewing, and publishing impactful scientific work.",
    icon: PenSquare,
    color: "bg-[#eb6a2a]",
  },
];

export default function CoreValues() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <span className="pill-tag">Core Values</span>
          <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
            Principles That Shape
            <span className="text-gradient"> Every OPF Initiative</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="surface-card rounded-3xl p-6"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-white ${value.color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

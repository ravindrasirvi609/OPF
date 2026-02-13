"use client";

import { motion, animate, useMotionValue, useTransform, useInView } from "framer-motion";
import { BriefcaseBusiness, Globe2, Users, Microscope } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Successful Projects", value: 50, icon: Microscope },
  { label: "Expert Consultants", value: 30, icon: BriefcaseBusiness },
  { label: "Community Members", value: 150, icon: Users },
  { label: "Countries Reached", value: 15, icon: Globe2 },
];

export default function Statistics() {
  return (
    <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-5 lg:grid-cols-2"
        >
          <div>
            <span className="pill-tag">Impact</span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
              Measurable Outcomes,
              <span className="text-gradient"> Global Reach</span>
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-relaxed text-slate-600">
            Our programs combine mentorship, research quality, and collaboration to drive consistent growth for professionals and institutions worldwide.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} delay={idx * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: {
    label: string;
    value: number;
    icon: React.ComponentType<{ size?: string | number; className?: string }>;
  };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(count, stat.value, {
      duration: 1.8,
      ease: "easeOut",
      delay,
    });

    return () => controls.stop();
  }, [count, delay, inView, stat.value]);

  const Icon = stat.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      className="surface-card rounded-3xl p-6"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
        <Icon size={18} />
      </div>
      <p className="mt-4 font-display text-5xl font-semibold text-slate-900">
        <motion.span>{rounded}</motion.span>+
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
    </motion.article>
  );
}

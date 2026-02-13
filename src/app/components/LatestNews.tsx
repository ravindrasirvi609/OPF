"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const news = [
  {
    title: "India Pharma Expo 2026",
    excerpt:
      "OPF delegates and partner institutions will convene to discuss translational research and next-gen therapeutics.",
    date: "January 15, 2026",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1400",
    category: "Events",
    href: "/impact-stories",
  },
  {
    title: "New Collaboration for Pharmacovigilance",
    excerpt:
      "A new academic partnership expands OPF safety-science programs and data-backed medication monitoring initiatives.",
    date: "January 10, 2026",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400",
    category: "Collaboration",
    href: "/collaborations",
  },
  {
    title: "Global Internship Applications Open",
    excerpt:
      "The 2026 internship cycle now welcomes applicants interested in publication-centric mentorship and practical training.",
    date: "January 5, 2026",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1400",
    category: "Careers",
    href: "/membershipForm",
  },
];

export default function LatestNews() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-5"
        >
          <div className="max-w-3xl">
            <span className="pill-tag">Latest Updates</span>
            <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
              What&apos;s New Across
              <span className="text-gradient"> The OPF Network</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Follow recent collaborations, opportunities, and events shaping the future of pharmacy education and research.
            </p>
          </div>
          <Link
            href="/impact-stories"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {news.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="surface-card group overflow-hidden rounded-[1.8rem]"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="p-6">
                <p className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  <CalendarDays size={13} />
                  {item.date}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:gap-2 group-hover:text-[#0a4ea3]"
                >
                  Read More
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

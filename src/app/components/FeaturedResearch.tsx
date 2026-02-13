"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const researchAreas = [
  {
    title: "Genomic Medicine",
    description: "Precision therapeutics informed by patient-specific genetic data for safer and more effective care.",
    image:
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Drug Delivery Systems",
    description: "Novel approaches to improve therapeutic targeting, bioavailability, and sustained release outcomes.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Nanopharmaceuticals",
    description: "Engineered nanoscale materials for diagnostics, treatment precision, and translational medicine.",
    image:
      "https://images.unsplash.com/photo-1582719361028-44f7d2ef7f9f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Neuropharmacology",
    description: "Research-driven therapeutics for complex neurological and cognitive health challenges.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Cardiovascular Science",
    description: "Data-backed treatment pathways designed to improve long-term cardiovascular outcomes.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Immunology & Safety",
    description: "Advancing pharmacovigilance and immune therapeutics through collaborative scientific inquiry.",
    image:
      "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function FeaturedResearch() {
  return (
    <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="pill-tag">Research Frontiers</span>
          <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
            High-Priority Areas Driving
            <span className="text-gradient"> Modern Pharmacy</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area, idx) => (
            <motion.article
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="surface-card group overflow-hidden rounded-[1.8rem]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={area.image}
                  alt={`${area.title} laboratory research`}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-900">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{area.description}</p>
                <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-800 transition group-hover:gap-2 group-hover:text-[#0a4ea3]">
                  Explore Insights
                  <ArrowUpRight size={15} />
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

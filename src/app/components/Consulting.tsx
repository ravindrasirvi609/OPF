"use client";

import { motion } from "framer-motion";
import { FileCheck2, BarChart3, FlaskConical, Building2 } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Regulatory Strategy",
    description: "Practical support across compliance frameworks and quality-led approval pathways.",
    icon: FileCheck2,
  },
  {
    title: "R&D Optimization",
    description: "Guidance to refine formulation decisions, testing workflows, and translational outcomes.",
    icon: FlaskConical,
  },
  {
    title: "Growth Analytics",
    description: "Evidence-based planning for expansion, partnerships, and organizational decision-making.",
    icon: BarChart3,
  },
  {
    title: "Institutional Enablement",
    description: "Capability development programs tailored for academic and healthcare institutions.",
    icon: Building2,
  },
];

const consultingImage =
  "https://images.unsplash.com/photo-1579165466741-7f35e4755183?auto=format&fit=crop&q=80&w=1600";

export default function Consulting() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="surface-card overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <span className="pill-tag">Consulting Services</span>
              <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
                Strategic Expertise for
                <span className="text-gradient"> Pharma Growth</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                OPF provides tailored consulting support for organizations seeking strong quality systems, compliant operations, and innovation-oriented growth.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.06 * idx }}
                      className="rounded-2xl border border-slate-200 bg-white/70 p-4"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <Icon size={18} />
                      </div>
                      <p className="mt-3 text-lg font-semibold text-slate-900">{service.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] sm:h-[420px]">
                <Image
                  src={consultingImage}
                  alt="Pharmaceutical quality assurance specialist conducting process review"
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

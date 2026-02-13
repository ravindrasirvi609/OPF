"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sectionBackground =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1800";

export default function FoundersMessage() {
  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-20">
        <Image
          src={sectionBackground}
          alt="Blurred medical research lab backdrop"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[#091831]/84" />

      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="surface-card rounded-[2rem] p-4">
              <div className="relative h-[440px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/founder.png"
                  alt="Vikram Choudhary, Founder and Director of OPF"
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="pill-tag border-white/25 bg-white/10 text-white">Founder&apos;s Message</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold text-white md:text-5xl">
              Leading a Collaborative Future for
              <span className="text-gradient"> Pharmaceutical Science</span>
            </h2>
            <blockquote className="mt-6 space-y-5 text-base leading-relaxed text-slate-200 md:text-lg">
              <p>
                &ldquo;OPF was built to empower pharmacy professionals with practical pathways for research, publication, and leadership in healthcare innovation.&rdquo;
              </p>
              <p>
                &ldquo;By connecting academic rigor with industry relevance, we help our members produce work that improves systems, policies, and patient outcomes.&rdquo;
              </p>
              <p>
                &ldquo;This is a long-term movement focused on raising standards and creating opportunities for every committed learner and researcher.&rdquo;
              </p>
            </blockquote>
            <div className="mt-8 border-t border-white/20 pt-6">
              <p className="font-display text-3xl font-semibold text-white">Vikram Choudhary</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Founder & Director, OPF</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

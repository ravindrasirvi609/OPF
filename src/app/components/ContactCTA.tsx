"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ctaImage =
  "https://images.unsplash.com/photo-1769334440627-35cbcbf3cadb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ContactCTA() {
  return (
    <section className="pb-20 pt-6 md:pb-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2rem]"
        >
          <div className="absolute inset-0">
            <Image
              src={ctaImage}
              alt="Pharmacy innovation team discussing collaborative strategy"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#03172f]/92 via-[#0a4ea3]/80 to-[#1095c1]/72" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 px-6 py-14 text-white sm:px-10 sm:py-16 md:px-14 md:py-20">
            <span className="pill-tag border-white/25 bg-white/10 text-white">Start Collaborating</span>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold text-white [text-shadow:0_8px_32px_rgba(0,0,0,0.55)] md:text-5xl">
              Ready to Build the Next Chapter of Pharmacy Innovation?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100 [text-shadow:0_6px_20px_rgba(0,0,0,0.45)] md:text-base">
              Partner with OPF to access mentorship, publication support, and collaboration opportunities that transform ideas into healthcare outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Contact Us
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/membershipForm"
                className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

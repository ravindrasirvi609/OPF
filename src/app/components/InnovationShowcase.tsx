"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "IP Moment", type: "Industry", logo: "/logo/IPMoment.png" },
  { name: "Priyadarshini College", type: "Academic", logo: "/logo/Priyadarshini.png" },
  { name: "Dr. D. Y. Patil Institute", type: "Academic", logo: "/logo/dypatil.png" },
  { name: "Sinhgad College", type: "Academic", logo: "/logo/sinhgad.png" },
  { name: "Modern College", type: "Academic", logo: "/logo/mordern.png" },
  { name: "Abhinav Educational", type: "Academic", logo: "/logo/Abhinav.png" },
  { name: "KGR Institute", type: "Academic", logo: "/logo/KGR.png" },
  { name: "Sunrise College", type: "Academic", logo: "/logo/sunrise.png" },
  { name: "MLSU", type: "Academic", logo: "/logo/Mohanlal.png" },
  { name: "Nirma University", type: "Academic", logo: "/logo/Nirma.jpg" },
  { name: "Nirmala College", type: "Academic", logo: "/logo/nirmala.png" },
  { name: "National Facility", type: "Industry", logo: "/logo/nfb.png" },
];

const doublePartners = [...partners, ...partners];

export default function InnovationShowcase() {
  return (
    <section className="section-pad bg-[linear-gradient(180deg,#f5faff_0%,#ffffff_100%)]">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <span className="pill-tag">Collaborations</span>
          <h2 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
            Trusted by Leading
            <span className="text-gradient"> Academic and Industry Partners</span>
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Our collaboration network bridges institutions, researchers, and practitioners to create stronger learning, publication, and innovation outcomes.
          </p>
        </motion.div>
      </div>

      <div className="marquee-row">
        <div className="marquee-track gap-4 px-2 sm:gap-5 sm:px-3">
          {doublePartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="surface-card flex min-h-36 w-[260px] flex-shrink-0 flex-col items-center justify-center rounded-3xl px-5 py-6 text-center"
            >
              <div className="relative h-14 w-[140px]">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800">{partner.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">{partner.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

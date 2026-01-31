"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


const partners = [
  { name: "IP Moment", type: "industrial", logo: "/logo/IPMoment.png" },
  { name: "Priyadarshini College", type: "academic", logo: "/logo/Priyadarshini.png" },
  { name: "Dr. D. Y. Patil Institute", type: "academic", logo: "/logo/dypatil.png" },
  { name: "Singhad College", type: "academic", logo: "/logo/sinhgad.png" },
  { name: "Modern College", type: "academic", logo: "/logo/mordern.png" },
  { name: "Abhinav Educational", type: "academic", logo: "/logo/Abhinav.png" },
  { name: "KGR Institute", type: "academic", logo: "/logo/KGR.png" },
  { name: "Sunrise College", type: "academic", logo: "/logo/sunrise.png" },
  { name: "MLSU", type: "academic", logo: "/logo/Mohanlal.png" },
  { name: "Nirma University", type: "academic", logo: "/logo/Nirma.jpg" },
  { name: "V. V. Institute", type: "academic", logo: "/logo/vv.png" },
  { name: "Nirmala College", type: "academic", logo: "/logo/nirmala.png" },
  { name: "D. Y. Patil University", type: "academic", logo: "/logo/dypatilmumbai.png" },
  { name: "National Facility", type: "industrial", logo: "/logo/nfb.png" },
];

export default function PartnersShowcase() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      // Each card is w-64 (256px) + gap-8 (32px) = 288px
      const cardWidth = 288;
      const totalWidth = partners.length * cardWidth;

      gsap.to(marquee, {
        x: -totalWidth,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }

    gsap.fromTo(".partners-header",
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { scope: containerRef });

  // Duplicate partners for seamless marquee
  const extendedPartners = [...partners, ...partners];

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 partners-header opacity-0">
        <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
          <span className="text-[#154c8c] text-sm font-medium tracking-wider uppercase">
            Collaborations
          </span>
        </div>
        <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
          Trust by Leading <br />
          <span className="text-gradient">Institutions</span>
        </h2>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap"
        >
          {extendedPartners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center group hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
            >
              <div className="h-20 w-full flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-sm font-bold text-slate-800 text-center truncate w-full">
                {partner.name}
              </p>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-2">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

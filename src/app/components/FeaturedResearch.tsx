"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaDna,
  FaPills,
  FaMicroscope,
  FaBrain,
  FaHeartbeat,
  FaVirus,
} from "react-icons/fa";


const researchAreas = [
  {
    icon: <FaDna />,
    title: "Genomic Medicine",
    description:
      "Exploring personalized treatments based on genetic profiles to revolutionize patient care and therapy.",
  },
  {
    icon: <FaPills />,
    title: "Drug Delivery",
    description:
      "Developing innovative methods to enhance medication efficacy and ensure targeted drug release.",
  },
  {
    icon: <FaMicroscope />,
    title: "Nanotechnology",
    description:
      "Harnessing the power of nanoparticles for precise drug delivery and advanced diagnostic tools.",
  },
  {
    icon: <FaBrain />,
    title: "Neuropharmacology",
    description:
      "Investigating novel treatments for neurological disorders and complex mental health conditions.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Cardiology",
    description:
      "Advancing therapies for heart diseases and improving cardiovascular health outcomes globally.",
  },
  {
    icon: <FaVirus />,
    title: "Immunology",
    description:
      "Developing new approaches to modulate the immune system for treating chronic diseases.",
  },
];

export default function ResearchAreas() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".research-card",
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".research-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
      }
    );

    gsap.fromTo(".research-header",
      { x: -50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 research-header opacity-0">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#80b142]/20 rounded-full bg-[#80b142]/5">
            <span className="text-[#80b142] text-sm font-medium tracking-wider uppercase">
              Research Frontier
            </span>
          </div>
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight mb-8">
            Pioneering <span className="text-gradient">Pharmaceutical</span> <br />
            Innovation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 research-grid">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="research-card opacity-0 group relative p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="text-5xl text-slate-800 mb-8 group-hover:scale-110 group-hover:text-[#E91E63] transition-all duration-500 origin-left">
                {area.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                {area.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {area.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#154c8c] transition-colors duration-300">
                Read Publication
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>

              {/* Decorative Accent */}
              <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#E91E63] transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

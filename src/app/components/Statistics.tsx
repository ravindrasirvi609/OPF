"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaProjectDiagram, FaUserTie, FaUsers, FaGlobe } from "react-icons/fa";
import { useGSAP } from "@gsap/react";


interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, suffix = "+" }) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const counter = counterRef.current;

    gsap.fromTo(counter,
      { innerHTML: 0 },
      {
        innerHTML: value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(containerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: containerRef, dependencies: [value] });

  return (
    <div
      ref={containerRef}
      className="group opacity-0 relative p-10 rounded-[40px] bg-white border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-110">
        <div className="text-8xl">{icon}</div>
      </div>

      <div className="relative z-10">
        <div className="text-4xl mb-6 text-[#E91E63] group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
          {icon}
        </div>
        <div className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
          <span ref={counterRef}>0</span>{suffix}
        </div>
        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-loose">
          {label}
        </div>
      </div>
    </div>
  );
};

const Statistics: React.FC = () => {
  const stats = [
    { icon: <FaProjectDiagram />, value: 50, label: "Successful Projects" },
    { icon: <FaUserTie />, value: 30, label: "Expert Consultants" },
    { icon: <FaUsers />, value: 150, label: "Team Members" },
    { icon: <FaGlobe />, value: 15, label: "Countries Reached" },
  ];

  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Making a Global <br />
              <span className="text-gradient">Impact</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xl text-slate-600 leading-relaxed">
              Our reach extends across continents, fostering a community of dedicated researchers and healthcare professionals committed to excellence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;

"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFileAlt, FaUsers, FaMicrophoneAlt, FaTools } from "react-icons/fa";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const counter = counterRef.current;
    gsap.to(counter, {
      innerHTML: value,
      duration: 2,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
      },
    });
  }, [value]);

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="text-5xl mb-4 text-[#80b142]">{icon}</div>
      <div className="text-4xl font-bold text-[#154c8c] mb-2">
        <span ref={counterRef}>0</span>+
      </div>
      <div className="text-xl text-gray-600">{label}</div>
    </div>
  );
};

const Statistics: React.FC = () => {
  const stats = [
    { icon: <FaFileAlt />, value: 500, label: "Research Papers Published" },
    { icon: <FaUsers />, value: 10000, label: "Active Members" },
    { icon: <FaMicrophoneAlt />, value: 150, label: "Conferences Held" },
    { icon: <FaTools />, value: 300, label: "Workshops Conducted" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-[#154c8c] mb-12">
          Our Impact in Numbers
        </h2>
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

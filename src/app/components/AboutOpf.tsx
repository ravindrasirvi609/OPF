"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";


const AboutOpf = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const headingSplit = new SplitType(headingRef.current!, { types: "words" });

    gsap.fromTo(headingSplit.words,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(".about-card",
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    // FIX: Mask should reveal from 1 to 0
    gsap.fromTo(".about-image-mask",
      { scaleY: 1 }, // Start with the mask fully covering
      {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 65%",
          toggleActions: "play none none none",
        },
        scaleY: 0, // Animate to fully revealed
        transformOrigin: "top",
        duration: 1.5,
        ease: "expo.inOut",
      }
    );

    return () => {
      headingSplit.revert();
    };
  }, { scope: containerRef });

  const features = [
    {
      icon: <FaGraduationCap className="text-3xl text-[#E91E63]" />,
      title: "Scientific Community",
      description:
        "A multidisciplinary community focused on advancing pharmaceutical science through collaboration.",
    },
    {
      icon: <FaHandshake className="text-3xl text-[#154c8c]" />,
      title: "Global Networking",
      description:
        "Connect with top-tier mentors, researchers, and industry experts across 15+ countries.",
    },
    {
      icon: <FaChartLine className="text-3xl text-[#80b142]" />,
      title: "Research Excellence",
      description:
        "Powered by researchers for researchers, we elevate the standard of pharmaceutical publications.",
    },
    {
      icon: <FaGlobe className="text-3xl text-slate-800" />,
      title: "Healthcare Impact",
      description:
        "Driving innovation to solve global healthcare challenges and improve patient outcomes.",
    },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32 about-content">
          <div className="lg:col-span-12 text-center">
            <h2
              ref={headingRef}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight"
            >
              Powered by Researchers <br />
              <span className="text-gradient">For Researchers</span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              The Operant Pharmacy Federation (OPF) is more than just a platform; it's a movement dedicated to advancing the pharmacy profession through organized exhibitions, conferences, and world-class research publications.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#E91E63]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#E91E63]">Learn More About OPF</span>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="about-image-mask absolute inset-0 bg-slate-900 z-10" />
            <div className="rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                alt="Lab Research"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#154c8c] p-8 rounded-3xl text-white max-w-xs hidden md:block z-20">
              <p className="text-lg font-medium">"Our mission is to foster an environment where clinical and scientific excellence thrives."</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 about-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="about-card p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group"
            >
              <div className="mb-6 p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/membershipForm">
            <button className="group relative px-12 py-5 bg-transparent text-slate-900 font-bold overflow-hidden rounded-full border border-slate-200">
              <span className="relative z-10">Start Your Journey Today</span>
              <div className="absolute inset-0 bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="absolute inset-0 flex items-center justify-center text-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20">Start Your Journey Today</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutOpf;

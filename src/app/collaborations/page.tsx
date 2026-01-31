"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Link from "next/link";
import {
  FaHandshake,
  FaUniversity,
  FaBuilding,
  FaChartLine,
  FaGlobe,
  FaUsers,
  FaLightbulb,
  FaAward,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const collaborations = [
  {
    icon: <FaUniversity />,
    title: "Institute of Pharmacy, Nirma University",
    type: "Academic Partnership",
    description:
      "Empowering pharmacy profession and global healthcare through collaborative research and educational excellence.",
    impact: "500+ Students Benefited",
    color: "#154c8c",
  },
  {
    icon: <FaUniversity />,
    title: "Dr. D. Y. Patil Institute",
    type: "Academic Partnership",
    description:
      "Advancing pharmaceutical education and research through innovative programs and joint initiatives.",
    impact: "Research Excellence",
    color: "#80b142",
  },
  {
    icon: <FaUniversity />,
    title: "Priyadarshini College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Fostering groundbreaking research and educational initiatives in pharmaceutical sciences.",
    impact: "Innovation Hub",
    color: "#E91E63",
  },
  {
    icon: <FaBuilding />,
    title: "IP Moment",
    type: "Industry Partnership",
    description:
      "Strategic alliance with leading technology providers for pharmaceutical innovation and digital transformation.",
    impact: "Digital Innovation",
    color: "#154c8c",
  },
  {
    icon: <FaUniversity />,
    title: "Sinhgad College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Collaborative research programs driving pharmaceutical advancements and student development.",
    impact: "Research Programs",
    color: "#80b142",
  },
  {
    icon: <FaUniversity />,
    title: "Modern College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Partnership focused on modern pharmaceutical practices and cutting-edge research methodologies.",
    impact: "Modern Practices",
    color: "#E91E63",
  },
];

const impactStats = [
  { icon: <FaUsers />, value: "15+", label: "Partner Institutions" },
  { icon: <FaGlobe />, value: "10+", label: "Countries" },
  { icon: <FaLightbulb />, value: "50+", label: "Joint Projects" },
  { icon: <FaAward />, value: "100+", label: "Research Papers" },
];

const Collaborations = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useGSAP(
    () => {
      // Heading animation
      const headingSplit = new SplitType(headingRef.current!, {
        types: "chars,words",
      });
      const subheadingSplit = new SplitType(subheadingRef.current!, {
        types: "lines",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        headingSplit.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1 }
      ).fromTo(
        subheadingSplit.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.5"
      );

      // Collaboration cards animation
      gsap.fromTo(
        ".collab-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: ".collab-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
        }
      );

      // Impact stats animation
      gsap.fromTo(
        ".impact-stat",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".impact-section",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Floating elements
      gsap.to(".float-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      return () => {
        headingSplit.revert();
        subheadingSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white py-32 overflow-hidden relative"
    >
      {/* Background Abstract Shapes */}
      <div className="float-element absolute top-20 left-10 w-72 h-72 bg-[#E91E63]/5 rounded-full blur-[100px]" />
      <div className="float-element absolute bottom-20 right-10 w-96 h-96 bg-[#154c8c]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
            <span className="text-[#154c8c] text-sm font-medium tracking-wider uppercase">
              Our Partnerships
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            Building Bridges <br />
            <span className="text-gradient">Across Healthcare</span>
          </h1>

          <p
            ref={subheadingRef}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the powerful partnerships and synergies that drive
            innovation and progress in the pharmacy industry. Together, we're
            shaping the future of pharmaceutical research and education.
          </p>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 collab-grid">
          {collaborations.map((collab, index) => (
            <div
              key={index}
              className="collab-card opacity-0 group relative p-10 rounded-[40px] bg-white border border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
            >
              {/* Decorative gradient */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: collab.color }}
              />

              <div
                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left"
                style={{ color: collab.color }}
              >
                {collab.icon}
              </div>

              <div className="mb-3">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${collab.color}15`,
                    color: collab.color,
                  }}
                >
                  {collab.type}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {collab.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {collab.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {collab.impact}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: collab.color }}
                />
              </div>

              {/* Hover effect line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: collab.color }}
              />
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="impact-section bg-gradient-to-br from-slate-900 to-slate-800 rounded-[60px] p-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <FaChartLine className="text-[#E91E63] text-3xl" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Collaboration Impact
                </h2>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Our strategic partnerships have driven innovation, improved
                patient outcomes, and advanced the pharmacy profession globally.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="impact-stat opacity-0 text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-4xl text-[#E91E63] mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/membershipForm">
                <button className="group relative px-12 py-5 bg-white text-slate-900 font-bold overflow-hidden rounded-full">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Join Our Network
                  </span>
                  <div className="absolute inset-0 bg-[#E91E63] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { conferences } from "../../../data";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaLightbulb,
  FaUsers,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface Conference {
  id: number;
  heading: string;
  subHeading: string;
  title: string;
  collaborator: string;
  activity: string;
  date: string;
  description: string;
  objectives: string[];
  keyTakeaways: string[];
  imageUrl?: string;
  innovationCount?: number;
  impactedLives?: number;
  location?: string;
}

const ImpactStories: React.FC = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(
    () => {
      // Heading animation
      const headingSplit = new SplitType(headingRef.current!, {
        types: "chars,words",
      });
      const descSplit = new SplitType(descRef.current!, { types: "lines" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingSplit.chars,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2 }
      ).fromTo(
        descSplit.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
        "-=0.6"
      );

      // Story cards animation with stagger
      gsap.fromTo(
        ".story-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
          rotateY: -15,
        },
        {
          scrollTrigger: {
            trigger: ".stories-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          stagger: 0.12,
          duration: 1.3,
          ease: "expo.out",
        }
      );

      // Image reveal animation
      gsap.fromTo(
        ".image-mask",
        { scaleY: 1 },
        {
          scrollTrigger: {
            trigger: ".stories-grid",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          scaleY: 0,
          transformOrigin: "top",
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.inOut",
        }
      );

      // Floating background elements
      gsap.to(".float-bg", {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8,
      });

      return () => {
        headingSplit.revert();
        descSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-white via-[#fafafa] to-white min-h-screen py-32 overflow-hidden relative"
    >
      {/* Floating Background Elements */}
      <div className="float-bg absolute top-20 right-20 w-96 h-96 bg-[#E91E63]/5 rounded-full blur-[120px]" />
      <div className="float-bg absolute bottom-40 left-20 w-80 h-80 bg-[#154c8c]/5 rounded-full blur-[100px]" />
      <div className="float-bg absolute top-1/2 left-1/2 w-64 h-64 bg-[#80b142]/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#E91E63]/20 rounded-full bg-[#E91E63]/5">
            <span className="text-[#E91E63] text-sm font-medium tracking-wider uppercase">
              Impact Stories
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            Transforming Lives <br />
            <span className="text-gradient">Worldwide</span>
          </h1>

          <p
            ref={descRef}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover how our innovations are transforming lives and shaping the
            future of healthcare worldwide through groundbreaking research and
            collaborative initiatives.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stories-grid">
          {conferences.map((conference: Conference) => (
            <Link href={`/impact-stories/${conference.id}`} key={conference.id}>
              <div className="story-card opacity-0 group bg-white rounded-[40px] shadow-lg overflow-hidden hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="image-mask absolute inset-0 bg-slate-900 z-10" />
                  <Image
                    src={conference.imageUrl || "/opflogo.png"}
                    alt={conference.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[5]" />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <FaCalendarAlt className="text-[#E91E63] text-sm" />
                      <span className="text-sm font-bold text-slate-900">
                        {conference.date}
                      </span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                      {conference.heading}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                    {conference.subHeading}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    {conference.innovationCount && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-[#80b142]/10 flex items-center justify-center">
                          <FaLightbulb className="text-[#80b142] text-lg" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {conference.innovationCount}
                          </div>
                          <div className="text-xs text-slate-500">
                            Innovations
                          </div>
                        </div>
                      </div>
                    )}
                    {conference.impactedLives && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-[#154c8c]/10 flex items-center justify-center">
                          <FaUsers className="text-[#154c8c] text-lg" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {conference.impactedLives}
                          </div>
                          <div className="text-xs text-slate-500">
                            Lives Impacted
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#E91E63] font-bold group-hover:gap-5 transition-all duration-300">
                      <span className="text-sm uppercase tracking-wider">
                        Read Story
                      </span>
                      <FaArrowRight className="text-lg" />
                    </div>
                    {conference.location && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <FaGlobe className="text-sm" />
                        <span className="text-xs font-medium">
                          {conference.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#E91E63]/20 to-transparent rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="inline-block p-12 rounded-[50px] bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(233,30,99,0.1)_0%,_transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Be Part of Our Story
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Join our community and contribute to groundbreaking research
                that's making a real difference.
              </p>
              <Link href="/membershipForm">
                <button className="group relative px-10 py-4 bg-white text-slate-900 font-bold rounded-full overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Join OPF Today
                  </span>
                  <div className="absolute inset-0 bg-[#E91E63] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;

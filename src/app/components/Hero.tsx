"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import SplitType from "split-type";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const floatItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP((context) => {
    // Prevent double-splitting if re-rendered
    const titleSplit = new SplitType(titleRef.current!, { types: "chars,words" });
    const textSplit = new SplitType(textRef.current!, { types: "lines" });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.set([".hero-badge", ".hero-cta", imageRef.current, textRef.current], { opacity: 0 });

    tl.to(".hero-badge", { opacity: 1, y: 0, duration: 1, delay: 0.5 })
      .fromTo(titleSplit.chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, duration: 1.2 },
        "-=0.5"
      )
      .fromTo(textSplit.lines,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1 },
        "-=0.8"
      )
      .fromTo(".hero-cta",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(imageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
        "-=1.2"
      );

    // Parallax effect on image
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Floating animation
    floatItemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.set(item, { opacity: 0, y: 20 });
        gsap.to(item, { opacity: 1, y: 0, duration: 0.8, delay: 1.5 + (i * 0.2) });
        gsap.to(item, {
          y: i % 2 === 0 ? -15 : 15,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    // Cleanup for SplitType
    return () => {
      titleSplit.revert();
      textSplit.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa] py-20"
    >
      {/* Background Abstract Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E91E63]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#154c8c]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-left">
          <div className="hero-badge opacity-0 inline-block px-4 py-1.5 mb-6 border border-[#E91E63]/20 rounded-full bg-[#E91E63]/5">
            <span className="text-[#E91E63] text-sm font-medium tracking-wider uppercase">
              Operant Pharmacy Federation
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-slate-900 mb-8 tracking-tight"
          >
            Advancing <br />
            <span className="text-[#E91E63]">Pharmacy</span> <br />
            Through Research
          </h1>

          <p
            ref={textRef}
            className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed opacity-0"
          >
            A global platform powered by researchers for researchers, focusing on groundbreaking innovations and high-impact healthcare solutions.
          </p>

          <div className="hero-cta flex flex-wrap gap-4 opacity-0">
            <Link href="/impact-stories">
              <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-slate-900/20">
                Explore Initiatives
              </button>
            </Link>
            <Link href="/membershipForm">
              <button className="px-8 py-4 border border-slate-200 text-slate-900 rounded-full font-semibold hover:bg-slate-50 transition-all duration-300">
                Join Community
              </button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div
            ref={imageRef}
            className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700 opacity-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1576086216120-458159a99841?auto=format&fit=crop&q=80&w=2070"
              alt="Innovative Pharmacy Research"
              width={800}
              height={1000}
              className="object-cover h-[600px] w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>

          {/* Floating Cards */}
          <div
            ref={el => { floatItemsRef.current[0] = el }}
            className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block opacity-0"
          >
            <div className="text-3xl font-bold text-[#E91E63]">50+</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Projects</div>
          </div>

          <div
            ref={el => { floatItemsRef.current[1] = el }}
            className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block opacity-0"
          >
            <div className="text-3xl font-bold text-[#154c8c]">15+</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Countries</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#E91E63] rounded-full" />
        </div>
      </div>
    </section>
  );
}

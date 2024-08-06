"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="bg-[#80b142] text-white py-20">
      <div className="max-w-6xl mx-auto flex items-center">
        <div className="w-1/2 pr-10">
          <h1 className="text-5xl font-bold mb-6 hero-text">
            Advancing Pharmacy Through Innovation
          </h1>
          <p className="text-xl mb-8 hero-text">
            Discover groundbreaking research and cutting-edge pharmaceutical
            innovations.
          </p>
          <button className="bg-[#154c8c] text-white px-6 py-3 rounded-full hero-text">
            Learn More
          </button>
        </div>
        <div className="w-1/2 hero-image">
          <img
            src="/images/hero-image.jpg"
            alt="Pharmaceutical Research"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

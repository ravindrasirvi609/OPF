"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function InnovationShowcase() {
  const showcaseRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".innovation-item", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 70%",
        },
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={showcaseRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#154c8c]">
          Innovation Showcase
        </h2>
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center innovation-item">
              <div className="w-1/2 pr-10">
                <h3 className="text-2xl font-semibold mb-4">Innovation {i}</h3>
                <p className="mb-4">
                  Detailed description of the innovation and its potential
                  impact on pharmaceutical industry.
                </p>
                <a href="#" className="text-[#80b142] font-semibold">
                  Learn More
                </a>
              </div>
              <div className="w-1/2">
                <img
                  src={`/images/innovation-${i}.jpg`}
                  alt={`Innovation ${i}`}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedResearch() {
  const researchRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".research-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: researchRef.current,
          start: "top 80%",
        },
      });
    }, researchRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={researchRef} className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#154c8c]">
          Featured Research
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md research-card"
            >
              <h3 className="text-xl font-semibold mb-4">
                Research Paper Title {i}
              </h3>
              <p className="mb-4">
                Brief description of the research paper and its significance in
                the field of pharmacy.
              </p>
              <a href="#" className="text-[#80b142] font-semibold">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

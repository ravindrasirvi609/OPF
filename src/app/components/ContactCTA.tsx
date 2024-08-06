"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const ctaRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="py-20 bg-[#154c8c] text-white">
      <div className="max-w-4xl mx-auto text-center cta-content">
        <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
        <p className="text-xl mb-8">
          Join us in shaping the future of pharmacy. Let's innovate together.
        </p>
        <button className="bg-[#80b142] text-white px-8 py-3 rounded-full text-lg font-semibold">
          Contact Us
        </button>
      </div>
    </section>
  );
}

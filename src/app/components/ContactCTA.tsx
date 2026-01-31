"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function ContactCTA() {
  const ctaRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".cta-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: ctaRef });

  return (
    <section ref={ctaRef} className="py-20 bg-[#154c8c] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center cta-content">
        <h2 className="text-3xl font-bold mb-6">Ready to Collaborate?</h2>
        <p className="text-xl mb-8">
          Join us in shaping the future of pharmacy. Let's innovate together.
        </p>
        <Link href="/contact">
          <button className="bg-[#80b142] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-[#154c8c] transition-colors duration-300">
            Contact Us
          </button>
        </Link>
      </div>
    </section>
  );
}

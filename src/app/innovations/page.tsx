"use client";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLightbulb, FaRocket, FaChartLine } from "react-icons/fa";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Innovations = () => {
  useGSAP(() => {
    gsap.from(".innovation-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".innovations",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="innovations h-screen bg-[#80b142] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#154c8c] mb-4">Innovations</h2>
        <p className="text-gray-800 mb-8">
          Explore the latest advancements and transformative solutions shaping
          the future of pharmacy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="innovation-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaLightbulb className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-[#154c8c] mb-2">
              Cutting-Edge Solutions
            </h3>
            <p className="text-gray-700">
              Discover innovative technologies and applications that are
              revolutionizing pharmacy practice.
            </p>
          </div>
          <div className="innovation-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaRocket className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-[#154c8c] mb-2">
              Pioneering Initiatives
            </h3>
            <p className="text-gray-700">
              Stay informed about groundbreaking programs and collaborations
              driving positive change in the industry.
            </p>
          </div>
          <div className="innovation-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaChartLine className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-2xl font-semibold text-[#154c8c] mb-2">
              Transformative Insights
            </h3>
            <p className="text-gray-700">
              Gain valuable perspectives on emerging trends and industry
              advancements shaping the future of pharmacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovations;

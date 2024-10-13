"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaDna,
  FaPills,
  FaMicroscope,
  FaBrain,
  FaHeartbeat,
  FaVirus,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const researchAreas = [
  {
    icon: <FaDna />,
    title: "Genomic Medicine",
    description:
      "Exploring personalized treatments based on genetic profiles to revolutionize patient care.",
  },
  {
    icon: <FaPills />,
    title: "Drug Delivery Systems",
    description:
      "Developing innovative methods to enhance medication efficacy and patient compliance.",
  },
  {
    icon: <FaMicroscope />,
    title: "Nanotechnology in Pharmacy",
    description:
      "Harnessing the power of nanoparticles for targeted drug delivery and improved diagnostics.",
  },
  {
    icon: <FaBrain />,
    title: "Neuropharmacology",
    description:
      "Investigating novel treatments for neurological disorders and mental health conditions.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Cardiovascular Pharmacology",
    description:
      "Advancing therapies for heart diseases and improving cardiovascular health outcomes.",
  },
  {
    icon: <FaVirus />,
    title: "Immunopharmacology",
    description:
      "Developing new approaches to modulate the immune system for treating various diseases.",
  },
];

export default function ResearchAreas() {
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
    <section
      ref={researchRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold mb-6 text-center text-[#154c8c] tracking-tight">
          Pioneering Research Areas
        </h2>
        <p className="text-2xl text-gray-600 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
          Pushing the boundaries of pharmaceutical science to transform global
          health.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl research-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="text-6xl text-[#80b142] mb-6 transition-transform duration-300 ease-in-out transform hover:scale-110">
                {area.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#154c8c]">
                {area.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow text-lg leading-relaxed">
                {area.description}
              </p>
              <a
                href="#"
                className="group inline-flex items-center text-[#80b142] font-semibold hover:text-[#154c8c] transition-colors duration-300"
              >
                Explore Further
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

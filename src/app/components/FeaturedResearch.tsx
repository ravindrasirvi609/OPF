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
      className="py-20 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4 text-center text-[#154c8c]">
          Our Research Areas
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Exploring the frontiers of pharmaceutical science to improve global
          health outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg research-card hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="text-5xl text-[#80b142] mb-4">{area.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-[#154c8c]">
                {area.title}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">{area.description}</p>
              <a
                href="#"
                className="text-[#80b142] font-semibold hover:text-[#154c8c] transition-colors duration-300 inline-flex items-center"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
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

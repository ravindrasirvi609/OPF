"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaFlask, FaMicroscope, FaTablets } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "elastic.out(1, 0.75)",
      });
    }, heroRef);
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-gradient-to-br from-[#0a192f] to-[#112240] text-white min-h-screen flex items-center overflow-hidden relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 hero-text leading-tight">
              Revolutionizing
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#00bfa5] block mt-2">
                Pharmaceutical Innovation
              </span>
            </h1>
            <p className="text-xl mb-8 hero-text text-gray-300 leading-relaxed max-w-xl">
              Pioneering research and cutting-edge technologies to shape the
              future of global healthcare and improve lives worldwide.
            </p>
            <Link href="/impact-stories" passHref>
              <button
                className="bg-[#64ffda] text-[#0a192f] text-lg px-10 py-4 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#00bfa5]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Discover Our Impact
                <span
                  className={`ml-2 transition-transform duration-300 ${
                    isHovered ? "translate-x-2" : ""
                  }`}
                >
                  →
                </span>
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 hero-image relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                alt="Advanced Pharmaceutical Research"
                width={600}
                height={400}
                className="rounded-3xl"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-xl">
                <p className="text-[#64ffda] font-bold text-2xl">
                  150+ Patents
                </p>
                <p className="text-gray-200">Pioneering Innovation in 2023</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 icon-grid">
          {[
            {
              icon: FaFlask,
              title: "Groundbreaking Research",
              description: "Pushing the frontiers of pharmaceutical science",
            },
            {
              icon: FaMicroscope,
              title: "Cutting-edge Technology",
              description:
                "Leveraging AI and advanced analytics in drug discovery",
            },
            {
              icon: FaTablets,
              title: "Precision Medicine",
              description:
                "Tailoring treatments to individual genetic profiles",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="icon-box bg-[#112240] p-8 rounded-2xl text-center hover:bg-[#1d3557] transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="bg-[#64ffda] text-[#0a192f] rounded-full p-4 inline-block mb-6">
                <item.icon className="text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

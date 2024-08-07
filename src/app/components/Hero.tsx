"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaFlask, FaMicroscope, FaTablets } from "react-icons/fa";

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

      gsap.from(".icon-box", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1,
      });
    }, heroRef);
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-[#80b142] text-white min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 hero-text">
              Advancing Pharmacy Through Innovation
            </h1>
            <p className="text-xl mb-8 hero-text">
              Discover groundbreaking research and cutting-edge pharmaceutical
              innovations.
            </p>
            <button className="bg-[#154c8c] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1a5fa6] transition duration-300">
              Explore Our Work
            </button>
          </div>
          <div className="w-full lg:w-1/2 hero-image">
            <Image
              src="https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pharmaceutical Research"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="icon-box bg-white bg-opacity-10 p-6 rounded-lg text-center">
            <FaFlask className="text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Innovative Research</h3>
            <p>Pushing the boundaries of pharmaceutical science</p>
          </div>
          <div className="icon-box bg-white bg-opacity-10 p-6 rounded-lg text-center">
            <FaMicroscope className="text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
            <p>Utilizing cutting-edge tools and methodologies</p>
          </div>
          <div className="icon-box bg-white bg-opacity-10 p-6 rounded-lg text-center">
            <FaTablets className="text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Drug Development</h3>
            <p>Creating life-changing medications for patients</p>
          </div>
        </div>
      </div>
    </section>
  );
}

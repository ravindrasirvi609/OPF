"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaFlask, FaMicroscope, FaTablets } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, heroRef);
  }, []);

  return (
    <section
      ref={heroRef}
      className="bg-gradient-to-br from-[#80b142] to-[#5a8c2b] text-white min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10" />
        <div className="flex flex-col lg:flex-row items-center relative z-10">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 hero-text leading-tight">
              Advancing Pharmacy Through{" "}
              <span className="text-yellow-300">Innovation</span>
            </h1>
            <p className="text-xl mb-8 hero-text text-gray-100">
              Discover groundbreaking research and cutting-edge pharmaceutical
              innovations that are shaping the future of healthcare.
            </p>
            <Link href="/impact-stories" passHref>
              <button className="bg-white text-[#154c8c] hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition duration-300 shadow-lg hover:shadow-xl">
                Explore Our Work
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 hero-image">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Pharmaceutical Research"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                objectFit="cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-[#154c8c] font-bold">100+ Patents</p>
                <p className="text-gray-600 text-sm">Registered in 2023</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: FaFlask,
              title: "Innovative Research",
              description: "Pushing the boundaries of pharmaceutical science",
            },
            {
              icon: FaMicroscope,
              title: "Advanced Technology",
              description: "Utilizing cutting-edge tools and methodologies",
            },
            {
              icon: FaTablets,
              title: "Drug Development",
              description: "Creating life-changing medications for patients",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="icon-box bg-white bg-opacity-10 p-6 rounded-xl text-center backdrop-blur-sm hover:bg-opacity-20 transition duration-300"
            >
              <item.icon className="text-5xl mb-4 mx-auto text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-200">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import {
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaGraduationCap,
  FaHandshake,
  FaFlask,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const innovationItems = [
  {
    icon: FaLightbulb,
    title: "Cutting-Edge Solutions",
    description:
      "Discover innovative technologies and applications that are revolutionizing pharmacy practice, from AI-powered drug discovery to personalized medicine platforms.",
    link: "/solutions",
    color: "#E91E63",
  },
  {
    icon: FaRocket,
    title: "Pioneering Initiatives",
    description:
      "Stay informed about groundbreaking programs and collaborations driving positive change in the industry, including our global health outreach and sustainability efforts.",
    link: "/initiatives",
    color: "#154c8c",
  },
  {
    icon: FaChartLine,
    title: "Transformative Insights",
    description:
      "Gain valuable perspectives on emerging trends and industry advancements shaping the future of pharmacy, backed by our comprehensive research and analytics.",
    link: "/insights",
    color: "#80b142",
  },
  {
    icon: FaGraduationCap,
    title: "Continuous Education",
    description:
      "Access cutting-edge learning resources and professional development programs designed to keep pharmacy professionals at the forefront of their field.",
    link: "/education",
    color: "#E91E63",
  },
  {
    icon: FaHandshake,
    title: "Collaborative Networks",
    description:
      "Join a vibrant community of pharmacy professionals, researchers, and industry leaders to foster innovation and share best practices globally.",
    link: "/network",
    color: "#154c8c",
  },
  {
    icon: FaFlask,
    title: "Research & Development",
    description:
      "Explore our state-of-the-art R&D initiatives focused on developing next-generation pharmaceuticals and innovative drug delivery systems.",
    link: "/research",
    color: "#80b142",
  },
];

const Innovations = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(
    () => {
      // Heading animations
      const headingSplit = new SplitType(headingRef.current!, {
        types: "chars,words",
      });
      const descSplit = new SplitType(descRef.current!, { types: "lines" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingSplit.chars,
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2 }
      ).fromTo(
        descSplit.lines,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
        "-=0.6"
      );

      // Innovation cards with 3D effect
      const cards = gsap.utils.toArray(".innovation-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card as Element,
          {
            y: 80,
            opacity: 0,
            rotateY: -20,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: card as Element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            delay: index * 0.1,
          }
        );

        // Magnetic hover effect
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mousemove", (e) => {
          const rect = cardElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(cardElement, {
            x: x * 0.1,
            y: y * 0.1,
            rotateY: x * 0.05,
            rotateX: -y * 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      // Floating background elements
      gsap.to(".float-innovation", {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8,
      });

      // CTA section animation
      gsap.fromTo(
        ".cta-section",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      return () => {
        headingSplit.revert();
        descSplit.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="innovations min-h-screen bg-gradient-to-b from-white via-[#fafafa] to-white py-32 overflow-hidden relative"
    >
      {/* Floating Background Elements */}
      <div className="float-innovation absolute top-20 left-20 w-96 h-96 bg-[#80b142]/5 rounded-full blur-[120px]" />
      <div className="float-innovation absolute bottom-40 right-20 w-80 h-80 bg-[#E91E63]/5 rounded-full blur-[100px]" />
      <div className="float-innovation absolute top-1/2 right-1/3 w-64 h-64 bg-[#154c8c]/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#80b142]/20 rounded-full bg-[#80b142]/5">
            <span className="text-[#80b142] text-sm font-medium tracking-wider uppercase">
              Innovation Hub
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            Empowering <br />
            <span className="text-gradient">Pharmacy Innovation</span>
          </h2>

          <p
            ref={descRef}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            At Operant Pharmacy Federation (OPF), we're dedicated to empowering
            pharmacy professionals through innovation, education, and
            collaboration. Explore our cutting-edge initiatives that are shaping
            the future of pharmacy.
          </p>
        </div>

        {/* Innovation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {innovationItems.map((item, index) => (
            <Card
              key={index}
              className="innovation-card opacity-0 group relative rounded-[40px] border-2 border-slate-100 hover:border-transparent hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Decorative gradient */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              />

              <CardHeader className="relative z-10">
                <div
                  className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left"
                  style={{ color: item.color }}
                >
                  <item.icon />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-4">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-slate-600 text-base leading-relaxed mb-6">
                  {item.description}
                </CardDescription>

                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest group-hover:gap-5 transition-all duration-300"
                  style={{ color: item.color }}
                >
                  <span>Explore More</span>
                  <span className="text-lg">→</span>
                </div>
              </CardContent>

              {/* Hover effect line */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: item.color }}
              />
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section opacity-0 text-center">
          <div className="inline-block p-16 rounded-[60px] bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the OPF Innovation Network
              </h3>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Be part of a global community driving pharmaceutical
                advancements. Connect with industry leaders, access exclusive
                resources, and shape the future of pharmacy.
              </p>
              <Link href={"/membershipForm"}>
                <Button
                  size="lg"
                  className="group relative px-12 py-6 bg-white text-slate-900 hover:bg-white font-bold text-lg rounded-full overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Become a Member
                  </span>
                  <div className="absolute inset-0 bg-[#80b142] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovations;

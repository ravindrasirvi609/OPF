"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const innovationItems = [
  {
    icon: FaLightbulb,
    title: "Cutting-Edge Solutions",
    description:
      "Discover innovative technologies and applications that are revolutionizing pharmacy practice, from AI-powered drug discovery to personalized medicine platforms.",
    link: "/solutions",
  },
  {
    icon: FaRocket,
    title: "Pioneering Initiatives",
    description:
      "Stay informed about groundbreaking programs and collaborations driving positive change in the industry, including our global health outreach and sustainability efforts.",
    link: "/initiatives",
  },
  {
    icon: FaChartLine,
    title: "Transformative Insights",
    description:
      "Gain valuable perspectives on emerging trends and industry advancements shaping the future of pharmacy, backed by our comprehensive research and analytics.",
    link: "/insights",
  },
  {
    icon: FaGraduationCap,
    title: "Continuous Education",
    description:
      "Access cutting-edge learning resources and professional development programs designed to keep pharmacy professionals at the forefront of their field.",
    link: "/education",
  },
  {
    icon: FaHandshake,
    title: "Collaborative Networks",
    description:
      "Join a vibrant community of pharmacy professionals, researchers, and industry leaders to foster innovation and share best practices globally.",
    link: "/network",
  },
  {
    icon: FaFlask,
    title: "Research & Development",
    description:
      "Explore our state-of-the-art R&D initiatives focused on developing next-generation pharmaceuticals and innovative drug delivery systems.",
    link: "/research",
  },
];

const Innovations = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".innovation-card");
    cards.forEach((card, index) => {
      gsap.from(card as Element, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card as Element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      });
    });

    gsap.from(".section-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-title",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".section-description", {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-description",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="innovations min-h-screen bg-gradient-to-b from-[#80b142] to-[#5a8c2b] py-16 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-4xl font-bold mb-4 text-center">
          Empowering Pharmacy Innovation
        </h2>
        <p className="section-description text-xl mb-12 text-center max-w-3xl mx-auto">
          At Operant Pharmacy Federation (OPF), we're dedicated to empowering
          pharmacy professionals through innovation, education, and
          collaboration. Explore our cutting-edge initiatives that are shaping
          the future of pharmacy.
        </p>

        <Tabs defaultValue="all" className="w-full mb-12">
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {innovationItems.map((item, index) => (
                <Card
                  key={index}
                  className="innovation-card bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <item.icon className="text-[#154c8c] text-4xl mb-4" />
                    <CardTitle className="text-2xl font-semibold text-[#154c8c]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Add similar TabsContent for other tabs */}
        </Tabs>

        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold mb-6">
            Join the OPF Innovation Network
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a global community driving pharmaceutical advancements.
            Connect with industry leaders, access exclusive resources, and shape
            the future of pharmacy.
          </p>
          <Link href={"/membershipForm"}>
            <Button
              size="lg"
              className="bg-white text-[#154c8c] hover:bg-gray-100"
            >
              Become a Member
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Innovations;

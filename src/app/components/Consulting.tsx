"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaChartLine, FaFlask, FaCogs } from "react-icons/fa";

const Consulting: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".consulting-item",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.fromTo(".consulting-image",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    const services = [
        {
            title: "Regulatory Compliance",
            description: "Expert guidance on WHO-GMP, USFDA, and other international standards.",
            icon: <FaCogs />,
        },
        {
            title: "Product Development",
            description: "Optimizing formulation and quality control processes for better efficacy.",
            icon: <FaFlask />,
        },
        {
            title: "Market Strategy",
            description: "Data-driven insights to help pharmaceutical companies expand their reach.",
            icon: <FaChartLine />,
        },
        {
            title: "Organizational Growth",
            description: "Strategic planning and talent development for sustainable success.",
            icon: <FaBriefcase />,
        },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
                            <span className="text-[#154c8c] text-sm font-medium tracking-wider uppercase">
                                Expert Advice
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Pharma Consulting <br />
                            <span className="text-gradient">Solutions</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                            We provide comprehensive consulting services for pharmaceutical companies, helping them navigate complex regulatory environments and optimize their operations.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="consulting-item flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#E91E63] text-xl">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">{service.title}</h4>
                                        <p className="text-sm text-slate-500 leading-snug">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="consulting-image relative z-10 rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop"
                                alt="Pharma Research"
                                className="w-full h-auto object-cover aspect-[4/5]"
                            />
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E91E63]/10 rounded-full blur-3xl -z-1" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#154c8c]/10 rounded-full blur-3xl -z-1" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consulting;

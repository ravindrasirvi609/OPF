"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInfoCircle, FaBolt, FaMicroscope, FaPenNib } from "react-icons/fa";

const CoreValues: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".value-card",
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    const values = [
        {
            title: "Information",
            description: "Providing accurate and up-to-date pharmaceutical knowledge to our global community.",
            icon: <FaInfoCircle />,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Efficiency",
            description: "Streamlining processes and fostering innovation in drug development and research.",
            icon: <FaBolt />,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            title: "Research",
            description: "Advancing the frontiers of pharmaceutical sciences through rigorous scientific inquiry.",
            icon: <FaMicroscope />,
            color: "text-[#E91E63]",
            bg: "bg-pink-50"
        },
        {
            title: "Publishing",
            description: "Supporting high-impact research publications and knowledge dissemination.",
            icon: <FaPenNib />,
            color: "text-[#154c8c]",
            bg: "bg-slate-50"
        }
    ];

    return (
        <section ref={containerRef} className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`value-card p-10 rounded-[40px] ${value.bg} border border-white shadow-sm hover:shadow-xl transition-all duration-500 group`}
                        >
                            <div className={`w-16 h-16 rounded-2xl ${value.bg} border border-white shadow-inner flex items-center justify-center text-3xl ${value.color} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;

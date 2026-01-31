"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaInfoCircle, FaBolt, FaMicroscope, FaPenNib } from "react-icons/fa";

const CoreValues: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".value-card", {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: containerRef }
    );

    const values = [
        {
            title: "Information",
            description: "Sharing vital pharmaceutical knowledge and industry updates to keep professionals informed.",
            icon: <FaInfoCircle />,
            color: "bg-blue-500",
        },
        {
            title: "Efficiency",
            description: "Implementing streamlined processes to enhance productivity in drug research and development.",
            icon: <FaBolt />,
            color: "bg-[#E91E63]",
        },
        {
            title: "Research",
            description: "Pushing the boundaries of health sciences through innovative studies and experimentation.",
            icon: <FaMicroscope />,
            color: "bg-[#80b142]",
        },
        {
            title: "Publish",
            description: "Providing a platform for researchers to showcase their findings in world-class journals.",
            icon: <FaPenNib />,
            color: "bg-slate-800",
        },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-[#E91E63]/20 rounded-full bg-[#E91E63]/5">
                        <span className="text-[#E91E63] text-sm font-medium tracking-wider uppercase">
                            Our Ethos
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        The Values That <span className="text-gradient">Drive Us</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        At Operant Pharmacy Federation, our work is guided by these core principles, ensuring excellence in every initiative.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -12, rotate: index % 2 === 0 ? 1 : -1 }}
                            className="value-card group relative p-10 rounded-[48px] bg-slate-50 hover:bg-white border-2 border-transparent hover:border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
                        >
                            <div className={`w-16 h-16 ${value.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {value.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E91E63] transition-colors">
                                {value.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {value.description}
                            </p>

                            {/* Decorative corner element */}
                            <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#E91E63] transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;

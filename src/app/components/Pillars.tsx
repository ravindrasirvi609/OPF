"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUsers, FaMicroscope, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Pillars: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".pillar-card", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: containerRef }
    );

    const pillars = [
        {
            title: "Community Based",
            description:
                "Building a global network of pharmaceutical professionals, students, and researchers to share knowledge and foster collaboration.",
            icon: <FaUsers className="text-4xl text-[#E91E63]" />,
            link: "/members",
            color: "from-[#E91E63]/20 to-transparent",
            borderColor: "border-[#E91E63]/20",
        },
        {
            title: "Research Based",
            description:
                "Advancing healthcare through rigorous scientific inquiry, innovative drug development, and support for emerging pharmaceutical research.",
            icon: <FaMicroscope className="text-4xl text-[#154c8c]" />,
            link: "/innovations",
            color: "from-[#154c8c]/20 to-transparent",
            borderColor: "border-[#154c8c]/20",
        },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Our Core <span className="text-gradient">Pillars</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We are dedicated to revolutionizing the pharmaceutical landscape through community engagement and research excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className={`pillar-card relative p-8 rounded-[40px] border ${pillar.borderColor} bg-gradient-to-br ${pillar.color} transition-all duration-300 group`}
                        >
                            <div className="mb-6 p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:shadow-md transition-shadow">
                                {pillar.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                {pillar.title}
                            </h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                {pillar.description}
                            </p>
                            <Link
                                href={pillar.link}
                                className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-[#E91E63] transition-colors"
                            >
                                Learn More <FaArrowRight className="text-sm" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;

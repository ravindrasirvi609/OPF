"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaEnvelope, FaTwitter, FaMicroscope, FaStethoscope, FaFlask } from "react-icons/fa";

const TeamPage = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".team-member-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    }
                }
            );
        },
        { scope: containerRef }
    );

    const team = [
        {
            name: "Dr. Vikram Choudhary",
            role: "Founder & Director",
            specialty: "Pharmacovigilance",
            image: "https://images.unsplash.com/photo-1556157382-97dee2dcb0b7?q=80&w=2070&auto=format&fit=crop",
            icon: <FaMicroscope />,
        },
        {
            name: "Dr. Sarah Jenkins",
            role: "Global Strategy Advisor",
            specialty: "Drug Development",
            image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop",
            icon: <FaFlask />,
        },
        {
            name: "Prof. Rajesh Kumar",
            role: "Academic Relations",
            specialty: "Pharmacy Education",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
            icon: <FaStethoscope />,
        },
        {
            name: "Dr. Elena Rodriguez",
            role: "Research Head",
            specialty: "Biotechnology",
            image: "https://images.unsplash.com/photo-1594824813573-c46fe3bb92df?q=80&w=1976&auto=format&fit=crop",
            icon: <FaMicroscope />,
        },
        {
            name: "Michael Chen",
            role: "Industrial Liaison",
            specialty: "Clinical Trials",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
            icon: <FaFlask />,
        },
        {
            name: "Dr. Amita Singh",
            role: "Regulatory Consultant",
            specialty: "Quality Assurance",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
            icon: <FaStethoscope />,
        },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white">
            {/* Hero Header */}
            <section className="py-32 bg-slate-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-8 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
                        <span className="text-[#154c8c] text-sm font-medium tracking-widest uppercase">
                            Our Experts
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8">
                        The Minds Behind <span className="text-gradient">OPF</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Our team consists of world-class pharmaceutical specialists, researchers, and academic leaders dedicated to excellence.
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="team-member-card group relative bg-white rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    {/* Icon Overlay */}
                                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#E91E63] text-xl shadow-lg">
                                        {member.icon}
                                    </div>
                                    {/* Hover Social Links */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#154c8c]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-12">
                                        <div className="flex gap-4">
                                            <SocialLink icon={<FaLinkedin />} />
                                            <SocialLink icon={<FaTwitter />} />
                                            <SocialLink icon={<FaEnvelope />} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#E91E63] transition-colors">{member.name}</h3>
                                    <p className="text-[#154c8c] font-bold text-sm uppercase tracking-widest mb-3">{member.role}</p>
                                    <div className="inline-block px-4 py-1 bg-slate-50 rounded-full text-xs font-medium text-slate-400">
                                        Sp: {member.specialty}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advisory Board CTA */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-8 italic">"Building the foundation for a healthier tomorrow, one researcher at a time."</h2>
                    <p className="text-xl text-slate-400 mb-12">Interested in joining our global advisory board or becoming an industry liaison?</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-[#E91E63] to-[#154c8c] rounded-[24px] font-bold text-lg hover:shadow-[0_20px_40px_rgba(233,30,99,0.3)] transition-all"
                    >
                        Connect With Us
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
    <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#154c8c] text-xl hover:bg-[#E91E63] hover:text-white transition-all duration-300">
        {icon}
    </button>
);

export default TeamPage;

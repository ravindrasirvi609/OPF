"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaBullseye, FaEye, FaHistory, FaGlobe } from "react-icons/fa";

const AboutPage = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".about-hero-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E63]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#154c8c]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-4 py-1.5 mb-8 border border-[#E91E63]/30 rounded-full bg-white/5 backdrop-blur-sm"
                    >
                        <span className="text-white text-sm font-medium tracking-widest uppercase">
                            Our Story
                        </span>
                    </motion.div>
                    <h1 className="about-hero-text text-5xl md:text-7xl font-bold mb-8">
                        Empowering the <span className="text-gradient">Pharmacy Future</span>
                    </h1>
                    <p className="about-hero-text text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Operant Pharmacy Federation (OPF) is a premier non-profit organization dedicated to the professional advancement of pharmaceutical scientists, students, and educators globally.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 rounded-[48px] bg-slate-50 border border-slate-100"
                        >
                            <div className="w-16 h-16 bg-[#E91E63] text-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg shadow-[#E91E63]/20">
                                <FaBullseye />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                To foster excellence in pharmaceutical education and research by providing a collaborative platform for professionals to exchange ideas, share innovations, and drive the industry forward through ethical practices and scientific rigor.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="p-12 rounded-[48px] bg-[#154c8c] text-white shadow-xl shadow-[#154c8c]/20"
                        >
                            <div className="w-16 h-16 bg-white text-[#154c8c] rounded-2xl flex items-center justify-center text-3xl mb-8">
                                <FaEye />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-lg text-slate-200 leading-relaxed">
                                To be the world's most influential pharmaceutical federation, recognized for our commitment to improving global healthcare outcomes through the continuous development of pharmaceutical talent and technology.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl relative">
                                <img
                                    src="https://images.unsplash.com/photo-1579154235602-3c27f310cc27?q=80&w=2070&auto=format&fit=crop"
                                    alt="Organization History"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 text-white">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-[#80b142] rounded-full flex items-center justify-center text-2xl">
                                            <FaHistory />
                                        </div>
                                        <span className="font-bold text-xl">Trusted Legacy</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
                                A Journey of <span className="text-gradient">Scientific Excellence</span>
                            </h2>
                            <div className="space-y-6 text-slate-600">
                                <p>
                                    Founded by a group of visionary pharmaceutical specialists, OPF was established to address the critical need for a unified platform that bridges the gap between traditional pharmacy education and the rapidly evolving demands of the pharmaceutical industry.
                                </p>
                                <p>
                                    Over the years, we have grown into a global community with members spanning across continents. Our federation provides extensive support for pharmaceutical research, journal publications, and professional certification programs that are recognized by major health organizations.
                                </p>
                                <div className="pt-8 grid grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-3xl font-bold text-[#E91E63] mb-2">50+</h4>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Countries Reached</p>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-bold text-[#154c8c] mb-2">10k+</h4>
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Registered Members</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Impact */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <FaGlobe className="text-7xl text-[#154c8c]/10 mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-slate-900 mb-12">Our Global Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-slate-50">
                            <h3 className="text-xl font-bold mb-4">USA Office</h3>
                            <p className="text-slate-500">West Orange, NJ, USA. Managing our North American research collaborations and corporate partnerships.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50">
                            <h3 className="text-xl font-bold mb-4">India HQ</h3>
                            <p className="text-slate-500">Mumbai & Pali. The heart of our operations, coordinating community outreach and educational programs across Asia.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50">
                            <h3 className="text-xl font-bold mb-4">International</h3>
                            <p className="text-slate-500">Partnering with universities and health ministries in Europe, UAE, and beyond to standardize pharmacy practices.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

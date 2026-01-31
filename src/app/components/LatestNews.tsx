"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const LatestNews: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".news-card", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });
        },
        { scope: containerRef }
    );

    const news = [
        {
            title: "India Pharma Expo 2026",
            excerpt: "Join us for the largest pharmaceutical exhibition in South Asia, showcasing innovative drug delivery systems.",
            date: "Jan 15, 2026",
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2069&auto=format&fit=crop",
            category: "Events",
        },
        {
            title: "New MOA Signed for Research",
            excerpt: "OPF has partnered with leading academic institutions to advance pharmacovigilance studies in India.",
            date: "Jan 10, 2026",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
            category: "Collaboration",
        },
        {
            title: "Global Internship Invite",
            excerpt: "Applications are now open for the 2026 Global Pharmaceutical Internship Program. Apply by Feb 1st.",
            date: "Jan 05, 2026",
            image: "https://images.unsplash.com/photo-1523240715632-d984bb4b990a?q=80&w=2070&auto=format&fit=crop",
            category: "Careers",
        },
    ];

    return (
        <section ref={containerRef} className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-block px-4 py-1.5 mb-6 border border-[#80b142]/20 rounded-full bg-[#80b142]/5">
                            <span className="text-[#80b142] text-sm font-medium tracking-wider uppercase">
                                Updates
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Latest from the <span className="text-gradient">Federation</span>
                        </h2>
                        <p className="text-lg text-slate-600">
                            Stay updated with the latest news, announcements, and insights from the global pharmaceutical community.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#154c8c] hover:text-[#E91E63] transition-colors duration-300"
                    >
                        View All News
                        <div className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-[#E91E63] group-hover:border-[#E91E63] group-hover:text-white transition-all duration-300">
                            <FaArrowRight />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="news-card group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                    <FaCalendarAlt />
                                    {item.date}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E91E63] transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">
                                    {item.excerpt}
                                </p>
                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 text-slate-900 font-bold group-hover:gap-4 transition-all duration-300"
                                >
                                    Read More <FaArrowRight className="text-[#E91E63]" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestNews;

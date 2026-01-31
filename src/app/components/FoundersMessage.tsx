"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaQuoteLeft } from "react-icons/fa";

const FoundersMessage: React.FC = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".founder-image-container",
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.fromTo(".founder-text",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-24 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E91E63]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#154c8c]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 founder-image-container">
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[40px] overflow-hidden border-2 border-slate-700 p-2">
                                <img
                                    src="https://images.unsplash.com/photo-1556157382-97dee2dcb0b7?q=80&w=2070&auto=format&fit=crop"
                                    alt="Founder & Director"
                                    className="w-full h-full object-cover rounded-[32px]"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[32px] shadow-2xl hidden md:block">
                                <p className="text-[#E91E63] font-bold text-lg mb-1">Vikram Choudhary</p>
                                <p className="text-slate-500 text-sm font-medium">Founder & Director, OPF</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <FaQuoteLeft className="text-6xl text-[#E91E63]/30 mb-8 founder-text" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight founder-text">
                            Leading the <span className="text-gradient">Pharmacy Revolution</span>
                        </h2>
                        <div className="space-y-6 text-xl text-slate-300 leading-relaxed founder-text">
                            <p>
                                "At Operant Pharmacy Federation, our mission is to empower pharmacy professionals with the knowledge and resources they need to excel in an ever-changing healthcare landscape."
                            </p>
                            <p>
                                "We believe that through collaboration and innovation, we can bridge the gap between academic research and industrial application, ultimately leading to better patient outcomes and a more efficient pharmaceutical ecosystem."
                            </p>
                            <p>
                                "Our federation is not just an organization; it's a movement dedicated to the advancement of pharmaceutical sciences and the professional growth of every member who joins us in this journey."
                            </p>
                        </div>

                        <div className="mt-12 pt-12 border-t border-slate-800 founder-text">
                            <p className="font-bold text-2xl mb-2">Vikram Choudhary</p>
                            <p className="text-[#E91E63] font-medium tracking-widest uppercase text-sm">Founder & Director</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoundersMessage;

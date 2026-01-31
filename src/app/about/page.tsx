"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FaBullseye,
    FaGlobe,
    FaMicroscope,
    FaHistory,
    FaPaperPlane,
    FaGraduationCap,
    FaHandshake,
    FaAward,
    FaCheckCircle
} from "react-icons/fa";

const AboutPage = () => {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".about-anim",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
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
                            Empowering Pharmacy
                        </span>
                    </motion.div>
                    <h1 className="about-anim text-5xl md:text-7xl font-bold mb-8">
                        Operant Pharmacy <span className="text-gradient">Federation</span>
                    </h1>
                    <p className="about-anim text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        A non-government, non-profit professional organization focused on the pharmacy, pharmaceutical sciences, life sciences, and healthcare research ecosystem.
                    </p>
                </div>
            </section>

            {/* Key Identity Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="about-anim">
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
                                An Academic and <br />
                                <span className="text-gradient">Research Platform</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600">
                                <p>
                                    Operant Pharmacy Federation (OPF) is <strong>not</strong> a pharmaceutical manufacturing company and <strong>not</strong> a government body.
                                </p>
                                <p>
                                    Instead, it works as a premier academic hub and research-oriented platform, facilitating the exchange of knowledge and fostering innovation in the global healthcare landscape.
                                </p>
                                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <FaGlobe className="text-3xl text-[#154c8c]" />
                                    <p className="text-sm font-medium text-slate-500 italic">
                                        Dedicated to education, research, and professional development.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="about-anim relative">
                            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                                    alt="Research Excellence"
                                    className="w-full h-auto object-cover aspect-video"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[#E91E63] text-white p-10 rounded-[32px] shadow-xl">
                                <h4 className="text-3xl font-bold">15+</h4>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Countries Impacted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 about-anim">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What We Do</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            OPF mainly works in education, research, and professional development within the pharmacy and healthcare fields.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ActivityCard
                            icon={<FaMicroscope />}
                            title="Research & Publications"
                            color="bg-[#E91E63]"
                            items={["Research papers & Reviews", "Case studies & Journals", "Student showcase support", "Scientific promotion"]}
                        />
                        <ActivityCard
                            icon={<FaHistory />}
                            title="Events & Training"
                            color="bg-[#154c8c]"
                            items={["National & Global Conferences", "Webinars & Seminars", "Workshops & Training", "Drug development topics"]}
                        />
                        <ActivityCard
                            icon={<FaHandshake />}
                            title="Professional Networking"
                            color="bg-[#80b142]"
                            items={["Student-Scholar connection", "Professor collaboration", "Mentorship programs", "Knowledge sharing hub"]}
                        />
                        <ActivityCard
                            icon={<FaPaperPlane />}
                            title="Membership Programs"
                            color="bg-slate-800"
                            items={["Student & Faculty tiers", "OPF Exclusive events", "Certificate programs", "Networking benefits"]}
                        />
                        <ActivityCard
                            icon={<FaAward />}
                            title="Awards & Recognition"
                            color="bg-[#E91E63]"
                            items={["Academic Excellence", "Research Contributions", "Professional Achievements", "Global Certifications"]}
                        />
                    </div>
                </div>
            </section>

            {/* Target Audience */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center about-anim">
                    <h2 className="text-4xl font-bold mb-16">Who is OPF <span className="text-gradient">Meant For?</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AudienceCard text="Pharmacy Students (B.Pharm, M.Pharm, Pharm.D)" icon={<FaGraduationCap />} />
                        <AudienceCard text="Professionals in Pharma & Healthcare Research" icon={<FaBriefcaseIcon />} />
                        <AudienceCard text="PhD Scholars & Academic Researchers" icon={<FaMicroscope />} />
                        <AudienceCard text="Aspiring Authors & Conference Speakers" icon={<FaPaperPlane />} />
                    </div>
                </div>
            </section>
        </div>
    );
};

const ActivityCard = ({ icon, title, color, items }: any) => (
    <div className="about-anim bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
        <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">{title}</h3>
        <ul className="space-y-4">
            {items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-500">
                    <FaCheckCircle className="text-[#80b142] flex-shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const AudienceCard = ({ text, icon }: any) => (
    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
        <div className="text-4xl text-[#E91E63] mb-6 flex justify-center">
            {icon}
        </div>
        <p className="text-lg font-medium leading-relaxed">{text}</p>
    </div>
);

const FaBriefcaseIcon = ({ className }: any) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        className={className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M336 288H176v-32H16v160c0 17.6 14.4 32 32 32h416c17.6 0 32-14.4 32-32V256H336v32zm160-160h-96V80c0-26.5-21.5-48-48-48H160c-26.5 0-48 21.5-48 48v48H16c-8.8 0-16 7.2-16 16v80h512v-80c0-8.8-7.2-16-16-16zM160 80h192v48H160V80z"></path>
    </svg>
);

export default AboutPage;

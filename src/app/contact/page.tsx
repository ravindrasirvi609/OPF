"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

const ContactPage = () => {
    const containerRef = useRef(null);
    const webPage = pageSchema({
        title: "Contact Operant Pharmacy Federation",
        description:
            "Contact OPF for pharmacy memberships, research collaboration, conference participation, and healthcare innovation support.",
        path: "/contact",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
    ]);
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Operant Pharmacy Federation",
        url: "https://opf.org.in/contact",
        about: {
            "@type": "Organization",
            name: "Operant Pharmacy Federation",
        },
    };

    useGSAP(
        () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".contact-item",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            {/* Page Header */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E63]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Have questions about our initiatives or membership? We're here to help you navigate your pharmaceutical journey.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white relative -mt-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-slate-50 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Contact Information */}
                            <div className="lg:col-span-5 bg-slate-900 text-white p-12 lg:p-20 relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#154c8c]/20 rounded-full blur-[80px]" />

                                <h2 className="text-3xl font-bold mb-12 relative z-10">Contact Information</h2>

                                <div className="space-y-10 relative z-10">
                                    <div className="contact-item flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl text-[#E91E63]">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">Registered Office</h4>
                                            <p className="text-slate-400">Shradhawan Tower, Mayank Nagar, Pali-Marwar, Rajasthan - 306401, India.</p>
                                        </div>
                                    </div>

                                    <div className="contact-item flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl text-[#80b142]">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">Email Us</h4>
                                            <p className="text-slate-400">admin@opf.org.in<br />help@opf.org.in</p>
                                        </div>
                                    </div>

                                    <div className="contact-item flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl text-[#154c8c]">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">Call Us</h4>
                                            <p className="text-slate-400">+91 94609 71652</p>
                                        </div>
                                    </div>

                                    <div className="contact-item flex items-start gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl text-yellow-500">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">Opening Hours</h4>
                                            <p className="text-slate-400">Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-7 p-12 lg:p-20">
                                <h2 className="text-3xl font-bold text-slate-900 mb-12">Send us a Message</h2>
                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E91E63]/10 focus:border-[#E91E63] transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#154c8c]/10 focus:border-[#154c8c] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Subject</label>
                                        <input
                                            type="text"
                                            placeholder="Membership Inquiry"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#80b142]/10 focus:border-[#80b142] transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                                        <textarea
                                            placeholder="How can we help you?"
                                            rows={5}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#E91E63]/10 focus:border-[#E91E63] transition-all"
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        className="w-full py-5 bg-gradient-to-r from-[#E91E63] to-[#154c8c] text-white rounded-[20px] font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-[0_20px_40px_rgba(233,30,99,0.2)] transition-all"
                                    >
                                        Send Message <FaPaperPlane className="text-sm" />
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section Placeholder */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-100 h-[600px] rounded-[60px] overflow-hidden flex items-center justify-center text-slate-400 border border-slate-200">
                        <div className="text-center">
                            <FaMapMarkerAlt className="text-6xl mx-auto mb-4 opacity-20" />
                            <p className="text-xl font-medium italic">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;

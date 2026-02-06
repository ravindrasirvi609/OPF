"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

const faqs = [
    {
        question: "Is OPF a pharmaceutical manufacturing company?",
        answer: "No, Operant Pharmacy Federation (OPF) is not a manufacturing company nor a government body. It is an academic and research-oriented professional platform focused on education and scientific growth.",
    },
    {
        question: "Who can join the Operant Pharmacy Federation?",
        answer: "OPF is ideal for pharmacy students (D.Pharm, B.Pharm, M.Pharm, Pharm.D), pharma company professionals, healthcare researchers, PhD scholars, and anyone interested in pharmaceutical publications and conferences.",
    },
    {
        question: "Does OPF organize conferences?",
        answer: "Yes, we organize national and international conferences, webinars, seminars, and workshops on topics like drug development, clinical research, biotechnology, and healthcare innovation.",
    },
    {
        question: "How can I become a member of OPF?",
        answer: "You can apply for membership through our 'Memberships' page. We offer various tiers including Student, Professional, and Corporate memberships, each with unique benefits and access to our global network.",
    },
    {
        question: "What research support does OPF provide?",
        answer: "OPF provides guidance on research methodology, support for journal publications, access to specialized drug specialist advisors, and opportunities to showcase innovations at international exhibitions.",
    },
    {
        question: "Are OPF certifications recognized internationally?",
        answer: "Yes, our certifications and training programs are designed in collaboration with industry experts and academic leaders, making them highly valued by pharmaceutical companies and health organizations worldwide.",
    },
    {
        question: "Can I contribute as a drug specialist or advisor?",
        answer: "Absolutely. We are always looking for experts to join our advisory board. You can contact us through the 'Team' page or the 'Contact' form to express your interest.",
    },
    {
        question: "What is the India Pharma Expo 2026?",
        answer: "It is a signature event organized by OPF to showcase the latest innovations in pharmaceutical technology, drug delivery systems, and healthcare solutions, bringing together industry leaders from across the globe.",
    },
];

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
    const webPage = pageSchema({
        title: "Pharmacy Membership FAQ | OPF",
        description:
            "Find answers about OPF membership, certifications, conferences, pharmacy research support, and healthcare training programs.",
        path: "/faq",
    });
    const breadcrumbs = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
    ]);

    return (
        <div className="min-h-screen bg-slate-50 py-32">
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5 text-[#154c8c] text-sm font-bold uppercase tracking-widest">
                        Support
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Everything you need to know about the federation, memberships, and our initiatives.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-8 py-8 flex items-center justify-between text-left group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors ${activeIndex === index ? 'bg-[#E91E63] text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                                        <FaQuestionCircle />
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">{faq.question}</span>
                                </div>
                                <div className={`text-2xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#E91E63]' : 'text-slate-300'}`}>
                                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-24 pb-10 text-lg text-slate-600 leading-relaxed border-t border-slate-50 pt-8">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* CTA section */}
                <div className="mt-24 p-12 rounded-[48px] bg-slate-900 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E63]/20 rounded-full blur-[100px]" />
                    <h3 className="text-3xl font-bold mb-6 relative z-10">Still have questions?</h3>
                    <p className="text-slate-400 mb-10 relative z-10">We're here to help you. Reach out to our support team for more details.</p>
                    <a
                        href="/contact"
                        className="inline-block px-10 py-5 bg-white text-slate-900 rounded-[20px] font-bold hover:bg-[#E91E63] hover:text-white transition-all relative z-10"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;

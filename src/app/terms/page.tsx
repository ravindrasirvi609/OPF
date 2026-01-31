"use client";

import React from "react";

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">Terms & <span className="text-gradient">Conditions</span></h1>

                <div className="prose prose-lg prose-slate max-w-none space-y-8 text-slate-600">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using the Operant Pharmacy Federation (OPF) website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Membership and Registration</h2>
                        <p>Membership is subject to approval by the OPF board. Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Intellectual Property</h2>
                        <p>All content on this website, including text, graphics, logos, and research papers, is the property of OPF or its content suppliers and is protected by international copyright laws. Unauthorized use of this content is prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Use of Services</h2>
                        <p>You agree to use our services only for lawful purposes. You shall not engage in any activity that disrupts or interferes with our website's performance or security.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
                        <p>OPF shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or website content.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Amendments</h2>
                        <p>OPF reserves the right to modify these Terms and Conditions at any time. Continued use of the website following any changes constitutes acceptance of the new terms.</p>
                    </section>

                    <div className="pt-12 border-t border-slate-100 text-sm text-slate-400">
                        Last updated: January 31, 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;

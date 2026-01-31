"use client";

import React from "react";

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-white py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">Privacy <span className="text-gradient">Policy</span></h1>

                <div className="prose prose-lg prose-slate max-w-none space-y-8 text-slate-600">
                    <p>Operant Pharmacy Federation (OPF) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you register for membership, subscribe to our newsletter, or contact us. This may include your name, email address, qualifications, and professional details.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Information</h2>
                        <p>We use your information to provide and improve our services, communicate with you about updates and events, and process your membership applications.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and access is limited to authorized personnel only.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sharing of Information</h2>
                        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to provide requested services or when required by law.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies</h2>
                        <p>Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, although this may affect certain functionalities of the site.</p>
                    </section>

                    <div className="pt-12 border-t border-slate-100 text-sm text-slate-400">
                        Last updated: January 31, 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;

"use client";

import React from "react";

const RefundPage = () => {
    return (
        <div className="min-h-screen bg-white py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-12">Refund and <span className="text-gradient">Cancellation</span></h1>

                <div className="prose prose-lg prose-slate max-w-none space-y-8 text-slate-600">
                    <p>Operant Pharmacy Federation (OPF) strives for complete satisfaction with our memberships and services. This policy outlines our procedures for refunds and cancellations.</p>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Membership Cancellations</h2>
                        <p>You may cancel your membership at any time. However, cancellations made after 7 days of registration or renewal are not eligible for a refund.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Eligibility for Refunds</h2>
                        <p>Refunds are only processed for membership fees where a written request is received within 7 working days of the transaction, provided no membership benefits have been utilized.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Event Registrations</h2>
                        <p>Fees for events, exhibitions (such as the India Pharma Expo), and training programs are generally non-refundable unless the event is cancelled by OPF.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Process</h2>
                        <p>To request a refund or cancellation, please contact our help desk at help@opf.org.in with your transaction details. Approved refunds will be processed within 10-15 working days to the original payment method.</p>
                    </section>

                    <div className="pt-12 border-t border-slate-100 text-sm text-slate-400">
                        Last updated: January 31, 2026
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundPage;

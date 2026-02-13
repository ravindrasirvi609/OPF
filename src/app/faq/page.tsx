"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageHero from "../components/PageHero";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

const faqs = [
  {
    question: "Is OPF a pharmaceutical manufacturing company?",
    answer:
      "No. Operant Pharmacy Federation is a professional and academic platform focused on pharmacy education, research, publication support, and collaboration programs.",
  },
  {
    question: "Who can apply for OPF membership?",
    answer:
      "Pharmacy students, research scholars, faculty members, clinical professionals, and industry practitioners can apply, depending on the membership plan.",
  },
  {
    question: "How does OPF support research publication?",
    answer:
      "OPF offers mentorship sessions, writing guidance, scientific presentation support, and networking opportunities through events and expert-led programs.",
  },
  {
    question: "Does OPF conduct conferences and training events?",
    answer:
      "Yes. OPF organizes conferences, workshops, webinars, and collaborative events covering pharmacovigilance, clinical research, and innovation topics.",
  },
  {
    question: "Are membership benefits available for students?",
    answer:
      "Yes. Student members receive learning resources, event opportunities, and guided pathways for professional development and research visibility.",
  },
  {
    question: "How can institutions collaborate with OPF?",
    answer:
      "Institutions can contact OPF for academic partnerships, conference collaboration, and co-developed initiatives in pharmacy education and research.",
  },
  {
    question: "How can I verify a membership profile?",
    answer:
      "Use the members section and profile details available on the website, or contact OPF support for official verification-related queries.",
  },
  {
    question: "What is the best way to contact OPF support?",
    answer:
      "Use the contact page form or email support directly. Include your concern category for faster response, such as membership, collaboration, or events.",
  },
];

export default function FAQPage() {
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
      "Find clear answers about OPF membership plans, pharmacy conferences, research publishing support, and collaboration opportunities.",
    path: "/faq",
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <PageHero
        tag="FAQ"
        title="Frequently Asked Questions About OPF Membership and Programs"
        description="Explore the most common questions about OPF membership eligibility, conferences, publication support, and collaboration workflows."
        image="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000"
        alt="Pharmacy experts in a support and guidance discussion"
        actions={[
          { href: "/membershipForm", label: "Apply for Membership" },
          { href: "/contact", label: "Contact Support", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell grid gap-4">
          {faqs.map((faq, index) => {
            const isOpen = index === activeIndex;
            return (
              <article key={faq.question} className="surface-card rounded-3xl">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                      <MessageCircleQuestion size={16} />
                    </span>
                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{faq.question}</h2>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <div className="border-t border-slate-200 px-5 py-5 text-sm leading-relaxed text-slate-700 sm:px-6 sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Need Personalized Guidance?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              If your question is specific to your profile, institution, or project, contact us directly and our team will guide you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Talk to Support
              </Link>
              <Link href="/topics" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900">
                Browse Topic Hubs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

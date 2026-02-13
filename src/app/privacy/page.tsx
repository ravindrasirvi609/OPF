import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import PageHero from "../components/PageHero";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        tag="Policy"
        title="Privacy Policy"
        description="This policy explains how Operant Pharmacy Federation collects, uses, stores, and protects personal information shared through our website and membership processes."
        image="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=2000"
        alt="Data privacy and cybersecurity concept"
      />

      <article className="section-pad">
        <div className="section-shell max-w-4xl">
          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <ShieldCheck size={16} />
                Last updated: February 13, 2026
              </p>
            </div>

            <section className="space-y-6 text-sm leading-relaxed text-slate-700 md:text-base">
              <h2 className="text-3xl font-semibold text-slate-900">How We Handle Your Data</h2>
              <p>
                Operant Pharmacy Federation (OPF) is committed to responsible data practices. We collect only the information required to provide services such as membership processing, support communication, and program updates.
              </p>

              <PolicySection
                title="1. Information We Collect"
                body="Information may include your name, email, phone number, qualifications, affiliation, profile data, and payment-related metadata when you apply for OPF memberships or contact support."
              />
              <PolicySection
                title="2. How We Use Information"
                body="We use collected data to process applications, provide requested services, communicate updates, improve user experience, and maintain platform quality and security."
              />
              <PolicySection
                title="3. Data Protection"
                body="OPF applies technical and organizational safeguards to protect stored information from unauthorized access, misuse, or accidental loss. Access is limited to authorized personnel with operational need."
              />
              <PolicySection
                title="4. Data Sharing"
                body="We do not sell personal data. Information may be shared with trusted service providers only when required to deliver requested services, process transactions, or comply with applicable laws."
              />
              <PolicySection
                title="5. Cookies and Analytics"
                body="Our website may use cookies and analytics tools to understand usage behavior and improve performance. You can manage cookie preferences via browser settings."
              />
              <PolicySection
                title="6. Contact for Privacy Requests"
                body="If you need clarification on personal data handling or wish to request updates/corrections, contact OPF through the official contact channels listed on our website."
              />
            </section>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <LockKeyhole size={16} />
                For policy-related queries, contact us via the Contact page.
              </p>
              <Link href="/contact" className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                Contact OPF
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function PolicySection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2">{body}</p>
    </section>
  );
}

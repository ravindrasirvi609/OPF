import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import PageHero from "../components/PageHero";

export default function TermsPage() {
  return (
    <>
      <PageHero
        tag="Legal"
        title="Terms and Conditions"
        description="These terms govern the use of OPF website services, membership workflows, and content access."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
        alt="Legal agreement documents"
      />

      <article className="section-pad">
        <div className="section-shell max-w-4xl">
          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <ClipboardCheck size={16} />
                Last updated: February 13, 2026
              </p>
            </div>

            <div className="space-y-7 text-sm leading-relaxed text-slate-700 md:text-base">
              <PolicySection
                title="1. Acceptance of Terms"
                body="By using OPF websites and services, you agree to these terms. If you do not agree, you should discontinue use of the platform."
              />
              <PolicySection
                title="2. Membership and User Information"
                body="Users must submit accurate information during registration and maintain the confidentiality of account details and credentials."
              />
              <PolicySection
                title="3. Intellectual Property"
                body="Website content including text, graphics, logos, and educational materials belongs to OPF or its licensors and is protected by applicable intellectual property laws."
              />
              <PolicySection
                title="4. Acceptable Use"
                body="Users must use the platform lawfully and avoid actions that interfere with website performance, security, or user experience."
              />
              <PolicySection
                title="5. Limitation of Liability"
                body="OPF is not liable for indirect or consequential losses arising from inability to use services, website downtime, or third-party integrations."
              />
              <PolicySection
                title="6. Policy Updates"
                body="OPF may update these terms periodically. Continued use of the website after updates indicates acceptance of revised terms."
              />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
              <p className="text-sm text-slate-700">
                For legal clarifications related to memberships, billing, or content use, please contact us.
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
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2">{body}</p>
    </section>
  );
}

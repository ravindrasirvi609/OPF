import Link from "next/link";
import { RotateCcw } from "lucide-react";
import PageHero from "../components/PageHero";

export default function RefundPage() {
  return (
    <>
      <PageHero
        tag="Policy"
        title="Refund and Cancellation Policy"
        description="Review OPF refund and cancellation guidelines for memberships, events, and related service payments."
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000"
        alt="Payment documents and calculator"
      />

      <article className="section-pad">
        <div className="section-shell max-w-4xl">
          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <RotateCcw size={16} />
                Last updated: February 13, 2026
              </p>
            </div>

            <div className="space-y-7 text-sm leading-relaxed text-slate-700 md:text-base">
              <PolicySection
                title="1. Membership Cancellations"
                body="Membership cancellation requests are accepted at any time. Refund eligibility may be limited based on usage status and time elapsed since registration."
              />
              <PolicySection
                title="2. Refund Eligibility"
                body="Refund requests for membership fees are typically considered only when submitted in writing within 7 working days of payment, provided key benefits were not consumed."
              />
              <PolicySection
                title="3. Events and Training Fees"
                body="Conference, workshop, and training fees are generally non-refundable unless OPF cancels the event or explicitly communicates an exception."
              />
              <PolicySection
                title="4. Processing Timeline"
                body="Approved refund amounts are processed to the original payment method, typically within 10 to 15 working days depending on payment gateway and banking timelines."
              />
              <PolicySection
                title="5. How to Request"
                body="Send your request with payment and membership details through official OPF contact channels. Incomplete requests may delay processing."
              />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
              <p className="text-sm text-slate-700">Need help with a payment-related issue?</p>
              <Link href="/contact" className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                Contact Billing Support
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

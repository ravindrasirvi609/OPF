"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function MembershipSuccessPage() {
  return (
    <section className="section-pad">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl surface-card rounded-[2rem] px-6 py-10 text-center sm:px-10">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={34} />
          </span>
          <h1 className="mt-5 text-4xl font-semibold text-slate-900">Payment Successful</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Thank you for completing your OPF membership payment. Your profile is now in the onboarding flow and our team will process the next steps.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
              Back to Home
            </Link>
            <Link
              href="/memberships"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Explore Member Benefits
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function PharmacovigilancePage() {
  return (
    <article className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Pharmacovigilance Training and Career Guidance
        </h1>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Pharmacovigilance is central to patient safety and drug lifecycle
          monitoring. OPF supports pharmacy students and professionals with
          practical education in adverse event reporting, case processing,
          signal detection, risk management plans, and post-marketing
          surveillance.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Through conferences and expert sessions, participants learn how to
          handle Individual Case Safety Reports (ICSRs), MedDRA coding,
          aggregate safety reports, and data quality checks. These skills are
          in demand across CROs, pharmaceutical companies, and regulatory
          consulting teams.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          OPF programs also focus on communication and compliance, including how
          to collaborate with medical reviewers, regulatory teams, and quality
          assurance units. This multidisciplinary approach helps learners bridge
          academic concepts with real-world pharmacovigilance workflows.
        </p>

        <section className="mb-10 rounded-2xl bg-slate-50 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            What You Can Learn
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Adverse event collection, triage, and seriousness assessment</li>
            <li>Expectedness checks and narrative writing best practices</li>
            <li>Signal management from detection to risk minimization action</li>
            <li>Global pharmacovigilance regulations and inspection readiness</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Related OPF Resources
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/faq" className="text-[#154c8c] underline">
              FAQs
            </Link>
            <Link href="/impact-stories" className="text-[#154c8c] underline">
              Impact Stories
            </Link>
            <Link href="/memberships" className="text-[#154c8c] underline">
              Membership Plans
            </Link>
          </div>
        </section>

        <Link
          href="/membershipForm"
          className="inline-block rounded-full bg-[#154c8c] px-6 py-3 font-semibold text-white"
        >
          Join OPF for Pharmacovigilance Learning
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";

export default function PharmacyEducationPage() {
  return (
    <article className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Pharmacy Education, Research Writing, and Professional Development
        </h1>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Pharmacy education now demands more than classroom achievement.
          Employers and institutions look for research exposure, critical
          thinking, communication skills, and practical understanding of
          healthcare systems. OPF provides a platform for academic growth and
          career readiness.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Students can participate in seminars, workshops, and publication
          support programs focused on literature review methods, scientific
          writing quality, and ethical research reporting. The objective is to
          build confidence in presenting work at national and international
          forums.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          OPF also promotes mentorship and networking so learners can identify
          specialization pathways across pharmacology, pharmaceutics,
          pharmacovigilance, clinical research, and industry roles. Members
          receive guidance to align academic portfolios with market demand.
        </p>

        <section className="mb-10 rounded-2xl bg-slate-50 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Learning Outcomes
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Improve publication and conference presentation confidence</li>
            <li>Build professional profiles for internships and job roles</li>
            <li>Develop evidence-based thinking in pharmacy practice</li>
            <li>Expand networks with mentors, researchers, and institutions</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Useful Internal Links
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="text-[#154c8c] underline">
              About OPF
            </Link>
            <Link href="/impact-stories" className="text-[#154c8c] underline">
              Conference Impact Stories
            </Link>
            <Link href="/memberships" className="text-[#154c8c] underline">
              Membership Benefits
            </Link>
          </div>
        </section>

        <Link
          href="/membershipForm"
          className="inline-block rounded-full bg-[#154c8c] px-6 py-3 font-semibold text-white"
        >
          Join OPF and Build Your Pharmacy Career
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";

export default function ClinicalResearchPage() {
  return (
    <article className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Clinical Research Methods and Career Pathways
        </h1>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Clinical research transforms scientific hypotheses into real patient
          outcomes. OPF helps professionals understand protocol design,
          feasibility assessment, ethical approvals, and Good Clinical Practice
          (GCP) aligned trial execution.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          Members gain clarity on trial phases, informed consent processes,
          patient safety oversight, and source documentation quality. Training
          content also covers site operations, investigator coordination,
          monitoring strategy, and data integrity principles essential for
          regulatory acceptance.
        </p>
        <p className="mb-6 text-lg leading-8 text-slate-700">
          OPF events connect academia and industry to discuss decentralized
          trials, digital health tools, and evidence generation for modern drug
          development. This ecosystem supports career growth in clinical
          operations, medical writing, data management, and regulatory affairs.
        </p>

        <section className="mb-10 rounded-2xl bg-slate-50 p-6">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Core Competencies
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Protocol interpretation and clinical endpoint understanding</li>
            <li>GCP, ethics committee workflow, and inspection compliance</li>
            <li>Clinical data quality control and deviation management</li>
            <li>Cross-functional communication across trial stakeholders</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">
            Continue Exploring
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/collaborations" className="text-[#154c8c] underline">
              Collaborations
            </Link>
            <Link href="/innovations" className="text-[#154c8c] underline">
              Innovations
            </Link>
            <Link href="/team" className="text-[#154c8c] underline">
              Advisers
            </Link>
          </div>
        </section>

        <Link
          href="/membershipForm"
          className="inline-block rounded-full bg-[#154c8c] px-6 py-3 font-semibold text-white"
        >
          Join OPF for Clinical Research Growth
        </Link>
      </div>
    </article>
  );
}

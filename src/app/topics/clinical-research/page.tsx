import Link from "next/link";
import { ClipboardCheck, FileCheck2, HeartPulse, Microscope } from "lucide-react";
import PageHero from "../../components/PageHero";

const competencies = [
  "Clinical protocol interpretation and endpoint clarity",
  "GCP-oriented trial conduct and ethics workflow",
  "Site coordination, documentation quality, and monitoring readiness",
  "Cross-functional collaboration for data integrity and compliance",
];

export default function ClinicalResearchPage() {
  return (
    <>
      <PageHero
        tag="Clinical Research"
        title="Clinical Research Skills for Modern Drug Development"
        description="Understand clinical trial operations, ethics, compliance, and evidence generation through OPF's practical learning ecosystem."
        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2000"
        alt="Clinical research team evaluating trial documentation"
        actions={[
          { href: "/membershipForm", label: "Join OPF Programs" },
          { href: "/topics", label: "All Topic Hubs", variant: "secondary" },
        ]}
      />

      <article className="section-pad">
        <div className="section-shell grid gap-5 lg:grid-cols-12">
          <section className="surface-card rounded-[2rem] p-6 lg:col-span-8">
            <h2 className="text-3xl font-semibold text-slate-900">Clinical Research Career Development</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Clinical research transforms scientific hypotheses into validated patient outcomes. OPF programs support professionals in understanding feasibility, protocol execution, compliance, and cross-functional trial operations.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              This learning path is valuable for candidates pursuing careers in trial management, regulatory affairs, medical writing, pharmacovigilance, and data operations.
            </p>

            <h3 className="mt-6 text-2xl font-semibold text-slate-900">Core Competencies</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {competencies.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="grid gap-4 lg:col-span-4">
            <MiniCard icon={<Microscope size={17} />} title="Trial Readiness" text="Build confidence in practical clinical trial procedures and responsibilities." />
            <MiniCard icon={<ClipboardCheck size={17} />} title="Regulatory Alignment" text="Learn how ethics and GCP principles shape compliant operations." />
            <MiniCard icon={<FileCheck2 size={17} />} title="Documentation Quality" text="Improve source accuracy and workflow discipline for robust evidence." />
            <MiniCard icon={<HeartPulse size={17} />} title="Patient-Centered Outcomes" text="Understand how trial quality influences real-world therapeutic impact." />
          </aside>
        </div>

        <div className="section-shell mt-6">
          <div className="surface-card rounded-3xl px-6 py-7">
            <h3 className="text-2xl font-semibold text-slate-900">Related OPF Resources</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/innovations" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Innovations
              </Link>
              <Link href="/team" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Advisers
              </Link>
              <Link href="/membershipForm" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                Apply for Membership
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function MiniCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="surface-card rounded-2xl p-5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">{icon}</span>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </article>
  );
}

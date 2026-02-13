import Link from "next/link";
import { AlertTriangle, ClipboardCheck, FileSearch, ShieldPlus } from "lucide-react";
import PageHero from "../../components/PageHero";

const outcomes = [
  "Adverse event intake, seriousness checks, and case triage",
  "Narrative quality standards and MedDRA coding basics",
  "Signal detection workflows and risk communication practices",
  "Global compliance context for pharmacovigilance teams",
];

export default function PharmacovigilancePage() {
  return (
    <>
      <PageHero
        tag="Pharmacovigilance"
        title="Drug Safety Learning and Career Pathways in Pharmacovigilance"
        description="Build practical pharmacovigilance capability with OPF through case-based learning, reporting workflows, and expert guidance."
        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
        alt="Drug safety and pharmacovigilance analysis workspace"
        actions={[
          { href: "/membershipForm", label: "Join for PV Programs" },
          { href: "/topics", label: "All Topic Hubs", variant: "secondary" },
        ]}
      />

      <article className="section-pad">
        <div className="section-shell grid gap-5 lg:grid-cols-12">
          <section className="surface-card rounded-[2rem] p-6 lg:col-span-8">
            <h2 className="text-3xl font-semibold text-slate-900">Why Pharmacovigilance Matters</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Pharmacovigilance protects patients through structured drug safety monitoring. OPF helps learners and professionals understand end-to-end safety workflows including case processing, reporting quality, and post-marketing surveillance operations.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              These competencies are highly relevant for roles in pharmaceutical companies, CROs, clinical operations teams, and regulatory support functions.
            </p>

            <h3 className="mt-6 text-2xl font-semibold text-slate-900">What You Can Learn</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside className="grid gap-4 lg:col-span-4">
            <MiniCard icon={<ShieldPlus size={17} />} title="Safety Operations" text="Understand practical reporting and signal management steps." />
            <MiniCard icon={<ClipboardCheck size={17} />} title="Quality Standards" text="Improve documentation quality and process consistency." />
            <MiniCard icon={<FileSearch size={17} />} title="Career Readiness" text="Prepare for pharmacovigilance analyst and case-processing roles." />
            <MiniCard icon={<AlertTriangle size={17} />} title="Risk Communication" text="Learn structured methods for safety messaging and escalation." />
          </aside>
        </div>

        <div className="section-shell mt-6">
          <div className="surface-card rounded-3xl px-6 py-7">
            <h3 className="text-2xl font-semibold text-slate-900">Continue Your Learning Path</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/topics/clinical-research" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Clinical Research
              </Link>
              <Link href="/impact-stories" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Impact Stories
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

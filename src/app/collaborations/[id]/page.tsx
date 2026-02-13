import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, CheckCircle2, Handshake, Target } from "lucide-react";
import { breadcrumbSchema, pageSchema } from "../../lib/seo";

interface PageProps {
  params: { id: string };
}

const defaultObjectives = [
  "Create high-impact academic and professional engagement programs",
  "Strengthen research quality through mentorship and joint initiatives",
  "Expand publication opportunities for pharmacy students and professionals",
  "Build long-term collaboration models for healthcare innovation",
];

export default function CollaborationDetailsPage({ params }: PageProps) {
  const collaborationId = decodeURIComponent(params.id);
  const collaborationName = `Collaboration ${collaborationId}`;

  const webPage = pageSchema({
    title: `${collaborationName} | OPF`,
    description:
      "Review OPF collaboration objectives, implementation scope, and outcomes for pharmacy education and research development.",
    path: `/collaborations/${params.id}`,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Collaborations", path: "/collaborations" },
    { name: collaborationName, path: `/collaborations/${params.id}` },
  ]);

  return (
    <article className="section-pad">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="section-shell">
        <Link href="/collaborations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ArrowLeft size={15} />
          Back to Collaborations
        </Link>

        <div className="mt-5 surface-card rounded-[2rem] p-6 md:p-8">
          <span className="pill-tag">Collaboration Profile</span>
          <h1 className="mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">{collaborationName}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            This profile summarizes a partnership within the OPF collaboration network. Each collaboration is designed to support pharmacy education, research dissemination, and measurable healthcare-oriented outcomes.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <InfoCard icon={<Building2 size={17} />} label="Partnership Type" value="Academic / Industry" />
            <InfoCard icon={<CalendarDays size={17} />} label="Status" value="Active Program" />
            <InfoCard icon={<Handshake size={17} />} label="Program Scope" value="Research & Education" />
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="surface-card rounded-3xl p-6">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <Target size={20} />
              Key Objectives
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {defaultObjectives.map((objective) => (
                <li key={objective} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-[#0a4ea3]" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Implementation Notes</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Collaboration initiatives are typically delivered through conference sessions, research workshops, faculty engagement, and student publication support tracks. OPF teams coordinate planning, content quality, and partner alignment.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              For the latest partnership milestones and event outcomes, refer to impact stories or contact OPF for a detailed collaboration brief.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/impact-stories" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                View Impact Stories
              </Link>
              <Link href="/contact" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Request Details
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">{icon}</span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

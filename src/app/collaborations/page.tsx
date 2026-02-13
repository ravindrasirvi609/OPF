import Link from "next/link";
import { ArrowUpRight, Building2, Globe2, GraduationCap, Handshake, Lightbulb, Users } from "lucide-react";
import PageHero from "../components/PageHero";

const collaborations = [
  {
    title: "Nirma University",
    type: "Academic Partnership",
    description:
      "Collaborative programs for pharmacy education, research communication, and student skill advancement.",
    impact: "500+ learners engaged",
    icon: GraduationCap,
  },
  {
    title: "Dr. D. Y. Patil Institute",
    type: "Academic Partnership",
    description:
      "Joint initiatives for conference excellence, applied research, and future-ready pharmacy training.",
    impact: "Multi-campus programs",
    icon: Users,
  },
  {
    title: "Priyadarshini College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Research-led collaboration focused on innovation sessions and student publication readiness.",
    impact: "Innovation workshops",
    icon: Lightbulb,
  },
  {
    title: "IP Moment",
    type: "Industry Partnership",
    description:
      "Strategic collaboration to bridge pharmacy research with real-world implementation pathways.",
    impact: "Digital enablement",
    icon: Building2,
  },
  {
    title: "Sinhgad College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Cross-functional engagement through educational events, networking, and research development.",
    impact: "Joint sessions",
    icon: GraduationCap,
  },
  {
    title: "Modern College of Pharmacy",
    type: "Academic Partnership",
    description:
      "Programs focused on practical innovation and high-value learning outcomes for pharmacy professionals.",
    impact: "Practice-oriented learning",
    icon: Handshake,
  },
];

const stats = [
  { label: "Partner Institutions", value: "15+", icon: Building2 },
  { label: "Countries Connected", value: "10+", icon: Globe2 },
  { label: "Joint Programs", value: "50+", icon: Lightbulb },
  { label: "Research Outputs", value: "100+", icon: Users },
];

export default function CollaborationsPage() {
  return (
    <>
      <PageHero
        tag="Collaborations"
        title="Partnerships Accelerating Pharmacy Research and Education"
        description="OPF works with academic institutions and industry collaborators to create stronger learning systems, research outcomes, and healthcare innovation pathways."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000"
        alt="Research and academic partners in a collaboration meeting"
        actions={[
          { href: "/contact", label: "Partner With OPF" },
          { href: "/impact-stories", label: "View Outcomes", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <span className="pill-tag">Active Network</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Collaboration Models Built for Real Execution
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Our partnerships are designed to deliver practical value: stronger conferences, better publication support, faculty engagement, and measurable professional growth.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((collab) => {
              const Icon = collab.icon;
              return (
                <article key={collab.title} className="surface-card group rounded-[1.8rem] p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={18} />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a4ea3]">{collab.type}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{collab.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{collab.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{collab.impact}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="surface-card rounded-2xl p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={17} />
                  </span>
                  <p className="mt-3 font-display text-4xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Explore Detailed Collaboration Outcomes</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Review conference insights, partner achievements, and impact records from OPF-led collaborative initiatives.
            </p>
            <Link
              href="/impact-stories"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Browse Impact Stories
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

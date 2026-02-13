import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  FlaskConical,
  GraduationCap,
  Handshake,
  Lightbulb,
  LineChart,
  Sparkles,
} from "lucide-react";
import PageHero from "../components/PageHero";

const innovationItems = [
  {
    title: "Pharmacovigilance Intelligence",
    description:
      "Programs focused on modern drug safety workflows, adverse event practices, and evidence-led risk communication.",
    href: "/topics/pharmacovigilance",
    icon: BrainCircuit,
  },
  {
    title: "Clinical Research Capability",
    description:
      "Training and strategy sessions on trial design, compliance readiness, and multidisciplinary clinical operations.",
    href: "/topics/clinical-research",
    icon: FlaskConical,
  },
  {
    title: "Education Modernization",
    description:
      "Learning models that align pharmacy education with practical industry expectations and publication standards.",
    href: "/topics/pharmacy-education",
    icon: GraduationCap,
  },
  {
    title: "Collaboration Frameworks",
    description:
      "Institutional partnerships that improve research output, student exposure, and healthcare innovation exchange.",
    href: "/collaborations",
    icon: Handshake,
  },
  {
    title: "Innovation Showcase",
    description:
      "A platform where teams present high-value ideas, applied research, and scalable healthcare solutions.",
    href: "/impact-stories",
    icon: Lightbulb,
  },
  {
    title: "Outcome Tracking",
    description:
      "Measurement practices to monitor quality indicators, engagement results, and real-world implementation value.",
    href: "/about",
    icon: LineChart,
  },
];

const lifecycle = [
  {
    step: "Identify",
    detail: "Spot high-need healthcare and pharmacy challenges through partner and member inputs.",
  },
  {
    step: "Design",
    detail: "Build solution paths through expert discussions, literature mapping, and feasibility assessment.",
  },
  {
    step: "Validate",
    detail: "Evaluate ideas in workshops, pilot settings, and collaborative review sessions.",
  },
  {
    step: "Scale",
    detail: "Document outcomes and share high-performing models across programs and institutions.",
  },
];

const highlights = [
  "Interdisciplinary innovation sessions",
  "Student and faculty co-creation tracks",
  "Publication and presentation support",
  "Institutional innovation collaborations",
];

export default function InnovationsPage() {
  return (
    <>
      <PageHero
        tag="Innovation"
        title="Exploring Applied Innovation Across Pharmacy Education and Research"
        description="Discover OPF-led initiatives that connect scientific ideas to practical healthcare outcomes through collaboration, mentorship, and evidence-based execution."
        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000"
        alt="Scientists reviewing innovation outcomes in a pharmaceutical environment"
        actions={[
          { href: "/impact-stories", label: "View Impact Stories" },
          { href: "/membershipForm", label: "Join the Network", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <span className="pill-tag">Innovation Programs</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              High-Value Initiatives for Pharmacy Professionals and Institutions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              OPF innovation tracks are designed to support practical execution, stronger research quality, and long-term professional capability in pharmaceutical sciences.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {innovationItems.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card group rounded-[1.8rem] p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:gap-2 group-hover:text-[#0a4ea3]"
                  >
                    Learn More
                    <ArrowUpRight size={15} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">Lifecycle</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              How OPF Converts Ideas Into Practical Outcomes
            </h2>
            <div className="mt-6 space-y-4">
              {lifecycle.map((item, index) => (
                <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4ea3]">
                    Stage {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">What Makes It Relatable</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Innovation That Solves Real Pharmacy Challenges
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              OPF focuses on practical innovation for students, educators, and working professionals. This means projects are shaped around real learning gaps, operational constraints, and measurable healthcare value.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <Sparkles size={16} className="mt-1 flex-shrink-0 text-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Build Innovation With OPF</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Join OPF to collaborate on modern pharmacy programs that improve learning outcomes, research visibility, and healthcare impact.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/membershipForm" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Apply for Membership
              </Link>
              <Link href="/contact" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900">
                Discuss Collaboration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

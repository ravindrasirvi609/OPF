import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  FlaskConical,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import PageHero from "../components/PageHero";

const topicCards = [
  {
    href: "/topics/pharmacovigilance",
    title: "Pharmacovigilance",
    description:
      "Adverse event monitoring, safety signal management, and real-world drug safety communication practices.",
    icon: ShieldCheck,
  },
  {
    href: "/topics/clinical-research",
    title: "Clinical Research",
    description:
      "Trial operations, GCP alignment, protocol quality, and evidence generation for modern therapeutics.",
    icon: FlaskConical,
  },
  {
    href: "/topics/pharmacy-education",
    title: "Pharmacy Education",
    description:
      "Career growth pathways, research writing support, mentorship, and academic skill development.",
    icon: BookOpenText,
  },
];

const howToUse = [
  {
    title: "Start with your immediate goal",
    text: "Choose a hub based on what you need right now: safety, clinical operations, or career and academic development.",
  },
  {
    title: "Review practical frameworks",
    text: "Each page includes structured concepts, role-relevant skills, and related OPF resources.",
  },
  {
    title: "Take action with OPF",
    text: "Move to events, mentors, and membership pathways to apply what you learn in real settings.",
  },
];

const pathways = [
  {
    audience: "Students",
    recommendation: "Pharmacy Education -> Clinical Research -> Impact Stories",
  },
  {
    audience: "Research Scholars",
    recommendation: "Clinical Research -> Pharmacovigilance -> Collaborations",
  },
  {
    audience: "Industry Professionals",
    recommendation: "Pharmacovigilance -> Innovations -> Membership Plans",
  },
];

export default function TopicsPage() {
  return (
    <>
      <PageHero
        tag="Topic Hubs"
        title="Focused Learning Paths for High-Demand Pharmacy Domains"
        description="Explore OPF topic hubs designed to help students and professionals build practical capability in key pharmaceutical areas."
        image="https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=2000"
        alt="Pharmacy training materials and clinical tools"
        actions={[
          { href: "/membershipForm", label: "Join OPF" },
          { href: "/faq", label: "FAQs", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {topicCards.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.href} className="surface-card rounded-[1.8rem] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Icon size={18} />
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{topic.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{topic.description}</p>
                <Link
                  href={topic.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition hover:gap-2 hover:text-[#0a4ea3]"
                >
                  Explore Topic
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">How to Use</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              A Practical Way to Navigate OPF Topic Hubs
            </h2>
            <div className="mt-6 space-y-4">
              {howToUse.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4ea3]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">Recommended Pathways</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Suggested Topic Sequences by Profile
            </h2>
            <div className="mt-6 space-y-4">
              {pathways.map((path) => (
                <div key={path.audience} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{path.audience}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-700 md:text-base">
                    <Route size={16} className="mt-1 flex-shrink-0 text-[#0a4ea3]" />
                    <span>{path.recommendation}</span>
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Need a Personalized Learning Direction?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              If you are unsure where to begin, OPF can help map your interests to the right topic path and membership resources.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Talk to OPF Support
              </Link>
              <Link href="/membershipForm" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900">
                Start Membership
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900">
                <Sparkles size={15} />
                Practical + Career Oriented
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

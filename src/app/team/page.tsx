import Image from "next/image";
import Link from "next/link";
import {
  Award,
  FlaskConical,
  GraduationCap,
  Handshake,
  Microscope,
  Stethoscope,
  Users,
} from "lucide-react";
import PageHero from "../components/PageHero";

const team = [
  {
    name: "Dr. Vikram Choudhary",
    role: "Founder & Director",
    focus: "Pharmacovigilance and research ecosystem development",
    image:
      "https://images.unsplash.com/photo-1556157382-97dee2dcb0b7?auto=format&fit=crop&q=80&w=1400",
    icon: Microscope,
  },
  {
    name: "Dr. Sarah Jenkins",
    role: "Global Strategy Advisor",
    focus: "Drug development and cross-border innovation partnerships",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1400",
    icon: FlaskConical,
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Academic Relations",
    focus: "Pharmacy education and curriculum strengthening",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1400",
    icon: GraduationCap,
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Research Head",
    focus: "Biotechnology translation and evidence-based programs",
    image:
      "https://images.unsplash.com/photo-1594824813573-c46fe3bb92df?auto=format&fit=crop&q=80&w=1400",
    icon: Award,
  },
  {
    name: "Michael Chen",
    role: "Industry Liaison",
    focus: "Clinical partnership operations and collaboration planning",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1400",
    icon: Stethoscope,
  },
  {
    name: "Dr. Amita Singh",
    role: "Regulatory Consultant",
    focus: "Quality systems and compliance advisory support",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1400",
    icon: Microscope,
  },
];

const advisoryFunctions = [
  "Research proposal and publication quality guidance",
  "Clinical, safety, and regulatory advisory support",
  "Institutional collaboration and event strategy planning",
  "Mentor alignment for students and early-career members",
  "Industry relevance mapping for educational programs",
];

const engagementModes = [
  {
    title: "Mentorship Sessions",
    description:
      "Advisers guide members on specialization choices, practical skill development, and publication pathways.",
  },
  {
    title: "Program Reviews",
    description:
      "Strategic review of OPF initiatives to ensure quality, relevance, and measurable outcomes.",
  },
  {
    title: "Academic Collaboration",
    description:
      "Joint planning with institutions for conferences, workshops, and knowledge exchange programs.",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        tag="Advisory Team"
        title="Meet the Experts Guiding OPF Programs and Partnerships"
        description="Our advisers bring experience in pharmacovigilance, clinical research, education, and regulatory quality to support meaningful pharmacy outcomes."
        image="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=2000"
        alt="Healthcare experts in a boardroom collaboration"
        actions={[
          { href: "/contact", label: "Connect With Our Team" },
          { href: "/collaborations", label: "View Collaborations", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <span className="pill-tag">Leadership</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Multidisciplinary Guidance for Pharmacy Education and Research
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              OPF advisers support students, professionals, and partner institutions through strategic input on research quality, clinical systems, and future-ready learning models.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const Icon = member.icon;
              return (
                <article key={member.name} className="surface-card overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 text-slate-900 backdrop-blur">
                      <Icon size={17} />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-slate-900">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a4ea3]">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.focus}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">How Advisers Help</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Advisory Functions Across the OPF Ecosystem
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {advisoryFunctions.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">Engagement Modes</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Ways Members Interact With OPF Advisers
            </h2>
            <div className="mt-6 space-y-4">
              {engagementModes.map((mode) => (
                <div key={mode.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-lg font-semibold text-slate-900">{mode.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{mode.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Interested in Advisory Collaboration?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Institutions and experts can collaborate with OPF for conference sessions, mentoring tracks, and research-focused strategic initiatives.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">
                Start a Conversation
              </Link>
              <Link href="/memberships" className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900">
                View Memberships
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

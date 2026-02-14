import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpenText,
  FlaskConical,
  Globe2,
  GraduationCap,
  Handshake,
  Microscope,
  Target,
  Users,
} from "lucide-react";
import PageHero from "../components/PageHero";
import VideoShowcase from "../components/VideoShowcase";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

const pillars = [
  {
    icon: GraduationCap,
    title: "Pharmacy Education",
    text: "Structured learning pathways, workshops, and mentorship programs for students and early-career professionals.",
  },
  {
    icon: Microscope,
    title: "Research Development",
    text: "Guidance for project design, publication quality, and conference-ready scientific communication.",
  },
  {
    icon: Handshake,
    title: "Professional Network",
    text: "A collaborative ecosystem connecting institutions, faculty, clinicians, and pharmaceutical experts.",
  },
  {
    icon: Globe2,
    title: "Global Healthcare Impact",
    text: "Programs focused on practical innovation and measurable healthcare outcomes across regions.",
  },
];

const focusAreas = [
  "Pharmacovigilance training and drug safety education",
  "Clinical research methods and regulatory readiness",
  "Research writing, publication support, and peer-review standards",
  "Industry-academia collaboration and innovation partnerships",
  "Professional development for pharmacy students and practitioners",
];

const approach = [
  {
    title: "Learn",
    description:
      "Build strong fundamentals through structured sessions, topic hubs, and expert-led learning modules.",
  },
  {
    title: "Apply",
    description:
      "Translate concepts into practical outputs like posters, papers, case discussions, and conference presentations.",
  },
  {
    title: "Publish",
    description:
      "Improve manuscript quality, ethics alignment, and visibility of your work through guided publication support.",
  },
  {
    title: "Lead",
    description:
      "Grow into mentorship, collaboration, and leadership opportunities across pharmacy and healthcare programs.",
  },
];

const membershipAudience = [
  "B.Pharm, M.Pharm, Pharm.D, and PhD students",
  "Faculty members and academic researchers",
  "Clinical, safety, and regulatory professionals",
  "Industry teams working in R&D and quality",
];

export default function AboutPage() {
  const webPage = pageSchema({
    title: "About Operant Pharmacy Federation",
    description:
      "Learn how OPF advances pharmacy education, pharmaceutical research, professional networking, and healthcare innovation across India and global collaborations.",
    path: "/about",
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        tag="About OPF"
        title="Advancing Pharmacy Education, Research, and Professional Excellence"
        description="Operant Pharmacy Federation is a non-government, non-profit professional platform focused on pharmacy education, pharmaceutical research, conference programs, and healthcare innovation collaboration."
        image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
        alt="Pharmaceutical research professionals in a collaborative discussion"
        actions={[
          { href: "/memberships", label: "Explore Memberships" },
          { href: "/contact", label: "Contact OPF", variant: "secondary" },
        ]}
      />

      <VideoShowcase
        eyebrow="About OPF"
        title="A Closer Look at Our Mission"
        description="Explore how OPF supports students, researchers, and professionals through mentorship, innovation, and global pharmacy collaboration."
        embedUrl="https://www.youtube.com/embed/dTuHXUt1weQ?si=l1fZ6wbmY9cSE4ML"
        youtubeUrl="https://www.youtube.com/watch?v=dTuHXUt1weQ&t=1s"
      />

      <section className="section-pad">
        <div className="section-shell grid gap-8 lg:grid-cols-12 lg:items-start">
          <article className="surface-card rounded-[2rem] p-6 sm:p-8 lg:col-span-7">
            <span className="pill-tag">Who We Are</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              A Research-First Community for Pharmacy Professionals
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              OPF is an academic and professional platform. We are not a pharmaceutical manufacturing company and not a government body. Our focus is to support knowledge exchange, research quality, and long-term professional growth across pharmaceutical sciences.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Through conferences, expert mentorship, and collaborative initiatives, we help members translate scientific learning into practical healthcare impact.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-5">
            <div className="surface-card overflow-hidden rounded-[2rem] p-4">
              <div className="relative h-[360px] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1600"
                  alt="Laboratory team discussing scientific findings"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <StatCard value="15+" label="Countries Engaged" icon={<Globe2 size={17} />} />
              <StatCard value="50+" label="Research Initiatives" icon={<FlaskConical size={17} />} />
              <StatCard value="100+" label="Mentorship Sessions" icon={<Award size={17} />} />
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]">
        <div className="section-shell">
          <div className="mb-9 max-w-3xl">
            <span className="pill-tag">Core Pillars</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              What OPF Delivers for the Pharmacy Community
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="surface-card rounded-3xl p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">Our Approach</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              How OPF Supports Long-Term Professional Growth
            </h2>
            <div className="mt-6 space-y-4">
              {approach.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4ea3]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card rounded-[2rem] p-6 md:p-8">
            <span className="pill-tag">Who Should Join</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              OPF Membership Is Relevant For
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {membershipAudience.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MiniInfo title="Mentorship" icon={<Users size={16} />} />
              <MiniInfo title="Topic Hubs" icon={<BookOpenText size={16} />} />
              <MiniInfo title="Research Scope" icon={<Target size={16} />} />
              <MiniInfo title="Collaboration" icon={<Handshake size={16} />} />
            </div>
          </article>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900">Why Pharmacy Students and Researchers Choose OPF</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            OPF combines practical guidance, research support, and professional networking in one ecosystem. Members gain visibility through events, stronger publication confidence, and direct access to domain experts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/topics" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
              Explore Topic Hubs
            </Link>
            <Link href="/membershipForm" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="surface-card flex items-center gap-3 rounded-2xl p-4">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">{icon}</span>
      <div>
        <p className="font-display text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function MiniInfo({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700">
      <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-white">
        {icon}
      </span>
      {title}
    </div>
  );
}

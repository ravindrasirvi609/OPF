import Link from "next/link";
import { BookOpenCheck, BriefcaseBusiness, PenSquare, Users } from "lucide-react";
import PageHero from "../../components/PageHero";

const outcomes = [
  "Research writing and publication-readiness support",
  "Conference presentation confidence and communication quality",
  "Mentorship and networking for specialization planning",
  "Career alignment between academic profile and market demand",
];

export default function PharmacyEducationPage() {
  return (
    <>
      <PageHero
        tag="Pharmacy Education"
        title="Academic Growth, Research Writing, and Career Development"
        description="OPF helps learners strengthen pharmacy fundamentals while building publication skills, professional confidence, and long-term career readiness."
        image="https://images.unsplash.com/photo-1576670159805-5f9813f0f6fb?auto=format&fit=crop&q=80&w=2000"
        alt="Pharmacy students and mentors in academic discussion"
        actions={[
          { href: "/membershipForm", label: "Start Your OPF Journey" },
          { href: "/topics", label: "All Topic Hubs", variant: "secondary" },
        ]}
      />

      <article className="section-pad">
        <div className="section-shell grid gap-5 lg:grid-cols-12">
          <section className="surface-card rounded-[2rem] p-6 lg:col-span-8">
            <h2 className="text-3xl font-semibold text-slate-900">Future-Ready Pharmacy Learning</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              OPF education programs extend beyond classroom performance by supporting practical research communication, presentation delivery, and multidisciplinary exposure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Through workshops, mentor interactions, and collaborative events, learners build capabilities that improve academic outcomes and industry readiness.
            </p>

            <h3 className="mt-6 text-2xl font-semibold text-slate-900">Learning Outcomes</h3>
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
            <MiniCard icon={<BookOpenCheck size={17} />} title="Academic Excellence" text="Strengthen subject depth with practical learning orientation." />
            <MiniCard icon={<PenSquare size={17} />} title="Scientific Writing" text="Improve manuscript structure, clarity, and publication confidence." />
            <MiniCard icon={<Users size={17} />} title="Mentor Access" text="Connect with advisers and professionals for tailored guidance." />
            <MiniCard icon={<BriefcaseBusiness size={17} />} title="Career Direction" text="Plan specializations and roles based on market relevance." />
          </aside>
        </div>

        <div className="section-shell mt-6">
          <div className="surface-card rounded-3xl px-6 py-7">
            <h3 className="text-2xl font-semibold text-slate-900">Next Steps</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                About OPF
              </Link>
              <Link href="/impact-stories" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Conference Outcomes
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

import Link from "next/link";

const topicCards = [
  {
    href: "/topics/pharmacovigilance",
    title: "Pharmacovigilance",
    description:
      "Adverse event monitoring, drug safety reporting, and real-world evidence practices.",
  },
  {
    href: "/topics/clinical-research",
    title: "Clinical Research",
    description:
      "Trial design, ethics, regulatory operations, and evidence-led medicine development.",
  },
  {
    href: "/topics/pharmacy-education",
    title: "Pharmacy Education",
    description:
      "Career development, research writing, conference participation, and mentorship pathways.",
  },
];

export default function TopicsPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          Pharmacy Topic Hubs
        </h1>
        <p className="mb-12 max-w-3xl text-lg text-slate-600">
          Explore focused OPF resources for high-demand pharmaceutical domains.
          Each topic page includes practical guidance, internal resources, and
          next-step actions for students, researchers, and industry
          professionals.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {topicCards.map((topic) => (
            <article
              key={topic.href}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="mb-3 text-2xl font-semibold text-slate-900">{topic.title}</h2>
              <p className="mb-6 text-slate-600">{topic.description}</p>
              <Link
                href={topic.href}
                className="font-semibold text-[#154c8c] hover:text-[#E91E63]"
              >
                Explore Topic
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

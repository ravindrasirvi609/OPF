import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { conferences } from "../../../../data";
import { breadcrumbSchema, pageSchema } from "../../lib/seo";

interface PageProps {
  params: { id: string };
}

interface Conference {
  id: number;
  heading: string;
  subHeading: string;
  title: string;
  collaborator: string;
  activity: string;
  date: string;
  description: string;
  objectives: string[];
  keyTakeaways: string[];
  imageUrl?: string;
}

export default function ImpactStoryDetailPage({ params }: PageProps) {
  const conference = conferences.find(
    (item) => item.id === Number(params.id)
  ) as Conference | undefined;

  if (!conference) {
    notFound();
  }

  const webPage = pageSchema({
    title: conference.heading,
    description:
      conference.description ||
      `Read key outcomes and highlights from ${conference.heading}.`,
    path: `/impact-stories/${conference.id}`,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Impact Stories", path: "/impact-stories" },
    { name: conference.heading, path: `/impact-stories/${conference.id}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: conference.heading,
    description: conference.description || conference.title,
    image: conference.imageUrl || "https://opf.org.in/opflogo.png",
    author: {
      "@type": "Organization",
      name: "Operant Pharmacy Federation",
    },
    publisher: {
      "@type": "Organization",
      name: "Operant Pharmacy Federation",
      logo: {
        "@type": "ImageObject",
        url: "https://opf.org.in/opflogo.png",
      },
    },
    mainEntityOfPage: `https://opf.org.in/impact-stories/${conference.id}`,
  };

  return (
    <article className="bg-slate-50 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-[#154c8c] md:text-5xl">{conference.heading}</h1>
        <p className="mb-10 text-lg text-slate-700">{conference.title}</p>

        <div className="mb-10 overflow-hidden rounded-3xl bg-white shadow">
          <div className="relative h-[320px] w-full md:h-[420px]">
            <Image
              src={conference.imageUrl || "/opflogo.png"}
              alt={conference.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <section className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Conference Overview</h2>
          <p className="leading-8 text-slate-700">
            {conference.description ||
              `${conference.heading} brought together pharmacy professionals to discuss innovation, evidence-driven practice, and research outcomes.`}
          </p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
            <p>
              <strong>Date:</strong> {conference.date}
            </p>
            <p>
              <strong>Partner:</strong> {conference.collaborator}
            </p>
            <p>
              <strong>Activity:</strong> {conference.activity}
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">Objectives</h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              {conference.objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-slate-900">Key Takeaways</h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              {conference.keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/impact-stories" className="rounded-full bg-[#154c8c] px-5 py-3 font-semibold text-white">
            Back to Impact Stories
          </Link>
          <Link href="/membershipForm" className="rounded-full border border-[#154c8c] px-5 py-3 font-semibold text-[#154c8c]">
            Join OPF
          </Link>
        </div>
      </div>
    </article>
  );
}

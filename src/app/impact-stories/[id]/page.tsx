import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, Handshake, ListChecks } from "lucide-react";
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
  const conference = conferences.find((item) => item.id === Number(params.id)) as
    | Conference
    | undefined;

  if (!conference) {
    notFound();
  }

  const webPage = pageSchema({
    title: conference.heading,
    description: conference.description || `Read key outcomes from ${conference.heading}.`,
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
    image: conference.imageUrl || "https://opf.org.in/opf-main.webp",
    author: {
      "@type": "Organization",
      name: "Operant Pharmacy Federation",
    },
    publisher: {
      "@type": "Organization",
      name: "Operant Pharmacy Federation",
      logo: {
        "@type": "ImageObject",
        url: "https://opf.org.in/opf-main.webp",
      },
    },
    mainEntityOfPage: `https://opf.org.in/impact-stories/${conference.id}`,
  };

  return (
    <article className="section-pad">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="section-shell">
        <Link href="/impact-stories" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ChevronLeft size={15} />
          Back to Impact Stories
        </Link>

        <header className="mt-5 surface-card overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <span className="pill-tag">Conference Impact</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-slate-900 md:text-5xl">{conference.heading}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">{conference.title}</p>

          <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <MetaItem icon={<CalendarDays size={15} />} label="Date" value={conference.date} />
            <MetaItem icon={<Handshake size={15} />} label="Collaborator" value={conference.collaborator} />
            <MetaItem icon={<ListChecks size={15} />} label="Activity" value={conference.activity} />
          </div>

          <div className="mt-6 relative h-[300px] overflow-hidden rounded-[1.5rem] sm:h-[420px]">
            <Image
              src={conference.imageUrl || "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1600"}
              alt={conference.title}
              fill
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="object-cover"
            />
          </div>
        </header>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="surface-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              {conference.description ||
                `${conference.heading} brought together pharmacy professionals and institutions to discuss practical innovation, scientific quality, and future-ready healthcare solutions.`}
            </p>
          </div>

          <div className="surface-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Why This Event Matters</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              This event contributes to OPF&apos;s long-term mission of strengthening pharmacy education, encouraging evidence-based research practices, and creating collaborative growth opportunities for professionals and students.
            </p>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="surface-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Objectives</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {conference.objectives.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a4ea3]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Key Takeaways</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
              {conference.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1095c1]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/impact-stories" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Back to Impact Stories
          </Link>
          <Link href="/membershipForm" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
            Join OPF
          </Link>
        </div>
      </div>
    </article>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

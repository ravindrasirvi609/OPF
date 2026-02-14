import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Globe2, Lightbulb, Users } from "lucide-react";
import { conferences } from "../../../data";
import PageHero from "../components/PageHero";
import { breadcrumbSchema, pageSchema } from "../lib/seo";

interface Conference {
  id: number;
  slug: string;
  heading: string;
  subHeading: string;
  title: string;
  date: string;
  coverImage?: string;
  images?: string[];
  location?: string;
  year?: number;
  innovationCount?: number;
  impactedLives?: number;
}

export default function ImpactStoriesPage() {
  const webPage = pageSchema({
    title: "Pharmacy Impact Stories and Conferences",
    description:
      "Read OPF impact stories from pharmacy conferences, academic collaborations, and pharmaceutical research initiatives.",
    path: "/impact-stories",
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Impact Stories", path: "/impact-stories" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        tag="Impact Stories"
        title="Conference Outcomes and Research Impact Across the OPF Network"
        description="Explore how OPF programs and partner events create measurable value through knowledge exchange, innovation, and practical healthcare progress."
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000"
        alt="Conference professionals discussing research insights"
        actions={[
          { href: "/membershipForm", label: "Join OPF" },
          { href: "/collaborations", label: "Explore Collaborations", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <StatCard label="Conferences Covered" value={`${conferences.length}+`} icon={<CalendarDays size={17} />} />
            <StatCard label="Innovation Discussions" value="50+" icon={<Lightbulb size={17} />} />
            <StatCard label="Community Reach" value="Global" icon={<Globe2 size={17} />} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {conferences.map((item) => {
              const conference = item as Conference;
              const cardImage =
                conference.coverImage ||
                conference.images?.[0] ||
                "/opf-main.webp";

              return (
                <Link key={conference.id} href={`/impact-stories/${conference.id}`} className="group">
                  <article className="surface-card h-full overflow-hidden rounded-[1.8rem]">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={cardImage}
                        alt={conference.heading}
                        fill
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                        {conference.date}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-slate-900">{conference.heading}</h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{conference.subHeading}</p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                        {conference.year ? <span>{conference.year}</span> : null}
                        {conference.innovationCount ? <span>{conference.innovationCount} innovations</span> : null}
                        {conference.impactedLives ? <span>{conference.impactedLives} lives impacted</span> : null}
                        {conference.location ? (
                          <span className="inline-flex items-center gap-1">
                            <Users size={13} />
                            {conference.location}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition group-hover:gap-2 group-hover:text-[#0a4ea3]">
                        Read Full Story
                        <ArrowUpRight size={15} />
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="surface-card rounded-2xl p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">{icon}</span>
      <p className="mt-3 font-display text-4xl font-semibold text-slate-900">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}

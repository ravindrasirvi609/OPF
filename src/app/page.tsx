import type { Metadata } from "next";
import Hero from "./components/Hero";
import FeaturedResearch from "./components/FeaturedResearch";
import InnovationShowcase from "./components/InnovationShowcase";
import ContactCTA from "./components/ContactCTA";
import AboutOpf from "./components/AboutOpf";
import Statistics from "./components/Statistics";
import Pillars from "./components/Pillars";
import Consulting from "./components/Consulting";
import CoreValues from "./components/CoreValues";
import FoundersMessage from "./components/FoundersMessage";
import LatestNews from "./components/LatestNews";
import { breadcrumbSchema, buildMetadata, pageSchema } from "./lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pharmacy Research and Innovation Network",
  description:
    "Join Operant Pharmacy Federation for pharmaceutical research, conferences, pharmacy education, and global healthcare collaborations.",
  path: "/",
  keywords: [
    "pharmacy federation india",
    "pharmaceutical research organization",
    "pharmacy conferences",
    "drug safety and pharmacovigilance",
  ],
});

export default function Home() {
  const webPage = pageSchema({
    title: "Pharmacy Research and Innovation Network",
    description:
      "Join Operant Pharmacy Federation for pharmaceutical research, conferences, pharmacy education, and global healthcare collaborations.",
    path: "/",
  });

  const breadcrumbs = breadcrumbSchema([{ name: "Home", path: "/" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <section>
        <Hero />
        <AboutOpf />
        <Pillars />
        <FeaturedResearch />
        <Consulting />
        <InnovationShowcase />
        <CoreValues />
        <Statistics />
        <FoundersMessage />
        <LatestNews />
        <ContactCTA />
      </section>
    </>
  );
}

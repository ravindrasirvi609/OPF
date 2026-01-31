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

export const metadata: Metadata = {
  title: "Operant Pharmacy Federation - Advancing Pharmacy Through Innovation",
  description:
    "Discover groundbreaking pharmaceutical research and innovations at Operant Pharmacy Federation. Join us in shaping the future of pharmacy.",
  keywords: [
    "pharmacy",
    "research",
    "innovation",
    "pharmaceutical",
    "drug development",
  ],
};

export default function Home() {
  return (
    <>
      <main>
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
      </main>
    </>
  );
}

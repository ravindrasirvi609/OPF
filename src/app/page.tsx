import type { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedResearch from "./components/FeaturedResearch";
import InnovationShowcase from "./components/InnovationShowcase";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

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
      <Header />
      <main>
        <Hero />
        <FeaturedResearch />
        <InnovationShowcase />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, GraduationCap, Handshake, Sparkles, Users, Wallet } from "lucide-react";
import PageHero from "../components/PageHero";

interface Member {
  membershipId: string;
  fullName: string;
  affiliation: string;
  profilePictureUrl?: string;
  isValidMembership: boolean;
}

const plans = [
  {
    id: "student",
    title: "Student Member",
    price: "Rs 1 / year",
    description: "Best for pharmacy students building academic and research foundations.",
    features: ["Learning resources", "Event participation", "Certificate access"],
  },
  {
    id: "lifetime",
    title: "Patron Lifetime",
    price: "Rs 5000 one-time",
    description: "Long-term engagement plan with premium OPF ecosystem benefits.",
    features: ["Lifetime access", "Priority networking", "Premium support"],
  },
  {
    id: "industry",
    title: "Patron Industry",
    price: "Rs 5900 / year",
    description: "Designed for industry professionals seeking collaboration and visibility.",
    features: ["Industry network", "Strategic programs", "Advanced sessions"],
  },
  {
    id: "international",
    title: "Patron International",
    price: "Rs 9999 / year",
    description: "Ideal for global professionals and institutions working across borders.",
    features: ["Global community", "International events", "Premium pathways"],
  },
];

const benefits = [
  { icon: Users, text: "Access to a trusted network of pharmacy professionals and institutions." },
  { icon: GraduationCap, text: "Programs for research writing, presentation readiness, and academic growth." },
  { icon: Handshake, text: "Collaboration opportunities across conferences and institutional partnerships." },
  { icon: Sparkles, text: "Visibility through innovation showcases and impact-oriented initiatives." },
];

export default function MembershipsPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch("/api/membershipList");
        const data = await response.json();
        setMembers(Array.isArray(data) ? data : []);
      } catch {
        setMembers([]);
      }
    };

    fetchMemberships();
  }, []);

  const featuredMembers = useMemo(() => members.slice(0, 6), [members]);

  return (
    <>
      <PageHero
        tag="Memberships"
        title="Choose an OPF Membership Plan Aligned to Your Professional Goals"
        description="Join OPF to access pharmacy education resources, research support, and collaboration opportunities with experts and institutions."
        image="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000"
        alt="Pharmaceutical professionals reviewing educational materials"
        actions={[
          { href: "/membershipForm", label: "Apply Now" },
          { href: "/faq", label: "Membership FAQs", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="mb-10 max-w-3xl">
            <span className="pill-tag">Membership Benefits</span>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
              Practical Value for Students, Researchers, and Industry Professionals
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.text} className="surface-card rounded-2xl p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Icon size={17} />
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{benefit.text}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.id} className="surface-card rounded-[1.8rem] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0a4ea3]">{plan.title}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-slate-900">{plan.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <BadgeCheck size={15} className="mt-0.5 flex-shrink-0 text-[#0a4ea3]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/membershipForm" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                  Select Plan
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredMembers.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="section-shell">
            <div className="mb-8 max-w-3xl">
              <span className="pill-tag">Featured Members</span>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-4xl">
                Meet Professionals in the OPF Community
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredMembers.map((member) => (
                <article key={member.membershipId} className="surface-card overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={
                        member.profilePictureUrl ||
                        "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=1200"
                      }
                      alt={member.fullName}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xl font-semibold text-slate-900">{member.fullName}</p>
                    <p className="mt-1 text-sm text-slate-600">{member.affiliation}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      Member ID: {member.membershipId}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href="/members"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              View Members Directory
              <Wallet size={15} />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

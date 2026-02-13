"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";

interface Member {
  _id: string;
  fullName: string;
  membershipStatus: "Pending" | "Active" | "Cancelled";
  membershipId: string;
  qualifications: string;
  profilePictureUrl?: string;
}

const statusClasses = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");
        const data = await response.json();
        if (data.success) {
          setMembers(data.members || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(
    () =>
      members.filter(
        (member) =>
          member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [members, searchTerm]
  );

  return (
    <>
      <PageHero
        tag="Members"
        title="Explore the OPF Member Community"
        description="Browse verified OPF members and discover professionals engaged in pharmacy education, research, and healthcare innovation initiatives."
        image="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2000"
        alt="Medical and pharmacy professionals networking"
        actions={[
          { href: "/membershipForm", label: "Become a Member" },
          { href: "/memberships", label: "Membership Plans", variant: "secondary" },
        ]}
      />

      <section className="section-pad">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative w-full sm:max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by name or membership ID"
                  className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900"
                />
              </label>
              <p className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                {filteredMembers.length} Members
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 surface-card rounded-3xl p-8 text-center text-slate-600">Loading members...</div>
          ) : filteredMembers.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member) => (
                <article key={member._id} className="surface-card overflow-hidden rounded-[1.6rem]">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    {member.profilePictureUrl ? (
                      <Image
                        src={member.profilePictureUrl}
                        alt={member.fullName}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <UserRound size={54} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-slate-900">{member.fullName}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      ID: {member.membershipId}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{member.qualifications}</p>
                    <span
                      className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusClasses[member.membershipStatus]
                      }`}
                    >
                      {member.membershipStatus}
                    </span>
                    <Link
                      href={`/members/${member._id}`}
                      className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                    >
                      View Profile
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 surface-card rounded-3xl p-10 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">No members found</h2>
              <p className="mt-2 text-sm text-slate-600">Try a different name or membership ID in the search field.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

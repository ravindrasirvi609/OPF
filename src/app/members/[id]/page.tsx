"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, GraduationCap, Mail, MapPin, Phone, School, UserRound } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Member {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipId: string;
  selectedPlan: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  qualifications: string;
  affiliation: string;
  profilePictureUrl?: string;
}

export default function MemberDetailsPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const memberId = params.id as string;

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`/api/members/${memberId}`);
        const data = await response.json();
        if (data.success) {
          setMember(data.member);
        }
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [memberId]);

  if (loading) {
    return <div className="section-pad text-center text-slate-600">Loading member profile...</div>;
  }

  if (!member) {
    return (
      <section className="section-pad">
        <div className="section-shell surface-card rounded-3xl p-10 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Member Not Found</h1>
          <p className="mt-3 text-sm text-slate-600">The requested member profile is not available.</p>
          <Link href="/members" className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
            Back to Members
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad">
      <div className="section-shell">
        <Link href="/members" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ChevronLeft size={15} />
          Back to Members
        </Link>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <aside className="surface-card rounded-[2rem] p-6 lg:col-span-4">
            <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-3xl bg-slate-100">
              {member.profilePictureUrl ? (
                <Image
                  src={member.profilePictureUrl}
                  alt={member.fullName}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <UserRound size={74} />
                </div>
              )}
            </div>
            <h1 className="mt-5 text-center text-3xl font-semibold text-slate-900">{member.fullName}</h1>
            <p className="mt-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Member ID: {member.membershipId}
            </p>
            <p className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-700">
              Plan: {member.selectedPlan}
            </p>
          </aside>

          <div className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
            <InfoCard icon={<Mail size={16} />} label="Email" value={member.email} />
            <InfoCard icon={<Phone size={16} />} label="Phone" value={member.phone} />
            <InfoCard
              icon={<CalendarDays size={16} />}
              label="Date of Birth"
              value={new Date(member.dateOfBirth).toLocaleDateString()}
            />
            <InfoCard icon={<GraduationCap size={16} />} label="Qualifications" value={member.qualifications} />
            <InfoCard icon={<School size={16} />} label="Affiliation" value={member.affiliation} />
            <InfoCard icon={<MapPin size={16} />} label="Address" value={`${member.address}, ${member.pincode}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article className="surface-card rounded-2xl p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 md:text-base">{value}</p>
    </article>
  );
}

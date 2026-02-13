"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labelOverrides: Record<string, string> = {
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  team: "Advisers",
  innovations: "Innovations",
  memberships: "Memberships",
  membershipForm: "Membership Form",
  "membership-success": "Membership Success",
  members: "Members",
  "impact-stories": "Impact Stories",
  collaborations: "Collaborations",
  terms: "Terms and Conditions",
  privacy: "Privacy Policy",
  refund: "Refund Policy",
  topics: "Topics",
  pharmacovigilance: "Pharmacovigilance",
  "clinical-research": "Clinical Research",
  "pharmacy-education": "Pharmacy Education",
};

function toLabel(segment: string) {
  if (labelOverrides[segment]) {
    return labelOverrides[segment];
  }

  return segment
    .split("-")
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <ol className="section-shell flex flex-wrap items-center gap-2 py-3 text-xs font-medium uppercase tracking-[0.1em] text-slate-500 sm:text-sm sm:tracking-[0.12em]">
        <li>
          <Link href="/" className="transition hover:text-[#0a4ea3]">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {isLast ? (
                <span className="text-slate-900">{toLabel(segment)}</span>
              ) : (
                <Link href={href} className="transition hover:text-[#0a4ea3]">
                  {toLabel(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

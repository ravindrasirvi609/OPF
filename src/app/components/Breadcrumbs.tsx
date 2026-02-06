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
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-white/95">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-600 sm:px-6 lg:px-8">
        <li>
          <Link href="/" className="hover:text-[#154c8c]">
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
                <span className="font-semibold text-slate-900">{toLabel(segment)}</span>
              ) : (
                <Link href={href} className="hover:text-[#154c8c]">
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

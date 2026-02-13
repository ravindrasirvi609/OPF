"use client";

import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Advisers" },
  { href: "/innovations", label: "Innovations" },
  { href: "/memberships", label: "Memberships" },
  { href: "/topics", label: "Topics" },
];

const legalLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-64 w-64 rounded-full bg-[#1095c1]/20 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-[#eb6a2a]/20 blur-3xl" />
      </div>

      <div className="section-shell relative z-10 py-16 md:py-20">
        <div className="mb-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold">Operant Pharmacy Federation</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              A global platform where pharmacy professionals, researchers, and institutions collaborate to build practical healthcare impact.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://www.linkedin.com" label="LinkedIn" icon={<Linkedin size={16} />} />
              <SocialLink href="https://x.com" label="X" icon={<Twitter size={16} />} />
              <SocialLink href="https://www.instagram.com" label="Instagram" icon={<Instagram size={16} />} />
              <SocialLink href="https://www.facebook.com" label="Facebook" icon={<Facebook size={16} />} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Explore</p>
            <ul className="mt-5 space-y-3">
              {siteLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Legal</p>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Contact</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[#1095c1]" />
                <span>Shradhawan Tower, Mayank Nagar, Pali - Marwar, Rajasthan - 306401</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#1095c1]" />
                <span>+91 94609 71652</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#1095c1]" />
                <span>contact@opf.org.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Operant Pharmacy Federation. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-4 py-2 font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
          >
            Back to top
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 text-slate-200 transition hover:border-[#1095c1] hover:text-white"
    >
      {icon}
    </Link>
  );
}

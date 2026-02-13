"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/team", label: "Advisers" },
  { href: "/innovations", label: "Innovations" },
  { href: "/memberships", label: "Memberships" },
  { href: "/topics", label: "Topics" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isScrolled
          ? "border-slate-200/80 bg-white/80 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="section-shell">
        <nav className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-md">
              <Image src="/opflogo.png" alt="Operant Pharmacy Federation logo" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-none text-slate-900 sm:text-xl">
                Operant Pharmacy Federation
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 sm:text-xs">
                Research. Innovation. Impact.
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} />
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/membershipForm"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0a4ea3]"
            >
              Join OPF
              <ArrowRight size={15} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-900 lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="border-t border-slate-200/80 bg-white/95 px-4 pb-6 pt-4 shadow-xl backdrop-blur-lg lg:hidden"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-1">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} active={pathname === item.href} mobile />
              ))}
              <Link
                href="/membershipForm"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
              >
                Join OPF
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  mobile = false,
}: {
  href: string;
  label: string;
  active: boolean;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${
        mobile
          ? "rounded-2xl px-4 py-3 text-sm"
          : "rounded-full px-4 py-2 text-sm"
      } font-medium transition ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-white hover:text-slate-950"
      }`}
    >
      <span className="link-underline">{label}</span>
    </Link>
  );
}

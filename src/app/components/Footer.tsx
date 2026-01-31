"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E63]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-4">
            <div className="text-3xl font-bold mb-8 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#E91E63] to-[#154c8c] rounded-xl" />
              OPF
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
              A great platform for pharmaceutical networking with great mentors. Powered by researchers for researchers.
            </p>
            <div className="flex space-x-5">
              <SocialIcon href="#" icon={<FaFacebook />} />
              <SocialIcon href="#" icon={<FaTwitter />} />
              <SocialIcon href={<FaLinkedin />} icon={<FaLinkedin />} />
              <SocialIcon href="#" icon={<FaInstagram />} />
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#E91E63] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/team" text="Advisers" />
              <FooterLink href="/members" text="Members" />
              <FooterLink href="/faq" text="FAQ" />
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#E91E63] mb-8">Legal</h4>
            <ul className="space-y-4">
              <FooterLink href="/terms" text="Terms & Conditions" />
              <FooterLink href="/privacy" text="Privacy Policy" />
              <FooterLink href="/refund" text="Refund Policy" />
              <FooterLink href="/contact" text="Contact Us" />
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#E91E63] mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                <FaMapMarkerAlt className="mt-1 text-[#154c8c]" />
                <span>Shradhawan Tower, Mayank Nagar,<br />Pali - Marwar, Rajasthan - 306401</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                <FaPhoneAlt className="text-[#154c8c]" />
                <span>+91 94609 71652</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                <FaEnvelope className="text-[#154c8c]" />
                <span>contact@opf.org.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Operant Pharmacy Federation. Crafted with excellence.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors duration-300"
          >
            Back to top
            <div className="w-10 h-10 border border-slate-700 rounded-full flex items-center justify-center group-hover:bg-[#E91E63] group-hover:border-[#E91E63] transition-all duration-300">
              <FaArrowUp />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-slate-400 hover:text-white transition-colors duration-300 text-lg font-medium"
      >
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: any; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 border border-slate-800 rounded-2xl flex items-center justify-center text-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300"
    >
      {icon}
    </Link>
  );
}

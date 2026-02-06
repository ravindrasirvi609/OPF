"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaFlask,
  FaLightbulb,
  FaHandshake,
  FaUsers,
  FaBookOpen,
  FaBars,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(".header-anim",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const navItems = [
    { href: "/about", icon: <FaBookOpen />, text: "About Us" },
    { href: "/team", icon: <FaUsers />, text: "Advisers" },
    { href: "/innovations", icon: <FaLightbulb />, text: "Innovations" },
    { href: "/memberships", icon: <FaHandshake />, text: "Memberships" },
    { href: "/faq", icon: <FaFlask />, text: "FAQ" },
    { href: "/contact", icon: <FaEnvelope />, text: "Contact" },
    { href: "/topics", icon: <FaBookOpen />, text: "Topics" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 sm:h-20">
          <Link
            href="/"
            className="text-2xl font-bold header-anim flex items-center text-[#154c8c]"
          >
            <FaFlask className="mr-2 text-[#80b142]" />
            <span className="hidden sm:inline">
              Operant Pharmacy Federation
            </span>
            <span className="sm:hidden">OPF</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#154c8c] text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"
          } bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} mobile />
          ))}
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, icon, text, mobile = false }: any) {
  return (
    <Link
      href={href}
      className={`
        flex items-center text-[#154c8c] hover:bg-[#80b142] hover:text-white
        transition duration-300 rounded-md
        ${mobile
          ? "px-3 py-2 text-base font-medium"
          : "px-3 py-2 text-sm font-medium"
        }
      `}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
}

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
    gsap.from(".header-anim", {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const navItems = [
    { href: "/innovations", icon: <FaLightbulb />, text: "Innovations" },
    { href: "/impact-stories", icon: <FaBookOpen />, text: "Impact Stories" },
    { href: "/collaborations", icon: <FaHandshake />, text: "Collaborations" },
    { href: "/memberships", icon: <FaUsers />, text: "Memberships" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#154c8c] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16 sm:h-20">
          <Link
            href="/"
            className="text-2xl font-bold header-anim flex items-center text-[#80b142]"
          >
            <FaFlask className="mr-2" />
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
            className="lg:hidden text-[#80b142] text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-[#154c8c] shadow-lg`}
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
         flex items-center text-[#80b142] hover:bg-[#1a5fa6] hover:text-white
        transition duration-300 rounded-md
        ${
          mobile
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

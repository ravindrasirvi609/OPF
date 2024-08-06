"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
  useGSAP(() => {
    gsap.from(".header-anim", {
      y: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <header className="bg-[#154c8c] text-white p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold header-anim">
          Operant Pharmacy Federation
        </Link>
        <ul className="flex space-x-6">
          <li className="header-anim">
            <Link href="/research">Research</Link>
          </li>
          <li className="header-anim">
            <Link href="/innovations">Innovations</Link>
          </li>
          <li className="header-anim">
            <Link href="/about">About</Link>
          </li>
          <li className="header-anim">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import {
  FaFlask,
  FaLightbulb,
  FaInfoCircle,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaFlask className="mr-2" />
              Operant Pharmacy Federation
            </h3>
            <p>Advancing pharmacy through research and innovation.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/research" icon={<FaFlask />} text="Research" />
              <FooterLink
                href="/innovations"
                icon={<FaLightbulb />}
                text="Innovations"
              />
              <FooterLink
                href="/about"
                icon={<FaInfoCircle />}
                text="About Us"
              />
              <FooterLink
                href="/contact"
                icon={<FaEnvelope />}
                text="Contact"
              />
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p>123 Pharmacy Street</p>
            <p>Research City, RC 12345</p>
            <p>contact@operantpharmacy.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={<FaFacebook />} />
              <SocialIcon href="#" icon={<FaTwitter />} />
              <SocialIcon href="#" icon={<FaLinkedin />} />
              <SocialIcon href="#" icon={<FaInstagram />} />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>&copy; 2024 Operant Pharmacy Federation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon, text }: any) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center hover:text-[#80b142] transition duration-300"
      >
        {icon}
        <span className="ml-2">{text}</span>
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: any) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-2xl hover:text-[#80b142] transition duration-300"
    >
      {icon}
    </Link>
  );
}

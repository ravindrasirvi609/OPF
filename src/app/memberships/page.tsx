"use client";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  FaUserPlus,
  FaNetworkWired,
  FaGraduationCap,
  FaNewspaper,
  FaComments,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

const benefits = [
  {
    icon: <FaNetworkWired />,
    text: "Access to exclusive pharmaceutical research and innovations",
  },
  {
    icon: <FaUserPlus />,
    text: "Networking opportunities with industry leaders",
  },
  {
    icon: <FaGraduationCap />,
    text: "Discounts on conferences and educational materials",
  },
  {
    icon: <FaNewspaper />,
    text: "Quarterly newsletter with industry insights",
  },
  {
    icon: <FaComments />,
    text: "Opportunity to contribute to policy-making discussions",
  },
];

const members = [
  {
    id: "OPF001",
    name: "Dr. Emily Johnson",
    image: "/images/emily-johnson.jpg",
    designation: "Senior Pharmacist",
  },
  {
    id: "OPF002",
    name: "Dr. Michael Chen",
    image: "/images/michael-chen.jpg",
    designation: "Research Director",
  },
  {
    id: "OPF003",
    name: "Dr. Sarah Patel",
    image: "/images/sarah-patel.jpg",
    designation: "Clinical Pharmacist",
  },
  // Add more members as needed
];

const Memberships = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-[#154c8c] mb-8 text-center">
          OPF Memberships
        </h1>

        {/* Benefits Section */}
        <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-[#80b142] mb-6 text-center">
            Benefits of OPF Membership
          </h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="benefit-item flex items-center text-gray-700 bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <span className="text-[#80b142] text-2xl mr-4">
                  {benefit.icon}
                </span>
                {benefit.text}
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Link href={"/membershipForm"}>
              <button className="bg-[#154c8c] text-white font-bold py-3 px-6 rounded-full hover:bg-[#80b142] transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                <FaUserPlus className="mr-2" /> Become a Member
              </button>
            </Link>
          </div>
        </section>

        {/* Members Section */}
        <section>
          <h2 className="text-3xl font-semibold text-[#80b142] mb-8 text-center">
            Our Esteemed Members
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="member-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-[#154c8c] mb-2 flex items-center">
                    {member.name}
                    <MdVerified className="text-[#80b142] ml-2" />
                  </h3>
                  <p className="text-gray-600 mb-2">{member.designation}</p>
                  <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md inline-block">
                    Member ID: {member.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Memberships;

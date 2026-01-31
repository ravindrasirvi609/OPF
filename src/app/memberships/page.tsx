"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaUserPlus,
  FaNetworkWired,
  FaGraduationCap,
  FaNewspaper,
  FaComments,
  FaCheckCircle,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// Define interfaces for the data structures
interface Benefit {
  icon: JSX.Element;
  text: string;
  color: string;
}

interface Member {
  membershipId: string;
  fullName: string;
  affiliation: string;
  profilePictureUrl?: string;
  isValidMembership: boolean;
}

// Benefits data
const benefits: Benefit[] = [
  {
    icon: <FaNetworkWired />,
    text: "Access to exclusive pharmaceutical research and innovations",
    color: "#E91E63",
  },
  {
    icon: <FaUserPlus />,
    text: "Networking opportunities with industry leaders",
    color: "#154c8c",
  },
  {
    icon: <FaGraduationCap />,
    text: "Discounts on conferences and educational materials",
    color: "#80b142",
  },
  {
    icon: <FaNewspaper />,
    text: "Quarterly newsletter with industry insights",
    color: "#E91E63",
  },
  {
    icon: <FaComments />,
    text: "Opportunity to contribute to policy-making discussions",
    color: "#154c8c",
  },
];

const Memberships: React.FC = () => {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get("/api/membershipList");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    fetchMemberships();
  }, []);

  useGSAP(
    () => {
      if (headingRef.current) {
        const headingSplit = new SplitType(headingRef.current, {
          types: "chars,words",
        });

        gsap.fromTo(
          headingSplit.chars,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 1, ease: "expo.out" }
        );

        // Benefit cards animation
        gsap.fromTo(
          ".benefit-card",
          { y: 60, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: ".benefits-grid",
              start: "top 80%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out",
          }
        );

        // Member cards animation
        gsap.fromTo(
          ".member-showcase-card",
          { y: 80, opacity: 0, rotateY: -15 },
          {
            scrollTrigger: {
              trigger: ".members-showcase",
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            rotateY: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: "expo.out",
          }
        );

        // Floating backgrounds
        gsap.to(".float-membership", {
          y: -25,
          x: 15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 1,
        });

        return () => {
          headingSplit.revert();
        };
      }
    },
    { scope: containerRef, dependencies: [members] }
  );

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-white via-[#fafafa] to-white min-h-screen overflow-hidden relative"
    >
      {/* Floating Background Elements */}
      <div className="float-membership absolute top-20 left-20 w-96 h-96 bg-[#154c8c]/5 rounded-full blur-[120px]" />
      <div className="float-membership absolute bottom-40 right-20 w-80 h-80 bg-[#E91E63]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
            <span className="text-[#154c8c] text-sm font-medium tracking-wider uppercase">
              Join Our Community
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            OPF <span className="text-gradient">Memberships</span>
          </h1>
        </div>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Benefits of <span className="text-gradient">OPF Membership</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join a global network of pharmaceutical professionals and unlock
              exclusive opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="benefit-card opacity-0 group relative p-8 bg-white rounded-[32px] border-2 border-slate-100 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
              >
                {/* Decorative gradient */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: benefit.color }}
                />

                <div className="relative z-10">
                  <div
                    className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left"
                    style={{ color: benefit.color }}
                  >
                    {benefit.icon}
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">
                    {benefit.text}
                  </p>
                </div>

                {/* Check icon */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FaCheckCircle
                    className="text-2xl"
                    style={{ color: benefit.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href={"/membershipForm"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-[#154c8c] to-[#E91E63] text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaUserPlus className="text-xl" />
                  Become a Member
                </span>
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Members Section */}
        {members.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="members-showcase"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our <span className="text-gradient">Esteemed Members</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Join a distinguished community of pharmaceutical professionals
                from around the world
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.slice(0, 6).map((member) => (
                <motion.div
                  key={member.membershipId}
                  whileHover={{ scale: 1.05 }}
                  className="member-showcase-card opacity-0 group bg-white rounded-[32px] shadow-lg overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={
                        member.profilePictureUrl || "/images/placeholder.jpg"
                      }
                      alt={member.fullName}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Verified Badge */}
                    {member.isValidMembership && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <MdVerified className="text-[#80b142] text-xl" />
                      </div>
                    )}

                    {/* Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-2xl text-white mb-2 flex items-center gap-2">
                        {member.fullName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-slate-600 mb-3 text-lg">
                      {member.affiliation}
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl inline-block font-mono">
                      Member ID: {member.membershipId}
                    </p>
                  </div>

                  {/* Decorative gradient */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#E91E63]/10 to-transparent rounded-br-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold text-lg rounded-full hover:bg-slate-50 hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/members")}
              >
                View All Memberships
              </motion.button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Memberships;

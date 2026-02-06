"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUserCircle, FaPlus, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  _id: string;
  fullName: string;
  membershipStatus: "Pending" | "Active" | "Cancelled";
  membershipId: string;
  qualifications: string;
  profilePictureUrl: string;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Active: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

const MembersCardView: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");
        const data = await response.json();
        if (data.success) {
          setMembers(data.members);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useGSAP(
    () => {
      if (!loading && headingRef.current) {
        const headingSplit = new SplitType(headingRef.current, {
          types: "chars,words",
        });

        gsap.fromTo(
          headingSplit.chars,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, duration: 1, ease: "expo.out" }
        );

        // Search bar animation
        gsap.fromTo(
          ".search-container",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );

        // Member cards animation
        gsap.fromTo(
          ".member-card",
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            delay: 0.8,
          }
        );

        // Floating background
        gsap.to(".float-bg-member", {
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
    { scope: containerRef, dependencies: [loading] }
  );

  const filteredMembers = members.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#fafafa] to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-[#E91E63] border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-white via-[#fafafa] to-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Floating Background Elements */}
      <div className="float-bg-member absolute top-20 right-20 w-80 h-80 bg-[#154c8c]/5 rounded-full blur-[100px]" />
      <div className="float-bg-member absolute bottom-40 left-20 w-96 h-96 bg-[#E91E63]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#154c8c]/20 rounded-full bg-[#154c8c]/5">
            <span className="text-[#154c8c] text-sm font-medium tracking-wider uppercase">
              Our Community
            </span>
          </div>

          <h1
            ref={headingRef}
            className="text-6xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            Members <span className="text-gradient">Directory</span>
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="search-container opacity-0 mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="relative w-full sm:w-96 group">
            <input
              type="text"
              placeholder="Search members by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-slate-200 rounded-[30px] focus:outline-none focus:ring-4 focus:ring-[#E91E63]/20 focus:border-[#E91E63] transition-all duration-300 bg-white shadow-sm hover:shadow-md"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-[#E91E63] transition-colors duration-300" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-white border-2 border-slate-200 rounded-[30px] shadow-sm">
              <span className="text-sm font-bold text-slate-600">
                {filteredMembers.length} Members
              </span>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredMembers.map((member) => (
            <motion.div
              key={member._id}
              whileHover={{ y: -8 }}
              className="member-card opacity-0 group bg-white rounded-[32px] shadow-lg overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100"
            >
              <div className="p-8">
                {/* Profile Picture */}
                <div className="flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E91E63]/20 to-[#154c8c]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {member.profilePictureUrl ? (
                    <img loading="lazy" decoding="async" src={member.profilePictureUrl}
                      alt={member.fullName}
                      className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <FaUserCircle className="relative w-28 h-28 text-slate-300 group-hover:text-[#E91E63] transition-colors duration-500" />
                  )}
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-slate-900 text-center mb-3 group-hover:text-[#E91E63] transition-colors duration-300">
                  {member.fullName}
                </h2>

                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`px-4 py-1.5 text-xs font-bold rounded-full border ${statusColors[member.membershipStatus]
                      }`}
                  >
                    {member.membershipStatus}
                  </span>
                </div>

                {/* Member ID */}
                <p className="text-sm text-slate-500 text-center mb-2 font-mono bg-slate-50 py-2 px-4 rounded-xl">
                  ID: {member.membershipId}
                </p>

                {/* Qualifications */}
                <p className="text-sm text-slate-600 text-center mb-6 line-clamp-2">
                  {member.qualifications}
                </p>

                {/* View Profile Button */}
                <Link href={`/members/${member._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-[#154c8c] to-[#E91E63] text-white py-3 rounded-[20px] font-bold hover:shadow-xl transition-all duration-300"
                  >
                    View Profile
                  </motion.button>
                </Link>
              </div>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#E91E63]/10 to-transparent rounded-bl-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-slate-50 rounded-[40px] mb-6">
              <FaSearch className="text-6xl text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              No members found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersCardView;

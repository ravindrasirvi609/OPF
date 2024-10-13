"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaUserPlus,
  FaNetworkWired,
  FaGraduationCap,
  FaNewspaper,
  FaComments,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Define interfaces for the data structures
interface Benefit {
  icon: JSX.Element;
  text: string;
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

const Memberships: React.FC = () => {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);

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

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold text-[#154c8c] mb-12 text-center"
        >
          OPF Memberships
        </motion.h1>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20 bg-white rounded-2xl shadow-2xl p-10"
        >
          <h2 className="text-4xl font-bold text-[#80b142] mb-8 text-center">
            Benefits of OPF Membership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="benefit-item flex items-center text-gray-700 bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-[#80b142] text-3xl mr-4">
                  {benefit.icon}
                </span>
                <p className="text-lg">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={"/membershipForm"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#154c8c] text-white font-bold py-4 px-8 rounded-full hover:bg-[#80b142] transition duration-300 text-lg flex items-center justify-center mx-auto"
              >
                <FaUserPlus className="mr-2" /> Become a Member
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
          >
            <h2 className="text-4xl font-bold text-[#80b142] mb-10 text-center">
              Our Esteemed Members
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.map((member) => (
                <motion.div
                  key={member.membershipId}
                  whileHover={{ scale: 1.05 }}
                  className="member-card bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={
                        member.profilePictureUrl || "/images/placeholder.jpg"
                      }
                      alt={member.fullName}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-2xl text-[#154c8c] mb-3 flex items-center">
                      {member.fullName}
                      {member.isValidMembership && (
                        <MdVerified className="text-[#80b142] ml-2 text-xl" />
                      )}
                    </h3>
                    <p className="text-gray-600 mb-3 text-lg">
                      {member.affiliation}
                    </p>
                    <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg inline-block">
                      Member ID: {member.membershipId}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#80b142] text-white font-bold py-3 px-8 rounded-full hover:bg-[#6fa638] transition duration-300 text-lg"
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

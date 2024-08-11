"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

interface Member {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipId: string;
  selectedPlan: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#80b142]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#154c8c] mb-8">Members List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Link href={`/members/${member._id}`} key={member._id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-[#80b142] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {member.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#154c8c]">
                    {member.fullName}
                  </h2>
                  <p className="text-gray-600">{member.selectedPlan} Plan</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2 text-[#80b142]" /> {member.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaPhone className="mr-2 text-[#80b142]" /> {member.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaIdCard className="mr-2 text-[#80b142]" />{" "}
                  {member.membershipId}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Members;

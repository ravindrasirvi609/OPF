"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";

interface Member {
  _id: string;
  fullName: string;
  membershipStatus: "Pending" | "Active" | "Cancelled";
  membershipId: string;
  qualifications: string;
  profilePictureUrl: string;
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Active: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const MembersCardView: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Replace with your actual API endpoint
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

  const filteredMembers = members.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Members Directory
      </h1>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Add New Member
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex items-center justify-center mb-4">
                {member.profilePictureUrl ? (
                  <img
                    src={member.profilePictureUrl}
                    alt={member.fullName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-24 h-24 text-gray-400" />
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {member.fullName}
              </h2>
              <div className="flex justify-center mb-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    statusColors[member.membershipStatus]
                  }`}
                >
                  {member.membershipStatus}
                </span>
              </div>
              <p className="text-sm text-gray-600 text-center mb-2">
                ID: {member.membershipId}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {member.qualifications}
              </p>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-center">
              <Link href={`/members/${member._id}`}>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersCardView;

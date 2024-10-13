"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Members Directory
        </h1>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add New Member</span>
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMembers.map((member) => (
            <motion.div
              key={member._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {member.profilePictureUrl ? (
                    <img
                      src={member.profilePictureUrl}
                      alt={member.fullName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                    />
                  ) : (
                    <FaUserCircle className="w-24 h-24 text-blue-300" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {member.fullName}
                </h2>
                <div className="flex justify-center mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
              <div className="bg-gray-50 px-6 py-4">
                <Link href={`/members/${member._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Profile
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MembersCardView;

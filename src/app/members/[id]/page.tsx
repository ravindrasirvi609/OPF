"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface Member {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipId: string;
  selectedPlan: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  qualifications: string;
  affiliation: string;
  profilePictureUrl?: string;
}

const MemberDetails = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const memberId = params.id as string;

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`/api/members/${memberId}`);
        const data = await response.json();
        if (data.success) {
          setMember(data.member);
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#154c8c] to-[#80b142]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-[#80b142] border-solid rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#154c8c] mb-4"
        >
          Member Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-gray-600"
        >
          The requested member profile could not be found.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#154c8c] to-[#80b142] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Member Profile
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-gradient-to-br from-[#154c8c] to-[#80b142] p-8 text-center">
              {member.profilePictureUrl ? (
                <img loading="lazy" decoding="async" src={member.profilePictureUrl}
                  alt={member.fullName}
                  className="w-48 h-48 rounded-full mx-auto border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-48 h-48 rounded-full mx-auto bg-white flex items-center justify-center text-[#154c8c] text-5xl font-bold shadow-lg">
                  {member.fullName.charAt(0)}
                </div>
              )}
              <h2 className="mt-4 text-3xl font-semibold text-white">
                {member.fullName}
              </h2>
              <p className="mt-2 text-[#80b142]">{member.membershipId}</p>
            </div>
            <div className="p-8 md:p-12 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<FaEnvelope />}
                  label="Email"
                  value={member.email}
                />
                <InfoItem
                  icon={<FaPhone />}
                  label="Phone"
                  value={member.phone}
                />
                <InfoItem
                  icon={<FaCalendarAlt />}
                  label="Date of Birth"
                  value={new Date(member.dateOfBirth).toLocaleDateString()}
                />
                <InfoItem
                  icon={<FaMapMarkerAlt />}
                  label="Address"
                  value={`${member.address}, ${member.pincode}`}
                />
                <InfoItem
                  icon={<FaGraduationCap />}
                  label="Qualifications"
                  value={member.qualifications}
                />
                <InfoItem
                  icon={<FaBuilding />}
                  label="Affiliation"
                  value={member.affiliation}
                />
                <InfoItem
                  icon={<FaUser />}
                  label="Membership Plan"
                  value={member.selectedPlan}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm"
  >
    <div className="text-[#154c8c] mr-4 text-xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </motion.div>
);

export default MemberDetails;

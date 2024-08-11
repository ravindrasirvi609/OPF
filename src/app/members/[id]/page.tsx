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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#80b142]"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#154c8c] mb-8">
          Member Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#154c8c] mb-8">Member Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0">
            {member.profilePictureUrl ? (
              <img
                src={member.profilePictureUrl}
                alt={member.fullName}
                className="w-48 h-48 rounded-full mx-auto"
              />
            ) : (
              <div className="w-48 h-48 bg-[#80b142] rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto">
                {member.fullName.charAt(0)}
              </div>
            )}
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold text-[#154c8c] mb-4">
              {member.fullName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                icon={<FaIdCard />}
                label="Membership ID"
                value={member.membershipId}
              />
              <InfoItem
                icon={<FaEnvelope />}
                label="Email"
                value={member.email}
              />
              <InfoItem icon={<FaPhone />} label="Phone" value={member.phone} />
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
  <div className="flex items-center">
    <div className="text-[#80b142] mr-2">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

export default MemberDetails;

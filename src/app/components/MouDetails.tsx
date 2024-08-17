import React from "react";
import {
  FaHandshake,
  FaCalendarAlt,
  FaFileSignature,
  FaUsers,
} from "react-icons/fa";

interface MouData {
  title: string;
  parties: string[];
  effectiveDate: string;
  duration: string;
  keyContacts: string[];
  objectives: string[];
  keyTerms: string;
}

interface MouDetailsProps {
  mou: MouData;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const MouDetails: React.FC<MouDetailsProps> = ({ mou }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {mou.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoCard
                icon={<FaHandshake />}
                title="Parties Involved"
                content={mou.parties.join(", ")}
              />
              <InfoCard
                icon={<FaCalendarAlt />}
                title="Effective Date"
                content={mou.effectiveDate}
              />
              <InfoCard
                icon={<FaFileSignature />}
                title="Duration"
                content={mou.duration}
              />
              <InfoCard
                icon={<FaUsers />}
                title="Key Contacts"
                content={mou.keyContacts.join(", ")}
              />
            </div>

            <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Objectives
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                {mou.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Terms
              </h2>
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-px rounded-xl">
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-700">{mou.keyTerms}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-2">
        <div className="text-blue-500 mr-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default MouDetails;

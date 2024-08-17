import React from "react";
import Link from "next/link";
import { conferences } from "../../../data";

const ImpactStories: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Impact Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conferences.map((conference) => (
            <Link href={`/impact-stories/${conference.id}`} key={conference.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {conference.heading}
                  </h3>
                  <p className="text-gray-600 mb-4">{conference.subHeading}</p>
                  <p className="text-sm text-gray-500">{conference.date}</p>
                </div>
                <div className="bg-[#154c8c] text-white py-2 px-4 text-center">
                  Learn More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;

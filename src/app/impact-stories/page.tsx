import React from "react";
import Link from "next/link";
import { conferences } from "../../../data";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const ImpactStories = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Impact Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {conferences.map((conference) => (
            <Link href={`/impact-stories/${conference.id}`} key={conference.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#154c8c] mb-3">
                    {conference.heading}
                  </h3>
                  <p className="text-gray-600 mb-4">{conference.subHeading}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaCalendarAlt className="mr-2 text-[#80b142]" />
                    <span>{conference.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-[#80b142] text-white py-2 px-4 rounded-full font-semibold flex items-center transition-colors duration-300 hover:bg-[#6b9436]">
                      Learn More
                      <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-[#154c8c]"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;

import React from "react";
import Link from "next/link";
import { conferences } from "../../../data";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaLightbulb,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import Image from "next/image";

interface Conference {
  id: number;
  heading: string;
  subHeading: string;
  title: string;
  collaborator: string;
  activity: string;
  date: string;
  description: string;
  objectives: string[];
  keyTakeaways: string[];
  imageUrl?: string;
  innovationCount?: number;
  impactedLives?: number;
  location?: string;
}

const ImpactStories: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our Impact Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our innovations are transforming lives and shaping the
            future of healthcare worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {conferences.map((conference: Conference) => (
            <Link href={`/impact-stories/${conference.id}`} key={conference.id}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative h-48 w-full">
                  <Image
                    src={conference.imageUrl || "/placeholder-image.jpg"}
                    alt={conference.heading}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm mb-2">
                      <FaCalendarAlt className="mr-2 text-[#64ffda]" />
                      <span>{conference.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{conference.heading}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{conference.subHeading}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {conference.innovationCount && (
                      <div className="flex items-center">
                        <FaLightbulb className="mr-2 text-[#80b142]" />
                        <span>{conference.innovationCount} Innovations</span>
                      </div>
                    )}
                    {conference.impactedLives && (
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-[#154c8c]" />
                        <span>{conference.impactedLives} Lives Impacted</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#154c8c] font-semibold hover:text-[#80b142] transition-colors duration-300">
                      Explore Story
                      <FaArrowRight className="ml-2" />
                    </div>
                    {conference.location && (
                      <div className="flex items-center">
                        <FaGlobe className="mr-2 text-[#80b142]" />
                        <span className="text-sm text-gray-500">
                          {conference.location}
                        </span>
                      </div>
                    )}
                  </div>
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

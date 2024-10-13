"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { conferences } from "./../../../../data";

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
}

const ConferenceComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [conference, setConference] = useState<Conference | null>(null);

  useEffect(() => {
    setConference(conferences[currentIndex]);
  }, [currentIndex]);

  const nextConference = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % conferences.length);
  };

  const prevConference = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + conferences.length) % conferences.length
    );
  };

  if (!conference) return null;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-[#154c8c] mb-8 text-center"
        >
          {conference.heading}
        </motion.h1>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          <div className="relative h-96">
            <Image
              src={conference.imageUrl || "/placeholder-image.jpg"}
              alt={conference.title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-4xl font-bold mb-2">{conference.title}</h2>
              <p className="text-xl">{conference.subHeading}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-600">
                <FaCalendar className="mr-2 text-[#80b142]" />
                <span>{conference.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-[#80b142]" />
                <span>{conference.collaborator}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaUsers className="mr-2 text-[#80b142]" />
                <span>{conference.activity}</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold text-[#154c8c] mb-4">
                Description
              </h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                {conference.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#154c8c] mb-4">
                    Objectives
                  </h3>
                  <ul className="space-y-2">
                    {conference.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700"
                      >
                        <span className="text-[#80b142] mr-2">•</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#154c8c] mb-4">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {conference.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700"
                      >
                        <span className="text-[#80b142] mr-2">•</span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="bg-gray-100 p-6 rounded-xl">
              <FaQuoteLeft className="text-4xl text-[#80b142] mb-4" />
              <p className="text-xl text-gray-700 italic">
                "This conference was a game-changer for our research. The
                insights gained and connections made will undoubtedly accelerate
                our progress in the field."
              </p>
              <p className="text-right text-gray-600 mt-2">
                - Dr. Jane Smith, Lead Researcher
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevConference}
            className="bg-[#154c8c] text-white px-6 py-3 rounded-full flex items-center hover:bg-[#0f3a6d] transition-colors duration-200 shadow-lg"
          >
            <FaChevronLeft className="mr-2" />
            Previous Story
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextConference}
            className="bg-[#154c8c] text-white px-6 py-3 rounded-full flex items-center hover:bg-[#0f3a6d] transition-colors duration-200 shadow-lg"
          >
            Next Story
            <FaChevronRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceComponent;

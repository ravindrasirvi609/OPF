"use client";
import React, { useState } from "react";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
}

const ConferenceComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const conference = conferences[currentIndex];

  const nextConference = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % conferences.length);
  };

  const prevConference = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + conferences.length) % conferences.length
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#154c8c] mb-8 text-center">
          {conference.heading}
        </h1>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="bg-[#154c8c] text-white p-6">
            <h2 className="text-2xl font-semibold mb-2">{conference.title}</h2>
            <p className="text-lg">{conference.subHeading}</p>
          </div>

          <div className="p-6">
            <div className="flex items-center text-gray-600 mb-4">
              <FaCalendar className="mr-2 text-[#80b142]" />
              <span>{conference.date}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-[#80b142]" />
              <span>{conference.collaborator}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <FaUsers className="mr-2 text-[#80b142]" />
              <span>{conference.activity}</span>
            </div>

            <h3 className="text-xl font-semibold text-[#154c8c] mb-3">
              Description
            </h3>
            <p className="text-gray-700 mb-6">{conference.description}</p>

            <h3 className="text-xl font-semibold text-[#154c8c] mb-3">
              Objectives
            </h3>
            <ul className="list-disc pl-6 mb-6">
              {conference.objectives.map(
                (
                  objective:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {objective}
                  </li>
                )
              )}
            </ul>

            <h3 className="text-xl font-semibold text-[#154c8c] mb-3">
              Key Takeaways
            </h3>
            <ul className="list-disc pl-6">
              {conference.keyTakeaways.map(
                (
                  takeaway:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {takeaway}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevConference}
            className="bg-[#80b142] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#6b9a36] transition-colors duration-200"
          >
            <FaChevronLeft className="mr-2" />
            Previous Conference
          </button>
          <button
            onClick={nextConference}
            className="bg-[#80b142] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#6b9a36] transition-colors duration-200"
          >
            Next Conference
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceComponent;

"use client";
import React from "react";

import {
  FaHandshake,
  FaUniversity,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";

const Collaborations = () => {
  return (
    <section className="h-screen bg-[#80b142] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-[#154c8c] text-4xl font-bold mb-4">
          Collaborations
        </h2>
        <p className="text-lg mb-8 text-[#154c8c]">
          Discover the powerful partnerships and synergies that drive innovation
          and progress in the pharmacy industry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="collaboration-item bg-white rounded-lg shadow-md p-6">
            <FaHandshake className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-[#154c8c] text-2xl font-bold mb-2">
              Industry Partnerships
            </h3>
            <p className="mb-4 text-[#154c8c]">
              Explore our strategic alliances with leading pharmaceutical
              companies, technology providers, and healthcare organizations.
            </p>
            <a href="#" className="text-[#154c8c] font-bold hover:underline">
              View MoUs
            </a>
          </div>
          <div className="collaboration-item bg-white rounded-lg shadow-md p-6">
            <FaUniversity className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-[#154c8c] text-2xl font-bold mb-2">
              Academic Collaborations
            </h3>
            <p className="mb-4 text-[#154c8c]">
              Learn about our partnerships with renowned universities and
              research institutions, fostering groundbreaking research and
              educational initiatives.
            </p>
            <a href="#" className="text-[#154c8c] font-bold hover:underline">
              View MoUs
            </a>
          </div>
          <div className="collaboration-item bg-white rounded-lg shadow-md p-6">
            <FaBuilding className="text-[#154c8c] text-4xl mb-4" />
            <h3 className="text-[#154c8c] text-2xl font-bold mb-2">
              Global Alliances
            </h3>
            <p className="mb-4 text-[#154c8c]">
              Discover our international collaborations with pharmacy
              organizations worldwide, promoting knowledge sharing and global
              advancement.
            </p>
            <a href="#" className="text-[#154c8c] font-bold hover:underline">
              View MoUs
            </a>
          </div>
        </div>
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <FaChartLine className="text-[#154c8c] text-4xl mb-4" />
          <h3 className="text-[#154c8c] text-2xl font-bold mb-2">
            Impact of Our Collaborations
          </h3>
          <p className="mb-4 text-[#154c8c]">
            Learn how our strategic partnerships have driven innovation,
            improved patient outcomes, and advanced the pharmacy profession
            globally.
          </p>
          <a href="#" className="text-[#154c8c] font-bold hover:underline">
            Explore the Impact
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;

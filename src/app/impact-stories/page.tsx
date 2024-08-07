"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Event type definition
type Event = {
  id: number;
  title: string;
  type: "Conference" | "Workshop" | "Seminar";
  date: string;
  location: string;
  description: string;
  attendees: number;
  isFeatured?: boolean;
  image: string;
};

// Sample event data
const eventsData: Event[] = [
  {
    id: 1,
    title: "International Pharmacy Innovation Conference",
    type: "Conference",
    date: "2024-09-15",
    location: "New York, USA",
    description:
      "Join leading pharmacy professionals and researchers for a three-day conference on the latest innovations in pharmaceutical science and practice.",
    attendees: 500,
    isFeatured: true,
    image:
      "https://www.obrf.org.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdyndwmvma%2Fimage%2Fupload%2Fv1716817250%2Fproduct-images%2F1B1A0954_xs8ngd.jpg&w=2048&q=75",
  },
  {
    id: 2,
    title: "Advanced Drug Delivery Systems Workshop",
    type: "Workshop",
    date: "2024-07-22",
    location: "London, UK",
    description:
      "An intensive two-day workshop exploring cutting-edge techniques in drug delivery, including nanotechnology applications.",
    attendees: 100,
    image: "/images/workshop.jpg",
  },
  {
    id: 3,
    title: "Genomic Medicine in Pharmacy Practice Seminar",
    type: "Seminar",
    date: "2024-08-10",
    location: "Tokyo, Japan",
    description:
      "A seminar focusing on the integration of genomic medicine into everyday pharmacy practice, featuring case studies and expert panels.",
    attendees: 250,
    image: "/images/seminar.jpg",
  },
  // Add more events as needed
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden ${
      event.isFeatured ? "border-2 border-[#80b142]" : ""
    }`}
  >
    <div className="relative h-48">
      <Image
        src={event.image}
        alt={event.title}
        layout="fill"
        objectFit="cover"
      />
      {event.isFeatured && (
        <div className="absolute top-2 left-2 bg-[#80b142] text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
          <FaStar className="mr-1" />
          Featured
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#154c8c] mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center text-gray-500 mb-2">
        <FaCalendar className="mr-2" />
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div className="flex items-center text-gray-500 mb-2">
        <FaMapMarkerAlt className="mr-2" />
        <span>{event.location}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <FaUsers className="mr-2" />
        <span>{event.attendees} expected attendees</span>
      </div>
    </div>
    <div className="bg-gray-50 px-6 py-4">
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          event.type === "Conference"
            ? "bg-blue-100 text-blue-800"
            : event.type === "Workshop"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {event.type}
      </span>
    </div>
  </div>
);

const EventsAndConferences: React.FC = () => {
  const [filter, setFilter] = useState<
    "All" | "Conference" | "Workshop" | "Seminar"
  >("All");
  const containerRef = useRef(null);

  const filteredEvents = eventsData.filter(
    (event) => filter === "All" || event.type === filter
  );

  useGSAP(() => {
    gsap.from(".event-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, [filter]);

  return (
    <div className="bg-gray-100 min-h-screen py-12" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#154c8c] mb-8 text-center">
          Conferences, Events, and Workshops
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#154c8c] mb-4">
            Filter by Type:
          </h2>
          <div className="flex flex-wrap gap-4">
            {["All", "Conference", "Workshop", "Seminar"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 rounded-full ${
                  filter === type
                    ? "bg-[#80b142] text-white"
                    : "bg-white text-[#154c8c] hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No events found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsAndConferences;

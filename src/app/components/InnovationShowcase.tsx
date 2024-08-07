"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    name: "IP Moment",
    type: "industrial",
    logo: "/logo/IPMoment.png",
  },
  {
    name: "Priyadarshini College of Pharmacy, Tumkur",
    type: "academic",
    logo: "/logo/Priyadarshini.png",
  },
  {
    name: "Dr. D. Y. Patil Institute of Pharmaceutical Sciences & Research, Pune",
    type: "academic",
    logo: "/logo/dypatil.png",
  },
  {
    name: "Singhad College of Pharmacy, Vadgaon, Pune",
    type: "academic",
    logo: "/logo/sinhgad.png",
  },
  {
    name: "Modern College of Pharmacy, Nigdi, Pune",
    type: "academic",
    logo: "/logo/mordern.png",
  },
  {
    name: "Abhinav Educational Society College of Pharmacy, Pune",
    type: "academic",
    logo: "/logo/Abhinav.png",
  },
  {
    name: "KGR Institute of Technology & Management, Hyderabad",
    type: "academic",
    logo: "/logo/KGR.png",
  },
  {
    name: "Sunrise College of Pharmacy, Udaipur",
    type: "academic",
    logo: "/logo/sunrise.png",
  },
  {
    name: "Department of Pharmaceutical Sciences, MLSU, Udaipur",
    type: "academic",
    logo: "/logo/Mohanlal.png",
  },
  {
    name: "Institute of Pharmacy, Nirma University, Ahmedabad",
    type: "academic",
    logo: "/logo/Nirma.jpg",
  },
  {
    name: "V. V. Institute of Pharmaceutical Sciences, Gudlavalleru",
    type: "academic",
    logo: "/logo/vv.png",
  },
  {
    name: "Nirmala College of Pharmacy, Mangalagiri",
    type: "academic",
    logo: "/logo/nirmala.png",
  },
  {
    name: "D. Y. Patil University - School of Pharmacy, Navi Mumbai",
    type: "academic",
    logo: "/logo/dypatilmumbai.png",
  },
  {
    name: "National Facility for Biopharmceuticals, Mumbai",
    type: "industrial",
    logo: "/logo/nfb.png",
  },
  {
    name: "School of Pharmacy, Sangam University, Bhilwara",
    type: "academic",
    logo: "/logo/sangam.png",
  },
  {
    name: "KVSR Siddhartha College of Pharmaceutical Sciences, Vijayawada",
    type: "academic",
    logo: "/logo/krvs.png",
  },
  {
    name: "Chebrolu Institute of Pharmaceutical Sciences, Guntur",
    type: "academic",
    logo: "/logo/chips.png",
  },
  {
    name: "Faculty of Pharmaceutical Sciences, Madhav University, Sirohi",
    type: "academic",
    logo: "/logo/madhav.png",
  },
  {
    name: "SHRI VISHNU COLLEGE OF PHARMACY",
    type: "academic",
    logo: "/logo/vipe.png",
  },

  {
    name: "Shree Dhanvantry College of Pharmacy, Surat",
    type: "academic",
    logo: "/logo/dhanvantary.png",
  },
  {
    name: "Shri D. D. Vispute College of Pharmacy & Research Center",
    type: "academic",
    logo: "/logo/vispute.png",
  },
  {
    name: "QIS College of Pharmacy",
    type: "academic",
    logo: "/logo/qis.png",
  },
  {
    name: "Cheran College of Pharmacy",
    type: "academic",
    logo: "/logo/cheran.png",
  },
  {
    name: "Saveetha College of Pharmacy",
    type: "academic",
    logo: "/logo/saveetha.png",
  },
  {
    name: "St. Joseph’s College of Pharmacy, Cherthala",
    type: "academic",
    logo: "/logo/joseph.png",
  },
];

export default function PartnersShowcase() {
  const showcaseRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-logo", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={showcaseRef}
      className="py-20 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#154c8c]">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-logo flex flex-col items-center justify-center"
            >
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full aspect-square flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-center text-gray-600">
                {partner.name}
              </p>
              <span
                className={`text-xs mt-1 ${
                  partner.type === "academic"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                {partner.type === "academic" ? "Academic" : "Industrial"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

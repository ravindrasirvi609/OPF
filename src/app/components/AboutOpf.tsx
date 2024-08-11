import Link from "next/link";
import React from "react";
import {
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";

const AboutOpf = () => {
  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-[#80b142]" />,
      title: "Continuous Learning",
      description:
        "Access cutting-edge educational resources, webinars, and industry reports to stay at the forefront of pharmacy practice.",
    },
    {
      icon: <FaHandshake className="text-4xl text-[#80b142]" />,
      title: "Networking Opportunities",
      description:
        "Connect with peers, industry leaders, and potential collaborators through our interactive community forum.",
    },
    {
      icon: <FaChartLine className="text-4xl text-[#80b142]" />,
      title: "Professional Growth",
      description:
        "Advance your career with insights on emerging trends, best practices, and innovative technologies in pharmacy.",
    },
    {
      icon: <FaGlobe className="text-4xl text-[#80b142]" />,
      title: "Global Advocacy",
      description:
        "Be part of a collective voice shaping the future of pharmacy at national and international levels.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#154c8c] mb-4">
            About Operant Pharmacy Federation (OPF)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering pharmacy professionals through innovation, education, and
            collaboration.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Operant Pharmacy Federation (OPF) is a pioneering platform
              that unites and empowers pharmacy professionals worldwide. Our
              mission is to drive innovation, foster collaboration, and elevate
              the standards of pharmacy practice globally.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At OPF, we believe in the power of community and continuous
              growth. Our platform serves as a dynamic hub where pharmacists,
              technicians, researchers, and industry leaders converge to share
              knowledge, discuss emerging trends, and shape the future of
              healthcare delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-gray-50 p-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#154c8c] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#154c8c] text-white p-8">
            <h3 className="text-2xl font-bold mb-4">
              Join the OPF Community Today
            </h3>
            <p className="mb-6">
              Whether you're a seasoned professional or just starting your
              pharmacy journey, OPF is your gateway to excellence in pharmacy
              practice. Join us in shaping a healthier future for all.
            </p>
            <Link href={"/membershipForm"}>
              <button className="bg-[#80b142] hover:bg-[#6c9638] text-white font-bold py-3 px-6 rounded-full transition duration-300">
                Become a Member
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOpf;

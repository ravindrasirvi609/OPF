"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md w-full px-8 py-12">
        <div className="flex items-center justify-center text-[#80b142] text-6xl mb-6">
          <FaCheckCircle />
        </div>
        <h2 className="text-3xl font-bold text-[#154c8c] mb-4 text-center">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Thank you for your payment. Your membership is now active.
        </p>
        <button
          onClick={handleBackToHome}
          className="w-full bg-[#154c8c] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#80b142] transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaGraduationCap,
  FaIndustry,
  FaGlobe,
  FaUser,
  FaUpload,
  FaCheckCircle,
  FaUserCircle,
  FaIdCard,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUniversity,
  FaAward,
  FaCreditCard,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import { useFirebaseStorage } from "../hooks/useFirebaseStorage";

const plans = [
  {
    id: "student",
    name: "Student Member",
    price: 1,
    icon: <FaGraduationCap className="text-3xl" />,
    description: "Perfect for students pursuing education",
    features: ["OPF Certificate", "Student Benefits", "Learning Resources"],
  },
  {
    id: "lifetime",
    name: "Patron Lifetime",
    price: 5000,
    icon: <FaUser className="text-3xl" />,
    description: "Lifetime membership with exclusive benefits",
    features: ["Lifetime Access", "VIP Benefits", "Priority Support"],
  },
  {
    id: "industry",
    name: "Patron Industry",
    price: 5900,
    icon: <FaIndustry className="text-3xl" />,
    description: "Industry-focused membership package",
    features: ["Industry Network", "Business Opportunities", "Expert Access"],
  },
  {
    id: "international",
    name: "Patron International",
    price: 9999,
    icon: <FaGlobe className="text-3xl" />,
    description: "Global membership with worldwide benefits",
    features: ["Global Network", "International Events", "Premium Support"],
  },
];

interface FormData {
  email: string;
  phone: string;
  fullName: string;
  aadharCard: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  affiliation: string;
  qualifications: string;
  selectedPlan: string;
  profilePicture: File | null;
}

interface Errors {
  [key: string]: string;
}

const MembershipForm: React.FC = () => {
  const router = useRouter();
  const {
    uploadFile,
    uploadProgress,
    isUploading,
    error: uploadError,
  } = useFirebaseStorage();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    fullName: "",
    aadharCard: "",
    dateOfBirth: "",
    address: "",
    pincode: "",
    affiliation: "",
    qualifications: "",
    selectedPlan: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMakingPayment, setIsMakingPayment] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    updateFormProgress();
  }, [formData]);

  const updateFormProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== "" && value !== null
    ).length;
    setFormProgress((filledFields / totalFields) * 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    validateField("profilePicture", file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    validateField("profilePicture", file);
  };

  const validateField = (name: string, value: any): boolean => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Invalid phone number (10 digits required)";
        }
        break;
      case "fullName":
        if (!value) {
          error = "Full name is required";
        }
        break;
      case "aadharCard":
        if (!value) {
          error = "Aadhar Card number is required";
        } else if (!/^\d{12}$/.test(value)) {
          error = "Invalid Aadhar Card number (12 digits required)";
        }
        break;
      case "dateOfBirth":
        if (!value) {
          error = "Date of birth is required";
        }
        break;
      case "address":
        if (!value) {
          error = "Address is required";
        }
        break;
      case "pincode":
        if (!value) {
          error = "Pincode is required";
        } else if (!/^\d{6}$/.test(value)) {
          error = "Invalid pincode (6 digits required)";
        }
        break;
      case "selectedPlan":
        if (!value) {
          error = "Please select a membership plan";
        }
        break;
      case "profilePicture":
        if (!value) {
          error = "Profile picture is required";
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key as keyof FormData])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      let profilePictureUrl = "";
      if (formData.profilePicture) {
        profilePictureUrl = await uploadFile(formData.profilePicture);
      }

      const formSubmitResponse = await axios.post("/api/form-submit", {
        ...formData,
        profilePictureUrl,
      });

      if (formSubmitResponse.data.success) {
        await makePayment();
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    try {
      setIsMakingPayment(true);
      const res = await initializeRazorpay();

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const selectedPlan = plans.find(
        (plan) => plan.id === formData.selectedPlan
      );
      const orderResponse = await axios.post("/api/razorpay-order", {
        amount: selectedPlan?.price || 0,
      });

      const options = {
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "OPF Membership",
        description: `${selectedPlan?.name} Membership`,
        order_id: orderResponse.data.id,
        handler: async (response: { razorpay_payment_id: string }) => {
          try {
            await axios.post("/api/save-transaction", {
              razorpayOrderId: orderResponse.data.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: "TODO_PLACEHOLDER", // Replace with actual signature
              amount: orderResponse.data.amount / 100,
              currency: orderResponse.data.currency,
              planName: selectedPlan?.name,
              customerName: formData.fullName,
              customerEmail: formData.email,
              customerPhone: formData.phone,
            });
            alert("Payment successful! Your membership is now active.");
            router.push("/membership-success");
          } catch (error) {
            console.error("Error saving transaction:", error);
            alert(
              "Payment successful, but there was an error saving your details. Please contact support."
            );
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsMakingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full mb-6 shadow-lg">
            <FaUserCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#154c8c] to-[#80b142] bg-clip-text text-transparent mb-4">
            OPF Membership Application
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the Organization of Pharmaceutical Formulations and become part
            of a community dedicated to pharmaceutical innovation and
            excellence.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Application Progress
            </h3>
            <span className="text-sm font-medium text-[#80b142]">
              {formProgress.toFixed(0)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#154c8c] to-[#80b142] h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Started</span>
            <span>In Progress</span>
            <span>Complete</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mr-4">
                <FaUpload className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Profile Picture
                </h3>
                <p className="text-gray-600">
                  Upload a professional photo for your membership
                </p>
              </div>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 group ${
                formData.profilePicture
                  ? "border-[#80b142] bg-gradient-to-br from-green-50 to-blue-50"
                  : "border-gray-300 hover:border-[#80b142] hover:bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.profilePicture ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <img
                      src={URL.createObjectURL(formData.profilePicture)}
                      alt="Profile Picture"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#80b142] rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {formData.profilePicture.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Click to change</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaUpload className="text-white text-3xl" />
                  </div>
                  <p className="text-lg font-medium mb-2">
                    Drag & Drop your photo here
                  </p>
                  <p className="text-center text-gray-400 mb-4">
                    or{" "}
                    <label className="text-[#80b142] underline cursor-pointer font-medium hover:text-[#154c8c] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      Browse Files
                    </label>
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports: JPG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              )}
            </div>

            {errors.profilePicture && (
              <p className="mt-4 text-red-500 text-sm flex items-center">
                <FaSpinner className="mr-2" />
                {errors.profilePicture}
              </p>
            )}

            {isUploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Uploading...
                  </span>
                  <span className="text-sm text-[#80b142]">
                    {uploadProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#154c8c] to-[#80b142] h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {uploadError && (
              <p className="mt-4 text-red-500 text-sm flex items-center">
                <FaSpinner className="mr-2" />
                {uploadError}
              </p>
            )}
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mr-4">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Personal Information
                </h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInputField
                label="Full Name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                icon={<FaUser className="text-gray-400" />}
                placeholder="Enter your full name"
              />
              <ModernInputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<FaEnvelope className="text-gray-400" />}
                placeholder="your.email@example.com"
              />
              <ModernInputField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={<FaPhone className="text-gray-400" />}
                placeholder="10-digit mobile number"
              />
              <ModernInputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                icon={<FaCalendarAlt className="text-gray-400" />}
              />
              <ModernInputField
                label="Aadhar Card Number"
                name="aadharCard"
                type="text"
                value={formData.aadharCard}
                onChange={handleChange}
                error={errors.aadharCard}
                icon={<FaIdCard className="text-gray-400" />}
                placeholder="12-digit Aadhar number"
              />
              <ModernInputField
                label="Pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
                icon={<FaMapMarkerAlt className="text-gray-400" />}
                placeholder="6-digit pincode"
              />
            </div>

            <div className="mt-6">
              <ModernInputField
                label="Address for Communication"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                icon={<FaMapMarkerAlt className="text-gray-400" />}
                placeholder="Enter your complete address"
                fullWidth
              />
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mr-4">
                <FaUniversity className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Professional Information
                </h3>
                <p className="text-gray-600">
                  Your academic and professional background
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInputField
                label="Affiliation"
                name="affiliation"
                type="text"
                value={formData.affiliation}
                onChange={handleChange}
                icon={<FaUniversity className="text-gray-400" />}
                placeholder="University/Company/Organization"
              />
              <ModernInputField
                label="Qualifications"
                name="qualifications"
                type="text"
                value={formData.qualifications}
                onChange={handleChange}
                icon={<FaAward className="text-gray-400" />}
                placeholder="Your degrees and certifications"
              />
            </div>
          </div>

          {/* Membership Plan Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mr-4">
                <FaCreditCard className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Choose Your Membership Plan
                </h3>
                <p className="text-gray-600">
                  Select the plan that best fits your needs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    formData.selectedPlan === plan.id
                      ? "transform scale-105"
                      : "hover:transform hover:scale-105"
                  }`}
                  onClick={() =>
                    handleChange({
                      target: { name: "selectedPlan", value: plan.id },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  <div
                    className={`relative h-full rounded-2xl p-6 transition-all duration-300 ${
                      formData.selectedPlan === plan.id
                        ? "bg-gradient-to-br from-[#154c8c] to-[#80b142] text-white shadow-2xl ring-4 ring-[#80b142] ring-opacity-30"
                        : "bg-white border-2 border-gray-200 hover:border-[#80b142] hover:shadow-xl"
                    }`}
                  >
                    {formData.selectedPlan === plan.id && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#80b142] rounded-full flex items-center justify-center shadow-lg">
                        <FaCheckCircle className="text-white text-sm" />
                      </div>
                    )}

                    <div
                      className={`flex items-center justify-center mb-4 ${
                        formData.selectedPlan === plan.id
                          ? "text-white"
                          : "text-[#154c8c]"
                      }`}
                    >
                      {plan.icon}
                    </div>

                    <h4
                      className={`text-lg font-bold text-center mb-2 ${
                        formData.selectedPlan === plan.id
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h4>

                    <p
                      className={`text-center mb-4 ${
                        formData.selectedPlan === plan.id
                          ? "text-white"
                          : "text-[#80b142]"
                      }`}
                    >
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      {plan.id === "student" && (
                        <span className="text-sm ml-1">/year</span>
                      )}
                      {plan.id === "lifetime" && (
                        <span className="text-sm ml-1">/once</span>
                      )}
                      {plan.id === "industry" && (
                        <span className="text-sm ml-1">/year</span>
                      )}
                      {plan.id === "international" && (
                        <span className="text-sm ml-1">/year</span>
                      )}
                    </p>

                    <p
                      className={`text-sm text-center mb-4 ${
                        formData.selectedPlan === plan.id
                          ? "text-white opacity-90"
                          : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <FaCheckCircle
                            className={`mr-2 flex-shrink-0 ${
                              formData.selectedPlan === plan.id
                                ? "text-white"
                                : "text-[#80b142]"
                            }`}
                          />
                          <span
                            className={
                              formData.selectedPlan === plan.id
                                ? "text-white"
                                : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {errors.selectedPlan && (
              <p className="mt-4 text-red-500 text-sm flex items-center">
                <FaSpinner className="mr-2" />
                {errors.selectedPlan}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-[#154c8c] to-[#80b142] text-white font-bold py-6 px-8 rounded-2xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              disabled={isSubmitting || isMakingPayment}
            >
              <div className="flex items-center justify-center">
                {isSubmitting || isMakingPayment ? (
                  <>
                    <FaSpinner className="animate-spin mr-3 text-xl" />
                    <span className="text-lg">
                      {isSubmitting
                        ? "Submitting Application..."
                        : "Processing Payment..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">
                      Submit Application & Proceed to Payment
                    </span>
                    <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              By submitting this form, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ModernInputFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
}

const ModernInputField: React.FC<ModernInputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  icon,
  placeholder,
  fullWidth = false,
}) => (
  <div className={fullWidth ? "col-span-full" : ""}>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-4 text-gray-900 bg-gray-50 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 ${
          icon ? "pl-12" : ""
        } ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-200 hover:border-[#80b142] focus:border-[#80b142] focus:ring-[#80b142]"
        }`}
      />
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-500 flex items-center">
        <FaSpinner className="mr-1" />
        {error}
      </p>
    )}
  </div>
);

export default MembershipForm;

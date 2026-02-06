"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

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
  const containerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const floatItemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    updateFormProgress();
  }, [formData]);

  // GSAP Animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    if (heroTitleRef.current) {
      const titleSplit = new SplitType(heroTitleRef.current, { types: "chars,words" });
      
      gsap.fromTo(
        titleSplit.chars,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.02, 
          duration: 1.2,
          ease: "expo.out",
          delay: 0.3
        }
      );

      return () => {
        titleSplit.revert();
      };
    }
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    // Hero subtitle animation
    if (heroSubtitleRef.current) {
      const subtitleSplit = new SplitType(heroSubtitleRef.current, { types: "lines" });
      
      gsap.fromTo(
        subtitleSplit.lines,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.8
        }
      );

      return () => {
        subtitleSplit.revert();
      };
    }
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    // Floating decorative elements
    floatItemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.set(item, { opacity: 0, y: 20 });
        gsap.to(item, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 1.2 + (i * 0.2),
          ease: "power2.out"
        });
        gsap.to(item, {
          y: i % 2 === 0 ? -15 : 15,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, { scope: containerRef, dependencies: [] });

  useGSAP(() => {
    // Form sections scroll animations
    gsap.fromTo(
      ".form-section",
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".form-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Progress bar animation
    gsap.fromTo(
      ".progress-section",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

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
              razorpaySignature: "TODO_PLACEHOLDER",
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
    <div ref={containerRef} className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#154c8c]/20 to-slate-900" />
        
        {/* Decorative Blur Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E91E63]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#80b142]/20 rounded-full blur-[120px]" />

        {/* Floating Decorative Cards */}
        <div
          ref={el => { floatItemsRef.current[0] = el }}
          className="absolute top-20 right-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hidden lg:block opacity-0"
        >
          <div className="text-3xl font-bold text-[#E91E63]">5000+</div>
          <div className="text-xs text-slate-300 uppercase tracking-widest font-bold">Members</div>
        </div>

        <div
          ref={el => { floatItemsRef.current[1] = el }}
          className="absolute bottom-32 left-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hidden lg:block opacity-0"
        >
          <div className="text-3xl font-bold text-[#80b142]">15+</div>
          <div className="text-xs text-slate-300 uppercase tracking-widest font-bold">Countries</div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="text-[#E91E63] text-sm font-bold tracking-wider uppercase">
              Join Our Community
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 tracking-tight"
          >
            OPF Membership <br />
            <span className="text-[#E91E63]">Application</span>
          </h1>

          <p
            ref={heroSubtitleRef}
            className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Join the Organization of Pharmaceutical Formulations and become part of a community dedicated to pharmaceutical innovation and excellence.
          </p>

          {/* Scroll Indicator */}
          <div className="animate-bounce mt-12">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 backdrop-blur-sm mx-auto">
              <div className="w-1 h-2 bg-[#E91E63] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 form-container">
          {/* Progress Bar */}
          <div className="progress-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Application Progress
              </h3>
              <span className="text-sm font-medium text-[#80b142]">
                {formProgress.toFixed(0)}% Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E91E63] via-[#154c8c] to-[#80b142] h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-[#E91E63]/50"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>Started</span>
              <span>In Progress</span>
              <span>Complete</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Section */}
            <div className="form-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E91E63] to-[#154c8c] rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <FaUpload className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Profile Picture
                  </h3>
                  <p className="text-slate-400">
                    Upload a professional photo for your membership
                  </p>
                </div>
              </div>

              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 group ${
                  formData.profilePicture
                    ? "border-[#80b142] bg-gradient-to-br from-[#80b142]/10 to-[#154c8c]/10"
                    : "border-white/20 hover:border-[#E91E63] hover:bg-white/5"
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
                        className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#80b142] rounded-full flex items-center justify-center shadow-lg">
                        <FaCheckCircle className="text-white text-sm" />
                      </div>
                    </div>
                    <p className="text-sm text-white font-medium">
                      {formData.profilePicture.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Click to change</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#E91E63] to-[#154c8c] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <FaUpload className="text-white text-3xl" />
                    </div>
                    <p className="text-lg font-medium mb-2 text-white">
                      Drag & Drop your photo here
                    </p>
                    <p className="text-center text-slate-400 mb-4">
                      or{" "}
                      <label className="text-[#E91E63] underline cursor-pointer font-medium hover:text-[#80b142] transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        Browse Files
                      </label>
                    </p>
                    <p className="text-sm text-slate-500">
                      Supports: JPG, PNG, GIF (Max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {errors.profilePicture && (
                <p className="mt-4 text-red-400 text-sm flex items-center">
                  <FaSpinner className="mr-2" />
                  {errors.profilePicture}
                </p>
              )}

              {isUploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">
                      Uploading...
                    </span>
                    <span className="text-sm text-[#80b142]">
                      {uploadProgress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#E91E63] to-[#80b142] h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="mt-4 text-red-400 text-sm flex items-center">
                  <FaSpinner className="mr-2" />
                  {uploadError}
                </p>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="form-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#154c8c] to-[#80b142] rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Personal Information
                  </h3>
                  <p className="text-slate-400">Tell us about yourself</p>
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
                  icon={<FaUser className="text-slate-400" />}
                  placeholder="Enter your full name"
                />
                <ModernInputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={<FaEnvelope className="text-slate-400" />}
                  placeholder="your.email@example.com"
                />
                <ModernInputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={<FaPhone className="text-slate-400" />}
                  placeholder="10-digit mobile number"
                />
                <ModernInputField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                  icon={<FaCalendarAlt className="text-slate-400" />}
                />
                <ModernInputField
                  label="Aadhar Card Number"
                  name="aadharCard"
                  type="text"
                  value={formData.aadharCard}
                  onChange={handleChange}
                  error={errors.aadharCard}
                  icon={<FaIdCard className="text-slate-400" />}
                  placeholder="12-digit Aadhar number"
                />
                <ModernInputField
                  label="Pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleChange}
                  error={errors.pincode}
                  icon={<FaMapMarkerAlt className="text-slate-400" />}
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
                  icon={<FaMapMarkerAlt className="text-slate-400" />}
                  placeholder="Enter your complete address"
                  fullWidth
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="form-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#80b142] to-[#E91E63] rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <FaUniversity className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Professional Information
                  </h3>
                  <p className="text-slate-400">
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
                  icon={<FaUniversity className="text-slate-400" />}
                  placeholder="University/Company/Organization"
                />
                <ModernInputField
                  label="Qualifications"
                  name="qualifications"
                  type="text"
                  value={formData.qualifications}
                  onChange={handleChange}
                  icon={<FaAward className="text-slate-400" />}
                  placeholder="Your degrees and certifications"
                />
              </div>
            </div>

            {/* Membership Plan Selection */}
            <div className="form-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E91E63] to-[#80b142] rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <FaCreditCard className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Choose Your Membership Plan
                  </h3>
                  <p className="text-slate-400">
                    Select the plan that best fits your needs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative group cursor-pointer transition-all duration-500 ${
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
                      className={`relative h-full rounded-2xl p-6 transition-all duration-500 ${
                        formData.selectedPlan === plan.id
                          ? "bg-gradient-to-br from-[#E91E63] to-[#154c8c] text-white shadow-2xl shadow-[#E91E63]/50 ring-4 ring-[#E91E63]/30"
                          : "bg-white/5 backdrop-blur-md border-2 border-white/10 hover:border-[#E91E63] hover:shadow-xl hover:shadow-[#E91E63]/20"
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
                            : "text-[#E91E63]"
                        }`}
                      >
                        {plan.icon}
                      </div>

                      <h4
                        className={`text-lg font-bold text-center mb-2 ${
                          formData.selectedPlan === plan.id
                            ? "text-white"
                            : "text-white"
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
                            ? "text-white/90"
                            : "text-slate-400"
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
                                  : "text-slate-300"
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
                <p className="mt-4 text-red-400 text-sm flex items-center">
                  <FaSpinner className="mr-2" />
                  {errors.selectedPlan}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-section bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 hover:bg-white/10 transition-all duration-500">
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-[#E91E63] via-[#154c8c] to-[#80b142] text-white font-bold py-6 px-8 rounded-2xl hover:shadow-2xl hover:shadow-[#E91E63]/50 transform hover:scale-[1.02] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden"
                disabled={isSubmitting || isMakingPayment}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#80b142] via-[#154c8c] to-[#E91E63] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center justify-center relative z-10">
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

              <p className="text-center text-slate-400 mt-4 text-sm">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>
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
      className="block text-sm font-semibold text-white mb-2"
    >
      {label}
    </label>
    <div className="relative group">
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
        className={`w-full px-4 py-4 text-white bg-white/5 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 backdrop-blur-sm ${
          icon ? "pl-12" : ""
        } ${
          error
            ? "border-red-400/50 focus:border-red-400 focus:ring-red-400"
            : "border-white/10 hover:border-[#E91E63]/50 focus:border-[#E91E63] focus:ring-[#E91E63] group-hover:bg-white/10"
        }`}
      />
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-400 flex items-center">
        <FaSpinner className="mr-1" />
        {error}
      </p>
    )}
  </div>
);

export default MembershipForm;

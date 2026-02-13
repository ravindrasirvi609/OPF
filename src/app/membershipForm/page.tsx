"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaGraduationCap,
  FaIndustry,
  FaGlobe,
  FaUser,
  FaUpload,
  FaCheckCircle,
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
  FaClock,
} from "react-icons/fa";
import { useFirebaseStorage } from "../hooks/useFirebaseStorage";

const plans = [
  {
    id: "student",
    name: "Student Member",
    price: 1,
    icon: <FaGraduationCap className="text-2xl" />,
    description: "Ideal for students building academic and research foundations.",
    features: ["OPF Certificate", "Learning Resources", "Student Member Benefits"],
  },
  {
    id: "lifetime",
    name: "Patron Lifetime",
    price: 5000,
    icon: <FaUser className="text-2xl" />,
    description: "One-time plan with long-term access to OPF opportunities.",
    features: ["Lifetime Access", "Priority Support", "VIP Program Invitations"],
  },
  {
    id: "industry",
    name: "Patron Industry",
    price: 5900,
    icon: <FaIndustry className="text-2xl" />,
    description: "Built for professionals in pharma industry and applied research roles.",
    features: ["Industry Network", "Business Exposure", "Expert Interactions"],
  },
  {
    id: "international",
    name: "Patron International",
    price: 9999,
    icon: <FaGlobe className="text-2xl" />,
    description: "Global plan for members seeking international collaboration pathways.",
    features: ["Global Network", "International Events", "Premium Assistance"],
  },
];

const journeySteps = [
  {
    title: "Fill Profile Details",
    text: "Complete personal, academic, and contact information carefully.",
  },
  {
    title: "Select Membership Plan",
    text: "Choose a plan aligned with your learning and career goals.",
  },
  {
    title: "Submit and Pay",
    text: "Securely complete payment using the integrated Razorpay gateway.",
  },
  {
    title: "Activation and Support",
    text: "Your membership is activated and OPF onboarding support begins.",
  },
];

const requiredItems = [
  "Recent profile picture (JPG/PNG)",
  "Valid email and mobile number",
  "Aadhar number and address details",
  "Academic affiliation and qualifications",
  "Preferred membership plan selection",
];

const quickFaq = [
  {
    q: "How long does activation take?",
    a: "Most memberships are processed shortly after successful payment and verification.",
  },
  {
    q: "Can I update profile details later?",
    a: "Yes, contact OPF support for profile corrections after submission.",
  },
  {
    q: "Do I receive payment confirmation?",
    a: "Yes, payment success redirects you to a confirmation screen.",
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
  const [profilePreviewUrl, setProfilePreviewUrl] = useState("");

  const updateFormProgress = useCallback(() => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(
      (value) => value !== "" && value !== null
    ).length;
    setFormProgress((filledFields / totalFields) * 100);
  }, [formData]);

  useEffect(() => {
    updateFormProgress();
  }, [updateFormProgress]);

  useEffect(() => {
    if (!formData.profilePicture) {
      setProfilePreviewUrl("");
      return;
    }

    const blobUrl = URL.createObjectURL(formData.profilePicture);
    setProfilePreviewUrl(blobUrl);

    return () => URL.revokeObjectURL(blobUrl);
  }, [formData.profilePicture]);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === formData.selectedPlan),
    [formData.selectedPlan]
  );

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
    const file = e.dataTransfer.files?.[0] || null;
    if (!file) return;
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
      default:
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

      const selected = plans.find((plan) => plan.id === formData.selectedPlan);
      const orderResponse = await axios.post("/api/razorpay-order", {
        amount: selected?.price || 0,
      });

      const options = {
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "OPF Membership",
        description: `${selected?.name} Membership`,
        order_id: orderResponse.data.id,
        handler: async (response: { razorpay_payment_id: string }) => {
          try {
            await axios.post("/api/save-transaction", {
              razorpayOrderId: orderResponse.data.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: "TODO_PLACEHOLDER",
              amount: orderResponse.data.amount / 100,
              currency: orderResponse.data.currency,
              planName: selected?.name,
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

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f5f9ff_0%,#ffffff_100%)]">
      <section className="relative isolate overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2200"
            alt="Pharmacy membership and professional collaboration"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#03162d]/90 via-[#0b3761]/78 to-[#0f172a]/72" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(16,149,193,0.25),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(235,106,42,0.2),transparent_38%)]" />

        <div className="section-shell">
          <span className="pill-tag border-white/30 bg-white/10 text-white">Membership Application</span>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-tight text-white md:text-6xl">
            Join OPF and Build a Stronger Pharmacy Career Path
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-100 md:text-lg">
            Complete your OPF membership profile to access research support, educational opportunities, conference programs, and expert-led professional guidance.
          </p>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <TopStat value="5000+" label="Members" />
            <TopStat value="15+" label="Countries" />
            <TopStat value="100+" label="Mentor Sessions" />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/80 py-8">
        <div className="section-shell grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {journeySteps.map((step, index) => (
            <article key={step.title} className="surface-card rounded-2xl p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0a4ea3]">Step {index + 1}</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="section-shell grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <div className="surface-card rounded-2xl border border-white/70 p-6 progress-section">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Application Progress</h3>
                <span className="text-sm font-semibold text-[#0a4ea3]">{formProgress.toFixed(0)}% Complete</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-[#0a4ea3] via-[#1095c1] to-[#eb6a2a] transition-all duration-500"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="surface-card form-section rounded-2xl border border-white/70 p-6">
                <div className="mb-5 flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <FaUpload />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">Profile Picture</h3>
                    <p className="text-sm text-slate-600">Upload a clear profile image for your membership identity.</p>
                  </div>
                </div>

                <div
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                    formData.profilePicture
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-300 bg-slate-50 hover:border-[#0a4ea3]"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {formData.profilePicture ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative mb-3">
                        {profilePreviewUrl ? (
                          <Image
                            src={profilePreviewUrl}
                            alt="Profile picture preview"
                            width={120}
                            height={120}
                            unoptimized
                            className="h-30 w-30 rounded-full border-4 border-white object-cover shadow-lg"
                          />
                        ) : (
                          <div className="h-30 w-30 rounded-full bg-slate-200" />
                        )}
                        <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <FaCheckCircle className="text-xs" />
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{formData.profilePicture.name}</p>
                      <p className="mt-1 text-xs text-slate-500">Use choose file below to replace this image.</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-base font-medium text-slate-800">Drag and drop image here</p>
                      <p className="mt-1 text-sm text-slate-600">or use the upload input below</p>
                    </>
                  )}

                  <label className="mt-5 inline-flex cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500">
                    Choose File
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                {errors.profilePicture && <ErrorText text={errors.profilePicture} />}

                {isUploading && (
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
                      <span>Uploading image...</span>
                      <span>{uploadProgress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#0a4ea3] to-[#1095c1]"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {uploadError && <ErrorText text={uploadError} />}
              </div>

              <div className="surface-card form-section rounded-2xl border border-white/70 p-6">
                <div className="mb-5 flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <FaUser />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">Personal Information</h3>
                    <p className="text-sm text-slate-600">Provide accurate contact and identity information.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

                <div className="mt-5">
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

              <div className="surface-card form-section rounded-2xl border border-white/70 p-6">
                <div className="mb-5 flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <FaUniversity />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">Academic and Professional Information</h3>
                    <p className="text-sm text-slate-600">Help us understand your current institution and qualifications.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <ModernInputField
                    label="Affiliation"
                    name="affiliation"
                    type="text"
                    value={formData.affiliation}
                    onChange={handleChange}
                    icon={<FaUniversity className="text-slate-400" />}
                    placeholder="University / Company / Institution"
                  />
                  <ModernInputField
                    label="Qualifications"
                    name="qualifications"
                    type="text"
                    value={formData.qualifications}
                    onChange={handleChange}
                    icon={<FaAward className="text-slate-400" />}
                    placeholder="Degrees and certifications"
                  />
                </div>
              </div>

              <div className="surface-card form-section rounded-2xl border border-white/70 p-6">
                <div className="mb-5 flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <FaCreditCard />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">Select Membership Plan</h3>
                    <p className="text-sm text-slate-600">Choose the OPF plan that best matches your profile and goals.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {plans.map((plan) => {
                    const isSelected = formData.selectedPlan === plan.id;
                    return (
                      <button
                        type="button"
                        key={plan.id}
                        onClick={() =>
                          handleChange({
                            target: { name: "selectedPlan", value: plan.id },
                          } as React.ChangeEvent<HTMLInputElement>)
                        }
                        className={`h-full rounded-2xl border p-4 text-left transition-all ${
                          isSelected
                            ? "border-[#0a4ea3] bg-[#0a4ea3] text-white shadow-lg"
                            : "border-slate-200 bg-white hover:border-slate-400"
                        }`}
                      >
                        <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${isSelected ? "bg-white/20" : "bg-slate-900 text-white"}`}>
                          {plan.icon}
                        </div>
                        <h4 className="text-lg font-semibold">{plan.name}</h4>
                        <p className={`mt-2 text-2xl font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                          Rs {plan.price}
                        </p>
                        <p className={`mt-2 text-sm ${isSelected ? "text-white/85" : "text-slate-600"}`}>{plan.description}</p>
                        <ul className="mt-3 space-y-1 text-xs">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex gap-2">
                              <FaCheckCircle className={`mt-0.5 flex-shrink-0 ${isSelected ? "text-white" : "text-[#0a4ea3]"}`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>

                {errors.selectedPlan && <ErrorText text={errors.selectedPlan} />}
              </div>

              <div className="surface-card form-section rounded-2xl border border-white/70 p-6">
                <button
                  type="submit"
                  className="group w-full rounded-2xl bg-gradient-to-r from-[#0a4ea3] via-[#1095c1] to-[#eb6a2a] px-6 py-4 text-base font-semibold text-white transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting || isMakingPayment}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting || isMakingPayment ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        {isSubmitting ? "Submitting Application..." : "Processing Payment..."}
                      </>
                    ) : (
                      <>
                        Submit Application and Proceed to Payment
                        <FaArrowRight className="transition group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  By submitting, you agree to OPF terms and payment processing guidelines.
                </p>
              </div>
            </form>
          </div>

          <aside className="space-y-6 xl:col-span-4 xl:sticky xl:top-28 self-start">
            <div className="surface-card rounded-2xl border border-white/70 p-6">
              <h3 className="text-xl font-semibold text-slate-900">Current Selection</h3>
              {selectedPlan ? (
                <>
                  <p className="mt-3 text-sm text-slate-600">You selected</p>
                  <p className="text-2xl font-semibold text-slate-900">{selectedPlan.name}</p>
                  <p className="mt-1 text-sm text-slate-600">Amount: Rs {selectedPlan.price}</p>
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-600">No plan selected yet.</p>
              )}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                <p className="flex items-center gap-2 font-medium text-slate-700">
                  <FaClock />
                  Average completion time: 5-8 minutes
                </p>
              </div>
            </div>

            <div className="surface-card rounded-2xl border border-white/70 p-6">
              <h3 className="text-xl font-semibold text-slate-900">Required Before Submission</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {requiredItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <FaCheckCircle className="mt-0.5 flex-shrink-0 text-[#0a4ea3]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl border border-white/70 p-6">
              <h3 className="text-xl font-semibold text-slate-900">Quick FAQs</h3>
              <div className="mt-4 space-y-4">
                {quickFaq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900">
                Need Help? Contact OPF
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="section-shell">
          <div className="surface-card rounded-[2rem] px-6 py-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Why Members Choose OPF</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              OPF membership helps students and professionals gain structured guidance, publication readiness, and collaboration opportunities in pharmacy and healthcare research domains.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/topics" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Explore Topic Hubs
              </Link>
              <Link href="/memberships" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900">
                Compare Membership Plans
              </Link>
              <Link href="/terms" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">
                Review Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
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
    <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-800">
      {label}
    </label>
    <div className="group relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
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
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-4 focus:ring-[#0a4ea3]/15 ${
          icon ? "pl-11" : ""
        } ${
          error
            ? "border-red-300 focus:border-red-400"
            : "border-slate-300 hover:border-slate-400 focus:border-[#0a4ea3]"
        }`}
      />
    </div>
    {error && <ErrorText text={error} />}
  </div>
);

function TopStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 backdrop-blur-lg">
      <p className="font-display text-3xl font-semibold text-white">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-100">{label}</p>
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="mt-3 flex items-center text-sm text-red-600">
      <FaSpinner className="mr-2" />
      {text}
    </p>
  );
}

export default MembershipForm;

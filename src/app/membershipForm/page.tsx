"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaGraduationCap, FaIndustry, FaGlobe, FaUser } from "react-icons/fa";
import { useFirebaseStorage } from "../hooks/useFirebaseStorage";

const plans = [
  {
    id: "student",
    name: "Student Member",
    price: 1,
    icon: <FaGraduationCap />,
  },
  { id: "lifetime", name: "Patron Lifetime", price: 5000, icon: <FaUser /> },
  {
    id: "industry",
    name: "Patron Industry",
    price: 5900,
    icon: <FaIndustry />,
  },
  {
    id: "international",
    name: "Patron International",
    price: 9999,
    icon: <FaGlobe />,
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
  const { uploadFile, uploadProgress, isUploading, error } =
    useFirebaseStorage();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setErrors((prev) => ({ ...prev, profilePicture: "" }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setErrors((prev) => ({ ...prev, profilePicture: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    // Validation logic
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

      // Call Form-Submit API
      const formSubmitResponse = await axios.post("/api/form-submit", {
        ...formData,
        profilePictureUrl,
      });
      console.log("formSubmitResponse", formSubmitResponse);

      if (formSubmitResponse.data.success) {
        // If form submission is successful, proceed with Razorpay
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
      // Call the /api/razorpay-order endpoint to get the order details
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl ">
      <h2 className="text-3xl font-bold text-center text-[#154c8c] mb-8">
        OPF Membership Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#80b142] mb-4">
            Profile Picture
          </h3>
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              formData.profilePicture
                ? "border-[#80b142] bg-[#e6f3d5]"
                : "border-gray-200 hover:border-[#80b142]"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {formData.profilePicture ? (
              <div className="flex items-center justify-center">
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile Picture"
                  className="max-h-48 rounded-lg"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center text-gray-500">
                <span>Drag and drop your profile picture here or</span>
                <label className="ml-2 text-[#80b142] underline cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  Browse
                </label>
              </div>
            )}
          </div>
          {errors.profilePicture && (
            <p className="mt-2 text-red-500">{errors.profilePicture}</p>
          )}
          {isUploading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div
                  className="bg-[#80b142] h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-500">Uploading profile picture...</p>
            </div>
          )}
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Aadhar Card Number"
            name="aadharCard"
            type="text"
            value={formData.aadharCard}
            onChange={handleChange}
            error={errors.aadharCard}
          />
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
          />
          <InputField
            label="Address for Communication"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <InputField
            label="Pincode"
            name="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            error={errors.pincode}
          />
          <InputField
            label="Affiliation"
            name="affiliation"
            type="text"
            value={formData.affiliation}
            onChange={handleChange}
          />
          <InputField
            label="Qualifications"
            name="qualifications"
            type="text"
            value={formData.qualifications}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#80b142] mb-4">
            Select Your Membership Plan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  formData.selectedPlan === plan.id
                    ? "border-[#80b142] bg-[#e6f3d5]"
                    : "border-gray-200 hover:border-[#80b142]"
                }`}
                onClick={() =>
                  handleChange({
                    target: { name: "selectedPlan", value: plan.id },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <div className="flex items-center justify-center text-3xl text-[#154c8c] mb-2">
                  {plan.icon}
                </div>
                <h4 className="text-lg font-semibold text-center">
                  {plan.name}
                </h4>
                <p className="text-2xl font-bold text-center text-[#80b142] mt-2">
                  ₹{plan.price}
                </p>
                <ul className="mt-2 text-sm text-gray-600">
                  <li>CERTIFICATE</li>
                  <li>MENTION ON PATRON PAGE</li>
                </ul>
              </div>
            ))}
          </div>
          {errors.selectedPlan && (
            <p className="text-red-500 mt-2">{errors.selectedPlan}</p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-[#154c8c] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#80b142] transition duration-300"
            disabled={isSubmitting || isMakingPayment}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application and Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full p-2 text-black bg-[#ecf5ff] rounded-md border-[#154c8c] shadow-sm focus:border-[#80b142] focus:ring focus:ring-[#80b142] focus:ring-opacity-50 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default MembershipForm;

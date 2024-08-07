"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaGraduationCap, FaIndustry, FaGlobe, FaUser } from "react-icons/fa";

const plans = [
  {
    id: "student",
    name: "Student Member",
    price: 2124,
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
}

interface Errors {
  [key: string]: string;
}

const MembershipForm: React.FC = () => {
  const router = useRouter();
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
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.aadharCard)
      newErrors.aadharCard = "Aadhar Card Number is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.selectedPlan) newErrors.selectedPlan = "Please select a plan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Call Form-Submit API
      const formSubmitResponse = await axios.post("/api/form-submit", formData);

      if (formSubmitResponse.data.success) {
        // If form submission is successful, proceed with Razorpay
        initializeRazorpay();
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const initializeRazorpay = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount:
        (plans.find((plan) => plan.id === formData.selectedPlan)?.price || 0) *
        100,
      currency: "INR",
      name: "OPF Membership",
      description: `${formData.selectedPlan} Membership`,
      handler: async (response: { razorpay_payment_id: string }) => {
        try {
          await axios.post("/api/save-transaction", {
            ...formData,
            paymentId: response.razorpay_payment_id,
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
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-[#154c8c] mb-8">
        OPF Membership Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          >
            Submit Application and Proceed to Payment
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
      className={`mt-1 block w-full p-2 bg-[#cde2fa] rounded-md border-[#154c8c] shadow-sm focus:border-[#80b142] focus:ring focus:ring-[#80b142] focus:ring-opacity-50 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default MembershipForm;

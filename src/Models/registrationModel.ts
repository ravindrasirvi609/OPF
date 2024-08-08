import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    aadharCard: {
      type: String,
      unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    affiliation: {
      type: String,
      trim: true,
    },
    qualifications: {
      type: String,
      trim: true,
    },
    selectedPlan: {
      type: String,
      enum: ["student", "lifetime", "industry", "international"],
    },
    paymentId: {
      type: String,
      trim: true,
    },
    membershipStatus: {
      type: String,
      enum: ["Pending", "Active", "Cancelled"],
      default: "Pending",
    },
    isValidMembership: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Membership =
  mongoose.models.Membership || mongoose.model("Membership", membershipSchema);

export default Membership;

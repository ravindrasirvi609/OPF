import { connect } from "@/dbConfig/dbConfig";
import Membership from "@/Models/registrationModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {
  try {
    const {
      email,
      phone,
      fullName,
      aadharCard,
      dateOfBirth,
      address,
      pincode,
      affiliation,
      qualifications,
      selectedPlan,
      profilePictureUrl,
    } = await request.json();

    const newMembership = new Membership({
      email,
      phone,
      fullName,
      aadharCard,
      dateOfBirth,
      address,
      pincode,
      affiliation,
      qualifications,
      selectedPlan,
      profilePictureUrl,
    });

    await newMembership.save();

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error submitting form" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Membership from "@/Models/registrationModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: Request) {
  try {
    const validMembers = await Membership.find(
      { isValidMembership: true },
      {
        fullName: 1,
        selectedPlan: 1,
        dateOfBirth: 1,
        affiliation: 1,
        membershipStatus: 1,
        profilePictureUrl: 1,
        rl: 1,
        membershipId: 1,
        isValidMembership: 1,
      }
    );

    return NextResponse.json(validMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching valid members:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching valid members" },
      { status: 500 }
    );
  }
}

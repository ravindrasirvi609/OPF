import { connect } from "@/dbConfig/dbConfig";
import Membership from "@/Models/registrationModel";
import { NextResponse } from "next/server";

connect();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const member = await Membership.findById(id, "-paymentId -aadharCard");

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, member }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching member details" },
      { status: 500 }
    );
  }
}

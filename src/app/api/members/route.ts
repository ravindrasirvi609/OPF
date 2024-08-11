import { connect } from "@/dbConfig/dbConfig";
import Membership from "@/Models/registrationModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const members = await Membership.find({}, "-paymentId -aadharCard");
    return NextResponse.json({ success: true, members }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching members" },
      { status: 500 }
    );
  }
}

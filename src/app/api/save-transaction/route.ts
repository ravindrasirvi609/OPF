import { connect } from "@/dbConfig/dbConfig";
import Membership from "@/Models/registrationModel";
import Transaction from "@/Models/TransactionModel";
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      currency,
      planName,
      customerName,
      customerEmail,
      customerPhone,
    } = await request.json();

    // Create a new Transaction document
    const transaction = await Transaction.create({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      amount,
      currency,
      status: "completed",
      planName,
      customerName,
      customerEmail,
      customerPhone,
    });

    // Find the membership and update the status
    const membership = await Membership.findOne({ email: customerEmail });
    if (membership) {
      membership.membershipStatus = "Active";
      membership.isValidMembership = true;
      await membership.save();
    } else {
      // Create a new Membership document
      await Membership.create({
        email: customerEmail,
        phone: customerPhone,
        fullName: customerName,
        selectedPlan: planName,
        paymentId: razorpayPaymentId,
        membershipStatus: "Active",
        isValidMembership: true,
      });
    }

    return NextResponse.json(
      { success: true, message: "Transaction saved" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error saving transaction" },
      { status: 500 }
    );
  }
}

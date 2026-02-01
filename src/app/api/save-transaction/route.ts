import { sendEmail } from "@/app/lib/mailer";
import { connect } from "@/dbConfig/dbConfig";
import Membership from "@/Models/registrationModel";
import Transaction from "@/Models/TransactionModel";
import { NextResponse } from "next/server";

connect();

async function generateMembershipId(year: number) {
  const latestMembership = await Membership.findOne(
    { membershipId: { $exists: true, $ne: "" } },
    {},
    { sort: { createdAt: -1 } }
  );
  const currentYear = new Date().getFullYear();
  let nextId = 1;

  if (latestMembership && latestMembership.membershipId) {
    const lastId = parseInt(latestMembership.membershipId.slice(5), 10);
    nextId = lastId + 1;
  }

  const yearPrefix = currentYear.toString().slice(2);
  return `OPF${yearPrefix}${nextId.toString().padStart(3, "0")}`;
}

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

    await transaction.save();

    // Find the membership and update the status
    const membership = await Membership.findOne({ email: customerEmail });
    if (membership) {
      membership.membershipStatus = "Active";
      membership.isValidMembership = true;
      membership.membershipId = await generateMembershipId(
        new Date().getFullYear()
      );
      await membership.save();
    } else {
      // Create a new Membership document
      const newMembershipId = await generateMembershipId(
        new Date().getFullYear()
      );
      await Membership.create({
        email: customerEmail,
        phone: customerPhone,
        fullName: customerName,
        selectedPlan: planName,
        paymentId: razorpayPaymentId,
        membershipStatus: "Active",
        isValidMembership: true,
        membershipId: newMembershipId,
      });
    }

    await sendEmail({
      _id: membership?._id,
      emailType: "MEMBERSHIP_ACTIVE",
    });

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

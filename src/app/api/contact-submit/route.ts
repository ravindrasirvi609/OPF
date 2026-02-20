import { NextRequest, NextResponse } from "next/server";

type TurnstileVerificationResult = {
  success: boolean;
  "error-codes"?: string[];
};

const escapeHtml = (unsafe: string) =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const verifyTurnstileToken = async (token: string, remoteIp?: string) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing TURNSTILE_SECRET_KEY environment variable.");
  }

  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Unable to verify captcha challenge.");
  }

  return (await response.json()) as TurnstileVerificationResult;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, turnstileToken } = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
      turnstileToken?: string;
    };

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ message: "Captcha verification is required." }, { status: 400 });
    }

    const remoteIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const verification = await verifyTurnstileToken(turnstileToken, remoteIp);

    if (!verification.success) {
      return NextResponse.json(
        { message: "Captcha validation failed. Please try again.", errors: verification["error-codes"] ?? [] },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable.");
    }

    const contactReceiverEmail = process.env.CONTACT_FORM_TO_EMAIL || "help@opf.org.in";
    const contactSenderEmail = process.env.CONTACT_FORM_FROM_EMAIL || "opf@pharmanecia.org";

    const emailContent = `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: contactSenderEmail,
        to: contactReceiverEmail,
        reply_to: email,
        subject: `[OPF Contact] ${subject}`,
        html: emailContent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to deliver message. Email provider response: ${response.status}`);
    }

    return NextResponse.json({ success: true, message: "Contact inquiry submitted successfully." });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to submit contact inquiry.",
      },
      { status: 500 }
    );
  }
}

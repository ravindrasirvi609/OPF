import { render } from "@react-email/render";
import { Text, Link, Heading, Button } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";
import registrationModel from "@/Models/registrationModel";

type EmailType = "MEMBERSHIP_ACTIVE" | "MEMBERSHIP_RENEWAL";

interface SendEmailParams {
  _id: string;
  emailType: EmailType;
}

export const sendEmail = async ({
  _id,
  emailType,
}: SendEmailParams): Promise<any> => {
  try {
    if (!["MEMBERSHIP_ACTIVE", "MEMBERSHIP_RENEWAL"].includes(emailType)) {
      throw new Error(
        "Invalid emailType. It should be either 'MEMBERSHIP_ACTIVE' or 'MEMBERSHIP_RENEWAL'."
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing Resend API key. Set the RESEND_API_KEY environment variable."
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    let membership;
    let EMAIL: string;

    if (emailType === "MEMBERSHIP_ACTIVE") {
      membership = await registrationModel.findOne({ _id });
      if (!membership) {
        throw new Error(`No membership found for id ${_id}`);
      }
      EMAIL = membership.email;
    } else {
      membership = await registrationModel.findOne({ _id });
      if (!membership) {
        throw new Error(`No membership found for id ${_id}`);
      }
      EMAIL = membership.email;
    }

    let content: React.ReactNode;
    let subject: string = "";
    let buttonText: string = "";
    let buttonUrl: string = "";
    if (emailType === "MEMBERSHIP_ACTIVE") {
      content = (
        <>
          <Heading>Congratulations, you are now an active OPF member!</Heading>
          <Text>Dear {membership.fullName},</Text>
          <Text>
            We are pleased to inform you that your OPF membership is now active.
          </Text>
          <Text>Your membership details:</Text>
          <ul>
            <li>
              Membership ID: <strong>{membership.membershipId}</strong>
            </li>
            <li>
              Membership Plan: <strong>{membership.selectedPlan}</strong>
            </li>
            <li>
              Membership Status: <strong>Active</strong>
            </li>
            <li>
              Membership Start Date:{" "}
              <strong>{membership.createdAt.toLocaleDateString()}</strong>
            </li>
          </ul>
          <Text>
            As an active OPF member, you can now enjoy the benefits and
            privileges that come with your membership. We look forward to your
            continued involvement and support in our endeavors.
          </Text>
          <Text>
            If you have any questions or need further assistance, please don't
            hesitate to contact us at{" "}
            <Link href="mailto:opf@pharmanecia.org">opf@pharmanecia.org</Link>.
          </Text>
          <Text>
            Thank you for being a part of the Operant Pharmacy Federation (OPF).
          </Text>
          <a href={`${baseUrl}/members/${membership._id}`}>
            View Member Dashboard
          </a>
        </>
      );
      subject = `Welcome to OPF! Your Membership is Now Active`;
      buttonText = "View Member Dashboard";
      buttonUrl = `${baseUrl}/member-dashboard`;
    } else if (emailType === "MEMBERSHIP_RENEWAL") {
      content = (
        <>
          <Heading>Time to Renew Your OPF Membership</Heading>
          <Text>Dear {membership.fullName},</Text>
          <Text>
            We hope this email finds you well. This is a friendly reminder that
            your OPF membership is due for renewal.
          </Text>
          <Text>Your membership details:</Text>
          <ul>
            <li>
              Membership ID: <strong>{membership.membershipId}</strong>
            </li>
            <li>
              Membership Plan: <strong>{membership.selectedPlan}</strong>
            </li>
            <li>
              Membership Expiration Date:{" "}
              <strong>{membership.expirationDate.toLocaleDateString()}</strong>
            </li>
          </ul>
          <Text>
            To ensure that you continue to enjoy the benefits of being an OPF
            member, we kindly request you to renew your membership at your
            earliest convenience.
          </Text>
          <Text>
            Renewing your membership is quick and easy. Simply visit the member
            dashboard and follow the prompts to complete the renewal process.
          </Text>
          <Button href={`${baseUrl}/membershipForm`}>Renew Membership</Button>
          <Text>
            We value your continued support and participation in the Operant
            Pharmacy Federation. If you have any questions or need assistance,
            please don't hesitate to contact us at{" "}
            <Link href="mailto:opf@pharmanecia.org">opf@pharmanecia.org</Link>.
          </Text>
          <Text>Thank you for being a part of the OPF community.</Text>
        </>
      );
      subject = `Time to Renew Your OPF Membership`;
      buttonText = "Renew Membership";
      buttonUrl = `${baseUrl}/membershipForm`;
    }

    const emailHtml = render(
      <EmailTemplate
        content={content}
        subject={subject}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />
    );

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "opf@pharmanecia.org",
        to: EMAIL,
        subject: subject,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending email: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

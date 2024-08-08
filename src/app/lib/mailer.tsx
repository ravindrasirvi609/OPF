import { render } from "@react-email/render";
import { Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";
import AbstractModel from "@/Model/AbstractModel";
import RegistrationModel from "@/Model/RegistrationModel";

type EmailType = "SUBMITTED" | "UPDATE_STATUS" | "REGISTRATION_SUCCESS";

interface SendEmailParams {
  _id: string;
  emailType: EmailType;
}

export const sendEmail = async ({
  _id,
  emailType,
}: SendEmailParams): Promise<any> => {
  try {
    if (
      !["SUBMITTED", "UPDATE_STATUS", "REGISTRATION_SUCCESS"].includes(
        emailType
      )
    ) {
      throw new Error(
        "Invalid emailType. It should be either 'SUBMITTED', 'UPDATE_STATUS', or 'REGISTRATION_SUCCESS'."
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Missing Resend API key. Set the RESEND_API_KEY environment variable."
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    let abstract;
    let registration;
    let submissionDetailsUrl: string;
    let EMAIL: string;

    if (emailType === "REGISTRATION_SUCCESS") {
      registration = await RegistrationModel.findOne({ _id });
      if (!registration) {
        throw new Error(`No registration found for id ${_id}`);
      }
      submissionDetailsUrl = `${baseUrl}/abstractForm/${registration._id}`;
      EMAIL = registration.email;
    } else {
      abstract = await AbstractModel.findOne({ _id });
      if (!abstract) {
        throw new Error(`No abstract found for id ${_id}`);
      }
      submissionDetailsUrl = `${baseUrl}/abstractForm/${abstract._id}`;
      EMAIL = abstract.email;
    }

    let content: React.ReactNode;
    let subject: string = "";
    let buttonText: string = "";
    let buttonUrl: string = "";
    if (emailType === "SUBMITTED") {
      content = (
        <>
          <Text>Thank you for your submission!</Text>
          <Text>
            Your abstract has been successfully submitted. Your temporary
            abstract code is: <strong>{abstract.temporyAbstractCode}</strong>
          </Text>
          <Text>
            If you need to make any changes or have any questions, please
            don&apos;t hesitate to contact us.
          </Text>
        </>
      );
      subject = `Abstract Submission Confirmation - ${abstract.temporyAbstractCode}`;
      buttonText = "View Submission Details";
      buttonUrl = submissionDetailsUrl;
    } else if (emailType === "UPDATE_STATUS") {
      let statusSpecificContent: React.ReactNode = null;
      let codeToShow = abstract.temporyAbstractCode;
      let statusForSubject = abstract.Status;

      if (abstract.Status === "Accepted") {
        codeToShow = abstract.AbstractCode;
        statusSpecificContent = (
          <>
            <Text>Congratulations! Your abstract has been accepted.</Text>
            <Text>
              Your official abstract code is:{" "}
              <strong>{abstract.AbstractCode}</strong>
            </Text>
          </>
        );
      } else if (abstract.Status === "Rejected" && abstract.rejectionComment) {
        statusSpecificContent = (
          <>
            <Text>
              We regret to inform you that your abstract has not been accepted.
            </Text>
            <Text>Reason for rejection: {abstract.rejectionComment}</Text>
          </>
        );
      }

      content = (
        <>
          <Text>
            There has been an update to your abstract submission (Code:{" "}
            <strong>{codeToShow}</strong>).
          </Text>
          <Text>
            Current Status: <strong>{abstract.Status}</strong>
          </Text>
          {statusSpecificContent}
          <Text>
            If you have any questions about this update, please contact our
            support team.
          </Text>
        </>
      );
      subject = `Abstract ${statusForSubject} - ${codeToShow}`;
      buttonText = "View Submission Details";
      buttonUrl = submissionDetailsUrl;
    } else if (emailType === "REGISTRATION_SUCCESS") {
      content = (
        <>
          <Text>Dear {registration.name},</Text>
          <Text>
            We are pleased to inform you that your registration for the
            conference has been successfully completed.
          </Text>
          <Text>Your registration details:</Text>
          <ul>
            <li>
              Registration Code:{" "}
              <strong>{registration.registrationCode}</strong>
            </li>
            <li>
              Registration Type:{" "}
              <strong>{registration.registrationType}</strong>
            </li>
            <li>
              Payment Status: <strong>Completed</strong>
            </li>
          </ul>
          <Text>
            If you have any questions or need further assistance, please
            don&apos;t hesitate to contact us.
          </Text>
          <Text>We look forward to seeing you at the conference!</Text>
        </>
      );
      subject = `Registration Successful - ${registration.registrationCode}`;
      buttonText = "View Registration Details";
      buttonUrl = submissionDetailsUrl;
    }

    const emailHtml = render(
      <EmailTemplate
        content={content}
        subject={subject}
        qrCodeUrl={abstract?.qrCodeUrl || registration?.qrCodeUrl}
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
        from: "psc@pharmanecia.org",
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
      `Failed to send email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

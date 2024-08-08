import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  content: React.ReactNode;
  subject: string;
  buttonText: string;
  buttonUrl: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  content,
  subject,
  buttonText,
  buttonUrl,
}) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Tailwind>
      <Body className="bg-gray-100 font-sans">
        <Container className="bg-white mx-auto p-4 my-8 rounded-lg shadow-lg">
          <Img
            src="https://your-logo-url.com/logo.png"
            width="170"
            height="50"
            alt="Pharmanecia"
            className="mx-auto"
          />
          <Heading className="text-3xl font-bold text-center text-[#154c8c] my-4">
            {subject}
          </Heading>
          <Section className="px-4">{content}</Section>
          <Button
            className="bg-[#80b142] py-2 rounded text-white font-bold no-underline text-center block w-full"
            href={buttonUrl}
          >
            {buttonText}
          </Button>
          <Hr className="border-gray-300 my-4" />
          <Text className="text-center text-gray-500 text-xs">
            © 2024 Operant Pharmacy Federation. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailTemplate;

import React from "react";
import MouDetails from "@/app/components/MouDetails";

interface MouData {
  title: string;
  parties: string[];
  effectiveDate: string;
  duration: string;
  keyContacts: string[];
  objectives: string[];
  keyTerms: string;
}

const mouData: MouData = {
  title: "Memorandum of Understanding between Company A and Company B",
  parties: ["Company A", "Company B"],
  effectiveDate: "January 1, 2024",
  duration: "2 years",
  keyContacts: ["John Doe (Company A)", "Jane Smith (Company B)"],
  objectives: [
    "Collaborate on Project X",
    "Share resources and expertise",
    "Explore potential joint ventures",
  ],
  keyTerms:
    "This MoU is non-binding and serves as a statement of intent for future collaboration. Both parties agree to maintain confidentiality regarding shared information.",
};

const CollaborationDetails: React.FC = () => {
  return (
    <div className="App">
      <MouDetails mou={mouData} />
    </div>
  );
};

export default CollaborationDetails;

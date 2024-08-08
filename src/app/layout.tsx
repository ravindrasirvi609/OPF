import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Operant Pharmacy Federation - Advancing Pharmacy Through Innovation",
  description:
    "Discover groundbreaking pharmaceutical research and innovations at Operant Pharmacy Federation. Join us in shaping the future of pharmacy.",
  openGraph: {
    title: "Operant Pharmacy Federation",
    description: "Advancing Pharmacy Through Innovation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operant Pharmacy Federation",
    description: "Advancing Pharmacy Through Innovation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        <main className="pt-16 sm:pt-20 bg-gradient-to-r from-[#80b142] to-[#154c8c]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

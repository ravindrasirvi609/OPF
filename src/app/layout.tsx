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
    images: [
      {
        url: "/opf-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Operant Pharmacy Federation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operant Pharmacy Federation",
    description: "Advancing Pharmacy Through Innovation",
    images: ["/opf-twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.className} flex flex-col min-h-screen bg-white`}
      >
        <Header />
        <main className="flex-grow pt-16 sm:pt-20">
          <div className="bg-gradient-to-r from-[#80b142] to-[#154c8c] py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

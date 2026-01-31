import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

const outfit = Outfit({ subsets: ["latin"] });

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
        className={`${outfit.className} flex flex-col min-h-screen bg-white text-slate-900`}
      >
        <SmoothScroll>
          <Header />
          <main className="flex-grow pt-14 sm:pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

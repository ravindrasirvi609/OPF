import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Breadcrumbs from "./components/Breadcrumbs";
import SchemaInjector from "./components/SchemaInjector";
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "./lib/seo";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Pharmacy Research and Innovation`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Operant Pharmacy Federation (OPF) supports pharmacy education, pharmaceutical research, conferences, and innovation programs for professionals and students.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  category: "healthcare",
  generator: "Next.js",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} | Pharmacy Research and Innovation`,
    description:
      "Advance your pharmacy career with OPF through memberships, conferences, global collaborations, and research opportunities.",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: absoluteUrl("/opflogo.png"),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} preview image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Pharmacy Research and Innovation`,
    description:
      "Advance your pharmacy career with OPF through memberships, conferences, global collaborations, and research opportunities.",
    images: [absoluteUrl("/opflogo.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className={`${outfit.className} flex min-h-screen flex-col bg-white text-slate-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <SchemaInjector />
        <SmoothScroll>
          <header>
            <Header />
          </header>
          <Breadcrumbs />
          <main className="flex-grow pt-14 sm:pt-20">{children}</main>
          <footer>
            <Footer />
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}

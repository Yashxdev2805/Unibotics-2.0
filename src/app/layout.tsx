import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AtmosphereLayer from "@/components/AtmosphereLayer";
import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unibotics.in";

export const metadata: Metadata = {
  title: "Atal Tinkering Lab Setup & STEM Workshops | Unibotics",
  description:
    "ATL lab setup support, teacher training and 2, 5 or 7-day robotics workshops for schools, ITIs and colleges in Haryana and across India.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Atal Tinkering Lab Setup & STEM Workshops | Unibotics",
    description:
      "ATL lab setup support, teacher training and 2, 5 or 7-day robotics workshops for schools, ITIs and colleges in Haryana and across India.",
    url: siteUrl,
    siteName: "Unibotics",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atal Tinkering Lab Setup & STEM Workshops | Unibotics",
    description:
      "ATL lab setup support, teacher training and 2, 5 or 7-day robotics workshops for schools, ITIs and colleges in Haryana and across India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Organization structured data (Audit point 5 & 8)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Unibotics",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      "Atal Tinkering Lab setup, teacher training and hands-on robotics workshops for schools, ITIs and colleges.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kurukshetra",
      addressLocality: "Kurukshetra",
      addressRegion: "Haryana",
      postalCode: "136118",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical support & institutional proposals",
      email: "directorunibotics@gmail.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col font-sans text-[#F8FAFC] antialiased selection:bg-[#F97316]/30 selection:text-white relative"
        style={{ background: "#08090C" }}
      >
        <AtmosphereLayer />

        {/* Skip to Content Link (WCAG 2.1 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-[#212530] focus:text-[#F97316] focus:border focus:border-[#F97316] focus:shadow-glow focus:rounded-md text-sm font-semibold"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 flex flex-col focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

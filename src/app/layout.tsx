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

export const metadata: Metadata = {
  title: "Unibotics | Turnkey Atal Tinkering Labs & Institutional STEM Workshops",
  description:
    "Comprehensive ATL lab setups, NSDC-aligned vocational training, and hands-on robotics workshops for schools, ITIs, and engineering institutes across India.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://unibotics.in"),
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable} dark`}>
      <body className="min-h-screen flex flex-col font-sans bg-black text-[#F7F7F8] antialiased selection:bg-[#9312FF]/30 selection:text-white relative">
        <AtmosphereLayer />

        {/* Skip to Content Link (WCAG 2.1 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-[#17132A] focus:text-white focus:border focus:border-[#9312FF] focus:shadow-glow focus:rounded-md text-xs font-semibold"
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

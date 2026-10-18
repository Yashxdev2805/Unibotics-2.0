import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-surface text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Cpu } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home",      href: "/" },
    { label: "ATL Setup", href: "/atl-setup" },
    { label: "Workshops", href: "/workshops" },
    { label: "Services",  href: "/services" },
    { label: "About",     href: "/about" },
    { label: "Team",      href: "/team" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[#2F3545] transition-colors duration-200"
      style={{ background: "rgba(8, 9, 12, 0.92)", backdropFilter: "blur(16px)" }}
    >
      {/* Main Navigation Bar */}
      <div className="max-w-stage mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#F97316] rounded-lg p-1 group"
          aria-label="Unibotics Home"
        >
          <Image
            src="/unibotics-logo.png"
            alt="Unibotics Logo"
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain rounded-md drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight leading-none">
              <span className="text-[#F97316]">Uni</span>
              <span className="text-[#38BDF8]">botics</span>
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase mt-1 text-[#94A3B8] font-mono">
              Unified Intelligence &bull; Infinite Solution
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center space-x-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  active
                    ? "text-[#F97316] bg-[#212530] border border-[#2F3545]"
                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161920]"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #F97316, #FB923C)",
                      boxShadow: "0 0 8px #F97316",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            Portal Login
          </Link>
          <Link
            href="/contact"
            className="btn-primary-cyan px-5 py-2.5 rounded-full text-sm font-bold tracking-wide flex items-center space-x-2 shadow-glow"
          >
            <span>Request Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#161920] border border-transparent hover:border-[#2F3545] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2F3545] bg-[#08090C] px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive(link.href)
                    ? "bg-[#212530] text-[#F97316] border border-[#2F3545]"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#161920]"
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#2F3545] space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 px-4 text-center rounded-lg text-sm font-semibold text-[#94A3B8] hover:text-white bg-[#161920] border border-[#2F3545]"
            >
              Institutional Portal Login
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary-cyan block w-full py-3 px-4 text-center rounded-lg text-sm font-bold shadow-glow"
            >
              Request Institutional Proposal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

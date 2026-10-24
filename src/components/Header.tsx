"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Zap } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on Escape key
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Workshops", href: "/workshops" },
    { label: "Team", href: "/team" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-[#2A2342] transition-colors duration-200">
      {/* Top Notice / Telemetry Strip */}
      <div className="bg-[#0D0B14] text-[#8B8988] text-[11px] py-1 px-4 font-mono tracking-wide border-b border-[#2A2342]/70">
        <div className="max-w-stage mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#45B558] animate-pulse"></span>
            <span className="text-[#F7F7F8]">NATIONAL STEM & ATL IMPLEMENTATION PARTNER</span>
            <span className="hidden sm:inline text-[#7468A0]">•</span>
            <span className="hidden sm:inline text-xs">KURUKSHETRA, HARYANA</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link
              href="/verify"
              className="text-[#8B8988] hover:text-[#C9A3FF] transition-colors"
            >
              Verify Certificate
            </Link>
            <span className="text-[#2A2342]">|</span>
            <span className="text-[10px] text-[#7468A0]">NEP 2020 & ATL COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-stage mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo (Left) */}
        <Link
          href="/"
          className="flex items-center space-x-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A020FF] to-[#7A1CF8] flex items-center justify-center text-white shadow-[0_0_14px_rgba(160,32,255,0.6)] group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-[#F7F7F8] group-hover:text-white transition-colors">
              UNIBOTICS
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-[#C9A3FF] uppercase -mt-0.5">
              Robotics Infrastructure
            </span>
          </div>
        </Link>

        {/* Centred Pill Navigation Menu (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center p-1 rounded-full bg-[#0D0B14]/90 border border-[#2A2342] shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                aria-current={active ? "page" : undefined}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-150 ${
                  active
                    ? "bg-[#17132A] text-white shadow-[0_0_12px_rgba(147,18,255,0.35)] border border-[#7468A0]/40"
                    : "text-[#8B8988] hover:text-[#F7F7F8] hover:bg-[#17132A]/50"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#A020FF] to-transparent shadow-[0_0_8px_#A020FF]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Right) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            prefetch={true}
            className="px-3.5 py-1.5 text-xs font-medium text-[#8B8988] hover:text-[#F7F7F8] hover:bg-[#17132A] rounded-full transition-all duration-150 border border-transparent hover:border-[#2A2342]"
          >
            Login
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            className="btn-primary-violet px-4 py-1.5 text-xs font-semibold rounded-full flex items-center space-x-1.5"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#F7F7F8] bg-[#0D0B14] hover:bg-[#17132A] border border-[#2A2342] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Section 7.1: full-height panel with 48px links, focus trapped, primary CTA bottom) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="md:hidden fixed inset-x-0 top-[105px] bottom-0 bg-[#000000]/95 backdrop-blur-xl border-t border-[#2A2342] px-6 py-6 flex flex-col justify-between z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`h-12 flex items-center px-4 rounded-xl text-base font-semibold transition-all ${
                    active
                      ? "bg-[#17132A] text-white border border-[#A020FF]/40 shadow-glow"
                      : "text-[#8B8988] hover:text-[#F7F7F8] hover:bg-[#0D0B14]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#2A2342] space-y-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 flex items-center justify-center text-sm font-medium text-[#F7F7F8] bg-[#0D0B14] border border-[#2A2342] rounded-xl hover:bg-[#17132A] transition-colors"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-12 flex items-center justify-center text-sm font-semibold btn-primary-violet rounded-xl space-x-2"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

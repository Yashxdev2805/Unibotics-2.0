"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X, ArrowRight, ExternalLink } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-border">
      {/* Top Telemetry / Notice Bar */}
      <div className="bg-slate-900 text-slate-200 text-[11px] py-1.5 px-4 font-mono tracking-wide border-b border-slate-800">
        <div className="max-w-container-wide mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>NATIONAL STEM & ATL IMPLEMENTATION PARTNER | KURUKSHETRA, HARYANA</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <Link href="/verify" className="hover:text-white transition-colors flex items-center gap-1">
              <span>Verify Certificate</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/login" className="hover:text-white transition-colors">
              Institutional Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 bg-slate-900 text-white flex items-center justify-center font-black text-lg tracking-tighter border border-slate-800 group-hover:bg-brand transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              UNIBOTICS
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
              STEM & Robotics Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide uppercase text-slate-700">
          <Link href="/atl-setup" className="hover:text-brand transition-colors">
            ATL Setup
          </Link>
          <Link href="/workshops" className="hover:text-brand transition-colors">
            Workshops
          </Link>
          <Link href="/verify" className="hover:text-brand transition-colors">
            Verify Badge
          </Link>
          <Link href="/about" className="hover:text-brand transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-brand transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/login"
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Portal Sign In
          </Link>
          <Link
            href="/contact?need=atl_lab"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-brand transition-colors flex items-center space-x-1.5"
          >
            <span>Request Lab Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 border border-slate-200"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-800">
            <Link
              href="/atl-setup"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand"
            >
              ATL Lab Setup
            </Link>
            <Link
              href="/workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand"
            >
              STEM Bootcamps & Workshops
            </Link>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand"
            >
              Certificate Authenticator
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand"
            >
              About Unibotics
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-brand"
            >
              Institutional Inquiries
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold text-slate-800 border border-slate-300"
            >
              Institutional Portal Login
            </Link>
            <Link
              href="/contact?need=atl_lab"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-brand"
            >
              Request Lab Implementation Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

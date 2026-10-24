import Link from "next/link";
import { Mail, MapPin, CheckCircle2, Zap, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#000000] text-[#8B8988] text-xs border-t border-[#2A2342] glow-line-top">
      {/* Upper Grid */}
      <div className="max-w-stage mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1 & 2: Institutional Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A020FF] to-[#7A1CF8] flex items-center justify-center text-white shadow-[0_0_12px_rgba(160,32,255,0.5)]">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-[#F7F7F8] leading-none">
                UNIBOTICS
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#C9A3FF] uppercase mt-0.5">
                STEM & Robotics Infrastructure
              </span>
            </div>
          </div>

          <p className="text-[#8B8988] text-xs leading-relaxed max-w-sm">
            Institutional delivery partner for Atal Tinkering Labs (AIM / NITI Aayog guidelines),
            vocational technical bootcamps, and curriculum-aligned robotics infrastructure across India.
          </p>

          <div className="space-y-2 pt-2 text-[#8B8988]">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#7468A0] shrink-0" />
              <span>Kurukshetra, Haryana 136118, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#7468A0] shrink-0" />
              <a
                href="mailto:directorunibotics@gmail.com"
                className="hover:text-[#C9A3FF] transition-colors"
              >
                directorunibotics@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Col 3: Programs & Lab Setup */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-[#F7F7F8] uppercase tracking-wider">
            Programs & Setup
          </h4>
          <ul className="space-y-2 text-[#8B8988]">
            <li>
              <Link href="/services" className="hover:text-[#C9A3FF] transition-colors">
                Turnkey ATL Setup
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-[#C9A3FF] transition-colors">
                2-Day Intensive Workshops
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-[#C9A3FF] transition-colors">
                5-Day Technical Bootcamps
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-[#C9A3FF] transition-colors">
                7-Day Advanced Masterclasses
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#C9A3FF] transition-colors">
                Faculty Enablement Programs
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust & Verification */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-[#F7F7F8] uppercase tracking-wider">
            Trust & Security
          </h4>
          <ul className="space-y-2 text-[#8B8988]">
            <li>
              <Link
                href="/verify"
                className="hover:text-[#C9A3FF] transition-colors flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#45B558]" />
                <span>Verify Certificate</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-[#C9A3FF] transition-colors">
                Institutional Portal
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-[#C9A3FF] transition-colors flex items-center space-x-1 text-[#C9A3FF]"
              >
                <span>Join Team / Apply as Mentor</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C9A3FF] transition-colors">
                Accreditations & Partners
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Governance & Compliance */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-[#F7F7F8] uppercase tracking-wider">
            Governance & Legal
          </h4>
          <ul className="space-y-2 text-[#8B8988]">
            <li>
              <Link href="/privacy" className="hover:text-[#C9A3FF] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#C9A3FF] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/child-protection" className="hover:text-[#C9A3FF] transition-colors">
                Child Protection & POCSO
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C9A3FF] transition-colors">
                Grievance & Support
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-Strip */}
      <div className="border-t border-[#2A2342] bg-[#0D0B14]/70 py-4 px-4 sm:px-6">
        <div className="max-w-stage mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8B8988] gap-2">
          <p>© 2026 Unibotics India. All rights reserved. Registered under Indian business governance standards.</p>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[#7468A0]">VERIFIABLE CREDENTIALS VIA QR</span>
            <span className="text-[#2A2342]">•</span>
            <span className="font-mono text-[#7468A0]">TLS 1.3 ENCRYPTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, CheckCircle2, Cpu, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative text-[#94A3B8] text-sm border-t border-[#2F3545] glow-line-top"
      style={{ background: "#08090C" }}
    >
      {/* Upper Grid */}
      <div className="max-w-stage mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Col 1 & 2: Institutional Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/unibotics-logo.png"
              alt="Unibotics Logo"
              width={48}
              height={48}
              loading="lazy"
              className="w-12 h-12 object-contain rounded-md drop-shadow-[0_0_14px_rgba(249,115,22,0.45)]"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none">
                <span className="text-[#F97316]">Uni</span>
                <span className="text-[#38BDF8]">botics</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase mt-1 text-[#94A3B8] font-mono">
                Unified Intelligence &bull; Infinite Solution
              </span>
            </div>
          </div>

          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
            Institutional delivery partner for Atal Tinkering Labs (AIM / NITI Aayog guidelines),
            vocational technical bootcamps, and curriculum-aligned robotics infrastructure across India.
          </p>

          <div className="space-y-2 pt-2 text-sm text-[#CBD5E1]">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
              <span>Kurukshetra, Haryana 136118, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#F97316] shrink-0" />
              <a
                href="mailto:directorunibotics@gmail.com"
                className="hover:text-[#F97316] transition-colors"
              >
                directorunibotics@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Col 3: Programs & Lab Setup */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
            Programs &amp; Setup
          </h4>
          <ul className="space-y-2.5 text-sm text-[#94A3B8]">
            {[
              { label: "Atal Tinkering Lab Setup (P1–P4)", href: "/atl-setup" },
              { label: "2-Day Intensive Workshops", href: "/workshops" },
              { label: "5-Day Technical Bootcamps", href: "/workshops" },
              { label: "7-Day Advanced Masterclasses", href: "/workshops" },
              { label: "Faculty Enablement Programs", href: "/services" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#F97316] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Trust & Verification */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
            Trust &amp; Security
          </h4>
          <ul className="space-y-2.5 text-sm text-[#94A3B8]">
            <li>
              <Link href="/verify" className="hover:text-[#F97316] transition-colors flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Verify Certificate</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-[#F97316] transition-colors">
                Institutional Portal
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#F97316] transition-colors flex items-center space-x-1 text-[#38BDF8]">
                <span>Join Team / Apply as Mentor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#F97316] transition-colors">
                About Unibotics
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Legal & Compliance */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
            Legal &amp; Policies
          </h4>
          <ul className="space-y-2.5 text-sm text-[#94A3B8]">
            {[
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Child Protection Policy", href: "/child-protection" },
              { label: "Institutional Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#F97316] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2F3545] bg-[#161920]/80">
        <div className="max-w-stage mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>
            &copy; {new Date().getFullYear()} Unibotics. All rights reserved. Registered Educational Provider, Kurukshetra, Haryana.
          </span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#94A3B8]">Infrastructure Operations: Active</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ShieldCheck, Mail, MapPin, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Upper Grid */}
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1 & 2: Institutional Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white text-slate-950 flex items-center justify-center font-black text-base">
              U
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white leading-none">
                UNIBOTICS
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                STEM & Robotics Infrastructure
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Institutional delivery partner for Atal Tinkering Labs (AIM / NITI Aayog guidelines),
            vocational technical bootcamps, and curriculum-aligned robotics infrastructure across India.
          </p>

          <div className="space-y-2 pt-2 text-slate-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Kurukshetra, Haryana 136118, India</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <a href="mailto:directorunibotics@gmail.com" className="hover:text-white transition-colors">
                directorunibotics@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Col 3: Programs & Lab Setup */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Programs & Setup
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/atl-setup" className="hover:text-white transition-colors">
                Turnkey ATL Setup
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-white transition-colors">
                2-Day Intensive Workshops
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-white transition-colors">
                5-Day Technical Bootcamps
              </Link>
            </li>
            <li>
              <Link href="/workshops" className="hover:text-white transition-colors">
                7-Day Advanced Masterclasses
              </Link>
            </li>
            <li>
              <Link href="/contact?need=teacher_training" className="hover:text-white transition-colors">
                Faculty Enablement Programs
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust & Verification */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Trust & Security
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/verify" className="hover:text-white transition-colors flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verify Certificate</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors">
                Institutional Portal
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-white transition-colors">
                Mentor Application
              </Link>
            </li>
            <li>
              <Link href="/contact?need=skill_development" className="hover:text-white transition-colors">
                Industry & Channel Partnerships
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Governance & Compliance */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Governance & Legal
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/child-protection" className="hover:text-white transition-colors">
                Child Protection & POCSO
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Grievance & Support
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Sub-Strip */}
      <div className="border-t border-slate-900 bg-black/60 py-4 px-4 sm:px-6">
        <div className="max-w-container-wide mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 Unibotics India. All rights reserved. Registered under Indian business governance standards.</p>
          <div className="flex items-center space-x-4">
            <span className="font-mono">VERIFIABLE CREDENTIALS VIA QR</span>
            <span>•</span>
            <span className="font-mono">TLS 1.3 ENCRYPTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

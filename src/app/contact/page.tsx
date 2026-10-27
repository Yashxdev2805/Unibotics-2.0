import { Suspense } from "react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { ShieldCheck, Mail, MapPin, Clock, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Contact & Institutional RFP | Unibotics India",
  description:
    "Direct inquiry channel for schools, colleges, and ITIs seeking Atal Tinkering Lab setup, robotics equipment, and STEM workshops. 1 to 2 working days response guarantee.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col relative text-[#F8FAFC]">
      {/* Breadcrumb Navigation */}
      <section className="border-b border-[#2F3545] bg-[#161920]/60 py-3 px-4 sm:px-6 text-xs text-[#94A3B8]">
        <div className="max-w-stage mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-[#2F3545]">/</span>
          <span className="font-semibold text-white">Institutional Inquiries & Quotes</span>
        </div>
      </section>

      {/* Main Dual-Pane Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-stage mx-auto w-full mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Frictionless Enquiry Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="glass-panel p-8 text-center text-xs text-[#94A3B8]">
                  Loading institutional enquiry gateway...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Right Column: Institutional Directory & SLA Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SLA Commitment Card */}
            <div className="glass-panel p-6 border border-[#2F3545] glow-line-top space-y-3">
              <div className="flex items-center space-x-2 text-[#10B981] text-xs font-mono font-semibold">
                <Clock className="w-4 h-4" />
                <span>OFFICIAL RESPONSE SLA</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                1 to 2 Working Days Guarantee
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Institutional requests are routed directly to technical program directors in Kurukshetra. We provide structured budget estimates, hardware bills of materials, and scheduling timelines.
              </p>
              <div className="pt-2 border-t border-[#2F3545] text-[11px] font-mono text-[#64748B]">
                MONITORING PROTOCOL: IMMEDIATE ADMIN ALERT
              </div>
            </div>

            {/* Direct Contact Directory Card */}
            <div className="glass-panel p-6 border border-[#2F3545] space-y-4 text-xs text-[#94A3B8]">
              <span className="font-mono text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
                Direct Administrative Contacts
              </span>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Operations Headquarters:
                    </span>
                    <p className="leading-relaxed">
                      Unibotics Services Pvt. Ltd.<br />
                      Kurukshetra, Haryana 136118, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Institutional RFP Inbox:
                    </span>
                    <a
                      href="mailto:directorunibotics@gmail.com"
                      className="text-[#F97316] hover:underline font-mono"
                    >
                      directorunibotics@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Compliance Verification:
                    </span>
                    <p className="leading-relaxed">
                      Registered MSME & Educational Infrastructure Partner under Indian business regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpful Scope Notice */}
            <div className="glass-panel p-5 border border-[#2F3545] flex items-start space-x-3 text-xs text-[#94A3B8]">
              <HelpCircle className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">
                  Planning an ATL Grant Submission?
                </span>
                <p className="mt-1 leading-relaxed">
                  Mention your application stage in the message. We provide formal quotation formats aligned to the NITI Aayog portal upload requirements.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { ShieldCheck, Mail, MapPin, Clock, HelpCircle, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Contact & Institutional RFP | Unibotics India",
  description:
    "Direct inquiry channel for schools, colleges, and ITIs seeking Atal Tinkering Lab setup, robotics equipment, and STEM workshops. 1 to 2 working days response guarantee.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-container-wide mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Institutional Inquiries & Quotes</span>
        </div>
      </section>

      {/* Main Dual-Pane Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-container-wide mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Frictionless Enquiry Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="bg-white border border-slate-300 p-8 text-center text-xs text-slate-500">
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
            <div className="bg-slate-900 text-white p-6 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-semibold">
                <Clock className="w-4 h-4" />
                <span>OFFICIAL RESPONSE SLA</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                1 to 2 Working Days Guarantee
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Institutional requests are routed directly to technical program directors in Kurukshetra. We provide structured budget estimates, hardware bills of materials, and scheduling timelines.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                MONITORING PROTOCOL: IMMEDIATE ADMIN ALERT VIA RESEND
              </div>
            </div>

            {/* Physical Headquarters Card */}
            <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Regional Operations Office
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Kurukshetra Headquarters</span>
                    <span className="text-slate-500">Unibotics Services Pvt. Ltd.</span>
                    <p className="text-slate-500">Kurukshetra, Haryana 136118, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Official Inquiries Email</span>
                    <a
                      href="mailto:directorunibotics@gmail.com"
                      className="text-teal-700 hover:underline font-mono"
                    >
                      directorunibotics@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <PhoneCall className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Operational Hours</span>
                    <p className="text-slate-500">Monday to Saturday: 09:00 – 18:00 IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Institutional FAQ */}
            <div className="bg-white border border-slate-300 p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Procurement Questions
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block">How are proposals billed?</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    We issue institutional GST proforma invoices with full component serial number documentation for school and college audits.
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-slate-900 block">Who supplies the hardware?</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    All kits, microcontrollers, 3D printers, and sensors are transported and supplied directly by Unibotics. Host campuses provide only basic lab furniture and power points.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
} from "lucide-react";
import type { WorkshopItem } from "@/lib/data/workshops";

interface Props {
  workshop: WorkshopItem;
}

export default function BookingWizard({ workshop }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    preferredDates: "",
    venueType: "College Electronics Lab",
    instituteName: "",
    city: "",
    studentCount: 60,
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const validateStep1 = () => {
    if (!formData.preferredDates.trim()) {
      setErrorMsg("Please indicate your preferred dates or target month.");
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const validateStep2 = () => {
    if (!formData.instituteName.trim() || !formData.city.trim()) {
      setErrorMsg("Please provide your institute name and campus city.");
      return false;
    }
    if (!formData.studentCount || formData.studentCount < 10) {
      setErrorMsg("Minimum recommended student cohort size is 10.");
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.consent) {
      setErrorMsg("You must provide consent for Unibotics to process this institutional booking request.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        workshopSlug: workshop.slug,
        requesterName: formData.requesterName,
        requesterEmail: formData.requesterEmail,
        requesterPhone: formData.requesterPhone,
        instituteName: formData.instituteName,
        city: formData.city,
        venueType: formData.venueType,
        studentCount: Number(formData.studentCount),
        preferredDates: formData.preferredDates,
        consent: true,
        turnstileToken: "cf_client_verified_token",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error?.message || "Failed to submit booking request. Please retry.");
      } else {
        setSuccessData(data.data);
      }
    } catch {
      setErrorMsg("Network error communicating with the server.");
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="glass-panel border border-[#45B558]/40 p-8 shadow-glow space-y-4">
        <div className="flex items-center space-x-3 text-[#45B558]">
          <div className="p-2 bg-[#212530] rounded-xl border border-[#45B558]/40">
            <CheckCircle2 className="w-6 h-6 text-[#45B558]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Workshop RFP Successfully Submitted</h3>
            <p className="text-xs text-[#64748B] font-mono">BOOKING ID: {successData.id}</p>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed">
          {successData.message}
        </p>

        <div className="bg-[#0F1115] border border-[#2F3545] p-4 rounded-xl text-xs space-y-2 text-[#94A3B8]">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#F97316] shrink-0" />
            <span className="font-semibold text-white">Next Operational Steps:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-[#94A3B8] text-[11px]">
            <li>An academic coordinator will verify mentor calendar availability for {formData.preferredDates}.</li>
            <li>A formal institutional quotation with hardware kit allocation will be emailed to <strong className="text-white">{formData.requesterEmail}</strong>.</li>
            <li>We will confirm travel logistics to <strong className="text-white">{formData.city}</strong> within 1 to 2 working days.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/workshops"
            className="btn-secondary-dark px-4 py-2 rounded-xl text-xs font-semibold text-center"
          >
            Explore Other Modules
          </Link>
          <Link
            href="/"
            className="btn-primary-cyan px-5 py-2 rounded-xl text-xs font-semibold text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel border border-[#2F3545] glow-line-top overflow-hidden">
      {/* Progress Stepper Bar */}
      <div className="border-b border-[#2F3545] bg-[#08060E] px-6 py-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">REQUEST WORKSHOP RFP:</span>
          <span className="text-[#F97316] truncate max-w-xs">{workshop.title}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                step === s
                  ? "bg-[#212530] text-white border-[#F97316] shadow-glow"
                  : step > s
                  ? "bg-[#45B558]/20 text-[#45B558] border-[#45B558]/40"
                  : "bg-[#0F1115] text-[#64748B] border-[#2F3545]"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {errorMsg && (
          <div className="mb-6 p-3 bg-[#212530] border border-[#F03B2A]/40 text-xs text-[#F03B2A] rounded-xl flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-[#F03B2A] shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Workshop & Dates */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-b border-[#2F3545] pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Step 1: Program Duration & Dates
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Module: {workshop.title} ({workshop.days} Days Intensive).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                Preferred Dates / Academic Window *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Nov to 20 Nov 2026, or First week of December"
                  value={formData.preferredDates}
                  onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                Campus Venue Facility
              </label>
              <select
                value={formData.venueType}
                onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
              >
                <option value="College Electronics Lab" className="bg-[#0F1115] text-white">College Electronics / Embedded Lab</option>
                <option value="School Atal Tinkering Lab" className="bg-[#0F1115] text-white">School Atal Tinkering Lab (ATL)</option>
                <option value="Computer Lab with Projector" className="bg-[#0F1115] text-white">Computer Center with Display Projector</option>
                <option value="Auditorium / Multipurpose Hall" className="bg-[#0F1115] text-white">Indoor Auditorium / Multipurpose Hall</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="btn-primary-cyan px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Institute & Cohort Size */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="border-b border-[#2F3545] pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Step 2: Campus Details & Student Cohort
              </h3>
              <p className="text-xs text-[#94A3B8]">
                We use student counts to calculate hardware component kit requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                  Institute / College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haryana Engineering College"
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                  Campus City, State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurukshetra, Haryana"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                Estimated Participant Count * (Min 10)
              </label>
              <input
                type="number"
                min={10}
                max={500}
                required
                value={formData.studentCount}
                onChange={(e) => setFormData({ ...formData, studentCount: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors font-mono"
              />
              <span className="text-[11px] text-[#64748B] mt-1 block">
                Standard team ratio: 1 complete hardware development kit per 3 to 4 students.
              </span>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary-dark px-5 py-2.5 rounded-xl text-xs font-semibold uppercase flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="btn-primary-cyan px-6 py-2.5 rounded-xl text-xs font-semibold uppercase flex items-center space-x-1.5"
              >
                <span>Continue to Step 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-[#2F3545] pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Step 3: Coordinator Details & Review
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Where should we send the written quotation and syllabus itinerary?
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                Coordinator Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Prof. / Dr. / Coordinator Name"
                value={formData.requesterName}
                onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="coordinator@institution.ac.in"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">
                  Direct Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.requesterPhone}
                  onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#64748B] text-sm text-white bg-[#0F1115] focus:bg-[#212530] focus:border-[#F97316] focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="bg-[#0F1115] border border-[#2F3545] p-4 rounded-xl text-xs space-y-1 text-[#94A3B8]">
              <span className="font-mono text-[10px] text-[#64748B] uppercase block font-semibold">
                Booking RFP Summary:
              </span>
              <p><strong className="text-white">Program:</strong> {workshop.title} ({workshop.days} Days)</p>
              <p><strong className="text-white">Campus:</strong> {formData.instituteName}, {formData.city}</p>
              <p><strong className="text-white">Dates:</strong> {formData.preferredDates} • {formData.studentCount} Participants</p>
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start space-x-2 text-xs text-[#94A3B8] cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-[#64748B] text-[#F97316] focus:ring-0 bg-[#0F1115]"
                />
                <span>
                  I confirm that I am authorized to request an institutional workshop proposal on behalf of {formData.instituteName || "this institution"}.
                </span>
              </label>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary-dark px-5 py-2.5 rounded-xl text-xs font-semibold uppercase flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-cyan px-6 py-2.5 rounded-xl text-xs font-semibold uppercase flex items-center space-x-1.5 disabled:opacity-50"
              >
                <span>{loading ? "Submitting RFP..." : "Submit Booking RFP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

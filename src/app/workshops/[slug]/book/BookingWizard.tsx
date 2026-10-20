"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Building2,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
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
      <div className="bg-white border border-emerald-300 p-8 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-emerald-700">
          <div className="p-2 bg-emerald-100 border border-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">Workshop RFP Successfully Submitted</h3>
            <p className="text-xs text-slate-500 font-mono">BOOKING ID: {successData.id}</p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          {successData.message}
        </p>

        <div className="bg-slate-50 border border-slate-200 p-4 text-xs space-y-2 text-slate-700">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-900">Next Operational Steps:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
            <li>An academic coordinator will verify mentor calendar availability for {formData.preferredDates}.</li>
            <li>A formal institutional quotation with hardware kit allocation will be emailed to <strong className="text-slate-900">{formData.requesterEmail}</strong>.</li>
            <li>We will confirm travel logistics to <strong className="text-slate-900">{formData.city}</strong> within 1 to 2 working days.</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/workshops"
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors text-center"
          >
            Explore Other Modules
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-300 shadow-sm">
      {/* Progress Stepper Bar */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-900">REQUEST WORKSHOP RFP:</span>
          <span className="text-slate-600 truncate max-w-xs">{workshop.title}</span>
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`w-6 h-6 flex items-center justify-center font-bold text-[11px] border ${
                step === s
                  ? "bg-slate-900 text-white border-slate-900"
                  : step > s
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-slate-200 text-slate-500 border-slate-300"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-800 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Workshop & Dates */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
                Step 1: Program Duration & Dates
              </h3>
              <p className="text-xs text-slate-500">
                Module: {workshop.title} ({workshop.days} Days Intensive).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Dates / Academic Window *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Nov to 20 Nov 2026, or First week of December"
                  value={formData.preferredDates}
                  onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Campus Venue Facility
              </label>
              <select
                value={formData.venueType}
                onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
              >
                <option value="College Electronics Lab">College Electronics / Embedded Lab</option>
                <option value="School Atal Tinkering Lab">School Atal Tinkering Lab (ATL)</option>
                <option value="Computer Lab with Projector">Computer Center with Display Projector</option>
                <option value="Auditorium / Multipurpose Hall">Indoor Auditorium / Multipurpose Hall</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors"
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
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
                Step 2: Campus Details & Student Cohort
              </h3>
              <p className="text-xs text-slate-500">
                We use student counts to calculate hardware component kit requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Institute / College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haryana Engineering College"
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Campus City, State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurukshetra, Haryana"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Participant Count * (Min 10)
              </label>
              <input
                type="number"
                min={10}
                max={500}
                required
                value={formData.studentCount}
                onChange={(e) => setFormData({ ...formData, studentCount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Standard team ratio: 1 complete hardware development kit per 3 to 4 students.
              </span>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors border border-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors"
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
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-950 uppercase tracking-wider font-mono">
                Step 3: Coordinator Details & Review
              </h3>
              <p className="text-xs text-slate-500">
                Where should we send the written quotation and syllabus itinerary?
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Coordinator Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Prof. / Dr. / Coordinator Name"
                value={formData.requesterName}
                onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="coordinator@institution.ac.in"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData({ ...formData, requesterEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Direct Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.requesterPhone}
                  onChange={(e) => setFormData({ ...formData, requesterPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="bg-slate-50 border border-slate-200 p-4 text-xs space-y-1">
              <span className="font-mono text-[10px] text-slate-400 uppercase block font-semibold">
                Booking RFP Summary:
              </span>
              <p><strong className="text-slate-900">Program:</strong> {workshop.title} ({workshop.days} Days)</p>
              <p><strong className="text-slate-900">Campus:</strong> {formData.instituteName}, {formData.city}</p>
              <p><strong className="text-slate-900">Dates:</strong> {formData.preferredDates} • {formData.studentCount} Participants</p>
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded-none border-slate-300 text-slate-900 focus:ring-0"
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
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors border border-slate-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-colors disabled:opacity-50"
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

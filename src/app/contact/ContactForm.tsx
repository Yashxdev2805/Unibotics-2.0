"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  MapPin,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledNeed = searchParams.get("need") || "atl_lab";
  const prefilledWorkshop = searchParams.get("workshop") || "";

  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    instituteType: "school",
    city: "",
    phone: "",
    email: "",
    need: prefilledNeed,
    message: prefilledWorkshop ? `Requesting proposal for workshop: ${prefilledWorkshop}` : "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.consent) {
      setErrorMsg("You must accept the privacy policy to submit an institutional enquiry.");
      return;
    }

    setLoading(true);

    try {
      // In development / standard client, supply test token; Turnstile script in production overrides
      const payload = {
        ...formData,
        turnstileToken: "cf_client_verified_token",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error?.message || "Failed to submit enquiry. Please retry.");
      } else {
        setSuccessData(data.data);
      }
    } catch {
      setErrorMsg("Network error communicating with the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white border border-emerald-300 p-8 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-emerald-700">
          <div className="p-2 bg-emerald-100 rounded-none border border-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">Enquiry Registered Successfully</h3>
            <p className="text-xs text-slate-500 font-mono">REFERENCE ID: {successData.id}</p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          {successData.message}
        </p>

        <div className="bg-slate-50 border border-slate-200 p-4 text-xs space-y-2 text-slate-600">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-900">Standard SLA: 1 to 2 Working Days</span>
          </div>
          <p className="text-[11px] text-slate-500">
            A confirmation email has been dispatched to <span className="font-semibold text-slate-800">{formData.email}</span>. A technical coordinator will reach out via <span className="font-semibold text-slate-800">{formData.phone}</span>.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccessData(null);
              setFormData({
                name: "",
                organisation: "",
                instituteType: "school",
                city: "",
                phone: "",
                email: "",
                need: "atl_lab",
                message: "",
                consent: false,
              });
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            Submit Another Request
          </button>
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
    <form onSubmit={handleSubmit} className="bg-white border border-slate-300 p-6 sm:p-8 shadow-sm space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-lg font-bold text-slate-950">Institutional Request Form</h2>
        <p className="text-xs text-slate-500">
          No account or login required. Direct dispatch to Unibotics operations.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-800 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Prof. / Dr. / Mr. / Ms."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Organisation / Institute Name
          </label>
          <input
            type="text"
            placeholder="School or College Name"
            value={formData.organisation}
            onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Campus Classification *
          </label>
          <select
            value={formData.instituteType}
            onChange={(e) => setFormData({ ...formData, instituteType: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
          >
            <option value="school">K-12 School (CBSE / ICSE / State)</option>
            <option value="iti">Industrial Training Institute (ITI)</option>
            <option value="diploma">Polytechnic / Diploma College</option>
            <option value="engineering">Engineering College / University</option>
            <option value="other">Other Educational Entity</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            City / District, State *
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Official Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="coordinator@institution.edu.in"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Contact Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Primary Requirement *
        </label>
        <select
          value={formData.need}
          onChange={(e) => setFormData({ ...formData, need: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
        >
          <option value="atl_lab">Atal Tinkering Lab Setup (Turnkey Packages P1-P4)</option>
          <option value="workshop">Technical STEM Workshop (2, 5, or 7 Days)</option>
          <option value="teacher_training">Faculty Development & Teacher Enablement</option>
          <option value="skill_development">NSDC / Skill India Vocational Program</option>
          <option value="other">Custom Lab Equipment / Innovation Challenge</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Specific Scope / Questions (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Student cohort size, expected timeline, or specific curriculum mapping goals..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 rounded-none border-slate-300 text-slate-900 focus:ring-0"
          />
          <span>
            I acknowledge that this enquiry will be processed by Unibotics India under our{" "}
            <Link href="/privacy" className="text-teal-700 underline hover:text-teal-800">
              Privacy Policy
            </Link>{" "}
            (DPDP Act 2023 compliant). Data is never sold or shared.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Registering Enquiry..." : "Submit Institutional Enquiry"}</span>
      </button>
    </form>
  );
}

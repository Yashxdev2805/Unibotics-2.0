"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
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
      <div className="glass-panel border border-[#45B558]/40 p-8 shadow-glow space-y-4">
        <div className="flex items-center space-x-3 text-[#45B558]">
          <div className="p-2 bg-[#17132A] rounded-xl border border-[#45B558]/40">
            <CheckCircle2 className="w-6 h-6 text-[#45B558]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Enquiry Registered Successfully</h3>
            <p className="text-xs text-[#7468A0] font-mono">REFERENCE ID: {successData.id}</p>
          </div>
        </div>

        <p className="text-xs text-[#8B8988] leading-relaxed">
          {successData.message}
        </p>

        <div className="bg-[#0D0B14] border border-[#2A2342] p-4 rounded-xl text-xs space-y-2 text-[#8B8988]">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#C9A3FF] shrink-0" />
            <span className="font-semibold text-white">Standard SLA: 1 to 2 Working Days</span>
          </div>
          <p className="text-[11px] text-[#7468A0]">
            A confirmation email has been dispatched to <span className="font-semibold text-[#F7F7F8]">{formData.email}</span>. A technical coordinator will reach out via <span className="font-semibold text-[#F7F7F8]">{formData.phone}</span>.
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
            className="btn-secondary-dark px-4 py-2 rounded-xl text-xs font-semibold"
          >
            Submit Another Request
          </button>
          <Link
            href="/"
            className="btn-primary-violet px-5 py-2 rounded-xl text-xs font-semibold text-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 border border-[#2A2342] glow-line-top space-y-5">
      <div className="border-b border-[#2A2342] pb-3">
        <h2 className="text-lg font-bold text-white">Institutional Request Form</h2>
        <p className="text-xs text-[#8B8988]">
          No account or login required. Direct dispatch to Unibotics engineering team.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-[#17132A] border border-[#F03B2A]/40 text-xs text-[#F03B2A] rounded-xl flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-[#F03B2A] shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Prof. / Dr. / Mr. / Ms."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Organisation / Institute Name
          </label>
          <input
            type="text"
            placeholder="School or College Name"
            value={formData.organisation}
            onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Campus Classification *
          </label>
          <select
            value={formData.instituteType}
            onChange={(e) => setFormData({ ...formData, instituteType: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          >
            <option value="school" className="bg-[#0D0B14] text-white">K-12 School (CBSE / ICSE / State)</option>
            <option value="iti" className="bg-[#0D0B14] text-white">Industrial Training Institute (ITI)</option>
            <option value="diploma" className="bg-[#0D0B14] text-white">Polytechnic / Diploma College</option>
            <option value="engineering" className="bg-[#0D0B14] text-white">Engineering College / University</option>
            <option value="other" className="bg-[#0D0B14] text-white">Other Educational Entity</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            City / District, State *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Kurukshetra, Haryana"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Official Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="coordinator@institution.edu.in"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Contact Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
          Primary Requirement *
        </label>
        <select
          value={formData.need}
          onChange={(e) => setFormData({ ...formData, need: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
        >
          <option value="atl_lab" className="bg-[#0D0B14] text-white">Atal Tinkering Lab Setup (Turnkey Packages P1-P4)</option>
          <option value="workshop" className="bg-[#0D0B14] text-white">Technical STEM Workshop (2, 5, or 7 Days)</option>
          <option value="teacher_training" className="bg-[#0D0B14] text-white">Faculty Development & Teacher Enablement</option>
          <option value="skill_development" className="bg-[#0D0B14] text-white">NSDC / Skill India Vocational Program</option>
          <option value="other" className="bg-[#0D0B14] text-white">Custom Lab Equipment / Innovation Challenge</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
          Specific Scope / Questions (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Student cohort size, expected timeline, or specific curriculum mapping goals..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start space-x-2 text-xs text-[#8B8988] cursor-pointer">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 rounded border-[#7468A0] text-[#A020FF] focus:ring-0 bg-[#0D0B14]"
          />
          <span>
            I acknowledge that this enquiry will be processed by Unibotics India under our{" "}
            <Link href="/privacy" className="text-[#C9A3FF] underline hover:text-white">
              Privacy Policy
            </Link>{" "}
            (DPDP Act 2023 compliant). Data is never sold or shared.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary-violet w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? "Registering Enquiry..." : "Submit Institutional Enquiry"}</span>
      </button>
    </form>
  );
}

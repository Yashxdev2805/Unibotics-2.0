"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  GraduationCap,
  Building2,
  Handshake,
  CheckCircle2,
  AlertCircle,
  Send,
  ArrowRight,
} from "lucide-react";

const ROLE_OPTIONS = [
  {
    type: "mentor",
    title: "Technical Mentor",
    icon: Wrench,
    badge: "FIELD OPERATIONS",
    desc: "Deliver intensive 2, 5, or 7-day on-campus workshops in robotics, IoT, and drones for engineering and school cohorts.",
  },
  {
    type: "intern",
    title: "Engineering Intern",
    icon: GraduationCap,
    badge: "RESEARCH & LAB",
    desc: "Hands-on hardware testing, microcontroller firmware development, and prototyping in our Kurukshetra technical lab.",
  },
  {
    type: "institutional_partner",
    title: "Institutional Partner",
    icon: Building2,
    badge: "ACADEMIC CONSORTIUM",
    desc: "Establish a regional innovation center, center of excellence (CoE), or multi-campus tinkering partnership.",
  },
  {
    type: "channel_partner",
    title: "Channel / Vendor Partner",
    icon: Handshake,
    badge: "EQUIPMENT SUPPLY",
    desc: "Supply certified electronic hardware, 3D printing consumables, or coordinate institutional lab tenders.",
  },
];

export default function ApplicationForm() {
  const [selectedRole, setSelectedRole] = useState<string>("mentor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    qualification: "",
    notes: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.consent) {
      setErrorMsg("You must provide consent for Unibotics to evaluate your professional application.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        applicantType: selectedRole,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organisation: formData.organisation,
        details: {
          qualification: formData.qualification,
          notes: formData.notes,
        },
        consent: true,
        turnstileToken: "cf_client_verified_token",
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error?.message || "Failed to submit application. Please retry.");
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
          <div className="p-2 bg-[#17132A] rounded-xl border border-[#45B558]/40">
            <CheckCircle2 className="w-6 h-6 text-[#45B558]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Application Registered</h3>
            <p className="text-xs text-[#7468A0] font-mono">APPLICATION REF: {successData.id}</p>
          </div>
        </div>

        <p className="text-xs text-[#8B8988] leading-relaxed">
          {successData.message}
        </p>

        <div className="bg-[#0D0B14] border border-[#2A2342] p-4 rounded-xl text-xs text-[#8B8988] space-y-1">
          <span className="font-semibold text-white block">Next Steps:</span>
          <p>
            Our operations team conducts candidate reviews weekly. Shortlisted mentors and partners are contacted via <span className="font-semibold text-white">{formData.email}</span> for technical interviews and credentials verification.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccessData(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                organisation: "",
                qualification: "",
                notes: "",
                consent: false,
              });
            }}
            className="btn-secondary-dark px-4 py-2 rounded-xl text-xs font-semibold"
          >
            Submit Another Application
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
    <div className="space-y-8">
      {/* Step 1: Select Application Role */}
      <div>
        <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
          Step 1: Select Candidate Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedRole === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setSelectedRole(opt.type)}
                className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#17132A] text-white border-[#A020FF] shadow-glow"
                    : "glass-panel text-[#8B8988] border-[#2A2342] hover:border-[#7468A0]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl ${isSelected ? "bg-[#0D0B14] text-[#C9A3FF]" : "bg-[#17132A] text-[#8B8988]"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? "bg-[#0D0B14] border-[#A020FF]/40 text-[#C9A3FF]"
                          : "bg-[#0D0B14] border-[#2A2342] text-[#7468A0]"
                      }`}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">{opt.title}</h4>
                  <p className="text-xs text-[#8B8988] leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Application Details Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 border border-[#2A2342] glow-line-top space-y-4">
        <div className="border-b border-[#2A2342] pb-3 mb-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Step 2: Candidate Information & Credentials
          </h3>
          <p className="text-xs text-[#8B8988]">
            Applying as: <span className="font-semibold text-[#C9A3FF] uppercase font-mono">{selectedRole.replace("_", " ")}</span>. No password required.
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
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              placeholder="Candidate Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
              Primary Phone Number *
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

          <div>
            <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
              Current College / Institute / Company
            </label>
            <input
              type="text"
              placeholder="e.g. NIT Kurukshetra, DAV School"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Technical Qualification & Specialization *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. B.Tech ECE, Robotics Kinematics, Embedded C, 3D CAD"
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
            Prior Project Experience / Profile Link (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="GitHub, LinkedIn, summary of completed robotics/electronics hardware projects..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
          />
        </div>

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
              I confirm that the details provided are accurate and consent to Unibotics reviewing my credentials for candidate selection.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary-violet w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? "Submitting Application..." : "Submit Candidate Application"}</span>
        </button>
      </form>
    </div>
  );
}

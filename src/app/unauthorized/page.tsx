import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Access Denied | Unibotics",
  description: "You do not have permission to view the requested institutional resource.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnauthorizedPage() {
  return (
    <div className="flex-1 bg-slate-900 text-slate-100 flex items-center justify-center p-6 py-16">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">403 Access Denied</h1>
            <p className="text-xs text-slate-400">Security Clearance Insufficient</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Your account is authenticated, but does not possess the institutional permissions or approved membership role required to view this portal.
        </p>

        <div className="bg-slate-900 border border-slate-800 p-3 text-xs text-slate-400 mb-6 space-y-1">
          <p><span className="text-slate-200 font-semibold">Institute Admins:</span> Verification by Unibotics operations is required before portal activation.</p>
          <p><span className="text-slate-200 font-semibold">Support:</span> Contact operations@unibotics.in if you believe this is an error.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-colors"
          >
            Contact Operations
          </Link>
        </div>
      </div>
    </div>
  );
}

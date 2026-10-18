"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup, type AuthActionResult } from "./actions";
import { Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const errorParam = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loginState, loginAction, isLoginPending] = useActionState<AuthActionResult | null, FormData>(
    login,
    null
  );
  const [signupState, signupAction, isSignupPending] = useActionState<AuthActionResult | null, FormData>(
    signup,
    null
  );

  return (
    <div className="w-full max-w-md bg-white border border-slate-300 shadow-sm">
      {/* Portal Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-slate-900 text-white">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900">Institutional Access Portal</h1>
            <p className="text-xs text-slate-500 font-mono">SECURE AUTHENTICATION GATEWAY</p>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-semibold text-center">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`py-3 transition-colors ${
            mode === "signin"
              ? "bg-white text-slate-900 border-b-2 border-slate-900 font-bold"
              : "bg-slate-50 text-slate-500 hover:text-slate-800"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`py-3 transition-colors ${
            mode === "signup"
              ? "bg-white text-slate-900 border-b-2 border-slate-900 font-bold"
              : "bg-slate-50 text-slate-500 hover:text-slate-800"
          }`}
        >
          Register Student
        </button>
      </div>

      <div className="p-6">
        {/* Error Messages */}
        {errorParam === "auth_callback_failed" && (
          <div className="mb-4 flex items-start space-x-2 border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <span>The authentication link was invalid or has expired. Please sign in directly.</span>
          </div>
        )}

        {mode === "signin" && loginState?.error && (
          <div className="mb-4 flex items-start space-x-2 border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <span>{loginState.error}</span>
          </div>
        )}

        {mode === "signup" && signupState?.error && (
          <div className="mb-4 flex items-start space-x-2 border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <span>{signupState.error}</span>
          </div>
        )}

        {mode === "signup" && signupState?.success && (
          <div className="mb-4 flex items-start space-x-2 border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>{signupState.message}</span>
          </div>
        )}

        {/* Sign In Form */}
        {mode === "signin" ? (
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectUrl} />

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@institution.ac.in"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoginPending}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
            >
              <span>{isLoginPending ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form action={signupAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="First and Last Name"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Create Password (Min 8 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-slate-800 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              New accounts receive the student role by default. Institute coordinator and mentor access requires manual verification by Unibotics operations.
            </p>

            <button
              type="submit"
              disabled={isSignupPending}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-600 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
            >
              <span>{isSignupPending ? "Creating Account..." : "Register Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Security Footer Notice */}
      <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Protected by Row Level Security</span>
        <span className="font-mono text-slate-400">TLS 1.3</span>
      </div>
    </div>
  );
}

"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { login, signup, type AuthActionResult } from "./actions";
import { Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, Zap } from "lucide-react";

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
    <div className="w-full max-w-md glass-panel border border-[#2A2342] glow-line-top shadow-[0_0_40px_rgba(147,18,255,0.2)] overflow-hidden">
      {/* Portal Header */}
      <div className="border-b border-[#2A2342] bg-[#08060E]/80 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A020FF] to-[#7A1CF8] flex items-center justify-center text-white shadow-glow">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Institutional Access Portal</h1>
            <p className="text-[11px] text-[#7468A0] font-mono">SECURE AUTHENTICATION GATEWAY</p>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 border-b border-[#2A2342] text-xs font-semibold text-center bg-[#0D0B14]">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`py-3 transition-colors ${
            mode === "signin"
              ? "bg-[#17132A] text-white border-b-2 border-[#A020FF] font-bold"
              : "text-[#8B8988] hover:text-white"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`py-3 transition-colors ${
            mode === "signup"
              ? "bg-[#17132A] text-white border-b-2 border-[#A020FF] font-bold"
              : "text-[#8B8988] hover:text-white"
          }`}
        >
          Register Student
        </button>
      </div>

      <div className="p-6">
        {/* Error Messages */}
        {errorParam === "auth_callback_failed" && (
          <div className="mb-4 flex items-start space-x-2 border border-[#F03B2A]/40 bg-[#17132A] p-3 text-xs text-[#F03B2A] rounded-xl">
            <AlertCircle className="w-4 h-4 text-[#F03B2A] mt-0.5 shrink-0" />
            <span>The authentication link was invalid or has expired. Please sign in directly.</span>
          </div>
        )}

        {mode === "signin" && loginState?.error && (
          <div className="mb-4 flex items-start space-x-2 border border-[#F03B2A]/40 bg-[#17132A] p-3 text-xs text-[#F03B2A] rounded-xl">
            <AlertCircle className="w-4 h-4 text-[#F03B2A] mt-0.5 shrink-0" />
            <span>{loginState.error}</span>
          </div>
        )}

        {mode === "signup" && signupState?.error && (
          <div className="mb-4 flex items-start space-x-2 border border-[#F03B2A]/40 bg-[#17132A] p-3 text-xs text-[#F03B2A] rounded-xl">
            <AlertCircle className="w-4 h-4 text-[#F03B2A] mt-0.5 shrink-0" />
            <span>{signupState.error}</span>
          </div>
        )}

        {mode === "signup" && signupState?.success && (
          <div className="mb-4 flex items-start space-x-2 border border-[#45B558]/40 bg-[#17132A] p-3 text-xs text-[#45B558] rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-[#45B558] mt-0.5 shrink-0" />
            <span>{signupState.message}</span>
          </div>
        )}

        {/* Sign In Form */}
        {mode === "signin" ? (
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectUrl} />

            <div>
              <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7468A0] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@institution.ac.in"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7468A0] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoginPending}
              className="btn-primary-violet w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
            >
              <span>{isLoginPending ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form action={signupAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#7468A0] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="First and Last Name"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7468A0] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8B8988] uppercase tracking-wider mb-1">
                Create Password (Min 8 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7468A0] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#7468A0] text-sm text-white bg-[#0D0B14] focus:bg-[#17132A] focus:border-[#A020FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#7468A0] leading-normal">
              New accounts receive the student role by default. Institute coordinator and mentor access requires manual verification by Unibotics operations.
            </p>

            <button
              type="submit"
              disabled={isSignupPending}
              className="btn-primary-violet w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
            >
              <span>{isSignupPending ? "Creating Account..." : "Register Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Security Footer Notice */}
      <div className="border-t border-[#2A2342] bg-[#08060E] px-6 py-3 text-[11px] text-[#7468A0] flex items-center justify-between">
        <span>Protected by Row Level Security</span>
        <span className="font-mono text-[#C9A3FF]">TLS 1.3</span>
      </div>
    </div>
  );
}

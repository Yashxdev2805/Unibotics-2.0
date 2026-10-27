"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { login, signup, type AuthActionResult } from "./actions";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const errorParam = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [loginState, loginAction, isLoginPending] = useActionState<AuthActionResult | null, FormData>(
    login,
    null
  );
  const [signupState, signupAction, isSignupPending] = useActionState<AuthActionResult | null, FormData>(
    signup,
    null
  );

  const isFormValid =
    mode === "signin"
      ? emailValue.trim().length > 0 && passwordValue.length > 0
      : emailValue.trim().length > 0 && passwordValue.length >= 8 && nameValue.trim().length > 0;

  return (
    <div className="w-full flex min-h-[calc(100vh-4rem)]">
      
      {/* ── Left Half: Dark Log-in Panel ──────────────────────────────── */}
      <div className="flex-1 w-full lg:max-w-[50%] bg-[#090909] p-6 sm:p-12 md:p-16 flex flex-col justify-between border-r border-[#2F3545]/50 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/unibotics-logo.png"
              alt="Unibotics Official Logo"
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-contain rounded-md drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none">
                <span className="text-[#F97316]">Uni</span>
                <span className="text-[#FF3B30]">botics</span>
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase mt-1 text-[#94A3B8] font-mono">
                Unified Intelligence &bull; Infinite Solution
              </span>
            </div>
          </Link>

          {/* Dark language select */}
          <div className="relative">
            <select
              aria-label="Language selector"
              className="appearance-none bg-transparent text-[#9C9CA4] hover:text-white border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer outline-none transition-colors"
              defaultValue="en"
            >
              <option value="en" className="bg-[#090909] text-white">English ⌄</option>
              <option value="hi" className="bg-[#090909] text-white">हिन्दी</option>
              <option value="es" className="bg-[#090909] text-white">Español</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9C9CA4] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Central Form Content */}
        <div className="w-full max-w-[390px] mx-auto py-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            {mode === "signin" ? "Welcome!" : "Create Account"}
          </h1>
          <p className="text-sm text-[#8E8E93] mb-6">
            {mode === "signin"
              ? "Log in to Unibotics to continue to the Institutional Portal."
              : "Register as a verified student to track credentials and lab sessions."}
          </p>

          {/* Error & Success Feedback */}
          {errorParam === "auth_callback_failed" && (
            <div className="mb-4 flex items-start space-x-2 border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-400 rounded-xl">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>The authentication link was invalid or has expired. Please sign in directly.</span>
            </div>
          )}

          {mode === "signin" && loginState?.error && (
            <div className="mb-4 flex items-start space-x-2 border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-400 rounded-xl">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{loginState.error}</span>
            </div>
          )}

          {mode === "signup" && signupState?.error && (
            <div className="mb-4 flex items-start space-x-2 border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-400 rounded-xl">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{signupState.error}</span>
            </div>
          )}

          {mode === "signup" && signupState?.success && (
            <div className="mb-4 flex items-start space-x-2 border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{signupState.message}</span>
            </div>
          )}

          {/* Social Logins */}
          <div className="flex flex-col gap-2.5 mb-5">
            <button
              type="button"
              className="w-full h-11 rounded-full bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/[0.03] text-white text-sm font-medium flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Log in with Google</span>
            </button>

            <button
              type="button"
              className="w-full h-11 rounded-full bg-transparent border border-white/10 hover:border-white/25 hover:bg-white/[0.03] text-white text-sm font-medium flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.82.93-2.87-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.74-.95 2.77 1.02.08 2.06-.51 2.69-1.27z"/>
              </svg>
              <span>Log in with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center text-center my-5 text-[#5A5A5E] text-xs font-bold tracking-wider">
            <span className="flex-1 border-b border-white/10"></span>
            <span className="px-3">OR</span>
            <span className="flex-1 border-b border-white/10"></span>
          </div>

          {/* Credentials Form */}
          {mode === "signin" ? (
            <form action={loginAction} className="space-y-4">
              <input type="hidden" name="redirect" value={redirectUrl} />

              <div>
                <label className="block text-xs font-semibold text-[#D1D1D6] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 px-3.5 bg-[#080808] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#E98AE0] focus:ring-2 focus:ring-[#E98AE0]/25 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#D1D1D6]">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#F29AD9] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-3.5 pr-11 bg-[#080808] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#E98AE0] focus:ring-2 focus:ring-[#E98AE0]/25 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727278] hover:text-white p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginPending || !isFormValid}
                className={`w-full h-11 rounded-full font-semibold text-sm transition-all mt-4 ${
                  isFormValid && !isLoginPending
                    ? "text-[#0B0710] font-bold shadow-[0_0_24px_rgba(233,138,224,0.45)] hover:brightness-110 active:scale-[0.99] cursor-pointer"
                    : "bg-[#18181A] text-[#48484A] border border-white/5 cursor-not-allowed"
                }`}
                style={
                  isFormValid && !isLoginPending
                    ? { background: "linear-gradient(135deg, #E98AE0 0%, #D469E3 50%, #F97316 100%)" }
                    : {}
                }
              >
                {isLoginPending ? "Authenticating..." : "Log in"}
              </button>
            </form>
          ) : (
            <form action={signupAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D1D1D6] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  placeholder="First and Last Name"
                  className="w-full h-11 px-3.5 bg-[#080808] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#E98AE0] focus:ring-2 focus:ring-[#E98AE0]/25 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D1D1D6] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 px-3.5 bg-[#080808] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#E98AE0] focus:ring-2 focus:ring-[#E98AE0]/25 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D1D1D6] mb-1.5">
                  Create Password (Min 8 chars)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={8}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-3.5 pr-11 bg-[#080808] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#E98AE0] focus:ring-2 focus:ring-[#E98AE0]/25 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727278] hover:text-white p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSignupPending || !isFormValid}
                className={`w-full h-11 rounded-full font-semibold text-sm transition-all mt-4 ${
                  isFormValid && !isSignupPending
                    ? "text-[#0B0710] font-bold shadow-[0_0_24px_rgba(233,138,224,0.45)] hover:brightness-110 active:scale-[0.99] cursor-pointer"
                    : "bg-[#18181A] text-[#48484A] border border-white/5 cursor-not-allowed"
                }`}
                style={
                  isFormValid && !isSignupPending
                    ? { background: "linear-gradient(135deg, #E98AE0 0%, #D469E3 50%, #F97316 100%)" }
                    : {}
                }
              >
                {isSignupPending ? "Creating Account..." : "Sign up"}
              </button>
            </form>
          )}

          {/* Switcher */}
          <p className="text-center text-xs text-[#8E8E93] mt-5">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-bold text-white hover:text-[#E98AE0] transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="font-bold text-white hover:text-[#E98AE0] transition-colors"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Security / Legal notice */}
        <div className="text-center text-xs text-[#5A5A5E] pt-4 border-t border-white/5">
          <span>Protected by Unibotics Row Level Security &bull; TLS 1.3 Certified</span>
        </div>
      </div>

      {/* ── Right Half: Showcase ───────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-1 w-full max-w-[50%] min-h-full flex-col items-center justify-between p-12 xl:p-16 relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 75% 30%, #17092B 0%, #080312 45%, #000000 85%)",
        }}
      >
        {/* Glowing Headline & Callout */}
        <div className="w-full max-w-md text-center pt-6 z-10">
          <h2 className="text-3xl font-medium tracking-tight text-white leading-tight mb-4">
            400K+ users. 50M+ AI<br />
            <span
              className="font-medium"
              style={{
                background: "linear-gradient(135deg, #E98AE0 0%, #F29AD9 35%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              generated graphics.
            </span>
          </h2>

          <div className="inline-flex items-center gap-1.5">
            <div
              className="w-0 h-0"
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: "7px solid #E98AE0",
                filter: "drop-shadow(0 0 6px #E98AE0)",
              }}
            />
            <span
              className="text-xs font-bold px-3.5 py-1 rounded-full text-[#07030D] shadow-glow"
              style={{
                background: "linear-gradient(135deg, #E98AE0 0%, #B867E2 100%)",
              }}
            >
              Join Now
            </span>
          </div>
        </div>

        {/* 3D Holographic Robot & Pedestal Scene */}
        <div className="w-full max-w-[421px] h-[580px] relative flex items-center justify-center my-auto">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 421 1200"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Magenta floor glow */}
              <radialGradient id="floorGlowAuth" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E98AE0" stopOpacity="0.32" />
                <stop offset="45%" stopColor="#8A2BE2" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Pink orbit glow filter */}
              <filter id="pinkGlowAuth" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Dot glow filter */}
              <filter id="dotGlowAuth" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4.5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Soft magenta floor glow at the bottom */}
            <ellipse cx="216.5" cy="540" rx="190" ry="80" fill="url(#floorGlowAuth)" />

            {/* 2. Ghosted giant "3D" outline behind */}
            <text
              x="216.5"
              y="430"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="280"
              fontWeight="800"
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1.8"
              letterSpacing="-0.06em"
              pointerEvents="none"
            >
              3D
            </text>

            {/* 3. Back half of pink orbit ellipse (drawn first) */}
            <path
              d="M 100.5 464 A 116 26 0 0 1 332.5 464"
              fill="none"
              stroke="#E98AE0"
              strokeWidth="1.4"
              opacity="0.55"
            />

            {/* 4. Iridescent Toy Robot on Pedestal */}
            <image
              href="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3fd6651e-dc6b-4339-a93a-fb627c0109e0.png"
              x="168.5"
              y="345"
              width="96"
              height="125"
              preserveAspectRatio="xMidYMax meet"
            />

            {/* 5. Front half of pink orbit ellipse (drawn after image so it wraps around) */}
            <path
              d="M 332.5 464 A 116 26 0 0 1 100.5 464"
              fill="none"
              stroke="#E98AE0"
              strokeWidth="1.8"
              filter="url(#pinkGlowAuth)"
            />

            {/* 6. Glowing pink dot on the front of the orbit ring */}
            <circle
              cx="216.5"
              cy="490"
              r="4.2"
              fill="#FFFFFF"
              stroke="#E98AE0"
              strokeWidth="2"
              filter="url(#dotGlowAuth)"
            />
          </svg>
        </div>

        {/* Bottom spacer / tag */}
        <div className="text-xs text-[#9C9CA4]/50 font-mono tracking-wider">
          AUTONOMOUS 3D EXPERIENTIAL WORKSPACE
        </div>
      </div>

    </div>
  );
}

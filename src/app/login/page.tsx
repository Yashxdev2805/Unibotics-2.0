import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Portal Access | Unibotics Institutional Gateway",
  description:
    "Secure sign-in for Atal Tinkering Lab coordinators, workshop partners, mentors, and registered STEM students.",
};

export default function LoginPage() {
  return (
    <div className="flex-1 bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-slate-300 p-8 text-center text-xs text-slate-500">
            Loading authentication gateway...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

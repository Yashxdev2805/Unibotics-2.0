import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Portal Access | Unibotics Institutional Gateway",
  description:
    "Secure sign-in for Atal Tinkering Lab coordinators, workshop partners, mentors, and registered STEM students.",
};

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 relative">
      <Suspense
        fallback={
          <div className="w-full max-w-md glass-panel p-8 text-center text-xs text-[#8B8988]">
            Loading authentication gateway...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

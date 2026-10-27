import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Portal Access & Student Registration | Unibotics",
  description:
    "Secure sign-in for Atal Tinkering Lab coordinators, workshop partners, mentors, and registered STEM students.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-stretch bg-[#0F1115]">
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center p-8 text-sm text-[#94A3B8]">
            Loading institutional gateway...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

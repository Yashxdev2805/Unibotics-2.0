"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/server";
import { loginSchema, signupSchema } from "@/lib/validation/schemas";

export type AuthActionResult = {
  error?: string;
  success?: boolean;
  message?: string;
};

export async function login(prevState: AuthActionResult | null, formData: FormData): Promise<AuthActionResult> {
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectPath = formData.get("redirect") as string | null;

  const validation = loginSchema.safeParse({ email, password });
  if (!validation.success) {
    return { error: validation.error.errors[0]?.message || "Invalid credentials provided." };
  }

  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error || !authData.user) {
    return { error: "Authentication failed. Please verify your email and password." };
  }

  // Determine redirection target
  let target = "/";
  if (redirectPath && redirectPath.startsWith("/") && !redirectPath.startsWith("//")) {
    target = redirectPath;
  } else {
    // Resolve portal destination based on approved roles
    const { data: memberships } = await supabase
      .from("memberships")
      .select("role")
      .eq("user_id", authData.user.id)
      .eq("approved", true);

    const roles = memberships?.map((m) => m.role) || [];
    if (roles.includes("super_admin")) {
      target = "/admin";
    } else if (roles.includes("team_member")) {
      target = "/team";
    } else if (roles.includes("institute_admin")) {
      target = "/institute";
    } else if (roles.includes("student")) {
      target = "/student";
    }
  }

  redirect(target);
}

export async function signup(prevState: AuthActionResult | null, formData: FormData): Promise<AuthActionResult> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");

  const validation = signupSchema.safeParse({ fullName, email, password });
  if (!validation.success) {
    return { error: validation.error.errors[0]?.message || "Invalid registration data." };
  }

  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        full_name: validation.data.fullName,
      },
    },
  });

  if (error) {
    return { error: error.message || "Failed to create account. Please try again." };
  }

  if (authData.session) {
    redirect("/student");
  }

  return {
    success: true,
    message: "Registration initiated. Please check your email to confirm your account before logging in.",
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

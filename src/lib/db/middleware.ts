import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // SECURITY: Always use getUser() instead of getSession() to re-validate token with Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protected route prefixes
  const isAdminRoute = pathname.startsWith("/admin");
  const isTeamRoute = pathname.startsWith("/team");
  const isInstituteRoute = pathname.startsWith("/institute");

  if (isAdminRoute || isTeamRoute || isInstituteRoute) {
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Fetch user's approved memberships for role authorization
    const { data: memberships, error } = await supabase
      .from("memberships")
      .select("role, institute_id, approved")
      .eq("user_id", user.id)
      .eq("approved", true);

    if (error || !memberships || memberships.length === 0) {
      const unauthorizedUrl = new URL("/unauthorized", request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    const roles = memberships.map((m) => m.role);
    const isSuperAdmin = roles.includes("super_admin");
    const isTeamMember = roles.includes("team_member");
    const isInstituteAdmin = roles.includes("institute_admin");

    if (isAdminRoute && !isSuperAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (isTeamRoute && !isSuperAdmin && !isTeamMember) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (isInstituteRoute && !isSuperAdmin && !isInstituteAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return supabaseResponse;
}

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/db/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/team/workspace/:path*",
    "/team",
    "/institute/:path*",
    "/student/:path*",
  ],
};


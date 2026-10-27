import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://unibotics.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/student",
          "/student/*",
          "/institute",
          "/institute/*",
          "/api/*",
          "/auth/*",
          "/login",
          "/unauthorized",
          "/*/book",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

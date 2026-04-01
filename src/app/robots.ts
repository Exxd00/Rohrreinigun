import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/thank-you",
        "/admin",
        "/upload",
        "/assets",
      ],
    },
    sitemap: "https://rohrreinigung-kraft.de/sitemap.xml",
  };
}

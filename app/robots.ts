import type { MetadataRoute } from "next";

// The live site's canonical address.
const BASE_URL = "https://www.quickbuiltsystems.com.au";

// Tells search engines they may crawl the whole site and where the sitemap is.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

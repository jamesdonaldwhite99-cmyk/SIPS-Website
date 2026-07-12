import type { MetadataRoute } from "next";

// The live site's canonical address.
const BASE_URL = "https://www.quickbuiltsystems.com.au";

// Tells search engines they may crawl the whole site and where the sitemap is.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep bots out of the heavy PDF brochures (they don't need indexing and
      // are large). Images under /photos stay crawlable for image SEO.
      disallow: "/pdfs/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

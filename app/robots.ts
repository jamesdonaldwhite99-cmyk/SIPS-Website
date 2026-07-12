import type { MetadataRoute } from "next";

// The live site's canonical address.
const BASE_URL = "https://www.quickbuiltsystems.com.au";

// Crawlers we block outright — AI scrapers and aggressive SEO bots that cost
// bandwidth with no benefit. Googlebot, Bingbot and facebookexternalhit are
// deliberately NOT in this list, so they stay fully allowed.
const BLOCKED_BOTS = [
  "GPTBot", "ClaudeBot", "CCBot", "Bytespider", "AhrefsBot",
  "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "DataForSeoBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: BLOCKED_BOTS, disallow: "/" },
      {
        userAgent: "*",
        allow: "/",
        // Heavy PDF brochures don't need indexing. Images under /photos stay
        // crawlable for image SEO.
        disallow: "/pdfs/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

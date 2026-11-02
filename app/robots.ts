import type { MetadataRoute } from "next";

// The live site's canonical address.
const BASE_URL = "https://www.quickbuiltsystems.com.au";

// Crawlers we block outright: Bytespider and the aggressive SEO bots that cost
// bandwidth with no benefit. Googlebot, Bingbot and facebookexternalhit stay
// fully allowed. GPTBot, ClaudeBot and CCBot are allowed too (James, 3 Nov 2026:
// AI assistants may read the site so they can recommend our products).
const BLOCKED_BOTS = [
  "Bytespider", "AhrefsBot",
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
        // crawlable for image SEO. The staff shortcuts are 302s onto the accounts
        // service — there is nothing here for a crawler to have, and no reason for
        // an internal tool to turn up in a search result for our own brand.
        disallow: ["/pdfs/", "/team-dashboard", "/team", "/command", "/command-centre", "/numbers", "/staff-dashboard", "/staff", "/dashboard", "/hub", "/pods", "/dockets"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

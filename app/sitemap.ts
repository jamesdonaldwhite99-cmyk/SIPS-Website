import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

// The live site's canonical address. Used to build the full URLs Google needs.
const BASE_URL = "https://www.quickbuiltsystems.com.au";

// Walk the /app folder and collect every route that has a page file, so any
// new page added to the site automatically appears in the sitemap on deploy.
function findRoutes(dir: string, basePath = ""): string[] {
  const routes: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  // A folder that contains a page file is a real, visitable page.
  if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js|mdx)$/.test(e.name))) {
    routes.push(basePath === "" ? "/" : basePath);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Skip API routes, private folders (_) and dynamic segments ([id]).
    if (name === "api" || name.startsWith("_") || name.startsWith("[")) continue;
    // Route groups like (marketing) don't add to the URL — recurse, keep path.
    const nextBase = name.startsWith("(") ? basePath : `${basePath}/${name}`;
    routes.push(...findRoutes(join(dir, name), nextBase));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = findRoutes(join(process.cwd(), "app"));

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

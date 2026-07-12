import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Enforced bot blocking. The worst crawlers ignore robots.txt, so we also return
// 403 for them here. Real browsers, Googlebot, Bingbot and facebookexternalhit
// are unaffected — none of their user agents match this list.
const BLOCKED = /(GPTBot|ClaudeBot|CCBot|Bytespider|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|DataForSeoBot)/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BLOCKED.test(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}

// Skip /api (lead forms, autoresponder, sales@ flow), Next.js internals and the
// favicon — this guard only screens page and asset requests.
export const config = {
  matcher: ["/((?!api/|_next/|favicon.ico).*)"],
};

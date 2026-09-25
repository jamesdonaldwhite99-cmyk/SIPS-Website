import { NextResponse } from "next/server";

/**
 * GET /api/account/abn?abn=… — pre-fill the trade account form from ABN Lookup, via the credit
 * service (which holds the ABR GUID). Returns only the register's public details. Best-effort: any
 * failure answers { found: false } and the applicant simply types the details in.
 */
const SERVICE = (process.env.CREDIT_SERVICE_URL || "").replace(/\/$/, "");
const SECRET = process.env.CREDIT_SITE_SECRET || "";

export async function GET(request: Request) {
  const abn = new URL(request.url).searchParams.get("abn")?.replace(/\D/g, "") || "";
  console.log("[/api/account/abn] received");
  if (!SERVICE || !SECRET || abn.length !== 11) return NextResponse.json({ found: false });
  try {
    const res = await fetch(`${SERVICE}/abn/${abn}`, {
      headers: { "x-credit-site-secret": SECRET, "x-applicant-ip": (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() },
      signal: AbortSignal.timeout(15_000),
    });
    const body = await res.json().catch(() => ({ found: false }));
    console.log(`[/api/account/abn] done status=${res.status} found=${Boolean(body.found)}`);
    return NextResponse.json(res.ok ? body : { found: false });
  } catch {
    console.log("[/api/account/abn] done unreachable");
    return NextResponse.json({ found: false });
  }
}

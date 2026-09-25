import { NextResponse } from "next/server";

/**
 * POST /api/account — the trade account application, forwarded to the QBS credit service.
 *
 * A THIN FORWARDER, AND A QUIET ONE. It adds the shared secret, the applicant's IP and browser (for
 * the signing record), and passes the reply straight back. Unlike /api/lead it NEVER logs the body:
 * an application carries dates of birth, home addresses and licence numbers, and Vercel logs are not
 * the place for them. Only the reference and the outcome are logged. If the service cannot be
 * reached the applicant is told so and can simply press Submit again — the same submission id means
 * a retry can never create a second application.
 */
const SERVICE = (process.env.CREDIT_SERVICE_URL || "").replace(/\/$/, "");
const SECRET = process.env.CREDIT_SITE_SECRET || "";
const MAX_BYTES = 1_000_000;

async function alert(text: string) {
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;
  try { await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }); } catch { /* never throws */ }
}

export async function POST(request: Request) {
  console.log("[/api/account] received");
  if (!SERVICE || !SECRET) {
    console.error("[/api/account] CREDIT_SERVICE_URL / CREDIT_SITE_SECRET not set");
    return NextResponse.json({ ok: false, error: "Online applications are not available right now. Please call 1300 132 787." }, { status: 503 });
  }
  const text = await request.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ ok: false, error: "That application is too large to send." }, { status: 413 });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "";
  try {
    const res = await fetch(`${SERVICE}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-credit-site-secret": SECRET,
        "x-applicant-ip": ip,
        "x-applicant-user-agent": request.headers.get("user-agent") || "",
      },
      body: text,
      signal: AbortSignal.timeout(55_000),
    });
    const body = await res.json().catch(() => ({ ok: false, error: "Unexpected reply from the application service." }));
    console.log(`[/api/account] done status=${res.status}${body.ref ? ` ref=${body.ref}` : ""}${body.duplicate ? " duplicate" : ""}`);
    if (res.status >= 500) await alert(`🚨 Trade account application NOT accepted — credit service answered ${res.status}. The applicant was asked to retry.`);
    return NextResponse.json(body, { status: res.status });
  } catch (e) {
    console.error(`[/api/account] service unreachable: ${(e as Error).message}`);
    await alert("🚨 Trade account application NOT delivered — the credit service could not be reached. The applicant was asked to retry.");
    return NextResponse.json({ ok: false, error: "We couldn't send your application just now. Please press Submit again in a minute — nothing has been lost." }, { status: 502 });
  }
}

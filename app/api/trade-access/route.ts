import { NextResponse, type NextRequest } from "next/server";
import { TRADE_COOKIE, TRADE_DAYS, mintTradeToken } from "@/lib/tradeDocs";

/* Grants the trade documents cookie (lib/tradeDocs.ts) to anyone who has left a name and email in the
   trade guide's details form. The details themselves go to /api/lead from the same form, as every
   download does; this only opens the documents. */

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; hp?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (body.hp) return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  if (!body.name?.trim() || !EMAIL_RE.test(body.email?.trim() || "")) {
    return NextResponse.json({ ok: false, reason: "details" }, { status: 400 });
  }
  const token = mintTradeToken();
  if (!token) return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TRADE_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: TRADE_DAYS * 86400 });
  return res;
}

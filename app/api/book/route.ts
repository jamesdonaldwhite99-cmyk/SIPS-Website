import { NextResponse } from "next/server";
import { nurture } from "@/lib/nurture";

/* The booking form's only door to James's calendar (components/BookCall.tsx). Books as "systems"
   (automations/nurture/routes.js BOOK_BRANDS): the texts say Quick Built Systems and the Capsule contact gets no End
   User tag (these are builders and trade). The service key stays on this side. */
export const dynamic = "force-dynamic";

export async function GET() {
  const slots = await nurture("/nurture/slots");
  if (slots.status === 503) return NextResponse.json({ ok: false, notConfigured: true }, { status: 503 });
  if (slots.status !== 200) return NextResponse.json({ ok: false, error: slots.data.error || "Booking is unavailable right now." }, { status: 502 });
  return NextResponse.json({ ok: true, slots: slots.data.slots || [] });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 }); }
  const str = (v: unknown, max = 200) => String(v ?? "").slice(0, max);
  const answers = (body.answers || {}) as Record<string, unknown>;
  const payload = {
    brand: "systems",
    start: str(body.start, 40),
    name: str(body.name, 120),
    email: str(body.email, 200),
    mobile: str(body.mobile, 30),
    answers: {
      project: str(answers.project, 80), size: str(answers.size, 120), timeframe: str(answers.timeframe, 60), notes: str(answers.notes, 1000),
    },
  };
  console.log(`[/api/book] ${payload.name} <${payload.email}> ${payload.start}`);
  const r = await nurture("/nurture/book", { method: "POST", body: payload, timeoutMs: 30000 });
  return NextResponse.json(r.data, { status: r.status });
}

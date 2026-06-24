import { NextResponse } from "next/server";
import resourcesData from "@/content/resources.json";
import contactData from "@/content/contact.json";

// The QBS Quote Service (Render). Patio quote enquiries go here instead of the Make.com scenario.
const QUOTE_SERVICE_URL = process.env.QUOTE_SERVICE_URL;

// Allow only known webhook URLs from CMS — prevents the endpoint being abused to forward arbitrary requests.
function isAllowedWebhook(url: string): boolean {
  const allowList = [
    resourcesData.webhookUrl,
    contactData.webhookUrl,
    contactData.patioWebhookUrl,
  ].filter(Boolean);
  return allowList.includes(url);
}

export async function POST(request: Request) {
  console.log("[/api/lead] received");
  try {
    const body = await request.json();
    const { webhookUrl: requestedUrl, ...payload } = body as { webhookUrl?: string; formType?: string };

    // Patio quote enquiries → the QBS Quote Service (shared back office with Quick Built). The
    // service acknowledges instantly and runs the quote in the background (price → PDF → SharePoint
    // → Capsule → estimator email; or logs a manual-quote enquiry). Tagged "Quick Built Systems".
    if (payload.formType === "patio-quote" && QUOTE_SERVICE_URL) {
      try {
        const res = await fetch(QUOTE_SERVICE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source: "Quick Built Systems" }),
        });
        console.log("[/api/lead] quote service responded", res.status);
        return NextResponse.json({ ok: res.ok, via: "quote-service", status: res.status });
      } catch (err) {
        console.error("[/api/lead] quote service error", err);
        return NextResponse.json({ ok: false, error: "Quote service unavailable" }, { status: 502 });
      }
    }

    // Everything else (general enquiry, resource downloads) → Make.com webhook (unchanged for now).
    const webhookUrl = requestedUrl || resourcesData.webhookUrl;

    if (!webhookUrl || webhookUrl.includes("PLACEHOLDER")) {
      console.log("[/api/lead] no webhook configured, skipping");
      return NextResponse.json({ ok: true, skipped: true });
    }

    if (!isAllowedWebhook(webhookUrl)) {
      console.warn("[/api/lead] rejected non-allowed webhook URL");
      return NextResponse.json({ ok: false, error: "Webhook not allowed" }, { status: 400 });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("[/api/lead] webhook responded", res.status);
    return NextResponse.json({ ok: res.ok, status: res.status });
  } catch (err) {
    console.error("[/api/lead] error", err);
    return NextResponse.json({ ok: false, error: "Failed to forward" }, { status: 500 });
  }
}

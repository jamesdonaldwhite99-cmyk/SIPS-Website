import { NextResponse } from "next/server";
import resourcesData from "@/content/resources.json";
import contactData from "@/content/contact.json";

// The QBS Quote/Enquiry Service (Render). All website forms route here, replacing Make.com.
const QUOTE_SERVICE_URL = process.env.QUOTE_SERVICE_URL; // .../quote
const ENQUIRY_SERVICE_URL = QUOTE_SERVICE_URL ? QUOTE_SERVICE_URL.replace(/\/quote$/, "/enquiry") : undefined;
const SOURCE = "Quick Built Systems";

// Allow only known webhook URLs from CMS — used only by the legacy Make.com fallback below.
function isAllowedWebhook(url: string): boolean {
  const allowList = [
    resourcesData.webhookUrl,
    contactData.webhookUrl,
    contactData.patioWebhookUrl,
  ].filter(Boolean);
  return allowList.includes(url);
}

async function forward(url: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: res.ok, via: "service", status: res.status });
  } catch (err) {
    console.error("[/api/lead] service error", err);
    return NextResponse.json({ ok: false, error: "Service unavailable" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  console.log("[/api/lead] received");
  try {
    const body = await request.json();
    const { webhookUrl: requestedUrl, ...payload } = body as {
      webhookUrl?: string;
      formType?: string;
      resourceTitle?: string;
    };

    // 1) Patio quote → quote pipeline (price → PDF → SharePoint → Capsule → email).
    if (payload.formType === "patio-quote" && QUOTE_SERVICE_URL) {
      return forward(QUOTE_SERVICE_URL, { ...payload, source: SOURCE });
    }
    // 2) Resource download → enquiry service (Capsule contact + task + email to sales).
    if (ENQUIRY_SERVICE_URL && payload.resourceTitle) {
      return forward(ENQUIRY_SERVICE_URL, { ...payload, source: SOURCE, kind: "download" });
    }
    // 3) Any other enquiry → enquiry service (Capsule contact + task + photos + email to estimator).
    if (ENQUIRY_SERVICE_URL) {
      return forward(ENQUIRY_SERVICE_URL, { ...payload, source: SOURCE, kind: "enquiry" });
    }

    // Fallback — only if the service URL isn't configured: legacy Make.com webhook.
    const webhookUrl = requestedUrl || resourcesData.webhookUrl;
    if (!webhookUrl || webhookUrl.includes("PLACEHOLDER")) {
      return NextResponse.json({ ok: true, skipped: true });
    }
    if (!isAllowedWebhook(webhookUrl)) {
      return NextResponse.json({ ok: false, error: "Webhook not allowed" }, { status: 400 });
    }
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: res.ok, status: res.status });
  } catch (err) {
    console.error("[/api/lead] error", err);
    return NextResponse.json({ ok: false, error: "Failed to forward" }, { status: 500 });
  }
}

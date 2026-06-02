import { NextResponse } from "next/server";
import resourcesData from "@/content/resources.json";
import contactData from "@/content/contact.json";

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
    const { webhookUrl: requestedUrl, ...payload } = body as { webhookUrl?: string };

    // Default to the resources webhook (download gate) if no URL specified.
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

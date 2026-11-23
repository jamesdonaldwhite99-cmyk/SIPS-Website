/* Server-side calls from this site to the call booker on the QBS service (Render): James's free times and the booking.
 *
 * The same service and the same calendar as the homes site's booking (automations/nurture/booking.js). The key
 * (NURTURE_SITE_KEY) lives only in Vercel's environment and these routes, never in a page, which is why the booking
 * form talks to /api/book here rather than to the service directly. Without the key or QUOTE_SERVICE_URL the booking
 * form hides itself (James, 23 Nov 2026: "call booker ... should we add it to all sites?").
 *
 * Service address: derived from QUOTE_SERVICE_URL, exactly as /api/lead derives /enquiry from it. */
const SERVICE = (process.env.QUOTE_SERVICE_URL || "").replace(/\/quote\/?$/, "");

export const nurtureConfigured = () => Boolean(SERVICE && process.env.NURTURE_SITE_KEY);

export async function nurture(path: string, init: { method?: string; body?: unknown; timeoutMs?: number } = {}) {
  if (!nurtureConfigured()) return { status: 503, data: { ok: false, error: "Booking is not set up yet." } };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), init.timeoutMs ?? 20000);
  try {
    const res = await fetch(`${SERVICE}${path}`, {
      method: init.method || "GET",
      headers: {
        "x-nurture-key": process.env.NURTURE_SITE_KEY as string,
        ...(init.body !== undefined ? { "content-type": "application/json" } : {}),
      },
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: ctrl.signal,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch {
    return { status: 502, data: { ok: false, error: "Booking is unavailable right now. Please call James on 0466 062 906." } };
  } finally {
    clearTimeout(timer);
  }
}

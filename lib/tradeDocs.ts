/* Trade documents (James 24 Nov 2026, approve-trade-packs: "every document with its own cover and a
 * download link"). The same gate as Quick Built Fencing's (lib/tradeDocs.ts there, 4 Nov 2026).
 *
 * WHY NOT public/. Anything in public/ is served to anyone who has the URL, form or no form. These
 * files live in trade-docs/ at the repo root and are only served by app/trade-docs/[file]/route.ts,
 * which checks a signed, HttpOnly access cookie first.
 *
 * THE GATE. The trade guide's details form (components/DownloadGate.tsx) sends the visitor's name and
 * email to /api/lead, as every download does, then asks /api/trade-access for the cookie (30 days).
 * The guide's own links (/pdfs/trade/<file>, as printed in the PDF) redirect to /trade-docs/<file>
 * (next.config.mjs); without the cookie they land on /trade?trade=1, where the guide's form opens.
 *
 * THE SECRET. TRADE_DOCS_SECRET if set, otherwise another secret the site already runs with. With none
 * of them set, the gate stays shut (no cookie can be minted) and the form says to call us. */
import { createHmac, timingSafeEqual } from "crypto";

export const TRADE_COOKIE = "qb_trade";
export const TRADE_DAYS = 30;

/** Every file the route will serve, by its published name. Nothing else in trade-docs/ is reachable. */
export const TRADE_FILES: Record<string, { title: string; source: string }> = {
  "qbs-insulated-panels-trade-guide.pdf": { title: "Insulated Panels Trade Guide", source: "public/pdfs/qbs-insulated-panels-trade-guide.pdf (Oct 2026 edition, approved 24 Nov 2026)" },
  "insulspan-data-sheet.pdf": { title: "Insulspan product data sheet", source: "QuickBuilt/Product Technical/QuickBuilt Technical Data Sheet-Insulspan.3.pdf" },
  "panelcore-brochure.pdf": { title: "Panelcore insulated steel panels", source: "QuickBuilt/Home Improvement/Panelcore/47807QBS-Panelcore Steel Panel A4 Brochure_V4.pdf" },
  "wind-classification-guide.pdf": { title: "Wind classification guide", source: "QuickBuilt/Home Improvement/Slimline/50016QBS-Wind Speed Guide A4 Brochure (Mar 2026)_V3.pdf" },
  "patio-roof-engineering-22-1204-ST.pdf": { title: "Patio roof engineering details (22-1204-ST)", source: "QuickBuilt/Home Improvement/Insulspan/Form 15/22-1204-ST-2024-03-13.pdf" },
  "qld-form-15-design-certificate.pdf": { title: "Queensland Form 15 design certificate", source: "QuickBuilt/Home Improvement/Insulspan/Form 15/22-1204-FORM15-2022-10-14.pdf" },
  "patio-cover-beam-span-tables.pdf": { title: "Patio cover beam span tables", source: "QuickBuilt/Home Improvement/Alyspan/QBS Steel Beam Span Tables.pdf" },
  "ipca-bushfire-roof-panels.pdf": { title: "Bushfire guidance: insulated roof panels", source: "QuickBuilt/Home Improvement/Technical/IPCA BAL 29 Roof Letter.pdf" },
  "ipca-bushfire-wall-panels.pdf": { title: "Bushfire guidance: insulated wall panels", source: "QuickBuilt/Home Improvement/Technical/IPCA BAL 29 Wall Letter.pdf" },
  "qbs-10-year-limited-warranty.pdf": { title: "10-year limited warranty", source: "QuickBuilt/Administration/Warranty/QBS - 10 Year Limited Warranty.pdf" },
  "qbs-storage-handling-installation.pdf": { title: "Storage, handling and installation requirements", source: "QuickBuilt/Administration/Warranty/QBS Insulated Panels Storage and Handling Guide.pdf" },
};

function secret(): string {
  return (
    process.env.TRADE_DOCS_SECRET ||
    process.env.QUOTE_SIGNING_SECRET ||
    process.env.CREDIT_SITE_SECRET ||
    process.env.ESTIMATOR_PASSWORD ||
    ""
  );
}

export const tradeGateConfigured = () => secret().length > 0;

const b64url = (b: Buffer) => b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function sign(body: string): string {
  // Domain-separated, so a value signed here is never valid anywhere else the same secret is used.
  return b64url(createHmac("sha256", secret()).update(`trade-docs:v1:${body}`).digest());
}

/** A cookie value good for TRADE_DAYS. Null when the gate has no secret. */
export function mintTradeToken(now = Date.now()): string | null {
  if (!tradeGateConfigured()) return null;
  const exp = String(Math.floor(now / 1000) + TRADE_DAYS * 86400);
  return `${exp}.${sign(exp)}`;
}

export function verifyTradeToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !tradeGateConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d{9,11}$/.test(exp)) return false;
  if (Number(exp) * 1000 < now) return false;
  const want = Buffer.from(sign(exp));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}

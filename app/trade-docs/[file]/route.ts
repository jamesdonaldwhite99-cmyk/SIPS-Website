import { readFile } from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";
import { TRADE_COOKIE, TRADE_FILES, verifyTradeToken } from "@/lib/tradeDocs";

/* Serves a trade document only to a visitor holding the trade access cookie (lib/tradeDocs.ts).
   Anyone else, including a link clicked inside the trade guide PDF without access, is sent to the
   trade page, where the guide's details form opens. Never indexed, never cached by a shared cache. */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };

export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  const name = params.file;
  if (!Object.prototype.hasOwnProperty.call(TRADE_FILES, name)) {
    return new NextResponse("Not found", { status: 404, headers: NOINDEX });
  }
  if (!verifyTradeToken(req.cookies.get(TRADE_COOKIE)?.value)) {
    const to = new URL("/trade", req.url);
    to.searchParams.set("trade", "1");
    return NextResponse.redirect(to, { status: 302, headers: NOINDEX });
  }
  const body = await readFile(path.join(process.cwd(), "trade-docs", name));
  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: {
      ...NOINDEX,
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${name}"`,
    },
  });
}

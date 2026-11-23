"use client";

import { useCallback, useEffect, useState } from "react";
import DownloadGate from "@/components/DownloadGate";

/* The trade guide's download button on /trade (components/TradeJoin.tsx). It opens the same details
   form as every download on the site; the guide and its documents are served from /trade-docs/ only
   after that form (lib/tradeDocs.ts). A guide link opened without access lands on /trade?trade=1,
   which opens this form straight away. */
type Resource = { title: string; href: string; fileType: string; fileSize: string };

export default function TradePackButton({ resource, label }: { resource: Resource; label: string }) {
  const [open, setOpen] = useState<Resource | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("trade") === "1") setOpen(resource);
  }, [resource]);
  return (
    <>
      <button type="button" className="ts-btn ts-btn--primary" onClick={() => setOpen(resource)}>
        {label}
        <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </button>
      <DownloadGate resource={open} webhookUrl="" onClose={close} />
    </>
  );
}

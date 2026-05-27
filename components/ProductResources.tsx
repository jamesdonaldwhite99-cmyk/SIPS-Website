"use client";

import { useState } from "react";
import Image from "next/image";
import resourcesData from "@/content/resources.json";
import DownloadGate, { hasStoredAccess } from "@/components/DownloadGate";

type ResourceItem = (typeof resourcesData.resources)[number];

type Props = {
  eyebrow?: string;
  h2?: string;
  lead?: string;
  files: string[];
};

function pickResources(files: string[]): ResourceItem[] {
  const all = resourcesData.resources;
  return files
    .map((f) => all.find((r) => r.href.split("/").pop() === f))
    .filter((r): r is ResourceItem => Boolean(r));
}

export default function ProductResources({
  eyebrow = "Resources",
  h2 = "Specs, brochures and install guides.",
  lead = "Download technical documentation for this product range.",
  files,
}: Props) {
  const items = pickResources(files);
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);

  if (items.length === 0) return null;

  const handleClick = (e: React.MouseEvent, r: ResourceItem) => {
    e.preventDefault();
    const access = hasStoredAccess();
    if (access) {
      const a = document.createElement("a");
      a.href = r.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.download = r.href.split("/").pop() || "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    setActiveResource(r);
  };

  return (
    <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
      <div className="ts-container">
        <div className="ts-section-head">
          <div>
            <div className="ts-eyebrow">{eyebrow}</div>
            <h2>{h2}</h2>
          </div>
          <p>{lead}</p>
        </div>

        <div className="ts-resource-grid">
          {items.map((r, i) => (
            <a
              key={i}
              href={r.href}
              className="ts-resource-card"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClick(e, r)}
            >
              <div className="ts-resource-cover">
                <Image src={r.cover} alt={r.title} fill style={{ objectFit: "cover" }} sizes="320px" />
                <div className="ts-resource-download-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download
                </div>
              </div>
              <div className="ts-resource-body">
                <div className="kicker">{r.kicker}</div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
                <div className="ts-resource-meta">
                  <span>{r.fileType}</span>
                  <span>{r.fileSize}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <DownloadGate
        resource={activeResource}
        webhookUrl={resourcesData.webhookUrl || ""}
        onClose={() => setActiveResource(null)}
      />
    </section>
  );
}

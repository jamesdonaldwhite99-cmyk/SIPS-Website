"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/resources.json";
import DownloadGate, { hasStoredAccess } from "@/components/DownloadGate";

gsap.registerPlugin(ScrollTrigger);

type Resource = (typeof data.resources)[number];

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  const handleDownloadClick = (e: React.MouseEvent, r: Resource) => {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".resource-card-animate", {
        scrollTrigger: { trigger: ".ts-resource-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power3.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section style={{ background: "var(--color-ink)", color: "var(--color-on-primary)", padding: "88px 0 72px" }}>
        <div className="ts-container">
          <div className="ts-eyebrow hero-animate" style={{ color: "var(--ts-accent)" }}>Resources</div>
          <h1
            className="hero-animate"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 400, lineHeight: 0.98, letterSpacing: "-1.8px",
              color: "var(--color-on-primary)",
              margin: "16px 0 20px", maxWidth: "18ch",
            }}
          >
            {data.heroH1}
          </h1>
          <p
            className="hero-animate"
            style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", maxWidth: "44ch", margin: 0 }}
          >
            {data.heroLead}
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-resource-grid">
            {data.resources.map((r, i) => (
              <a
                key={i}
                href={r.href}
                className="ts-resource-card resource-card-animate"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleDownloadClick(e, r)}
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
      </section>

      {/* CTA */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)", textAlign: "center", paddingBlock: "72px" }}>
        <div className="ts-container">
          <div style={{ maxWidth: 600, marginInline: "auto" }}>
            <div className="ts-eyebrow" style={{ justifyContent: "center" }}>{data.ctaEyebrow}</div>
            <h2
              style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 400, letterSpacing: "-1px", color: "var(--color-ink)",
                margin: "16px 0 16px",
              }}
            >
              {data.ctaH2}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", margin: "0 0 32px" }}>
              {data.ctaBody}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="ts-btn ts-btn--dark">
                {data.ctaPrimary}
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a href={`tel:${data.ctaPhone.replace(/\s+/g, "")}`} className="ts-btn ts-btn--ghost">
                {data.ctaPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <DownloadGate
        resource={activeResource}
        webhookUrl={data.webhookUrl || ""}
        onClose={() => setActiveResource(null)}
      />
    </div>
  );
}

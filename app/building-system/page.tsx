"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/building-system.json";

gsap.registerPlugin(ScrollTrigger);

export default function BuildingSystemPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".ts-product-specstrip", start: "top 85%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
      });

      gsap.from(".step-item", {
        scrollTrigger: { trigger: ".process-section", start: "top 80%", once: true },
        x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      });

      gsap.from(".system-animate", {
        scrollTrigger: { trigger: ".system-section", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="ts-product-hero">
        <div className="ts-container">
          <div className="ts-product-hero-grid">
            <div className="ts-product-hero-text">
              <div className="ts-breadcrumbs hero-animate">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <span>Building System</span>
              </div>
              <div className="kicker hero-animate">{data.heroEyebrow}</div>
              <h1 className="hero-animate">{data.heroH1}</h1>
              <p className="lead hero-animate">{data.heroLead}</p>
              <div className="actions hero-animate">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Get a quote
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/resources" className="ts-btn ts-btn--ghost-on-dark">Download specs</Link>
              </div>
            </div>
            <div className="ts-product-hero-photo">
              <Image src={data.heroPhoto} alt="ThermaSpan Building System" fill style={{ objectFit: "cover" }} priority sizes="60vw" />
              <span className="ts-photo-tag">{data.heroEyebrow}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="ts-product-specstrip">
        <div className="ts-container">
          <div className="ts-product-specstrip-grid">
            {data.performanceStats.map((s, i) => (
              <div key={i} className="ts-product-specstrip-item stat-item">
                <div className="label">{s.label}</div>
                <div className="value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="ts-section process-section" id="process">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.processEyebrow}</div>
              <h2>{data.processH2}</h2>
            </div>
            <p>{data.processLead}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 48 }}>
            {data.steps.map((step, i) => (
              <div
                key={i}
                className="step-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: 32,
                  padding: "32px 0",
                  borderBottom: "1px solid var(--color-hairline)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 48,
                    fontWeight: 400,
                    letterSpacing: "-2px",
                    color: "var(--ts-accent)",
                    lineHeight: 1,
                    opacity: 0.3,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 400,
                      letterSpacing: "-0.5px",
                      color: "var(--color-ink)",
                      margin: "0 0 10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", margin: 0, maxWidth: "56ch" }}>
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-product-hero-grid" style={{ minHeight: "auto" }}>
            <div className="ts-product-hero-text" style={{ paddingRight: 56, color: "var(--color-ink)" }}>
              <div className="kicker" style={{ color: "var(--ts-accent)", display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 500, letterSpacing: "1.6px", textTransform: "uppercase", marginBottom: 22 }}>
                <span style={{ width: 28, height: 1, background: "currentColor", display: "inline-block" }} />
                Watch our build video
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.6vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-1.4px",
                  color: "var(--color-ink)",
                  margin: "0 0 20px",
                }}
              >
                A complete envelope,{" "}
                <em style={{ fontStyle: "italic" }}>installed in days.</em>
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: "var(--color-graphite)", margin: 0, maxWidth: "44ch" }}>
                Watch a complete two-storey extension reach lock-up using our SIPs system
                — start to finish, panel by panel. The same factory-precise process every
                ThermaSpan job uses.
              </p>
            </div>
            <div className="ts-product-hero-photo" style={{ minHeight: 360 }}>
              <video
                ref={videoRef}
                src="/photos/panelspan-hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#0c0d0f" }}
              />
              <span className="ts-photo-tag">4 min 32 sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete system */}
      <section className="ts-section system-section">
        <div className="ts-container">
          <div className="ts-intro">
            <div className="ts-intro-photo system-animate">
              <Image src="/photos/roof-down-walls.jpg" alt="Panelspan + Insulspan envelope" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">Panelspan® + Insulspan® envelope</span>
            </div>
            <div className="ts-intro-text">
              <div className="ts-eyebrow system-animate">{data.systemEyebrow}</div>
              <h2 className="system-animate">{data.systemH2}</h2>
              <p className="system-animate">{data.systemPara1}</p>
              <p className="system-animate">{data.systemPara2}</p>
              <div className="ts-cta-row system-animate">
                <Link href="/contact" className="ts-btn ts-btn--dark">
                  Request a quote
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/products" className="ts-btn ts-btn--ghost">View products</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Ready to build with ThermaSpan?</h2>
              <p>Get a no-obligation quote for your project — patio, extension, new build or commercial.</p>
            </div>
            <div className="ts-cta-card">
              <span className="ts-eyebrow">Speak to our team</span>
              <a href="tel:1300132787" className="phone">1300 132 787</a>
              <p className="hours">Mon–Fri · 7:30am – 4:30pm AEST</p>
              <div className="actions">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Request a quote
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

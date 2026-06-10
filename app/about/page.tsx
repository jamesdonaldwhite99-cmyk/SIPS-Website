"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/about.json";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2,
      });

      gsap.from(".story-animate", {
        scrollTrigger: { trigger: ".story-section", start: "top 75%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });

      gsap.from(".bleed-animate", {
        scrollTrigger: { trigger: ".bleed-section", start: "top 80%", once: true },
        scale: 1.04, opacity: 0, duration: 1.2, ease: "power2.out",
      });

      gsap.from(".story-cont-animate", {
        scrollTrigger: { trigger: ".story-cont-section", start: "top 75%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".ts-product-specstrip", start: "top 85%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
      });

      gsap.from(".video-animate", {
        scrollTrigger: { trigger: ".video-section", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
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
      <PageHero crumb="About" eyebrow={data.heroEyebrow} h1={data.heroH1} lead={data.heroLead} photo={data.heroPhoto} />

      {/* Story — intro (paras 1-2) */}
      <section className="ts-section story-section" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-story-intro">
            <div>
              <div
                className="story-animate"
                style={{
                  fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
                  fontWeight: 600, color: "var(--ts-accent)", marginBottom: 24,
                }}
              >
                {data.storyEyebrow}
              </div>
              <h2
                className="story-animate"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.6vw, 52px)",
                  fontWeight: 400, lineHeight: 1.05,
                  letterSpacing: "-1.4px",
                  color: "var(--color-ink)",
                  margin: 0, maxWidth: "14ch",
                }}
              >
                {data.storyH2}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p className="story-animate">{data.storyPara1}</p>
              <p className="story-animate">{data.storyPara2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed photo */}
      <section className="bleed-section" style={{ background: "var(--ts-cream-2)", paddingBottom: 80 }}>
        <div className="bleed-animate" style={{ position: "relative", width: "100%", aspectRatio: "21 / 9", overflow: "hidden", background: "#1F1F1F" }}>
          <Image
            src={data.bleedPhoto || data.heroPhoto}
            alt={data.bleedPhotoCaption || "Quick Built Systems"}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          {data.bleedPhotoCaption && (
            <span
              style={{
                position: "absolute", bottom: 20, right: 24,
                background: "rgba(0,0,0,0.35)", color: "#fff",
                fontSize: 12, letterSpacing: 1.4, textTransform: "uppercase",
                padding: "8px 14px", borderRadius: 2, backdropFilter: "blur(4px)",
              }}
            >
              {data.bleedPhotoCaption}
            </span>
          )}
        </div>
      </section>

      {/* Story — continued (paras 3-5) */}
      <section className="ts-section story-cont-section" style={{ background: "var(--ts-cream-2)", paddingTop: 0 }}>
        <div className="ts-container">
          <div style={{ maxWidth: "70ch", margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
            <p className="story-cont-animate" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--color-graphite)", margin: 0 }}>{data.storyPara3}</p>
            <p className="story-cont-animate" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--color-graphite)", margin: 0 }}>{data.storyPara4}</p>
            <p className="story-cont-animate" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--color-graphite)", margin: 0 }}>{data.storyPara5}</p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="ts-product-specstrip">
        <div className="ts-container">
          <div className="ts-product-specstrip-grid">
            {data.stats.map((s, i) => (
              <div key={i} className="ts-product-specstrip-item stat-item">
                <div className="label">{s.label}</div>
                <div className="value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video section */}
      <section className="ts-section video-section" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-product-hero-grid" style={{ minHeight: "auto" }}>
            <div className="ts-product-hero-text" style={{ paddingRight: 56, color: "var(--color-ink)" }}>
              <div
                className="video-animate"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontSize: 13, fontWeight: 500, letterSpacing: "1.6px",
                  textTransform: "uppercase", color: "var(--ts-accent)", marginBottom: 22,
                }}
              >
                <span style={{ width: 28, height: 1, background: "currentColor", display: "inline-block" }} />
                {data.videoEyebrow}
              </div>
              <h2
                className="video-animate"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.6vw, 52px)",
                  fontWeight: 400, lineHeight: 1.0,
                  letterSpacing: "-1.4px",
                  color: "var(--color-ink)",
                  margin: "0 0 20px",
                }}
              >
                {data.videoH2}
              </h2>
              <p className="video-animate" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--color-graphite)", margin: 0, maxWidth: "44ch" }}>
                {data.videoLead}
              </p>
            </div>
            <div className="ts-product-hero-photo video-animate" style={{ minHeight: 360 }}>
              <video
                ref={videoRef}
                src="/photos/panelspan-hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#1F1F1F" }}
              />
              <span className="ts-photo-tag">{data.videoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete system */}
      <section className="ts-section system-section">
        <div className="ts-container">
          <div className="ts-intro">
            <div className="ts-intro-photo system-animate">
              <Image src="/photos/roof-down-walls.jpg" alt="Panelspan + Insulspan envelope at dusk" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">Panelspan® + Insulspan® envelope</span>
            </div>
            <div className="ts-intro-text">
              <div className="ts-eyebrow system-animate">Our system</div>
              <h2 className="system-animate">{data.systemH2}</h2>
              <p className="system-animate">{data.systemPara1}</p>
              <p className="system-animate">{data.systemPara2}</p>
              <div className="ts-cta-row system-animate">
                <a href="https://www.quickbuilthomes.com.au/" target="_blank" rel="noopener noreferrer" className="ts-btn ts-btn--dark">
                  See how it works
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
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
              <h2>Ready to build with Quick Built Systems?</h2>
              <p>Talk to our team about your next project. We&apos;ll put together a no-obligation quote with panel specs and timeline.</p>
            </div>
            <div className="ts-cta-card">
              <span className="ts-eyebrow">Speak to our team</span>
              <a href="tel:1300132787" className="phone">1300 132 787</a>
              <p className="hours">Mon–Fri · 7:30am – 4:30pm AEST</p>
              <div className="actions">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Enquire Now
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

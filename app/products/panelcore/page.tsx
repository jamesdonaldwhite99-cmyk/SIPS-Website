"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/panelcore.json";

gsap.registerPlugin(ScrollTrigger);

export default function PanelcorePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".spec-item", {
        scrollTrigger: { trigger: ".ts-product-specstrip", start: "top 85%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
      });
      gsap.from(".overview-animate", {
        scrollTrigger: { trigger: ".overview-section", start: "top 75%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
      gsap.from(".app-row-animate", {
        scrollTrigger: { trigger: ".ts-app-list", start: "top 80%", once: true },
        x: -20, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out",
      });
      gsap.from(".advantage-item", {
        scrollTrigger: { trigger: ".ts-advantages-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <section className="ts-product-hero">
        <div className="ts-container">
          <div className="ts-product-hero-grid">
            <div className="ts-product-hero-text">
              <div className="ts-breadcrumbs hero-animate">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <Link href="/products">Products</Link>
                <span className="sep">/</span>
                <span>Panelcore®</span>
              </div>
              <div className="kicker hero-animate">{data.kicker}</div>
              <h1 className="hero-animate">
                {data.heroTitle}<br />
                <em style={{ color: "var(--ts-accent)" }}>{data.heroTitleAccent}</em>
              </h1>
              <p className="lead hero-animate">{data.heroLead}</p>
              <div className="actions hero-animate">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Enquire Now
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/resources" className="ts-btn ts-btn--ghost-on-dark">Download specs</Link>
              </div>
            </div>
            <div className="ts-product-hero-photo">
              <Image src={data.heroPhoto} alt={data.kicker} fill style={{ objectFit: "cover" }} priority sizes="60vw" />
              <span className="ts-photo-tag">{data.heroPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="ts-product-specstrip">
        <div className="ts-container">
          <div className="ts-product-specstrip-grid">
            {data.specs.map((s, i) => (
              <div key={i} className="ts-product-specstrip-item spec-item">
                <div className="label">{s.label}</div>
                <div className="value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="ts-section overview-section">
        <div className="ts-container">
          <div className="ts-intro">
            <div className="ts-intro-text">
              <div className="ts-eyebrow overview-animate">{data.overviewEyebrow}</div>
              <h2 className="overview-animate">{data.overviewH2}</h2>
              <p className="overview-animate">{data.overviewPara1}</p>
              <p className="overview-animate">{data.overviewPara2}</p>
              <p className="overview-animate">{data.overviewPara3}</p>
              <div className="ts-cta-row overview-animate">
                <Link href="/contact" className="ts-btn ts-btn--dark">
                  Get a quote
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="ts-intro-photo overview-animate">
              <Image src={data.overviewPhoto} alt="Panelcore overview" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">{data.overviewPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Applications</div>
              <h2>Engineered for sunrooms, outdoor rooms and cold storage.</h2>
            </div>
            <p>From bright, year-round sunrooms and enclosed outdoor living to walk-in cool rooms and cold storage — one insulated panel system, engineered to perform in any of them.</p>
          </div>
          <div className="ts-app-list">
            {data.applications.map((a, i) => (
              <div key={i} className="ts-app-list-row app-row-animate">
                <div className="num">0{i + 1}</div>
                <div className="name">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Advantages</div>
              <h2>Why Panelcore® outperforms the alternatives.</h2>
            </div>
            <p>Engineered for year-round comfort, fast on-site installation and a finished, low-maintenance result — whether you're building a sunroom or a cold room.</p>
          </div>
          <div className="ts-advantages-grid">
            {data.advantages.map((a, i) => (
              <div key={i} className="ts-advantage advantage-item">
                <svg className="ts-icon" viewBox="0 0 24 24" fill="none" stroke="var(--ts-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <h3>{a.title}</h3>
                <p>{a.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Ready to specify Panelcore®?</h2>
              <p>Get a no-obligation quote for your sunroom, outdoor room or cold storage project.</p>
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
                <Link href="/resources" className="ts-btn ts-btn--ghost-on-dark">Download specs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

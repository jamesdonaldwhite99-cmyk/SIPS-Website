"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/patio-kits.json";

gsap.registerPlugin(ScrollTrigger);

export default function PatioKitsPage() {
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
      gsap.from(".style-card-animate", {
        scrollTrigger: { trigger: ".ts-styles-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out",
      });
      gsap.from(".panel-option-animate", {
        scrollTrigger: { trigger: ".ts-panel-pair", start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });
      gsap.from(".advantage-item", {
        scrollTrigger: { trigger: ".ts-advantages-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      });
      gsap.from(".accessory-item", {
        scrollTrigger: { trigger: ".ts-accessories-grid", start: "top 80%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out",
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
                <span>Patio Kits</span>
              </div>
              <div className="kicker hero-animate">{data.heroKicker}</div>
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
              <Image src="/photos/Patio Kit.png" alt="Patio Kit" fill style={{ objectFit: "cover" }} priority sizes="60vw" />
              <span className="ts-photo-tag">{data.heroPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spec strip */}
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

      {/* Overview */}
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
              <Image src="/photos/gallery/05.jpg" alt="Outdoor living patio" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">Insulspan® — outdoor living</span>
            </div>
          </div>
        </div>
      </section>

      {/* Patio styles */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.stylesEyebrow}</div>
              <h2>{data.stylesH2}</h2>
            </div>
            <p>{data.stylesCopy}</p>
          </div>
          <div className="ts-styles-grid">
            {data.styles.map((style, i) => (
              <div key={i} className="ts-style-card style-card-animate">
                {style.image && (
                  <div className="ts-style-card-img">
                    <Image src={style.image} alt={style.name} fill style={{ objectFit: "contain" }} sizes="280px" />
                  </div>
                )}
                <div className="ts-style-card-text">
                  <div className="ts-style-card-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{style.name}</h3>
                  <p>{style.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panel options */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.panelOptionsEyebrow}</div>
              <h2>{data.panelOptionsH2}</h2>
            </div>
            <p>Both systems are available in all eight patio styles, with full accessory packages included.</p>
          </div>
          <div className="ts-panel-pair">
            {data.panelOptions.map((opt, i) => (
              <div key={i} className="ts-panel-option panel-option-animate">
                <div className="ts-panel-option-body" style={{ padding: "40px" }}>
                  <div className="ts-panel-option-kicker">{opt.kicker}</div>
                  <h3>{opt.name}</h3>
                  <p>{opt.copy}</p>
                  <ul className="ts-panel-option-list">
                    {opt.features.map((f, j) => (
                      <li key={j}><span className="dot" />{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.advantagesEyebrow}</div>
              <h2>{data.advantagesH2}</h2>
            </div>
            <p>Supplied direct from our factory in Silverdale, NSW — with full support from design to delivery.</p>
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

      {/* Accessories */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.accessoriesEyebrow}</div>
              <h2>{data.accessoriesH2}</h2>
            </div>
            <p>Add-ons available at time of order — all engineered to integrate directly with your panel system.</p>
          </div>
          <div className="ts-accessories-grid">
            {data.accessories.map((acc, i) => (
              <div key={i} className="ts-accessory-item accessory-item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--ts-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <div>
                  <h4>{acc.name}</h4>
                  <p>{acc.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Ready to quote your patio kit?</h2>
              <p>Tell us your style, size, and location — we&apos;ll come back with a detailed quote and panel specs within 24 hours.</p>
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
                <Link href="/resources" className="ts-btn ts-btn--ghost-on-dark">Download specs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

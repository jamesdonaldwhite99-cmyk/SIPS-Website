"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/panelspan.json";
import ProductResources from "@/components/ProductResources";

gsap.registerPlugin(ScrollTrigger);

export default function PanelspanPage() {
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
      gsap.from(".panel-option-animate", {
        scrollTrigger: { trigger: ".ts-panel-pair", start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });
      gsap.from(".compare-row-animate", {
        scrollTrigger: { trigger: ".ts-compare-table", start: "top 80%", once: true },
        y: 24, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power2.out",
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
                <span>Panelspan®</span>
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
              <Image src={data.overviewPhoto} alt="Panelspan overview" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">{data.overviewPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FC vs MgO options */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Panel systems</div>
              <h2>FC or MgO — choose your finish.</h2>
            </div>
            <p>Both systems share the same high-density EPS core. Choose FC for cost-effectiveness, or MgO for premium fire and acoustic performance.</p>
          </div>
          <div className="ts-panel-pair">
            {data.panelOptions.map((opt, i) => (
              <div key={i} className="ts-panel-option panel-option-animate">
                <div className="ts-panel-option-img">
                  <Image src={opt.img} alt={opt.name} width={480} height={288} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6%" }} />
                </div>
                <div className="ts-panel-option-body">
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

      {/* Full-bleed banner */}
      <div className="ts-image-banner">
        <Image src={data.bannerPhoto} alt={data.bannerPhotoAlt} fill style={{ objectFit: "cover" }} sizes="100vw" />
      </div>

      {/* OSB vs Panelspan comparison */}
      <section className="ts-section ts-divider-top ts-compare-section">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.comparison.eyebrow}</div>
              <h2>{data.comparison.h2}</h2>
            </div>
            <p>{data.comparison.lead}</p>
          </div>

          <div className="ts-compare-grid">
            <div className="ts-compare-col ts-compare-col--osb">
              <div className="ts-compare-label">{data.comparison.osbLabel}</div>
              <div className="ts-compare-img">
                <Image
                  src={data.comparison.osbImage}
                  alt={data.comparison.osbImageAlt}
                  width={900}
                  height={520}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="ts-compare-col ts-compare-col--panelspan">
              <div className="ts-compare-label">{data.comparison.panelspanLabel}</div>
              <div className="ts-compare-img">
                <Image
                  src={data.comparison.panelspanImage}
                  alt={data.comparison.panelspanImageAlt}
                  width={900}
                  height={520}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          <div className="ts-compare-table" role="table" aria-label="OSB-based SIPs compared to Panelspan">
            <div className="ts-compare-table-head" role="row">
              <div role="columnheader">Category</div>
              <div role="columnheader">{data.comparison.osbLabel}</div>
              <div role="columnheader">{data.comparison.panelspanLabel}</div>
            </div>
            {data.comparison.rows.map((row, i) => (
              <div key={i} className="ts-compare-row compare-row-animate" role="row">
                <div className="ts-compare-cat" role="rowheader">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cat">{row.category}</span>
                </div>
                <div className="ts-compare-cell ts-compare-cell--osb" role="cell">
                  <span className="mini-label" aria-hidden="true">{data.comparison.osbLabel}</span>
                  {row.osb}
                </div>
                <div className="ts-compare-cell ts-compare-cell--panelspan" role="cell">
                  <span className="mini-label" aria-hidden="true">{data.comparison.panelspanLabel}</span>
                  {row.panelspan}
                </div>
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
              <h2>Why builders choose Panelspan®.</h2>
            </div>
            <p>Pre-finished walls that perform better and install faster than any alternative.</p>
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

      <ProductResources
        eyebrow={data.relatedResources.eyebrow}
        h2={data.relatedResources.h2}
        lead={data.relatedResources.lead}
        files={data.relatedResources.files}
      />

      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Ready to specify Panelspan®?</h2>
              <p>Get a no-obligation quote with panel specs and install timeline for your project.</p>
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

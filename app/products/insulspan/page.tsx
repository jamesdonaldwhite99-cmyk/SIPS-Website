"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/insulspan.json";
import ProductResources from "@/components/ProductResources";

gsap.registerPlugin(ScrollTrigger);

export default function InsulspanPage() {
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

      gsap.from(".profile-card", {
        scrollTrigger: { trigger: ".ts-profiles-grid", start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });

      gsap.from(".advantage-item", {
        scrollTrigger: { trigger: ".ts-advantages-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      });

      gsap.from(".swatch-item", {
        scrollTrigger: { trigger: ".ts-colourbar", start: "top 85%", once: true },
        y: 16, opacity: 0, duration: 0.5, stagger: 0.03, ease: "power2.out",
      });

      gsap.from(".spantable-animate", {
        scrollTrigger: { trigger: ".ts-spantable", start: "top 80%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
      });

      gsap.from(".techspec-animate", {
        scrollTrigger: { trigger: ".ts-techspecs-section", start: "top 80%", once: true },
        y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Product Hero */}
      <section className="ts-product-hero">
        <div className="ts-container">
          <div className="ts-product-hero-grid">
            <div className="ts-product-hero-text">
              <div className="ts-breadcrumbs hero-animate">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <Link href="/products">Products</Link>
                <span className="sep">/</span>
                <span>Insulspan®</span>
              </div>
              <div className="kicker hero-animate">{data.kicker}</div>
              <h1 className="hero-animate">
                {data.heroTitle}<br />
                <em style={{ color: "var(--ts-accent)" }}>{data.heroTitleAccent}</em>
              </h1>
              <p className="lead hero-animate">{data.heroLead}</p>
              <div className="actions hero-animate">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Request a quote
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
              <Image src={data.overviewPhoto} alt="Insulspan overview" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">{data.overviewPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Profiles</div>
              <h2>Three architectural profiles.</h2>
            </div>
            <p>Three Insulspan® roof profiles — each engineered with the same long-span structural core. Choose the look that fits your build.</p>
          </div>
          <div className="ts-profiles-grid">
            {data.profiles.map((p, i) => (
              <div key={i} className="ts-profile-card profile-card">
                <div className="img">
                  <Image src={p.img} alt={p.name} fill style={{ objectFit: "contain", padding: "8%" }} sizes="33vw" />
                </div>
                <div className="body">
                  <div className="num">0{i + 1}</div>
                  <h3>{p.name}</h3>
                  <p>{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed banner */}
      <div className="ts-image-banner">
        <Image src={data.bannerPhoto} alt="Insulspan roofing project" fill style={{ objectFit: "cover" }} sizes="100vw" />
      </div>

      {/* Advantages */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Advantages</div>
              <h2>Why specifiers choose Insulspan®.</h2>
            </div>
            <p>A single product replaces multiple trades and materials.</p>
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

      {/* Colour palette */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">Colours</div>
              <h2>Available in 11 Colorbond® colours.</h2>
            </div>
            <p>All Insulspan® profiles are available in the full Colorbond® range — choose a colour to match your roof, fascia, or architectural scheme.</p>
          </div>
          <div className="ts-colourbar">
            {data.colourSwatches.map((s, i) => (
              <div key={i} className="ts-swatch swatch-item">
                <div className="chip" style={{ background: s.hex }} />
                <div className="name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Span tables */}
      <section className="ts-section ts-divider-top ts-spantable-section">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.spanTable.eyebrow}</div>
              <h2>{data.spanTable.h2}</h2>
            </div>
            <p>{data.spanTable.lead}</p>
          </div>

          <div className="ts-spantable">
            <div className="ts-spantable-head" role="row">
              <div className="col-wind" role="columnheader">Wind class</div>
              <div className="col-sides" role="columnheader">Open sides</div>
              <div className="col-press" role="columnheader">
                <span>Roof pressure</span>
                <span className="sub">serv / str (kPa)</span>
              </div>
              <div className="col-thickness" role="columnheader" aria-label="Maximum span by panel thickness">
                <span>Maximum span (mm)</span>
                <div className="thickness-row">
                  {data.spanTable.thicknessHeaders.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {data.spanTable.groups.map((g, gi) => (
              <div key={gi} className="ts-spantable-group spantable-animate">
                {g.rows.map((r, ri) => (
                  <div key={ri} className="ts-spantable-row" role="row">
                    <div className="col-wind">
                      {ri === 0 && (
                        <>
                          <div className="wind-class">{g.wind}</div>
                          <div className="wind-note">{g.windNote}</div>
                        </>
                      )}
                    </div>
                    <div className="col-sides">{r.sides}</div>
                    <div className="col-press">
                      <span className="serv">{r.serv}</span>
                      <span className="div">/</span>
                      <span className="str">{r.str}</span>
                    </div>
                    <div className="col-thickness">
                      {r.spans.map((s, si) => (
                        <span key={si} className="span-val">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="ts-spantable-footnote">{data.spanTable.footnote}</p>
        </div>
      </section>

      {/* Technical specifications */}
      <section className="ts-section ts-divider-top ts-techspecs-section" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.technicalSpecs.eyebrow}</div>
              <h2>{data.technicalSpecs.h2}</h2>
            </div>
            <p>{data.technicalSpecs.lead}</p>
          </div>

          <div className="ts-techspecs-grid ts-techspecs-grid--single">
            <div className="ts-techspecs-card techspec-animate">
              <div className="ts-techspecs-card-head">
                <span className="num">01</span>
                <h3>{data.technicalSpecs.construction.title}</h3>
              </div>
              <ul className="ts-techspecs-list">
                {data.technicalSpecs.construction.items.map((it, i) => (
                  <li key={i}><span className="dot" />{it}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ts-techspecs-thickness-grid techspec-animate">
            <div className="ts-techspecs-thickness-card">
              <div className="ts-techspecs-subtitle">
                {data.technicalSpecs.weightsTitle}
                <span className="unit">{data.technicalSpecs.weightsUnit}</span>
              </div>
              <div className="ts-techspecs-thickness-row">
                {data.technicalSpecs.thicknessHeaders.map((t, i) => (
                  <div key={t} className="ts-techspecs-thickness-cell">
                    <div className="thickness">{t}</div>
                    <div className="value">{data.technicalSpecs.weights[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ts-techspecs-thickness-card">
              <div className="ts-techspecs-subtitle">
                {data.technicalSpecs.rValueTitle}
                <span className="unit">{data.technicalSpecs.rValueUnit}</span>
              </div>
              <div className="ts-techspecs-thickness-row">
                {data.technicalSpecs.thicknessHeaders.map((t, i) => (
                  <div key={t} className="ts-techspecs-thickness-cell">
                    <div className="thickness">{t}</div>
                    <div className="value">{data.technicalSpecs.rValues[i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductResources
        eyebrow={data.relatedResources.eyebrow}
        h2={data.relatedResources.h2}
        lead={data.relatedResources.lead}
        files={data.relatedResources.files}
      />

      {/* CTA */}
      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Ready to specify Insulspan®?</h2>
              <p>Get a no-obligation quote with panel specs, span tables, and install timeline for your project.</p>
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

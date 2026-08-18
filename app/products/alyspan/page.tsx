"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/alyspan.json";
import ProductResources from "@/components/ProductResources";

gsap.registerPlugin(ScrollTrigger);

export default function AlyspanPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      gsap.from(".beam-card", {
        scrollTrigger: { trigger: ".ts-aly-beams", start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: "power3.out",
      });
      gsap.from(".advantage-item", {
        scrollTrigger: { trigger: ".ts-advantages-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      });
      gsap.from(".component-card", {
        scrollTrigger: { trigger: ".ts-aly-components", start: "top 82%", once: true },
        y: 30, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
      });
      gsap.from(".swatch-item", {
        scrollTrigger: { trigger: ".ts-colourbar", start: "top 85%", once: true },
        y: 16, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
      });
      gsap.from(".aly-table-animate", {
        scrollTrigger: { trigger: ".ts-aly-spans", start: "top 82%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
      });
      gsap.from(".eng-animate", {
        scrollTrigger: { trigger: ".ts-aly-engineering", start: "top 80%", once: true },
        y: 26, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Structured data — helps Google surface the product, its specs and the FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                name: "Alyspan® Structural Aluminium Beam",
                brand: { "@type": "Brand", name: "Alyspan" },
                manufacturer: { "@type": "Organization", name: "Quick Built Systems PTY LTD" },
                material: "Aluminium 6063-T6",
                description: data.heroLead,
                image: [
                  "https://www.quickbuiltsystems.com.au/photos/alyspan/beam-100x50.jpg",
                  "https://www.quickbuiltsystems.com.au/photos/alyspan/beam-150x50.jpg",
                ],
                additionalProperty: data.beams.flatMap((b) =>
                  b.properties.map((p) => ({
                    "@type": "PropertyValue",
                    name: `${b.name} — ${p.label}`,
                    value: p.value,
                  }))
                ),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.quickbuiltsystems.com.au/" },
                  { "@type": "ListItem", position: 2, name: "Products", item: "https://www.quickbuiltsystems.com.au/products" },
                  { "@type": "ListItem", position: 3, name: "Alyspan®", item: "https://www.quickbuiltsystems.com.au/products/alyspan" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: data.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />

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
                <span>Alyspan®</span>
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
                <a href="#span-tables" className="ts-btn ts-btn--ghost-on-dark">View span tables</a>
              </div>
            </div>
            <div className="ts-product-hero-photo">
              <Image src={data.heroPhoto} alt="Alyspan aluminium posts and beams supporting an attached patio roof" fill style={{ objectFit: "cover" }} priority sizes="60vw" />
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
              <Image src={data.overviewPhoto} alt="Alyspan Pearl White aluminium posts, beams and connectors" fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">{data.overviewPhotoTag}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Beams — real product photography beside the certified section drawing */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.beamsEyebrow}</div>
              <h2>{data.beamsH2}</h2>
            </div>
            <p>{data.beamsLead}</p>
          </div>

          <div className="ts-aly-beams">
            {data.beams.map((b, i) => (
              <article key={i} className="ts-aly-beam beam-card">
                <div className="ts-aly-beam-photo">
                  <Image src={b.photo} alt={`${b.name} — powder coated aluminium patio beam`} fill style={{ objectFit: "contain", padding: "4%" }} sizes="(max-width: 900px) 100vw, 45vw" />
                  <span className="ts-aly-beam-num">{`0${i + 1}`}</span>
                </div>
                <div className="ts-aly-beam-body">
                  <h3>{b.name}</h3>
                  <div className="ts-aly-section-dwg">
                    <Image src={b.section} alt={`${b.name} certified section drawing with dimensions`} width={802} height={397} style={{ width: "100%", height: "auto" }} />
                  </div>
                  <dl className="ts-aly-props">
                    {b.properties.map((p, j) => (
                      <div key={j} className="ts-aly-prop">
                        <dt>{p.label}</dt>
                        <dd>{p.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="ts-aly-codes">
                    {b.codes.map((c, j) => (
                      <li key={j}>
                        <span className="desc">{c.desc}</span>
                        <span className="code">{c.code}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="ts-aly-footnote">{data.beamsFootnote}</p>
        </div>
      </section>

      {/* Advantages */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.advantagesEyebrow}</div>
              <h2>{data.advantagesH2}</h2>
            </div>
            <p>{data.advantagesLead}</p>
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

      {/* Full-bleed banner */}
      <div className="ts-image-banner">
        <Image src={data.bannerPhoto} alt="Attached patio built on Alyspan aluminium posts and beams" fill style={{ objectFit: "cover" }} sizes="100vw" />
      </div>

      {/* The complete system */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.systemEyebrow}</div>
              <h2>{data.systemH2}</h2>
            </div>
            <p>{data.systemLead}</p>
          </div>

          <div className="ts-aly-components">
            {data.components.map((c, i) => (
              <article key={i} className="ts-aly-component component-card">
                <div className="img">
                  <Image src={c.img} alt={`Alyspan ${c.name}`} fill style={{ objectFit: "contain", padding: "8%" }} sizes="(max-width: 700px) 50vw, 25vw" />
                </div>
                <div className="body">
                  <div className="sizes">{c.sizes}</div>
                  <h3>{c.name}</h3>
                  <p>{c.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="ts-aly-schem-head">
            <h3>Brackets &amp; connections</h3>
            <p>{data.schematicsNote}</p>
          </div>
          <div className="ts-aly-schematics">
            {data.schematics.map((s, i) => (
              <div key={i} className="ts-aly-schem component-card">
                <div className="img">
                  <Image src={s.img} alt={`Alyspan ${s.name} connection schematic`} fill style={{ objectFit: "contain", padding: "14%" }} sizes="25vw" />
                </div>
                <div className="meta">
                  <h4>{s.name}</h4>
                  <span>{s.sizes}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="ts-aly-footnote">{data.componentsFootnote}</p>
        </div>
      </section>

      {/* Finishes */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.finishesEyebrow}</div>
              <h2>{data.finishesH2}</h2>
            </div>
            <p>{data.finishesLead}</p>
          </div>
          <div className="ts-colourbar ts-colourbar--large">
            {data.finishes.map((s, i) => (
              <div key={i} className="ts-swatch swatch-item">
                <div className="chip" style={{ background: s.hex }} />
                <div className="name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Span tables */}
      <section id="span-tables" className="ts-section ts-divider-top ts-aly-spans" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.spanEyebrow}</div>
              <h2>{data.spanH2}</h2>
            </div>
            <p>{data.spanLead}</p>
          </div>

          {data.spanTables.map((t, i) => (
            <div key={i} className="ts-aly-spantable aly-table-animate">
              <div className="ts-aly-spantable-title">
                <h3>{t.beam}</h3>
                <span>{t.sub}</span>
              </div>
              <div className="ts-aly-spantable-scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className="w-col">W (mm)</th>
                      {data.spanWindHeaders.map((h) => (
                        <th scope="col" key={h}>{h}</th>
                      ))}
                    </tr>
                    <tr className="subhead">
                      <th scope="col" className="w-col">Load width</th>
                      <th scope="col" colSpan={data.spanWindHeaders.length}>Maximum Allowable Span (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r, j) => (
                      <tr key={j}>
                        <th scope="row" className="w-col">{r.w}</th>
                        {r.spans.map((s, k) => (
                          <td key={k}>{s}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <p className="ts-aly-footnote">{data.spanFootnote}</p>
        </div>
      </section>

      {/* Engineering & compliance */}
      <section className="ts-section ts-divider-top ts-aly-engineering">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.engineeringEyebrow}</div>
              <h2>{data.engineeringH2}</h2>
            </div>
            <p>{data.engineeringLead}</p>
          </div>

          <div className="ts-aly-eng-grid">
            <div className="ts-aly-eng-card eng-animate">
              <h3>{data.standardsTitle}</h3>
              <p className="intro">{data.standardsIntro}</p>
              <ul className="ts-aly-standards">
                {data.standards.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="ts-aly-eng-card eng-animate">
              <h3>{data.designTitle}</h3>
              <dl className="ts-aly-design">
                {data.design.map((d, i) => (
                  <div key={i}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <blockquote className="ts-aly-certificate eng-animate">
            <p>{data.certificateQuote}</p>
            <cite>{data.certificateAttrib}</cite>
          </blockquote>
        </div>
      </section>

      {/* Full catalogue */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--color-ink)" }}>
        <div className="ts-container">
          <div className="ts-section-head ts-aly-head--dark">
            <div>
              <div className="ts-eyebrow">{data.catalogueEyebrow}</div>
              <h2>{data.catalogueH2}</h2>
            </div>
            <p>{data.catalogueLead}</p>
          </div>

          <div className="ts-aly-catalogue">
            {data.catalogue.map((g, i) => (
              <div key={i} className="ts-aly-cat-group">
                <div className="ts-aly-cat-head">
                  <div className="thumb">
                    <Image src={g.img} alt={`Alyspan ${g.group}`} fill style={{ objectFit: "contain", padding: "8%" }} sizes="72px" />
                  </div>
                  <h3>{g.group}</h3>
                </div>
                <ul>
                  {g.items.map((it, j) => (
                    <li key={j}>
                      <span className="desc">{it.desc}</span>
                      <span className="code">{it.code}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.faqEyebrow}</div>
              <h2>{data.faqH2}</h2>
            </div>
            <p>Straight answers to the questions builders, owner-builders and certifiers ask us about aluminium patio beams.</p>
          </div>
          <div className="ts-aly-faq">
            {data.faq.map((f, i) => (
              <div key={i} className={`ts-aly-faq-item${openFaq === i ? " is-open" : ""}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" width="20" height="20">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="answer"><p>{f.a}</p></div>
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

      {/* CTA */}
      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>{data.ctaH2}</h2>
              <p>{data.ctaBody}</p>
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

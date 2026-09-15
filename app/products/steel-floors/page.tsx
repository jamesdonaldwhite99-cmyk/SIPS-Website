"use client";

/**
 * Steel floors — product page.
 *
 * PHOTOGRAPHY AND DRAWING, EACH DOING ITS OWN JOB. The first cut of this page was drawing-only
 * because there was no steel floor photography in the repo; James supplied a folder of site photos
 * on 15 Sep 2026, so the hero is now a real frame half-decked with the crew on it, and the section
 * drawing has moved down to sit beside the price card where it answers a different question — the
 * photos show what it looks like, the drawing shows how it goes together.
 *
 * NO ENGINEERING DATA IS PUBLISHED HERE, and that is a commercial decision rather than an oversight
 * (James, 15 Sep 2026). An earlier cut printed the full joist span table, the member sections and
 * the post height limits, on the reasoning that Spantec publishes none of it and we could compete by
 * being open. The counter-argument won: in this market those tables ARE the product, and handing a
 * direct competitor our spans, sections and load pairings costs more than the openness gains.
 *
 * So the page sells the outcome — a kit cut to length, labelled, priced on screen — and the numbers
 * live behind the calculator. If you are adding to this page, keep it that way: no sections, no
 * spans, no centres, no grades, no kPa. The drawing names the PARTS, never their specification.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/steel-floors.json";

gsap.registerPlugin(ScrollTrigger);

/** Where the steel floor calculator lives. Same-origin once the design zone is rewritten. */
const DESIGNER = "/design/steel-floor";

/**
 * Section through the frame — bearer on a post, joists over, boards on top.
 * Drawn to realistic proportions so it reads as a drawing rather than an illustration. It names the
 * parts and never their sizes — see the note at the top of this file.
 */
function FrameSection() {
  const INK = "#1f2933";
  const THIN = "#8a929b";
  /* The drawing occupies x 58..470 and the annotation column starts at 492, so a leader never
     crosses a member. Labels were right-aligned over the frame on the first cut and printed on top
     of the joists. */
  return (
    <svg viewBox="0 0 660 380" role="img"
         aria-label="Section through a steel floor frame: decking over joists, joists over a bearer, bearer on a steel post and base plate"
         style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Decking boards */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={68 + i * 45} y={64} width={39} height={14} rx={1.5}
              fill="none" stroke={INK} strokeWidth={1.4} />
      ))}
      <line x1={470} y1={71} x2={486} y2={71} stroke={THIN} strokeWidth={0.7} />
      <text x={492} y={75} fontSize={11} fill={THIN} fontFamily="ui-monospace, monospace">DECKING</text>

      {/* Joists, cut through — the row of boxes */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={80 + i * 50} y={84} width={22} height={40} rx={2}
              fill="none" stroke={INK} strokeWidth={1.9} />
      ))}
      <line x1={452} y1={104} x2={486} y2={104} stroke={THIN} strokeWidth={0.7} />
      <text x={492} y={108} fontSize={11} fill={THIN} fontFamily="ui-monospace, monospace">JOISTS</text>

      {/* Bearer — heaviest line, it carries everything above */}
      <rect x={58} y={130} width={412} height={26} rx={2} fill="none" stroke={INK} strokeWidth={2.6} />
      <line x1={470} y1={143} x2={486} y2={143} stroke={THIN} strokeWidth={0.7} />
      <text x={492} y={147} fontSize={11} fill={THIN} fontFamily="ui-monospace, monospace">BEARER</text>

      {/* Posts and base plates */}
      {[110, 264, 418].map((x) => (
        <g key={x}>
          <rect x={x - 11} y={156} width={22} height={150} rx={1.5} fill="none" stroke={INK} strokeWidth={2.2} />
          <rect x={x - 30} y={306} width={60} height={9} rx={1.5} fill={INK} />
        </g>
      ))}
      <line x1={429} y1={230} x2={486} y2={230} stroke={THIN} strokeWidth={0.7} />
      <text x={492} y={234} fontSize={11} fill={THIN} fontFamily="ui-monospace, monospace">STEEL POST</text>
      <line x1={448} y1={311} x2={486} y2={311} stroke={THIN} strokeWidth={0.7} />
      <text x={492} y={315} fontSize={11} fill={THIN} fontFamily="ui-monospace, monospace">BASE PLATE</text>

      {/* Ground */}
      <line x1={24} y1={315} x2={478} y2={315} stroke={INK} strokeWidth={2} />
      {Array.from({ length: 22 }, (_, i) => (
        <line key={i} x1={26 + i * 21} y1={315} x2={16 + i * 21} y2={327} stroke={THIN} strokeWidth={1} />
      ))}

      {/* Dimension: pier spacing */}
      <line x1={110} y1={352} x2={264} y2={352} stroke={THIN} strokeWidth={0.9} />
      <line x1={110} y1={347} x2={110} y2={357} stroke={THIN} strokeWidth={1.2} />
      <line x1={264} y1={347} x2={264} y2={357} stroke={THIN} strokeWidth={1.2} />
      <text x={187} y={345} fontSize={11} fill={THIN} textAnchor="middle" fontFamily="ui-monospace, monospace">PIER SPACING</text>

      {/* Dimension: floor height */}
      <line x1={40} y1={156} x2={40} y2={315} stroke={THIN} strokeWidth={0.9} />
      <line x1={35} y1={156} x2={45} y2={156} stroke={THIN} strokeWidth={1.2} />
      <line x1={35} y1={315} x2={45} y2={315} stroke={THIN} strokeWidth={1.2} />
      <text x={30} y={236} fontSize={11} fill={THIN} textAnchor="middle" fontFamily="ui-monospace, monospace"
            transform="rotate(-90 30 236)">FLOOR HEIGHT</text>
    </svg>
  );
}

export default function SteelFloorsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1 });
      gsap.from(".spec-item", {
        scrollTrigger: { trigger: ".ts-product-specstrip", start: "top 85%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
      });
      gsap.from(".overview-animate", {
        scrollTrigger: { trigger: ".overview-section", start: "top 75%", once: true },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
      gsap.from(".advantage-item", {
        scrollTrigger: { trigger: ".ts-advantages-grid", start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
      });
      gsap.from(".kit-card", {
        scrollTrigger: { trigger: ".ts-sf-kit", start: "top 82%", once: true },
        y: 30, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
      });
      gsap.from(".step-card", {
        scrollTrigger: { trigger: ".ts-sf-steps", start: "top 82%", once: true },
        y: 26, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
      });
      gsap.from(".gallery-item", {
        scrollTrigger: { trigger: ".ts-sf-gallery", start: "top 85%", once: true },
        y: 24, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                name: "Quick Built Steel Floor and Deck Frames",
                brand: { "@type": "Brand", name: "Quick Built Systems" },
                manufacturer: { "@type": "Organization", name: "Quick Built Systems PTY LTD" },
                material: "Roll-formed galvanised steel",
                description: data.heroLead,
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

      {/* Hero */}
      <section className="ts-product-hero">
        <div className="ts-container">
          <div className="ts-product-hero-grid">
            <div className="ts-product-hero-text">
              <div className="ts-breadcrumbs hero-animate">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <Link href="/products">Products</Link>
                <span className="sep">/</span>
                <span>Steel Floors</span>
              </div>
              <div className="kicker hero-animate">{data.kicker}</div>
              <h1 className="hero-animate">
                {data.heroTitle}<br />
                <em style={{ color: "var(--ts-accent)" }}>{data.heroTitleAccent}</em>
              </h1>
              <p className="lead hero-animate">{data.heroLead}</p>
              <div className="actions hero-animate">
                <Link href={DESIGNER} className="ts-btn ts-btn--primary">
                  Price your floor
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#on-site" className="ts-btn ts-btn--ghost-on-dark">See it built</a>
              </div>
            </div>
            <div className="ts-product-hero-photo hero-animate">
              <Image src={data.heroPhoto} alt={data.heroPhotoAlt} fill style={{ objectFit: "cover" }} priority sizes="60vw" />
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
                <Link href={DESIGNER} className="ts-btn ts-btn--dark">
                  Price your floor
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="ts-intro-photo overview-animate">
              <Image src={data.overviewPhoto} alt={data.overviewPhotoAlt} fill style={{ objectFit: "cover" }} sizes="50vw" />
              <span className="ts-photo-tag">{data.overviewPhotoTag}</span>
            </div>
          </div>

          {/* The drawing now earns its own place rather than standing in for a photograph: the
              photos show what it looks like, this shows how it is put together. */}
          <div className="ts-sf-section-row">
            <div className="ts-sf-hero-dwg">
              <FrameSection />
              <span className="ts-photo-tag">Section through the frame</span>
            </div>
            <div className="ts-sf-pricecard">
              <span className="ts-eyebrow">No callback required</span>
              <p className="ts-sf-pricecard-lead">{data.heroPriceNote}</p>
              <ol className="ts-sf-pricecard-list">
                <li>Where it is going</li>
                <li>What you are building</li>
                <li>How big it is</li>
                <li>What goes on top</li>
                <li>How to reach you</li>
              </ol>
              <Link href={DESIGNER} className="ts-btn ts-btn--primary">
                Start
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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

      {/* The one photograph that shows all three layers at once — bare joists, sheeting part-laid,
          finished hardwood beyond. It does more work than any diagram could, so it runs full width. */}
      <div className="ts-image-banner">
        <Image src={data.layersPhoto} alt={data.layersPhotoAlt} fill style={{ objectFit: "cover" }} sizes="100vw" />
        <span className="ts-photo-tag">{data.layersPhotoTag}</span>
      </div>

      {/* What's in the kit */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.kitEyebrow}</div>
              <h2>{data.kitH2}</h2>
            </div>
            <p>{data.kitLead}</p>
          </div>
          <div className="ts-sf-kit">
            {data.kit.map((k, i) => (
              <article key={i} className="ts-sf-kit-item kit-card">
                <span className="ts-sf-kit-num">{`0${i + 1}`}</span>
                <h3>{k.name}</h3>
                <p>{k.detail}</p>
              </article>
            ))}
          </div>
          <p className="ts-aly-footnote">{data.kitFootnote}</p>
        </div>
      </section>


      {/* Surfaces */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.surfacesEyebrow}</div>
              <h2>{data.surfacesH2}</h2>
            </div>
            <p>{data.surfacesLead}</p>
          </div>
          <div className="ts-sf-surfaces">
            {data.surfaces.map((g, i) => (
              <div key={i} className="ts-sf-surface-group">
                <h3>{g.group}</h3>
                <ul>{g.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="ts-aly-footnote">{data.surfacesNote}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="ts-section ts-divider-top ts-sf-steps" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.processEyebrow}</div>
              <h2>{data.processH2}</h2>
            </div>
            <p>{data.processLead}</p>
          </div>
          <ol className="ts-sf-steps-grid">
            {data.process.map((s, i) => (
              <li key={i} className="ts-sf-step step-card">
                <span className="ts-sf-step-num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* On site */}
      <section id="on-site" className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.galleryEyebrow}</div>
              <h2>{data.galleryH2}</h2>
            </div>
            <p>{data.galleryLead}</p>
          </div>
          <div className="ts-sf-gallery">
            {data.gallery.map((g, i) => (
              <figure key={i} className="ts-sf-gallery-item gallery-item">
                <Image src={g.src} alt={g.alt} fill style={{ objectFit: "cover" }}
                       sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 25vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow">{data.faqEyebrow}</div>
              <h2>{data.faqH2}</h2>
            </div>
            <p>{data.faqLead}</p>
          </div>
          <div className="ts-aly-faq">
            {data.faq.map((f, i) => (
              <div key={i} className={`ts-aly-faq-item${openFaq === i ? " is-open" : ""}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  {/* width/height are load-bearing: .ts-aly-faq-item button svg only handles the
                      rotation, so without them the chevron fills its container. */}
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
                <Link href={DESIGNER} className="ts-btn ts-btn--primary">
                  Price your floor
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" className="ts-btn ts-btn--ghost-on-dark">Talk to us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

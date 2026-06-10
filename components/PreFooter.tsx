"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import faqData from "@/content/faq.json";
import reviewsData from "@/content/reviews.json";
import galleryData from "@/content/gallery.json";
import homeData from "@/content/home.json";

/**
 * Shared pre-footer block rendered above the footer on every page:
 *   1. Featured project gallery (first 12 images from the gallery)
 *   2. "What our customers say" reviews carousel (charcoal)
 *   3. "Ready when you are" — take your next step CTA (cream)
 *   4. Frequently asked questions accordion (orange)
 * Mirrors the sister Quick Built Systems site layout.
 */

export default function PreFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reviews = reviewsData.reviews;
  const [ri, setRi] = useState(0);
  const review = reviews[ri];
  const prevReview = () => setRi((n) => (n - 1 + reviews.length) % reviews.length);
  const nextReview = () => setRi((n) => (n + 1) % reviews.length);

  const featured = galleryData.images.slice(0, 12);

  return (
    <>
      {/* ── Featured project gallery ── */}
      {featured.length > 0 && (
        <section className="ts-section ts-divider-top">
          <div className="ts-container">
            <div className="ts-section-head" style={{ marginBottom: 24 }}>
              <div>
                <div className="ts-eyebrow">{homeData.galleryEyebrow}</div>
                <h2 style={{ margin: 0 }}>{homeData.galleryH2}</h2>
              </div>
              <Link href="/gallery" className="ts-btn ts-btn--ghost">View gallery</Link>
            </div>
            <div className="qb-feature-gallery">
              {featured.map((img, i) => (
                <Link key={i} href="/gallery" className="qb-feature-tile" aria-label="View gallery">
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 16vw" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews carousel ── */}
      <section className="ts-prefooter-reviews">
        <div className="ts-container" style={{ maxWidth: 820, textAlign: "center" }}>
          <h2 style={{ color: "#fff", margin: "0 0 18px" }}>What our customers say</h2>
          <div className="ts-prefooter-stars" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <svg key={idx} viewBox="0 0 24 24" width="26" height="26" fill={idx < review.rating ? "var(--ts-accent)" : "rgba(255,255,255,0.2)"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></svg>
            ))}
          </div>
          <div className="ts-prefooter-carousel">
            <button type="button" className="ts-prefooter-arrow" onClick={prevReview} aria-label="Previous review">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="ts-prefooter-review">
              <p className="ts-prefooter-review-text">{review.text}</p>
              <div className="ts-prefooter-review-name">{review.name}</div>
              <div className="ts-prefooter-review-date">{review.date}</div>
            </div>
            <button type="button" className="ts-prefooter-arrow" onClick={nextReview} aria-label="Next review">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="ts-prefooter-dots">
            {reviews.map((_, idx) => (
              <button key={idx} type="button" className={`ts-prefooter-dot${idx === ri ? " is-active" : ""}`} onClick={() => setRi(idx)} aria-label={`Review ${idx + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Take your next step ── */}
      <section className="ts-section" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-intro">
            <div className="ts-intro-text">
              <div className="ts-eyebrow">{homeData.nextStepEyebrow}</div>
              <h2>{homeData.nextStepH2}</h2>
              <p>{homeData.nextStepBody1}</p>
              <p>{homeData.nextStepBody2}</p>
              <div className="ts-prefooter-actions">
                <Link href="/contact" className="ts-prefooter-btn" data-magnetic="0.3">{homeData.nextStepPrimary}</Link>
                <Link href="/contact" className="ts-prefooter-btn" data-magnetic="0.3">{homeData.nextStepSecondary}</Link>
              </div>
            </div>
            <div className="ts-intro-photo" style={{ background: "var(--ts-taupe)" }}>
              <Image src={homeData.nextStepImage} alt="Quick Built Systems insulated panel project" fill style={{ objectFit: "cover" }} sizes="40vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ts-section" style={{ background: "var(--ts-accent)", color: "#fff" }}>
        <div className="ts-container" style={{ maxWidth: 920 }}>
          <div className="ts-section-head" style={{ borderColor: "rgba(255,255,255,0.2)", justifyContent: "center", textAlign: "center" }}>
            <div>
              <h2 style={{ color: "#fff", margin: 0 }}>{homeData.faqH2}</h2>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            {faqData.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ background: isOpen ? "#fff" : "rgba(255,255,255,0.9)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontWeight: 600, fontSize: 16, color: isOpen ? "var(--ts-accent)" : "var(--color-ink)" }}
                  >
                    {f.q}
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--ts-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform 220ms var(--ease-standard)", transform: isOpen ? "rotate(45deg)" : "none" }}><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                  <div style={{ maxHeight: isOpen ? 600 : 0, overflow: "hidden", transition: "max-height 320ms var(--ease-standard)" }}>
                    <p style={{ margin: 0, padding: "0 22px 20px", fontSize: 14.5, lineHeight: 1.65, color: "var(--color-graphite)" }}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

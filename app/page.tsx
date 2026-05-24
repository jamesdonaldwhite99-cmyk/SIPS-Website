"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeData from "@/content/home.json";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { src: "/photos/gallery/01.jpg", kicker: "Residential", caption: "Family homes, built faster." },
  { src: "/photos/gallery/04.jpg", kicker: "Architectural", caption: "Pre-finished, panel-precise." },
  { src: "/photos/gallery/02.jpg", kicker: "Sunset envelope", caption: "A complete SIPs home." },
  { src: "/photos/gallery/06.jpg", kicker: "Modular & multi-res", caption: "Townhomes locked up in days." },
  { src: "/photos/gallery/07.jpg", kicker: "Interiors", caption: "Pre-finished interior walls." },
  { src: "/photos/gallery/05.jpg", kicker: "Outdoor living", caption: "Insulated roof, year-round." },
  { src: "/photos/gallery/14.jpg", kicker: "Insulspan® roofing", caption: "Long-span, no purlins." },
  { src: "/photos/gallery/17.jpg", kicker: "On-site install", caption: "Panels lock together fast." },
  { src: "/photos/gallery/15.jpg", kicker: "Outdoor pavilion", caption: "Insulspan over the deck." },
  { src: "/photos/gallery/16.jpg", kicker: "Patio kits", caption: "Pre-engineered awnings." },
  { src: "/photos/gallery/03.jpg", kicker: "Dusk patio", caption: "Insulspan® at golden hour." },
  { src: "/photos/gallery/08.jpg", kicker: "Bedroom interiors", caption: "MgO/FC interior walls." },
  { src: "/photos/gallery/09.jpg", kicker: "Living rooms", caption: "Acoustic, airtight, warm." },
  { src: "/photos/gallery/10.jpg", kicker: "Granny flat", caption: "Pre-finished, ready to live." },
  { src: "/photos/gallery/11.jpg", kicker: "Compact add-on", caption: "Extensions in days." },
  { src: "/photos/gallery/12.jpg", kicker: "Aerial", caption: "A complete SIPs cabin." },
  { src: "/photos/gallery/13.jpg", kicker: "Coastal install", caption: "Wall panels on the harbour." },
  { src: "/photos/gallery/19.jpg", kicker: "Panelcore® coldroom", caption: "Modular steel-skin envelope." },
  { src: "/photos/gallery/20.jpg", kicker: "Cold storage interior", caption: "Pre-finished, food-safe." },
  { src: "/photos/gallery/18.jpg", kicker: "Coldroom build", caption: "Airtight, cam-locked." },
];
const SLIDE_DURATION = 2500;

const products = [
  {
    num: "01",
    kicker: "Insulspan®",
    title: "Insulated Roofing Panels",
    copy: "Long-span structural roofing panels — three architectural profiles. Eliminates purlins, sarking, bulk insulation and plasterboard in one install.",
    image: "/photos/product-insulspan-new.png",
    href: "/products/insulspan",
  },
  {
    num: "02",
    kicker: "Panelspan®",
    title: "Structural Insulated Panels",
    copy: "Pre-finished FC or MgO cladding bonded to a high-density EPS core. Steel Skin, FC/FC and MgO/MgO finishes available.",
    image: "/photos/product-panelspan-new.png",
    href: "/products/panelspan",
  },
  {
    num: "03",
    kicker: "Panelcore®",
    title: "Coldroom Panels",
    copy: "Steel-skinned insulated panels for cold storage, food processing, pharma and any controlled-temperature application.",
    image: "/photos/product-panelcore-new.png",
    href: "/products/panelcore",
  },
];

const systems = [
  {
    num: "01",
    kicker: "Patio Kits",
    title: "Pre-engineered outdoor living",
    copy: "Eight architectural styles — flat-packed, pre-cut and ready to install. Insulspan® insulated or Slimline high-gloss.",
    image: "/photos/Patio Kit.png",
    href: "/patio-kits",
  },
  {
    num: "02",
    kicker: "Building System",
    title: "Complete SIPs envelope",
    copy: "Insulspan® roofing and Panelspan® wall panels working together as one high-performance building system.",
    image: "/photos/Building system.jpg",
    href: "/building-system",
  },
];

const benefits = [
  { num: "01", icon: "light", title: "Lightweight", copy: "High-density EPS core in a slim panel — easier to handle, easier to install, no heavy lifting gear required." },
  { num: "02", icon: "fast", title: "Quick to install", copy: "Pre-cut, pre-finished, locks together on site. Reach lock-up in as little as 3–4 days." },
  { num: "03", icon: "insulated", title: "Fully insulated", copy: "Insulation built in. Supports 8-Star energy ratings and reduces thermal bridging across the envelope." },
  { num: "04", icon: "spans", title: "Long spans", copy: "Engineered for long structural spans — fewer support beams, cleaner architectural lines." },
  { num: "05", icon: "clean", title: "Easy to clean", copy: "Pre-finished FC and MgO surfaces — moisture stable, no warping, low maintenance for the life of the build." },
];

const applications = [
  { kicker: "Residential", title: "New homes & extensions", img: "/photos/gallery/01.jpg" },
  { kicker: "Outdoor living", title: "Patios & pavilions", img: "/photos/gallery/05.jpg" },
  { kicker: "Commercial", title: "Offices & warehouses", img: "/photos/gallery/19.jpg" },
  { kicker: "Modular", title: "Granny flats & cabins", img: "/photos/gallery/10.jpg" },
  { kicker: "Agricultural", title: "Sheds & farm buildings", img: "/photos/gallery/12.jpg" },
  { kicker: "Cold storage", title: "Coolrooms & freezers", img: "/photos/gallery/18.jpg" },
];

function BenefitIcon({ icon }: { icon: string }) {
  if (icon === "light") return (
    <svg className="ts-icon" viewBox="0 0 36 36"><path d="M6 26l12-18 12 18M6 26l12 4 12-4M6 26v3l12 4 12-4v-3" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  if (icon === "fast") return (
    <svg className="ts-icon" viewBox="0 0 36 36"><path d="M18 4v6M18 26v6M4 18h6M26 18h6M9 9l4 4M23 23l4 4M9 27l4-4M23 13l4-4" strokeLinecap="round" /><circle cx="18" cy="18" r="4" /></svg>
  );
  if (icon === "insulated") return (
    <svg className="ts-icon" viewBox="0 0 36 36"><rect x="4" y="8" width="28" height="20" rx="1" /><path d="M4 14h28M4 20h28" strokeLinecap="round" /></svg>
  );
  if (icon === "spans") return (
    <svg className="ts-icon" viewBox="0 0 36 36"><path d="M4 26h28M4 10v16M32 10v16M4 10c8-6 20-6 28 0" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  return (
    <svg className="ts-icon" viewBox="0 0 36 36"><path d="M6 30l4-16 4 8 6-14 4 10 4-6 4 18M4 30h28" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slideshow — interval restarts only when paused state changes
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlideIndex((n) => (n + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [paused]);

  // Video playback rate
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 3;
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });

      // Hero stats
      gsap.from(".hero-stat", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.5,
      });

      // Section head
      gsap.from(".section-head-animate", {
        scrollTrigger: { trigger: ".section-head-animate", start: "top 80%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Intro text
      gsap.from(".intro-text-animate", {
        scrollTrigger: { trigger: ".ts-intro", start: "top 75%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Intro photo
      gsap.from(".intro-photo-animate", {
        scrollTrigger: { trigger: ".ts-intro", start: "top 75%", once: true },
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
      });

      // Product cards
      gsap.from(".product-card-animate", {
        scrollTrigger: { trigger: ".ts-product-grid", start: "top 80%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Benefits
      gsap.from(".benefit-animate", {
        scrollTrigger: { trigger: ".ts-benefits", start: "top 80%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });

      // Applications
      gsap.from(".app-tile-animate", {
        scrollTrigger: { trigger: ".ts-applications", start: "top 80%", once: true },
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });

      // CTA strip
      gsap.from(".cta-animate", {
        scrollTrigger: { trigger: ".ts-cta-strip", start: "top 80%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ── Hero — full-bleed photo with overlay ── */}
      <section
        id="top"
        className="ts-home-hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background slideshow — fills full section */}
        {SLIDES.map((s, idx) => (
          <div key={idx} className={`ts-slide${idx === slideIndex ? " is-active" : ""}`}>
            <Image
              src={s.src}
              alt={s.caption}
              fill
              style={{ objectFit: "cover" }}
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Gradient overlay — dark on left, fades right */}
        <div className="ts-home-hero-overlay" />

        {/* Text — sits above overlay */}
        <div className="ts-home-hero-text">
          <div className="ts-home-hero-kicker hero-animate">
            <span className="ts-home-hero-kicker-line" />
            {homeData.heroEyebrow}
          </div>
          <h1 className="hero-animate">
            The Future of<br /><em>Australian</em> Building.
          </h1>
          <p className="lead hero-animate">{homeData.heroLead}</p>
          <div className="actions hero-animate">
            <Link href="/contact" className="ts-btn ts-btn--primary">
              {homeData.heroCtaPrimary}
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/products" className="ts-btn ts-btn--ghost-on-dark">
              {homeData.heroCtaSecondary}
            </Link>
          </div>
        </div>

        {/* Slide label bottom-left + dots bottom-center */}
        <div className="ts-home-hero-bar">
          <div className="ts-home-hero-caption hero-animate">
            <span className="ts-home-hero-caption-kicker">{SLIDES[slideIndex].kicker}</span>
            <span className="ts-home-hero-caption-text">{SLIDES[slideIndex].caption}</span>
          </div>
          <div className="ts-slide-dots">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`ts-slide-dot${idx === slideIndex ? " is-active" : ""}`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat strip (mirrors Insulspan spec strip) ── */}
      <div className="ts-product-specstrip">
        <div className="ts-container">
          <div className="ts-product-specstrip-grid">
            {homeData.heroStats.map((s, i) => (
              <div key={i} className="ts-product-specstrip-item spec-item">
                <div className="label">{s.lab}</div>
                <div className="value">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Intro / About ── */}
      <section className="ts-section" id="intro" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-intro ts-intro--video">
            <div className="ts-intro-text">
              <div className="ts-eyebrow intro-text-animate">{homeData.introEyebrow}</div>
              <h2 className="intro-text-animate">{homeData.introH2}</h2>
              <p className="intro-text-animate">{homeData.introPara1}</p>
              <p className="intro-text-animate">{homeData.introPara2}</p>
              <p className="intro-text-animate">{homeData.introPara3}</p>
              <div className="ts-cta-row intro-text-animate">
                <Link href="/about" className="ts-btn ts-btn--dark">
                  More about us
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/building-system" className="ts-btn ts-btn--ghost">
                  Watch the build video
                </Link>
              </div>
            </div>
            <div className="ts-intro-photo ts-intro-photo--wide intro-photo-animate">
              <video
                ref={videoRef}
                src="/photos/about-animation.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "var(--color-canvas)" }}
              />
              <span className="ts-photo-tag">Family-owned · NSW Australia</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="ts-section ts-divider-top" id="products">
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow section-head-animate">{homeData.productsEyebrow}</div>
              <h2 className="section-head-animate">{homeData.productsH2}</h2>
            </div>
            <p className="section-head-animate">{homeData.productsLead}</p>
          </div>

          <div className="ts-product-grid">
            {products.map((p) => (
              <Link key={p.num} href={p.href} className="ts-product-card product-card-animate">
                <div className="ts-product-image">
                  <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="ts-product-num">{p.num} / 03</span>
                </div>
                <div className="ts-product-body">
                  <div className="ts-product-kicker">{p.kicker}</div>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                  <span className="ts-product-link">Explore the range</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems ── */}
      <section className="ts-section ts-divider-top" id="systems" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow section-head-animate">Systems</div>
              <h2 className="section-head-animate">Patio kits and complete building systems.</h2>
            </div>
            <p className="section-head-animate">Pre-engineered patio kits and full SIPs building systems — designed, manufactured and supplied direct from our factory in Silverdale, NSW.</p>
          </div>
          <div className="ts-product-grid ts-product-grid--two">
            {systems.map((s) => (
              <Link key={s.num} href={s.href} className="ts-product-card product-card-animate">
                <div className="ts-product-image">
                  <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
                  <span className="ts-product-num">{s.num} / 02</span>
                </div>
                <div className="ts-product-body">
                  <div className="ts-product-kicker">{s.kicker}</div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <span className="ts-product-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="ts-section ts-divider-top" id="benefits" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-section-head">
            <div>
              <div className="ts-eyebrow section-head-animate">{homeData.benefitsEyebrow}</div>
              <h2 className="section-head-animate">{homeData.benefitsH2}</h2>
            </div>
            <p className="section-head-animate">{homeData.benefitsLead}</p>
          </div>

          <div className="ts-benefits">
            {benefits.map((b) => (
              <div key={b.num} className="ts-benefit benefit-animate">
                <div className="ts-benefit-num">{b.num}</div>
                <BenefitIcon icon={b.icon} />
                <h3>{b.title}</h3>
                <p>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="ts-section ts-divider-top" id="applications">
        <div className="ts-container">
          <div className="ts-section-head" style={{ marginBottom: 40 }}>
            <div>
              <div className="ts-eyebrow section-head-animate">Applications</div>
              <h2 className="section-head-animate">Built for every Australian project.</h2>
            </div>
            <p className="section-head-animate">
              From the family home to commercial cold storage — ThermaSpan panels are
              engineered to perform across every application.
            </p>
          </div>
        </div>
        <div className="ts-applications">
          {applications.map((a, i) => (
            <div key={i} className="ts-app-tile app-tile-animate">
              <Image src={a.img} alt={a.title} fill style={{ objectFit: "cover" }} sizes="33vw" />
              <div className="ts-app-overlay" />
              <div className="ts-app-label">
                <div className="kicker">{a.kicker}</div>
                <h3>{a.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="ts-cta-strip" id="quote">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2 className="cta-animate">{homeData.ctaH2}</h2>
              <p className="cta-animate">{homeData.ctaBody}</p>
            </div>
            <div className="ts-cta-card cta-animate">
              <span className="ts-eyebrow">{homeData.ctaPhoneLabel}</span>
              <a href="tel:1300132787" className="phone">1300 132 787</a>
              <p className="hours">Mon–Fri · 7:30am – 4:30pm AEST</p>
              <div className="actions">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  {homeData.ctaPrimary}
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/resources" className="ts-btn ts-btn--ghost-on-dark">
                  {homeData.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

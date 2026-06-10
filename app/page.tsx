"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeData from "@/content/home.json";

gsap.registerPlugin(ScrollTrigger);

const showcase = homeData.categoryShowcase;

const benefits = [
  { num: "01", icon: "light", title: "Lightweight", copy: "High-density EPS core in a slim panel — easier to handle, easier to install, no heavy lifting gear required." },
  { num: "02", icon: "fast", title: "Quick to install", copy: "Pre-cut, pre-finished, locks together on site. Reach lock-up in as little as 3–4 days." },
  { num: "03", icon: "insulated", title: "Fully insulated", copy: "Insulation built in. Supports 8-Star energy ratings and reduces thermal bridging across the envelope." },
  { num: "04", icon: "spans", title: "Long spans", copy: "Engineered for long structural spans — fewer support beams, cleaner architectural lines." },
  { num: "05", icon: "clean", title: "Easy to clean", copy: "Pre-finished FC and MgO surfaces — moisture stable, no warping, low maintenance for the life of the build." },
];

const applications = homeData.applications;

const PRODUCT_ICON_SRC: Record<string, { src: string; alt: string }> = {
  roof:      { src: "/photos/icons-clean/Insulated Roofing & Wall Panels Icon.png", alt: "Insulated Roofing & Wall Panels" },
  home:      { src: "/photos/icons-clean/Modular Homes Icon.png",                   alt: "Modular Homes" },
  flat:      { src: "/photos/icons-clean/Granny Flats Icon.png",                    alt: "Granny Flats" },
  patio:     { src: "/photos/icons-clean/Patio Kits Icon.png",                      alt: "Patio Kits" },
  fence:     { src: "/photos/icons-clean/Modular Fencing Icon.png",                 alt: "Modular Fencing" },
  retaining: { src: "/photos/icons-clean/Retaining Solutions Icon.png",             alt: "Retaining Solutions" },
};

function ProductIcon({ icon }: { icon: string }) {
  const entry = PRODUCT_ICON_SRC[icon];
  if (!entry) return null;
  return (
    <Image
      src={entry.src}
      alt={entry.alt}
      width={160}
      height={100}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}

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
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

      // Showcase header — eyebrow draws in, headline mask reveal, lead fade
      gsap.from(".showcase-eyebrow", {
        scrollTrigger: { trigger: ".ts-showcase", start: "top 80%", once: true },
        x: -20, opacity: 0, duration: 0.7, ease: "power2.out",
      });
      gsap.from(".showcase-h2", {
        scrollTrigger: { trigger: ".ts-showcase", start: "top 80%", once: true },
        y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".showcase-lead", {
        scrollTrigger: { trigger: ".ts-showcase", start: "top 80%", once: true },
        y: 20, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.3,
      });

      // Showcase cards — alternating left/right slide + scale reveal
      gsap.utils.toArray<HTMLElement>(".showcase-card-animate").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          x: i % 2 === 0 ? -80 : 80,
          y: 30,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
        });
      });

      // Showcase images — scroll-linked parallax (image moves as you scroll)
      gsap.utils.toArray<HTMLElement>(".ts-showcase-image img").forEach((img) => {
        gsap.fromTo(
          img,
          { y: -40, scale: 1.12 },
          {
            y: 40,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".ts-showcase-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Showcase body — title and copy fade up as card enters
      gsap.utils.toArray<HTMLElement>(".ts-showcase-card").forEach((card) => {
        const body = card.querySelector(".ts-showcase-body");
        if (!body) return;
        gsap.from(body.children, {
          scrollTrigger: { trigger: card, start: "top 75%", once: true },
          y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.2,
        });
      });

      // Benefits
      gsap.from(".icon-animate", {
        scrollTrigger: { trigger: ".ts-product-iconrow", start: "top 85%", once: true },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
      });
      gsap.from(".benefit-animate", {
        scrollTrigger: { trigger: ".ts-benefits-strip", start: "top 90%", once: true },
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

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ── Hero — full-bleed looping background video with overlay ── */}
      <section id="top" className="ts-home-hero">
        {/* Background video — fills full section, autoplays muted & loops */}
        <video
          className="ts-home-hero-video"
          src={homeData.heroVideo}
          poster={homeData.heroVideoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* Gradient overlay — dark on left, fades right */}
        <div className="ts-home-hero-overlay" />

        {/* Text — anchored bottom-left */}
        <div className="ts-home-hero-text ts-home-hero-text--bottom">
          <h1 className="hero-animate">
            Your Outdoor Living <em>Specialists</em>.
          </h1>
        </div>
      </section>

      {/* ── Our Products icon row ── */}
      <section className="ts-product-iconrow" id="our-products">
        <div className="ts-container">
          <div className="ts-product-iconrow-inner">
            <div className="ts-product-iconrow-label">{homeData.productIconLabel}</div>
            <div className="ts-product-iconrow-items">
              {homeData.productIconRow.map((p, i) => {
                const inner = (
                  <>
                    <div className="ts-product-icon">
                      <ProductIcon icon={p.icon} />
                    </div>
                    <div className="ts-product-icon-label">{p.label}</div>
                  </>
                );
                const isExternal = "external" in p && (p as { external?: boolean }).external;
                return isExternal ? (
                  <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="ts-product-iconitem icon-animate">
                    {inner}
                  </a>
                ) : (
                  <Link key={i} href={p.href} className="ts-product-iconitem icon-animate">
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Showcase (full-bleed, 2 per row) ── */}
      <section className="ts-divider-top ts-showcase" id="products">
        <div className="ts-section-head">
          <div>
            <div className="ts-eyebrow showcase-eyebrow">{homeData.showcaseEyebrow}</div>
            <h2 className="showcase-h2">{homeData.showcaseH2}</h2>
          </div>
          <p className="showcase-lead">{homeData.showcaseLead}</p>
        </div>

        <div className="ts-showcase-grid">
            {showcase.map((c, i) => {
              const inner = (
                <>
                  <div className="ts-showcase-image">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                    <span className="ts-showcase-num">0{i + 1} / 0{showcase.length}</span>
                    <div className="ts-showcase-imageoverlay" />
                  </div>
                  <div className="ts-showcase-body">
                    <div className="ts-showcase-kicker">{c.kicker}</div>
                    <h3 className="ts-showcase-title">{c.title}</h3>
                    <p className="ts-showcase-copy">{c.copy}</p>
                    <span className="ts-showcase-link">
                      Explore
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </>
              );
              return c.external ? (
                <a
                  key={c.kicker}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ts-showcase-card showcase-card-animate"
                  data-index={i}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={c.kicker}
                  href={c.href}
                  className="ts-showcase-card showcase-card-animate"
                  data-index={i}
                >
                  {inner}
                </Link>
              );
            })}
        </div>
      </section>

      {/* ── Future of Building / Intro + Video ── */}
      <section className="ts-section ts-divider-top" id="future" style={{ background: "var(--ts-cream-2)" }}>
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
                <a href="https://www.quickbuilthomes.com.au/" target="_blank" rel="noopener noreferrer" className="ts-btn ts-btn--ghost">
                  View our Building Systems
                </a>
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

      {/* ── Applications ── */}
      <section className="ts-section ts-divider-top" id="applications">
        <div className="ts-container">
          <div className="ts-section-head" style={{ marginBottom: 40 }}>
            <div>
              <div className="ts-eyebrow section-head-animate">{homeData.applicationsEyebrow}</div>
              <h2 className="section-head-animate">{homeData.applicationsH2}</h2>
            </div>
            <p className="section-head-animate">{homeData.applicationsLead}</p>
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

    </div>
  );
}

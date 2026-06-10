"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    num: "01",
    kicker: "Insulspan®",
    title: "Insulated Roofing Panels",
    copy: "Long-span structural roofing panels with high-performance insulation built in. Three architectural profiles: Monospan, Corrugated, and Corro/Corro. Eliminates purlins, sarking, bulk insulation and plasterboard in one install.",
    features: ["Up to 8.1m clear span", "50–150mm core thickness", "BAL 29 compliant", "10-year warranty"],
    image: "/photos/product-insulspan-new.png",
    href: "/products/insulspan",
  },
  {
    num: "02",
    kicker: "Panelspan®",
    title: "Structural Insulated Wall Panels",
    copy: "Pre-finished FC or MgO cladding bonded to a high-density EPS core. Steel Skin, FC/FC and MgO/MgO finishes available. Reach lock-up in days with no external cladding required.",
    features: ["FRL 90/90/90 fire rating", "8-Star NatHERS performance", "MgO/MgO or FC/FC faces", "Pre-finished ready to paint"],
    image: "/photos/product-panelspan-new.png",
    href: "/products/panelspan",
  },
  {
    num: "03",
    kicker: "Panelcore®",
    title: "Coldroom Panels",
    copy: "Steel-skinned insulated panels for cold storage, food processing, pharmaceutical and any controlled-temperature application. Cam-lock joining system creates an airtight, seamless envelope.",
    features: ["Steel Colorbond skins", "75–200mm PU foam core", "-40°C to +15°C range", "Food-safe, hygienic finish"],
    image: "/photos/product-panelcore-new.png",
    href: "/products/panelcore",
  },
];

export default function ProductsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".range-row-animate", {
        scrollTrigger: { trigger: ".ts-range-list", start: "top 80%", once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-ink)",
          color: "var(--color-on-primary)",
          padding: "88px 0 72px",
        }}
      >
        <div className="ts-container">
          <div className="ts-breadcrumbs hero-animate" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link href="/" style={{ color: "inherit", opacity: 0.7 }}>Home</Link>
            <span className="sep">/</span>
            <span>Products</span>
          </div>
          <div className="ts-eyebrow hero-animate" style={{ color: "var(--ts-accent)", marginTop: 16 }}>Our products</div>
          <h1
            className="hero-animate"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: "-1.8px",
              color: "var(--color-on-primary)",
              margin: "16px 0 24px",
              maxWidth: "18ch",
            }}
          >
            One system. Three product families.
          </h1>
          <p
            className="hero-animate"
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "48ch",
              margin: 0,
            }}
          >
            Insulspan® roofing, Panelspan® walls and Panelcore® coldroom panels — engineered
            together as one high-performance building system, or specified individually.
          </p>
        </div>
      </section>

      {/* Range list */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-range-list">
            {products.map((p) => (
              <Link key={p.num} href={p.href} className="ts-range-row range-row-animate">
                <div className="ts-range-photo">
                  <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 40vw" />
                  <span className="ts-range-num">{p.num} / 03</span>
                </div>
                <div className="ts-range-body">
                  <div className="ts-range-kicker">{p.kicker}</div>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                  <ul>
                    {p.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="ts-range-action">
                  <span className="ts-range-link">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

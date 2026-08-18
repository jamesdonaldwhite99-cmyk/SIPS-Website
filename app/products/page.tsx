"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/products.json";

gsap.registerPlugin(ScrollTrigger);

const products = data.products;

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
          padding: "124px 0 72px",
        }}
      >
        <div className="ts-container">
          <div className="ts-breadcrumbs hero-animate" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link href="/" style={{ color: "inherit", opacity: 0.7 }}>Home</Link>
            <span className="sep">/</span>
            <span>Products</span>
          </div>
          <div className="ts-eyebrow hero-animate" style={{ color: "var(--ts-accent)", marginTop: 16 }}>{data.heroEyebrow}</div>
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
            {data.heroH1}
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
            {data.heroLead}
          </p>
        </div>
      </section>

      {/* Range list */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-range-list">
            {products.map((p, i) => (
              <Link key={p.href} href={p.href} className="ts-range-row range-row-animate">
                <div className="ts-range-photo">
                  <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 40vw" />
                  <span className="ts-range-num">{`0${i + 1}`} / 0{products.length}</span>
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
                  <span className="ts-range-link">{data.ctaLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

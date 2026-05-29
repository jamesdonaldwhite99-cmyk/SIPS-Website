"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/content/gallery.json";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.1,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item-animate", {
        scale: 0.95, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Close lightbox on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section style={{ background: "var(--ts-taupe)", color: "var(--color-ink)", padding: "88px 0 72px" }}>
        <div className="ts-container">
          <div className="ts-eyebrow hero-animate" style={{ color: "var(--ts-accent)" }}>{data.heroEyebrow}</div>
          <h1
            className="hero-animate"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 400, lineHeight: 0.98, letterSpacing: "-1.8px",
              color: "var(--color-ink)",
              margin: "16px 0 20px", maxWidth: "18ch",
            }}
          >
            {data.heroH1}
          </h1>
          <p
            className="hero-animate"
            style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(31,31,31,0.75)", maxWidth: "44ch", margin: 0, whiteSpace: "pre-line" }}
          >
            {data.heroLead}
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-gallery-grid">
            {data.images.map((img, i) => (
              <button
                key={i}
                className="ts-gallery-item gallery-item-animate"
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading={i < 8 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", width: "100%", height: "100%" }}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
            />
          </div>
          <button
            type="button"
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", top: 24, right: 24,
              width: 44, height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: 0, cursor: "pointer",
              color: "white", fontSize: 20, lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

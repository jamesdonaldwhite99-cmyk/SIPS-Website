import Link from "next/link";
import Image from "next/image";

/**
 * Full-bleed dark page hero with a background photo, gradient overlay,
 * breadcrumbs, eyebrow, headline and lead. Shared across the About,
 * Gallery, Resources and Contact pages so every inner page matches.
 *
 * Animation: the eyebrow/h1/lead carry `.hero-animate`, which each page's
 * own GSAP context targets — render this inside the page's `pageRef` wrapper.
 */

export default function PageHero({
  crumb,
  eyebrow,
  h1,
  lead,
  photo,
}: {
  crumb: string;
  eyebrow: string;
  h1: string;
  lead?: string;
  photo: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 640,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: "#1F1F1F",
        color: "var(--color-on-primary)",
      }}
    >
      <Image
        src={photo}
        alt={h1}
        fill
        style={{ objectFit: "cover", opacity: 0.85 }}
        priority
        sizes="100vw"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div className="ts-container" style={{ position: "relative", zIndex: 2, paddingBottom: 64, paddingTop: 120 }}>
        <div className="ts-breadcrumbs hero-animate" style={{ color: "rgba(255,255,255,0.55)" }}>
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span>{crumb}</span>
        </div>
        <div
          className="hero-animate"
          style={{
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            color: "var(--ts-accent)",
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </div>
        <h1
          className="hero-animate"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 2.6vw, 40px)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.6px",
            margin: 0,
            maxWidth: "32ch",
            color: "var(--color-on-primary)",
          }}
        >
          {h1}
        </h1>
        {lead && (
          <p
            className="hero-animate"
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "44ch",
              margin: "14px 0 0",
              whiteSpace: "pre-line",
            }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

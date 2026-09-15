import Link from "next/link";
import type { Metadata } from "next";
import { DESIGNERS, designerHref, designerIsExternal } from "@/lib/designers";

/**
 * One front door for every calculator we own.
 *
 * The tools are spread over three other domains and the parent site had no way into any of them.
 * This page is the hub; `zoneRewrites` in next.config.mjs is what eventually makes /design/patio
 * SERVE the patio designer rather than link to it.
 *
 * Each card therefore carries BOTH addresses. `href` is the zone path and is used the moment that
 * zone's env var is set; `live` is the tool on its own domain and is what the card uses until then.
 * One flag per tool, flipped here, so the hub is never pointing at a rewrite that does not exist
 * yet — a hub that 404s is worse than one that links out.
 */

export const metadata: Metadata = {
  title: "Design and price your project — Quick Built Systems",
  description:
    "Price a patio, a steel floor, a fence or a kit home yourself. Real engineering, a delivered price on screen, and drawings you can hand to a builder.",
  alternates: { canonical: "/design" },
};


const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export default function DesignHubPage() {
  return (
    <div>
      <section className="ts-product-hero">
        <div className="ts-container">
          <div className="ts-product-hero-text" style={{ maxWidth: "820px" }}>
            <div className="ts-breadcrumbs">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <span>Design</span>
            </div>
            <div className="kicker">Design &amp; price</div>
            <h1>
              Price it yourself,<br />
              <em style={{ color: "var(--ts-accent)" }}>before you call anyone</em>
            </h1>
            <p className="lead">
              Every Quick Built calculator in one place. Real engineering, a delivered price on
              screen, and drawings you can hand to a builder — not a form that promises a callback.
            </p>
          </div>
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-design-grid">
            {DESIGNERS.map((t) => {
              const external = designerIsExternal(t.id);
              const target = designerHref(t.id);
              return (
                <article key={t.name} className="ts-design-card">
                  <div className="ts-design-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.photo} alt={t.photoAlt} loading="lazy" />
                  </div>
                  <div className="ts-design-card-head">
                    <h2>{t.name}</h2>
                    <span className={`ts-design-tag${t.tag === "Live" ? " is-live" : ""}`}>{t.tag}</span>
                  </div>
                  <p className="ts-design-copy">{t.blurb}</p>
                  <ul className="ts-design-points">
                    {t.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  {external ? (
                    <a href={target} className="ts-btn ts-btn--dark" rel="noopener">
                      {t.cta}
                      <Arrow />
                    </a>
                  ) : (
                    <Link href={target} className="ts-btn ts-btn--dark">
                      {t.cta}
                      <Arrow />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ts-cta-strip">
        <div className="ts-container">
          <div className="inner">
            <div>
              <h2>Rather talk it through?</h2>
              <p>
                The calculators cover the common cases. Anything unusual — a difficult site, a shape
                that is not a rectangle, a job with a deadline — is a conversation, and we would
                rather have it early.
              </p>
            </div>
            <div className="ts-cta-card">
              <span className="ts-eyebrow">Speak to our team</span>
              <a href="tel:1300132787" className="phone">1300 132 787</a>
              <p className="hours">Mon–Fri · 7:30am – 4:30pm AEST</p>
              <div className="actions">
                <Link href="/contact" className="ts-btn ts-btn--primary">
                  Enquire Now
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

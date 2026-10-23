/* "Join the Quick Built family": the trade page, laid out like Quick Built Fencing's Specifiers &
 * Trade page (proof strip, trade network cards, resources, a dark application band, project tiles,
 * closing call). Each site passes its own photos, proof points and resources (app/trade/page.tsx).
 *
 * Every Apply button goes to the one online application (quickbuiltsystems.com.au/trade-account):
 * the ABN and credit checks run as it is sent, it lands on the Command Centre's Credit tab for James,
 * and approval switches on trade pricing in the Quick Built app. Trade percentages are never published. */
import Image from "next/image";
import Link from "next/link";

export const APPLY_URL = "https://www.quickbuiltsystems.com.au/trade-account";
const TERMS = "https://www.quickbuiltsystems.com.au/pdfs/qbs-terms-2026-04.pdf";

export interface TradeConfig {
  applyHref?: string;
  proof: string[];
  benefits: { title: string; caption: string; image: string }[];
  resourcesHeading?: string;
  resources: { title: string; caption: string; href: string; image: string; external?: boolean }[];
  gallery: { label: string; caption: string; image: string }[];
  /** A named trade customer's own words, only once they have agreed to it being published. */
  testimonial?: { quote: string; name: string; business: string };
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
);
export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
const h2: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, letterSpacing: "-1px", color: "var(--color-ink)", margin: "14px 0 12px" };
const lead: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", maxWidth: 640, margin: "0 0 34px" };

const STEPS: [string, string][] = [
  ["Apply online", "About ten minutes: your business, its directors, three trade references and the credit limit you would like."],
  ["We check it", "Your ABN and a credit check run automatically the moment you send it."],
  ["We review it", "We usually assess applications within two business days and let you know either way."],
  ["You're set up", "Trade pricing as soon as you are approved. If we ask for a personal guarantee, your 30-day account opens once the signed guarantee is back."],
];
const NEED = ["Your ABN and business details", "Directors' names, addresses and dates of birth", "Three trade references", "The 30-day credit limit you would like"];
/* The account terms in plain words (competitor pages that convert spell these out; 23 Oct 2026 research).
   Only what the application and the Terms of Trade already say: no minimum spend is published. */
const TERMS_PLAIN: [string, string][] = [
  ["Who can apply", "ABN-registered businesses: builders, installers, contractors and the trades."],
  ["What it costs", "Nothing. Applying is free and there is no obligation."],
  ["Your prices", "Trade pricing on your orders from the day you are approved."],
  ["30-day account", "Up to a limit we agree with you, after a credit check."],
  ["Who signs", "A director, partner or sole trader. We may ask for a personal guarantee."],
];

export default function TradeJoin({ c }: { c: TradeConfig }) {
  const apply = c.applyHref || APPLY_URL;
  return (
    <>
      {/* Proof points */}
      <section className="ts-section ts-section--tight ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="qbt-proof">
            {c.proof.map((p, i) => (
              <div key={i} className="qbt-proof-item"><span className="qbt-proof-check" style={{ color: "var(--ts-accent)" }}><Check /></span><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade network */}
      <section className="ts-section ts-divider-top">
        <div className="ts-container">
          <div className="ts-eyebrow">Trade network</div>
          <h2 style={h2}>Join the Quick Built family.</h2>
          <p style={lead}>For builders, installers and the trades who order with us regularly: your own trade prices, 30-day terms and a team that answers the phone.</p>
          <div className="qbt-inside">
            {c.benefits.map((b, i) => (
              <div key={i} className="qbt-inside-card">
                <div className="qbt-inside-cover"><Image src={b.image} alt={b.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 560px) 100vw, 33vw" /></div>
                <div className="qbt-inside-body"><h3>{b.title}</h3><p>{b.caption}</p></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={apply} className="ts-btn ts-btn--dark">Apply for a trade account<Arrow /></a>
            <a href="tel:1300132787" className="ts-btn ts-btn--ghost">Call 1300 132 787</a>
          </div>
        </div>
      </section>

      {/* How it works, and the account in plain words */}
      <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
        <div className="ts-container">
          <div className="ts-eyebrow">How it works</div>
          <h2 style={{ ...h2, margin: "14px 0 30px" }}>From application to trade prices.</h2>
          <ol className="qbt-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}><span className="qbt-step-num">{i + 1}</span><span><strong>{t}</strong><span>{d}</span></span></li>
            ))}
          </ol>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.2vw, 28px)", fontWeight: 400, color: "var(--color-ink)", margin: "44px 0 18px" }}>The account, plainly.</h3>
          <dl className="qbt-terms">
            {TERMS_PLAIN.map(([t, d]) => (<div key={t}><dt>{t}</dt><dd>{d}</dd></div>))}
          </dl>
        </div>
      </section>

      {c.testimonial ? (
        <section className="ts-section ts-divider-top">
          <div className="ts-container">
            <figure style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 28px)", lineHeight: 1.45, color: "var(--color-ink)", margin: "0 0 18px" }}>&ldquo;{c.testimonial.quote}&rdquo;</blockquote>
              <figcaption style={{ fontSize: 15, color: "var(--color-graphite)" }}><strong>{c.testimonial.name}</strong>, {c.testimonial.business}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      {/* Trade resources */}
      {c.resources.length ? (
        <section className="ts-section ts-divider-top">
          <div className="ts-container">
            <div className="ts-eyebrow">For the trade</div>
            <h2 style={{ ...h2, margin: "14px 0 34px" }}>{c.resourcesHeading || "Everything you need to quote and build."}</h2>
            <div className="qbt-inside">
              {c.resources.map((r, i) => {
                const body = (<><div className="qbt-inside-cover"><Image src={r.image} alt={r.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 560px) 100vw, 33vw" /></div>
                  <div className="qbt-inside-body"><h3>{r.title}</h3><p>{r.caption}</p></div></>);
                return r.external
                  ? <a key={i} href={r.href} className="qbt-inside-card qbt-link-card">{body}</a>
                  : <Link key={i} href={r.href} className="qbt-inside-card qbt-link-card">{body}</Link>;
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* The application */}
      <section id="trade-signup" className="ts-section ts-divider-top" style={{ background: "var(--color-ink)" }}>
        <div className="ts-container">
          <div className="qbt-signup">
            <div className="qbt-signup-copy">
              <div className="ts-eyebrow" style={{ color: "var(--ts-accent)" }}>Trade network · Apply now</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-0.5px", color: "#fff", margin: "14px 0 14px" }}>Apply in about ten minutes.</h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", margin: "0 0 22px" }}>For ABN-registered businesses. Applying is free and there is no obligation. You get a signed copy by email.</p>
              <a href="tel:1300132787" className="ts-btn ts-btn--ghost-on-dark">Or call 1300 132 787</a>
            </div>
            <div className="qbt-signup-card">
              <p style={{ margin: "0 0 12px", fontWeight: 600, color: "var(--color-ink)" }}>Have these ready:</p>
              <ul className="qbt-need">{NEED.map((n) => <li key={n}><span style={{ color: "var(--ts-accent)" }}><Check /></span>{n}</li>)}</ul>
              <a href={apply} className="ts-btn ts-btn--primary" style={{ marginTop: 18 }}>Start the application<Arrow /></a>
              <p style={{ margin: "14px 0 0", fontSize: 13, color: "var(--color-graphite)" }}>Read our <a href={TERMS} target="_blank" rel="noopener noreferrer">Terms and Conditions of Trade (April 2026)</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {c.gallery.length ? (
        <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
          <div className="ts-container">
            <div className="ts-eyebrow">Built with Quick Built</div>
            <h2 style={{ ...h2, margin: "14px 0 34px" }}>Trade work we supply.</h2>
            <div className="qbt-apps">
              {c.gallery.map((a, i) => (
                <div key={i} className="qbt-app-tile">
                  <Image src={a.image} alt={`${a.label}: ${a.caption}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 50vw, 25vw" />
                  <div className="qbt-app-overlay"><span className="label">{a.label}</span><span className="caption">{a.caption}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing */}
      <section className="ts-section ts-divider-top" style={{ textAlign: "center" }}>
        <div className="ts-container">
          <div style={{ maxWidth: 680, marginInline: "auto" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.45, color: "var(--color-ink)", margin: "0 0 28px" }}>
              Made in Silverdale NSW by the people you talk to. Call the factory on 1300 132 787.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={apply} className="ts-btn ts-btn--primary">Apply for a trade account<Arrow /></a>
              <Link href="/contact" className="ts-btn ts-btn--ghost">Talk to our team</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* "Join the Quick Built family": the trade page, in the same order as Quick Built Fencing's Specifiers &
 * Trade page (James, 23 Oct 2026: "follow same layout as fencing"): proof strip, trade network cards,
 * the technical pack download (once James approves each pack), what's inside, a dark application band,
 * project tiles, closing call. Each site passes its own photos, proof points and resources (app/trade/page.tsx).
 *
 * Every Apply button goes to the one online application (quickbuiltsystems.com.au/trade-account):
 * the ABN and credit checks run as it is sent, it lands on the Command Centre's Credit tab for James,
 * and approval switches on trade pricing in the Quick Built app. Trade percentages are never published. */
import Image from "next/image";
import Link from "next/link";
import LeadsBand from "./LeadsBand";

export const APPLY_URL = "https://www.quickbuiltsystems.com.au/trade-account";
const TERMS = "https://www.quickbuiltsystems.com.au/pdfs/qbs-terms-2026-04.pdf";

export interface TradeConfig {
  applyHref?: string;
  /** What homeowners design on this site, for the leads pitch ("patios", "homes and cabins"). */
  leadWhat: string;
  proof: string[];
  benefits: { title: string; caption: string; image: string }[];
  resourcesHeading?: string;
  resources: { title: string; caption: string; href: string; image: string; external?: boolean }[];
  gallery: { label: string; caption: string; image: string }[];
  /** The technical pack (PDF in /public/pdfs). Left out until James approves that site's pack. */
  pack?: { href: string; cover: string; title: string; lead: string; contents: string[]; pages: string; size: string };
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
);
export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);
const h2: React.CSSProperties = { fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, letterSpacing: "-1px", color: "var(--color-ink)", margin: "14px 0 12px" };
const lead: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", maxWidth: 640, margin: "0 0 34px" };

const NEED = ["Your ABN and business details", "Directors' names, addresses and dates of birth", "Three trade references", "The 30-day credit limit you would like"];
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

      <LeadsBand what={c.leadWhat} applyHref={apply} />

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
          <div style={{ marginTop: 34 }}><a href={apply} className="ts-btn ts-btn--dark">Apply for a trade account<Arrow /></a></div>
        </div>
      </section>

      {/* Technical pack: free download, as on Fencing */}
      {c.pack ? (
        <section className="ts-section ts-divider-top" style={{ background: "var(--ts-cream-2)" }}>
          <div className="ts-container">
            <div className="qbt-pack">
              <div className="qbt-pack-cover">
                <Image src={c.pack.cover} alt={`Cover of the ${c.pack.title}`} fill style={{ objectFit: "contain" }} sizes="360px" />
                <span className="qbt-pack-badge">PDF</span>
              </div>
              <div className="qbt-pack-text">
                <div className="ts-eyebrow">Technical pack</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.8vw, 34px)", fontWeight: 400, letterSpacing: "-0.5px", color: "var(--color-ink)", margin: "14px 0 14px" }}>{c.pack.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-graphite)", margin: "0 0 20px" }}>{c.pack.lead}</p>
                <ul className="qbt-pack-list">
                  {c.pack.contents.map((x) => <li key={x}><span className="qbt-pack-check" style={{ color: "var(--ts-accent)" }}><Check /></span>{x}</li>)}
                </ul>
                <div className="qbt-pack-meta"><span className="qbt-pack-chip">PDF</span><span className="qbt-pack-chip">{c.pack.pages}</span><span className="qbt-pack-chip">{c.pack.size}</span></div>
                <div style={{ marginTop: 22 }}><a href={c.pack.href} className="ts-btn ts-btn--primary" target="_blank" rel="noopener">Download the pack<Arrow /></a></div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Trade resources */}
      {c.resources.length ? (
        <section className="ts-section ts-divider-top">
          <div className="ts-container">
            <div className="ts-eyebrow">What&apos;s inside</div>
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

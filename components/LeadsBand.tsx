/* "Jobs sent your way": the lead hand-off pitch at the top of every Trade page (James, 23 Oct 2026:
 * "focus more on the excitement of joining with leads provided"). Homeowners who design and price a job
 * in our online designers are passed to a Quick Built trade partner near them. Same copy as the trade
 * guides. The photo is the team shot used across the trade sections. */
import Image from "next/image";

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);

const STEPS: [string, string][] = [
  ["They design it", "A homeowner designs and prices the job online."],
  ["We send it to you", "With the design, the price and their details."],
  ["You build it", "On your trade price, with us behind you."],
];

export default function LeadsBand({ what, applyHref }: { what: string; applyHref: string }) {
  return (
    <section className="ts-section ts-divider-top qbt-leads" style={{ background: "var(--color-ink)" }}>
      <div className="ts-container">
        <div className="qbt-leads-grid">
          <div className="qbt-leads-photo">
            <Image src="/photos/010A7505.jpg" alt="Two of the Quick Built team going over plans on site" fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div className="qbt-leads-copy">
            <div className="ts-eyebrow" style={{ color: "var(--ts-accent)" }}>Jobs sent your way</div>
            <h2>We&apos;ll send you work.</h2>
            <p>Homeowners design and price their {what} on our websites. When they want it built, we pass the job to a Quick Built trade partner near them. That&apos;s you.</p>
            <ol className="qbt-leads-steps">
              {STEPS.map(([t, d], i) => (
                <li key={t}><span className="n">{String(i + 1).padStart(2, "0")}</span><strong>{t}</strong><span>{d}</span></li>
              ))}
            </ol>
            <a href={applyHref} className="ts-btn ts-btn--primary">Become a trade partner<Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

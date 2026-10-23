/* "Join the Quick Built family": the trade section, the same on all four websites (23 Oct 2026).
 * It leads to the one online application on quickbuiltsystems.com.au/trade-account, which runs the ABN
 * and credit checks as it is sent and lands on the Command Centre's Credit tab for James to review.
 * Approval gives trade pricing in the Quick Built app; the 30-day account opens once any guarantee is
 * signed. Trade percentages are never published. */
const APPLY = "https://www.quickbuiltsystems.com.au/trade-account";
const TERMS = "https://www.quickbuiltsystems.com.au/pdfs/qbs-terms-2026-04.pdf";

const BENEFITS: [string, string][] = [
  ["Trade pricing", "Your own trade prices on roofing panels and patio kits, fencing and homes, shown to you when you price and order."],
  ["A 30-day account", "Order now and pay by the end of the following month, up to a limit we agree with you."],
  ["The Quick Built app", "Track every order from deposit to delivery, see your invoices and statement, and price jobs at your trade rates. Coming to the App Store and Google Play."],
  ["Straight to the factory", "Talk to the people who make it, in Silverdale NSW, on 1300 132 787."],
];
const STEPS: [string, string][] = [
  ["Apply online", "About ten minutes: your business, its directors, three trade references and the credit limit you would like."],
  ["We check it", "Your ABN and a credit check run automatically the moment you send it."],
  ["We review it", "We usually assess applications within two business days and let you know either way."],
  ["You're set up", "Trade pricing as soon as you are approved. If we ask for a personal guarantee, your 30-day account opens once the signed guarantee is back."],
];

const wrap: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "56px 20px 72px" };
const card: React.CSSProperties = { border: "1px solid #e6e2dc", borderRadius: 16, padding: "20px 22px", background: "#fff" };
const btn: React.CSSProperties = { display: "inline-block", background: "#f15a24", color: "#fff", fontWeight: 700, padding: "15px 26px", borderRadius: 12, textDecoration: "none", fontSize: 17 };

export default function TradeJoin({ applyHref = APPLY }: { applyHref?: string }) {
  return (
    <div style={wrap}>
      <h2 style={{ fontSize: 28, margin: "0 0 18px" }}>What you get</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
        {BENEFITS.map(([t, d]) => (
          <div key={t} style={card}><h3 style={{ margin: "0 0 6px", fontSize: 19 }}>{t}</h3><p style={{ margin: 0, color: "#55504a", lineHeight: 1.5 }}>{d}</p></div>
        ))}
      </div>

      <h2 style={{ fontSize: 28, margin: "48px 0 18px" }}>How it works</h2>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
        {STEPS.map(([t, d], i) => (
          <li key={t} style={{ ...card, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ flex: "0 0 36px", height: 36, borderRadius: "50%", background: "#f15a24", color: "#fff", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
            <span><strong style={{ display: "block", fontSize: 18 }}>{t}</strong><span style={{ color: "#55504a", lineHeight: 1.5 }}>{d}</span></span>
          </li>
        ))}
      </ol>

      <div style={{ ...card, marginTop: 40, textAlign: "center", padding: "32px 22px", background: "#fdf3ee", borderColor: "#f6d3c3" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>Ready to join?</h2>
        <p style={{ margin: "0 0 20px", color: "#55504a" }}>For ABN-registered businesses. Applying is free and there is no obligation.</p>
        <a href={applyHref} style={btn}>Apply for a trade account</a>
        <p style={{ margin: "18px 0 0", fontSize: 14, color: "#6b655e" }}>
          Questions? Call <a href="tel:1300132787">1300 132 787</a> · <a href={TERMS} target="_blank" rel="noopener noreferrer">Terms and Conditions of Trade (April 2026)</a>
        </p>
      </div>
    </div>
  );
}

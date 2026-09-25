import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TradeAccountForm from "@/components/trade-account/TradeAccountForm";

export const metadata: Metadata = {
  title: "Apply for a Trade Account | Quick Built Systems",
  description:
    "Apply online for a Quick Built Systems 30-day trading account. Complete and sign the application in about ten minutes; we usually assess it within two business days.",
  alternates: { canonical: "https://www.quickbuiltsystems.com.au/trade-account" },
};

/** /trade-account — the online 30-day trading account application (see project_specs.md). */
export default function TradeAccountPage() {
  return (
    <div>
      <PageHero
        crumb="Trade account"
        eyebrow="For builders and trade customers"
        h1="Apply for a 30-day trade account"
        lead="Complete and sign your application online in about ten minutes. You'll get a signed copy by email, and we usually assess applications within two business days."
        photo="/photos/panelspan-lifestyle.jpg"
      />
      <section className="ts-section">
        <div className="ts-container">
          <div className="ts-quote-grid">
            <TradeAccountForm />
            <p className="qb-ta-footnote">
              Your details are sent securely to Quick Built Systems and used to assess this application and manage your account, as set out
              in our <a href="/privacy-policy">Privacy Policy</a>. Prefer paper? Call <a href="tel:1300132787">1300 132 787</a> and we&rsquo;ll send the printable form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

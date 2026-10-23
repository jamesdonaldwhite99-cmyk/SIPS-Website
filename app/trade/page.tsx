import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TradeJoin from "@/components/TradeJoin";

export const metadata: Metadata = {
  title: "Trade accounts: join the Quick Built family | Quick Built Systems",
  description: "Trade pricing and 30-day accounts for builders and trades who order with Quick Built regularly. Apply online in about ten minutes.",
  alternates: { canonical: "https://www.quickbuiltsystems.com.au/trade" },
};

export default function TradePage() {
  return (
    <div>
      <PageHero crumb="Trade" eyebrow="For builders and trades" h1="Join the Quick Built family"
        lead="Trade pricing and 30-day accounts for builders, roofers, fencers and the trades who order with us regularly."
        photo="/photos/panelspan-lifestyle.jpg" />
      <TradeJoin applyHref="/trade-account" />
    </div>
  );
}

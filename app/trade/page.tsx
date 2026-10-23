import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TradeJoin, { type TradeConfig } from "@/components/TradeJoin";

export const metadata: Metadata = {
  title: "Trade accounts: join the Quick Built family | Quick Built Systems",
  description: "Trade pricing and 30-day accounts for builders and trades using Quick Built insulated panels. Apply online in about ten minutes.",
  alternates: { canonical: "https://www.quickbuiltsystems.com.au/trade" },
};

const c: TradeConfig = {
  leadWhat: "patios, rooms and panel builds",
  applyHref: "/trade-account",
  proof: [
    "Insulated roof and wall panels made in Silverdale NSW",
    "Trade prices and 30-day terms for approved accounts",
    "ABN and credit checks done online, usually assessed within two business days",
    "Orders, invoices and statements in the Quick Built app (coming soon)",
  ],
  benefits: [
    { title: "Trade pricing and terms", caption: "Your own trade prices across our panels, kits and accessories, and a 30-day account up to a limit we agree with you.", image: "/photos/010A7505.jpg" },
    { title: "Straight to the factory", caption: "Estimating, design and technical help from the people who make the panels, on 1300 132 787.", image: "/photos/Building system.jpg" },
    { title: "The Quick Built app", caption: "Track every order from deposit to delivery, see your invoices and statement, and price jobs at your trade rates.", image: "/photos/House.jpeg" },
  ],
  resources: [
    { title: "The building system", caption: "How the panels go together, from footings to roof.", href: "/building-system", image: "/photos/Building system.jpg" },
    { title: "Products", caption: "Insulspan, Panelspan, Panelcore and Alyspan: sizes, finishes and uses.", href: "/products", image: "/photos/Insulspan Image.jpg" },
    { title: "Resources", caption: "Brochures, guides and technical documents.", href: "/resources", image: "/photos/010a7308-hdr.jpg" },
  ],
  gallery: [
    { label: "Roofing", caption: "Insulated roof panels", image: "/photos/Insulspan Image.jpg" },
    { label: "Cold rooms", caption: "Commercial cold rooms", image: "/photos/Coldroom Commercial 1.jpg" },
    { label: "Homes", caption: "SIPs kit homes", image: "/photos/House.jpeg" },
    { label: "Commercial", caption: "Panels for commercial builds", image: "/photos/010a7287.jpg" },
  ],
};

export default function TradePage() {
  return (
    <div>
      <PageHero crumb="Trade" eyebrow="For builders and trades" h1="Join the Quick Built family"
        lead="Trade pricing and 30-day accounts for builders, installers and the trades who order with us regularly."
        photo="/photos/panelspan-lifestyle.jpg" />
      <TradeJoin c={c} />
    </div>
  );
}

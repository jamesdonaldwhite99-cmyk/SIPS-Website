import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import TradeJoin, { type TradeConfig } from "@/components/TradeJoin";

export const metadata = pageMetadata("trade", "/trade");

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
    { title: "The Quick Built app (coming soon)", caption: "Coming soon: track every order from deposit to delivery, see your invoices and statement, and price jobs at your trade rates.", image: "/photos/House.jpeg" },
  ],
  pack: {
    href: "/trade-docs/qbs-insulated-panels-trade-guide.pdf",
    cover: "/photos/resources/qbs-insulated-panels-trade-guide-cover.png",
    title: "Insulated Panels Trade Guide",
    lead: "Why trade with Quick Built, then every document we publish for the trade, each with its own cover, what it is, when you need it and a link to download it.",
    contents: [
      "Insulspan, Panelspan and Panelcore brochures and the Insulspan data sheet",
      "Wind classification guide and patio roof engineering (22-1204-ST)",
      "Queensland Form 15, patio cover beam and Alyspan span tables",
      "Bushfire guidance for insulated roof and wall panels",
      "Install guides for attached and flyover Insulspan roofs",
      "10-year limited warranty, storage and handling",
    ],
    pages: "8 pages",
    size: "5.2 MB",
  },
  resources: [
    { title: "The building system", caption: "How the panels go together, from footings to roof.", href: "/building-system", image: "/photos/Building system.jpg" },
    { title: "Products", caption: "Insulspan, Panelspan, Panelcore and Alyspan: sizes, finishes and uses.", href: "/products", image: "/photos/Insulspan Image.jpg" },
    { title: "Trade guide and resources", caption: "Download the trade guide, plus brochures, guides and technical documents.", href: "/resources", image: "/photos/010a7308-hdr.jpg" },
  ],
  gallery: [
    { label: "Roofing", caption: "Insulated roof panels", image: "/photos/Insulspan Image.jpg" },
    { label: "Cold rooms", caption: "Commercial cold rooms", image: "/photos/Coldroom Commercial 1.jpg" },
    { label: "Homes", caption: "SIPs kit homes", image: "/photos/House.jpeg" },
    { label: "Modular fencing", caption: "Acoustic modular fencing", image: "/photos/010a7287.jpg" },
  ],
};

export default function TradePage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ label: "Trade", href: "/trade" }])} />
      <PageHero crumb="Trade" eyebrow="For builders and trades" h1="Join the Quick Built family"
        lead="Trade pricing and 30-day accounts for builders, installers and the trades who order with us regularly."
        photo="/photos/panelspan-lifestyle.jpg" />
      <TradeJoin c={c} />
    </div>
  );
}

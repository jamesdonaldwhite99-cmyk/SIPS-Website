import JsonLd from "@/components/JsonLd";
import data from "@/content/insulspan.json";
import { ORGANIZATION_ID, SITE_URL, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("insulspan", "/products/insulspan");

/* Product markup without an offer: the page shows no prices (panels are quoted per job; kits are
   priced on patiokits.com.au), so there is no price to mark up. No ratings: none are collected here. */
const ts = data.technicalSpecs;
const product = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/products/insulspan#product`,
  name: "Insulspan Insulated Roof Panel",
  url: absoluteUrl("/products/insulspan"),
  brand: { "@type": "Brand", name: "Insulspan" },
  manufacturer: { "@id": ORGANIZATION_ID },
  category: "Insulated roof panels",
  material: ts.construction.items.join("; "),
  description: data.heroLead,
  image: [absoluteUrl(data.heroPhoto), absoluteUrl(data.overviewPhoto), absoluteUrl(data.bannerPhoto)],
  color: data.colourSwatches.map((s) => s.name.replace(/[®™]/g, "")).join(", "),
  additionalProperty: [
    { "@type": "PropertyValue", name: "Maximum single span", value: "5,700 mm" },
    { "@type": "PropertyValue", name: "Bushfire attack level", value: "BAL-29" },
    { "@type": "PropertyValue", name: "Underside", value: "0.5 mm steel, Surfmist" },
    { "@type": "PropertyValue", name: "Profiles", value: data.profiles.map((p) => p.name).join(", ") },
    { "@type": "PropertyValue", name: "Acoustic", value: `${ts.acoustic.value} (${ts.acoustic.note})` },
    ...ts.thicknessHeaders.flatMap((t, i) => [
      { "@type": "PropertyValue", name: `${t} panel: R value`, value: `R${ts.rValues[i]}` },
      { "@type": "PropertyValue", name: `${t} panel: weight`, value: `${ts.weights[i]} kg/m²` },
    ]),
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={product} />
      <JsonLd data={breadcrumbJsonLd([{ label: "Products", href: "/products" }, { label: "Insulspan", href: "/products/insulspan" }])} />
      <JsonLd data={faqJsonLd(data.faq)} />
      {children}
    </>
  );
}
